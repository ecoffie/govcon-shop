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
  sendPurchaseConfirmationEmail,
  sendDatabaseAccessEmail,
  sendOpportunityHunterProEmail,
  sendUltimateBundleEmail,
} from '@/lib/send-email';
import { getOrCreateProfile, updateAccessFlags } from '@/lib/supabase/user-profiles';
import { STRIPE_TO_PRODUCT_ID, getProductName, getBundleIncludes } from '@/lib/products';

// Webhook secrets
const liveWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';
const testWebhookSecret = process.env.STRIPE_TEST_WEBHOOK_SECRET || '';

// Supabase admin client for recording purchases
function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

function getStripe(testMode = false) {
  const liveKey = process.env.STRIPE_SECRET_KEY || '';
  const testKey = process.env.STRIPE_TEST_SECRET_KEY || '';
  return new Stripe(testMode ? testKey : liveKey);
}

const processedEvents = new Set<string>();

// Grant Vercel KV access for a single product (fast tool gating)
async function grantKVAccess(productId: string, email: string, customerName?: string) {
  switch (productId) {
    case 'contractor-database': {
      const dbToken = await createDatabaseToken(email, customerName);
      const accessLink = `https://tools.govcongiants.org/api/database-access/${dbToken.token}`;
      await sendDatabaseAccessEmail({ to: email, customerName, accessLink });
      break;
    }
    case 'opportunity-hunter-pro':
      await grantOpportunityHunterProAccess(email, customerName);
      break;
    case 'market-assassin-standard':
      await grantMarketAssassinAccess(email, 'standard', customerName);
      break;
    case 'market-assassin-premium':
      await grantMarketAssassinAccess(email, 'premium', customerName);
      break;
    case 'ai-content-generator':
      await grantContentGeneratorAccess(email, 'content-engine', customerName);
      break;
    case 'recompete-contracts':
      await grantRecompeteAccess(email, customerName);
      break;
  }
}

export async function POST(request: NextRequest) {
  console.log('=== STRIPE WEBHOOK RECEIVED ===');

  const rawBody = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'No signature' }, { status: 400 });
  }

  let event: Stripe.Event;
  let isTestMode = false;

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

  // Idempotency
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

    // Read Stripe metadata (set on payment links)
    const tier = session.metadata?.tier;
    const bundle = session.metadata?.bundle;

    if (!customerEmail) {
      console.error('No customer email in checkout session');
      return NextResponse.json({ error: 'No customer email' }, { status: 400 });
    }

    console.log(`Checkout: ${customerEmail} | tier: ${tier} | bundle: ${bundle} | amount: ${session.amount_total}`);

    // Get line items for Stripe product ID
    const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
      expand: ['data.price.product'],
    });

    let stripeProductId: string | null = null;
    lineItems.data.forEach((item) => {
      const product = item.price?.product;
      const pid = typeof product === 'string' ? product : product?.id;
      if (pid) stripeProductId = pid;
    });

    // Resolve to our product ID
    const productId = stripeProductId ? STRIPE_TO_PRODUCT_ID[stripeProductId] : null;

    console.log(`Product: ${productId} (Stripe: ${stripeProductId})`);

    // ─── 1. Record purchase in Supabase ───
    const supabase = getSupabase();
    if (supabase) {
      // Check for duplicate
      const { data: existing } = await supabase
        .from('purchases')
        .select('id')
        .eq('order_id', session.id)
        .limit(1);

      if (existing && existing.length > 0) {
        console.log('Session already recorded, skipping');
        return NextResponse.json({ received: true, duplicate: true });
      }

      const { error: insertError } = await supabase.from('purchases').insert({
        user_email: customerEmail.toLowerCase(),
        product_id: productId || stripeProductId || 'unknown',
        product_name: lineItems.data[0]?.description || getProductName(productId || ''),
        order_id: session.id,
        amount_paid: session.amount_total || 0,
        status: 'completed',
      });

      if (insertError) {
        console.error('Failed to record purchase:', insertError);
      } else {
        console.log(`✅ Purchase recorded in Supabase`);
      }
    }

    // ─── 2. Update user_profiles access flags (Supabase) ───
    const profile = await getOrCreateProfile(customerEmail, customerName);
    if (tier || bundle) {
      const flags = await updateAccessFlags(customerEmail, tier, bundle);
      console.log('✅ user_profiles updated:', Object.keys(flags));
    }

    // ─── 3. Grant Vercel KV access (fast tool gating) ───
    if (productId) {
      const bundleIncludes = getBundleIncludes(productId);

      if (bundleIncludes.length > 0) {
        for (const included of bundleIncludes) {
          await grantKVAccess(included, customerEmail, customerName);
        }
      } else {
        await grantKVAccess(productId, customerEmail, customerName);
      }
    }

    // ─── 4. Send confirmation email ───
    const friendlyName = getProductName(productId || '') || lineItems.data[0]?.description || 'GovCon Product';

    // Products with dedicated emails
    if (productId === 'ultimate-govcon-bundle') {
      await sendUltimateBundleEmail({ to: customerEmail, customerName });
    } else if (productId === 'opportunity-hunter-pro') {
      await sendOpportunityHunterProEmail({ to: customerEmail, customerName });
    } else if (productId === 'contractor-database') {
      // Database email already sent inside grantKVAccess (has access link)
    } else {
      // All other products: MA Standard/Premium, Content Gen, Recompete, Starter/Pro bundles, upgrades
      await sendPurchaseConfirmationEmail({
        to: customerEmail,
        customerName,
        productName: friendlyName,
        licenseKey: profile?.license_key || undefined,
      });
    }

    console.log(`✅ Fully processed: ${productId || 'unknown'} for ${customerEmail}`);

    return NextResponse.json({
      success: true,
      product: productId,
      tier,
      bundle,
      email: customerEmail,
    });
  }

  return NextResponse.json({ received: true });
}
