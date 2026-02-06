import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import {
  createDatabaseToken,
  grantOpportunityHunterProAccess,
  grantMarketAssassinAccess,
  grantContentGeneratorAccess,
  grantRecompeteAccess,
} from '@/lib/access-codes';
import {
  sendDatabaseAccessEmail,
  sendOpportunityHunterProEmail,
  sendUltimateBundleEmail,
} from '@/lib/send-email';
import { STRIPE_TO_PRODUCT_ID, getBundleIncludes, getProductName } from '@/lib/products';

// Webhook secrets from environment
const liveWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';
const testWebhookSecret = process.env.STRIPE_TEST_WEBHOOK_SECRET || '';

// Initialize Supabase with service role for webhook writes
function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

// Lazy-load Stripe to avoid build-time errors
function getStripe(testMode: boolean = false) {
  const liveKey = process.env.STRIPE_SECRET_KEY || '';
  const testKey = process.env.STRIPE_TEST_SECRET_KEY || '';
  return new Stripe(testMode ? testKey : liveKey);
}

// Simple in-memory idempotency check
const processedEvents = new Set<string>();

// Record purchase in Supabase
async function recordPurchase(params: {
  email: string;
  productId: string;
  productName: string;
  orderId: string;
  amountPaid: number;
}) {
  const supabase = getSupabase();
  if (!supabase) {
    console.warn('Supabase not configured — skipping purchase record');
    return;
  }

  const { error } = await supabase.from('purchases').insert({
    user_email: params.email.toLowerCase(),
    product_id: params.productId,
    product_name: params.productName,
    order_id: params.orderId,
    amount_paid: params.amountPaid,
    status: 'completed',
    created_at: new Date().toISOString(),
  });

  if (error) {
    console.error('Failed to record purchase in Supabase:', error);
  } else {
    console.log(`✅ Purchase recorded in Supabase: ${params.productId} for ${params.email}`);
  }
}

// Grant access for a single product (Vercel KV)
async function grantProductAccess(productId: string, email: string, customerName?: string) {
  switch (productId) {
    case 'contractor-database': {
      const dbToken = await createDatabaseToken(email, customerName);
      const accessLink = `https://tools.govcongiants.org/api/database-access/${dbToken.token}`;
      await sendDatabaseAccessEmail({ to: email, customerName, accessLink });
      console.log(`✅ Database access granted to ${email}`);
      break;
    }
    case 'opportunity-hunter-pro':
      await grantOpportunityHunterProAccess(email, customerName);
      console.log(`✅ Opportunity Hunter Pro access granted to ${email}`);
      break;
    case 'market-assassin-standard':
      await grantMarketAssassinAccess(email, 'standard', customerName);
      console.log(`✅ Market Assassin Standard access granted to ${email}`);
      break;
    case 'market-assassin-premium':
      await grantMarketAssassinAccess(email, 'premium', customerName);
      console.log(`✅ Market Assassin Premium access granted to ${email}`);
      break;
    case 'ai-content-generator':
      await grantContentGeneratorAccess(email, 'content-engine', customerName);
      console.log(`✅ Content Generator access granted to ${email}`);
      break;
    case 'recompete-contracts':
      await grantRecompeteAccess(email, customerName);
      console.log(`✅ Recompete access granted to ${email}`);
      break;
    default:
      console.log(`No KV access handler for product: ${productId}`);
  }
}

export async function POST(request: NextRequest) {
  console.log('=== STRIPE WEBHOOK RECEIVED ===');

  const rawBody = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    console.error('No Stripe signature found');
    return NextResponse.json({ error: 'No signature' }, { status: 400 });
  }

  let event: Stripe.Event;
  let isTestMode = false;

  // Try live secret first, then test secret
  try {
    const stripe = getStripe(false);
    event = stripe.webhooks.constructEvent(rawBody, signature, liveWebhookSecret);
  } catch {
    try {
      const stripeTest = getStripe(true);
      event = stripeTest.webhooks.constructEvent(rawBody, signature, testWebhookSecret);
      isTestMode = true;
    } catch {
      console.error('Webhook signature verification failed');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }
  }

  // Idempotency check
  if (processedEvents.has(event.id)) {
    return NextResponse.json({ received: true, duplicate: true });
  }
  processedEvents.add(event.id);
  if (processedEvents.size > 1000) {
    const first = processedEvents.values().next().value;
    if (first) processedEvents.delete(first);
  }

  const stripe = getStripe(isTestMode);

  console.log(`Event: ${event.type} | ID: ${event.id} | Test: ${isTestMode}`);

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const customerEmail = session.customer_email || session.customer_details?.email;
    const customerName = session.customer_details?.name || undefined;

    if (!customerEmail) {
      console.error('No customer email in checkout session');
      return NextResponse.json({ error: 'No customer email' }, { status: 400 });
    }

    console.log(`Checkout completed: ${customerEmail} | Amount: ${session.amount_total} ${session.currency}`);

    // Get line items to identify the product
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
      expand: ['data.price.product'],
    });

    let stripeProductId: string | null = null;
    lineItems.data.forEach((item) => {
      const product = item.price?.product;
      const pid = typeof product === 'string' ? product : product?.id;
      if (pid) stripeProductId = pid;
    });

    // Resolve Stripe product ID to our product ID
    const productId = stripeProductId ? STRIPE_TO_PRODUCT_ID[stripeProductId] : null;

    if (!productId) {
      console.log(`Unknown Stripe product: ${stripeProductId}`);
      return NextResponse.json({ received: true, message: 'Unknown product' });
    }

    console.log(`Product: ${productId} (Stripe: ${stripeProductId})`);

    // Check if this is a bundle
    const bundleIncludes = getBundleIncludes(productId);
    const isBundlePurchase = bundleIncludes.length > 0;

    // 1. Record purchase in Supabase
    await recordPurchase({
      email: customerEmail,
      productId,
      productName: getProductName(productId),
      orderId: session.id,
      amountPaid: session.amount_total || 0,
    });

    // 2. Grant access via Vercel KV
    if (isBundlePurchase) {
      // Grant access to each product in the bundle
      for (const includedProductId of bundleIncludes) {
        await grantProductAccess(includedProductId, customerEmail, customerName);
      }

      // Send bundle-specific email
      if (productId === 'ultimate-govcon-bundle') {
        await sendUltimateBundleEmail({ to: customerEmail, customerName });
      }
      // TODO: Add email templates for starter and pro bundles

      console.log(`✅ Bundle ${productId} fully processed for ${customerEmail}`);
    } else {
      // Single product purchase
      await grantProductAccess(productId, customerEmail, customerName);

      // Send product-specific email (database and opp hunter emails sent inside grantProductAccess)
      if (productId === 'opportunity-hunter-pro') {
        await sendOpportunityHunterProEmail({ to: customerEmail, customerName });
      }
    }

    return NextResponse.json({
      success: true,
      product: productId,
      bundle: isBundlePurchase,
      email: customerEmail,
    });
  }

  // Return 200 for other events
  return NextResponse.json({ received: true });
}
