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
import { getOrCreateProfile, updateAccessFlags } from '@/lib/supabase/user-profiles';
import { STRIPE_TO_PRODUCT_ID, getProductName, getBundleIncludes } from '@/lib/products';

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

// Grant Vercel KV access for a single product
async function grantKVAccess(productId: string, email: string, customerName?: string, isUltimateBundle?: boolean) {
  switch (productId) {
    case 'contractor-database':
      await createDatabaseToken(email, customerName);
      break;
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
      // Ultimate Bundle gets Full Fix, everything else gets Content Engine
      await grantContentGeneratorAccess(email, isUltimateBundle ? 'full-fix' : 'content-engine', customerName);
      break;
    case 'recompete-contracts':
      await grantRecompeteAccess(email, customerName);
      break;
  }
}

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    // Admin auth
    const expectedPassword = process.env.ADMIN_PASSWORD || 'admin123';
    if (password !== expectedPassword) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const liveKey = process.env.STRIPE_SECRET_KEY || '';
    const testKey = process.env.STRIPE_TEST_SECRET_KEY || '';

    const results: Array<{
      email: string;
      product: string | null;
      tier: string | null;
      bundle: string | null;
      amount: number;
      date: string;
      mode: string;
      status: string;
    }> = [];

    // Process both live and test mode
    for (const mode of ['live', 'test'] as const) {
      const key = mode === 'live' ? liveKey : testKey;
      if (!key) continue;

      const stripe = new Stripe(key);

      // Paginate through all completed checkout sessions
      let hasMore = true;
      let startingAfter: string | undefined;

      while (hasMore) {
        const params: Stripe.Checkout.SessionListParams = {
          limit: 100,
          status: 'complete',
        };
        if (startingAfter) params.starting_after = startingAfter;

        const sessions = await stripe.checkout.sessions.list(params);

        for (const session of sessions.data) {
          const customerEmail = session.customer_email || session.customer_details?.email;
          const customerName = session.customer_details?.name || undefined;
          const tier = session.metadata?.tier;
          const bundle = session.metadata?.bundle;

          if (!customerEmail) {
            results.push({
              email: 'NO EMAIL',
              product: null,
              tier: tier || null,
              bundle: bundle || null,
              amount: session.amount_total || 0,
              date: new Date(session.created * 1000).toISOString(),
              mode,
              status: 'skipped-no-email',
            });
            continue;
          }

          // Get line items to find Stripe product ID
          let stripeProductId: string | null = null;
          try {
            const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
              expand: ['data.price.product'],
            });
            lineItems.data.forEach((item) => {
              const product = item.price?.product;
              const pid = typeof product === 'string' ? product : product?.id;
              if (pid) stripeProductId = pid;
            });
          } catch {
            // Line items may not be available for very old sessions
          }

          // Resolve to our product ID
          const productId = stripeProductId ? STRIPE_TO_PRODUCT_ID[stripeProductId] : null;

          try {
            // 1. Record purchase in Supabase
            const supabase = getSupabase();
            if (supabase) {
              const { data: existing } = await supabase
                .from('purchases')
                .select('id')
                .eq('order_id', session.id)
                .limit(1);

              if (!existing || existing.length === 0) {
                await supabase.from('purchases').insert({
                  user_email: customerEmail.toLowerCase(),
                  product_id: productId || stripeProductId || 'unknown',
                  product_name: getProductName(productId || '') || 'Unknown Product',
                  order_id: session.id,
                  amount_paid: session.amount_total || 0,
                  status: 'completed',
                });
              }
            }

            // 2. Update user_profiles access flags
            await getOrCreateProfile(customerEmail, customerName);
            if (tier || bundle) {
              await updateAccessFlags(customerEmail, tier, bundle);
            }

            // 3. Grant Vercel KV access
            if (productId) {
              const isUltimate = productId === 'ultimate-govcon-bundle';
              const bundleIncludes = getBundleIncludes(productId);
              if (bundleIncludes.length > 0) {
                for (const included of bundleIncludes) {
                  await grantKVAccess(included, customerEmail, customerName, isUltimate);
                }
              } else {
                await grantKVAccess(productId, customerEmail, customerName);
              }
            }

            results.push({
              email: customerEmail,
              product: productId || stripeProductId || 'unknown',
              tier: tier || null,
              bundle: bundle || null,
              amount: session.amount_total || 0,
              date: new Date(session.created * 1000).toISOString(),
              mode,
              status: 'backfilled',
            });
          } catch (err) {
            results.push({
              email: customerEmail,
              product: productId || stripeProductId || 'unknown',
              tier: tier || null,
              bundle: bundle || null,
              amount: session.amount_total || 0,
              date: new Date(session.created * 1000).toISOString(),
              mode,
              status: `error: ${err instanceof Error ? err.message : 'unknown'}`,
            });
          }
        }

        hasMore = sessions.has_more;
        if (sessions.data.length > 0) {
          startingAfter = sessions.data[sessions.data.length - 1].id;
        }
      }
    }

    return NextResponse.json({
      success: true,
      total: results.length,
      backfilled: results.filter(r => r.status === 'backfilled').length,
      skipped: results.filter(r => r.status.startsWith('skipped')).length,
      errors: results.filter(r => r.status.startsWith('error')).length,
      results,
    });

  } catch (error) {
    console.error('Backfill error:', error);
    return NextResponse.json(
      { error: `Backfill failed: ${error instanceof Error ? error.message : 'unknown'}` },
      { status: 500 }
    );
  }
}
