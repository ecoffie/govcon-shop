import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { kv } from '@vercel/kv';

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

// Product ID → Supabase flags to set
const PRODUCT_FLAGS: Record<string, Record<string, boolean>> = {
  'opportunity-hunter-pro': { access_hunter_pro: true },
  'contractor-database': { access_contractor_db: true },
  'recompete-contracts': { access_recompete: true },
  'market-assassin-standard': { access_assassin_standard: true },
  'market-assassin-premium': { access_assassin_premium: true, access_assassin_standard: true },
  'ai-content-generator': { access_content_standard: true },
  'govcon-starter-bundle': { access_hunter_pro: true, access_recompete: true, access_contractor_db: true },
  'pro-giant-bundle': { access_contractor_db: true, access_recompete: true, access_assassin_standard: true, access_content_standard: true },
  'ultimate-govcon-bundle': {
    access_content_standard: true,
    access_content_full_fix: true,
    access_contractor_db: true,
    access_recompete: true,
    access_assassin_standard: true,
    access_assassin_premium: true,
  },
};

// Product ID → KV grants needed
async function grantKVForProduct(productId: string, email: string) {
  const e = email.toLowerCase();
  switch (productId) {
    case 'recompete-contracts':
      await kv.set(`recompete:${e}`, { email: e, createdAt: new Date().toISOString() });
      break;
    case 'contractor-database':
      // Check if already has dbaccess
      if (!(await kv.get(`dbaccess:${e}`))) {
        const token = Math.random().toString(36).slice(2, 26);
        await kv.set(`dbtoken:${token}`, { token, email: e, createdAt: new Date().toISOString() });
        await kv.set(`dbaccess:${e}`, { token, createdAt: new Date().toISOString() });
      }
      break;
    case 'opportunity-hunter-pro':
      if (!(await kv.get(`ospro:${e}`))) {
        await kv.set(`ospro:${e}`, { email: e, createdAt: new Date().toISOString(), productId: 'opportunity-hunter-pro' });
      }
      break;
  }
}

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (password !== (process.env.ADMIN_PASSWORD || 'admin123')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = getSupabase();
    if (!supabase) {
      return NextResponse.json({ error: 'No Supabase connection' }, { status: 500 });
    }

    // Get all purchases
    const { data: purchases, error } = await supabase
      .from('purchases')
      .select('user_email, product_id');

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const testEmails = ['eric@govcongiants.com', 'evankoffdev@gmail.com', 'test@gmail.com'];
    const results: Array<{ email: string; product: string; flags_set: string[]; kv_fixed: boolean; supabase_error?: string }> = [];

    for (const purchase of (purchases || [])) {
      const email = purchase.user_email.toLowerCase();
      const productId = purchase.product_id;

      if (testEmails.includes(email)) continue;

      const flags = PRODUCT_FLAGS[productId];
      if (!flags) continue;

      // Upsert profile with flags — creates if missing, updates if exists
      const { error: upsertError } = await supabase
        .from('user_profiles')
        .upsert(
          {
            email,
            ...flags,
            access_hunter_pro: flags.access_hunter_pro || false,
            access_content_standard: flags.access_content_standard || false,
            access_content_full_fix: flags.access_content_full_fix || false,
            access_assassin_standard: flags.access_assassin_standard || false,
            access_assassin_premium: flags.access_assassin_premium || false,
            access_recompete: flags.access_recompete || false,
            access_contractor_db: flags.access_contractor_db || false,
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'email', ignoreDuplicates: false }
        );

      // Fix any missing KV access
      let kvFixed = false;
      try {
        await grantKVForProduct(productId, email);
        // For bundles, grant KV for all included products
        if (productId === 'ultimate-govcon-bundle') {
          await grantKVForProduct('recompete-contracts', email);
          await grantKVForProduct('contractor-database', email);
          // MA and contentgen should already be granted
        } else if (productId === 'govcon-starter-bundle') {
          await grantKVForProduct('opportunity-hunter-pro', email);
          await grantKVForProduct('recompete-contracts', email);
          await grantKVForProduct('contractor-database', email);
        } else if (productId === 'pro-giant-bundle') {
          await grantKVForProduct('contractor-database', email);
          await grantKVForProduct('recompete-contracts', email);
        }
        kvFixed = true;
      } catch {
        // KV grant failed but Supabase flags still set
      }

      results.push({
        email,
        product: productId,
        flags_set: Object.keys(flags),
        kv_fixed: kvFixed,
        supabase_error: upsertError?.message,
      });
    }

    return NextResponse.json({
      success: true,
      total: results.length,
      results,
    });

  } catch (error) {
    return NextResponse.json(
      { error: `Failed: ${error instanceof Error ? error.message : 'unknown'}` },
      { status: 500 }
    );
  }
}
