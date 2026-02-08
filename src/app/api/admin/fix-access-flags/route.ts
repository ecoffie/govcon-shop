import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { kv } from '@vercel/kv';
function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

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

async function grantKVForProduct(productId: string, email: string) {
  const e = email.toLowerCase();
  switch (productId) {
    case 'recompete-contracts':
      await kv.set(`recompete:${e}`, { email: e, createdAt: new Date().toISOString() });
      break;
    case 'contractor-database':
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

    // Debug: check user_profiles table state
    const { data: profileCount, error: countError } = await supabase
      .from('user_profiles')
      .select('email');

    const debugInfo = {
      profiles_found: profileCount?.length || 0,
      profiles_error: countError?.message || null,
      profile_emails: (profileCount || []).map((p: { email: string }) => p.email).slice(0, 10),
    };

    const testEmails = ['eric@govcongiants.com', 'evankoffdev@gmail.com', 'test@gmail.com'];
    const results: Array<{
      email: string;
      product: string;
      flags_set: string[];
      kv_fixed: boolean;
      profile_existed: boolean;
      update_error?: string;
      updated_rows?: number;
    }> = [];

    for (const purchase of (purchases || [])) {
      const email = purchase.user_email.toLowerCase();
      const productId = purchase.product_id;

      if (testEmails.includes(email)) continue;

      const flags = PRODUCT_FLAGS[productId];
      if (!flags) continue;

      // Step 1: Check if profile exists
      const { data: existing, error: lookupError } = await supabase
        .from('user_profiles')
        .select('id, email')
        .eq('email', email);

      const profileExisted = !!(existing && existing.length > 0);

      // Step 2: If no profile, create one with generated user_id
      if (!profileExisted) {
        const { error: insertError } = await supabase
          .from('user_profiles')
          .insert({
            user_id: generateUUID(),
            email,
            ...flags,
            updated_at: new Date().toISOString(),
          });

        if (insertError) {
          results.push({
            email,
            product: productId,
            flags_set: [],
            kv_fixed: false,
            profile_existed: false,
            update_error: `insert: ${insertError.message}`,
          });
          continue;
        }
      } else {
        // Step 3: Update existing profile
        const { data: updated, error: updateError } = await supabase
          .from('user_profiles')
          .update({ ...flags, updated_at: new Date().toISOString() })
          .eq('email', email)
          .select('id');

        if (updateError) {
          results.push({
            email,
            product: productId,
            flags_set: [],
            kv_fixed: false,
            profile_existed: true,
            update_error: `update: ${updateError.message}`,
            updated_rows: 0,
          });
          continue;
        }

        results.push({
          email,
          product: productId,
          flags_set: Object.keys(flags),
          kv_fixed: false,
          profile_existed: true,
          updated_rows: updated?.length || 0,
        });
      }

      // Step 4: Fix KV
      let kvFixed = false;
      try {
        await grantKVForProduct(productId, email);
        if (productId === 'ultimate-govcon-bundle') {
          await grantKVForProduct('recompete-contracts', email);
          await grantKVForProduct('contractor-database', email);
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
        // KV failed
      }

      // Update KV status in the last result
      const last = results[results.length - 1];
      if (last && last.email === email) {
        last.kv_fixed = kvFixed;
      } else {
        // Profile was just inserted (no result pushed yet for inserts)
        results.push({
          email,
          product: productId,
          flags_set: Object.keys(flags),
          kv_fixed: kvFixed,
          profile_existed: false,
        });
      }
    }

    const updateErrors = results.filter(r => r.update_error);

    return NextResponse.json({
      success: true,
      total: results.length,
      errors: updateErrors.length,
      debug: debugInfo,
      results,
    });

  } catch (error) {
    return NextResponse.json(
      { error: `Failed: ${error instanceof Error ? error.message : 'unknown'}` },
      { status: 500 }
    );
  }
}
