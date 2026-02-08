import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { kv } from '@vercel/kv';

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

// What KV keys each product should have
const PRODUCT_KV_KEYS: Record<string, string[]> = {
  'opportunity-hunter-pro': ['ospro'],
  'contractor-database': ['dbaccess'],
  'recompete-contracts': ['recompete'],
  'market-assassin-standard': ['ma'],
  'market-assassin-premium': ['ma'],
  'ai-content-generator': ['contentgen'],
  'govcon-starter-bundle': ['ospro', 'recompete', 'dbaccess'],
  'pro-giant-bundle': ['dbaccess', 'recompete', 'ma', 'contentgen'],
  'ultimate-govcon-bundle': ['contentgen', 'dbaccess', 'recompete', 'ma'],
};

// What Supabase flags each product should have
const PRODUCT_FLAGS: Record<string, string[]> = {
  'opportunity-hunter-pro': ['access_hunter_pro'],
  'contractor-database': ['access_contractor_db'],
  'recompete-contracts': ['access_recompete'],
  'market-assassin-standard': ['access_assassin_standard'],
  'market-assassin-premium': ['access_assassin_premium', 'access_assassin_standard'],
  'ai-content-generator': ['access_content_standard'],
  'govcon-starter-bundle': ['access_hunter_pro', 'access_recompete', 'access_contractor_db'],
  'pro-giant-bundle': ['access_contractor_db', 'access_recompete', 'access_assassin_standard', 'access_content_standard'],
  'ultimate-govcon-bundle': ['access_content_standard', 'access_content_full_fix', 'access_contractor_db', 'access_recompete', 'access_assassin_standard', 'access_assassin_premium'],
};

interface CustomerResult {
  email: string;
  product: string;
  kv: Record<string, boolean>;
  supabase: Record<string, boolean>;
  kv_ok: boolean;
  supabase_ok: boolean;
  all_ok: boolean;
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

    // Get all purchases (only tool purchases after cleanup)
    const { data: purchases, error } = await supabase
      .from('purchases')
      .select('user_email, product_id');

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Test emails to skip
    const testEmails = ['eric@govcongiants.com', 'evankoffdev@gmail.com', 'test@gmail.com', 'test1@gmail.com', 'test2@gmail.com'];

    const results: CustomerResult[] = [];

    for (const purchase of (purchases || [])) {
      const email = purchase.user_email.toLowerCase();
      const productId = purchase.product_id;

      if (testEmails.includes(email)) continue;

      const expectedKV = PRODUCT_KV_KEYS[productId] || [];
      const expectedFlags = PRODUCT_FLAGS[productId] || [];

      // Check KV keys
      const kvResults: Record<string, boolean> = {};
      for (const key of expectedKV) {
        const value = await kv.get(`${key}:${email}`);
        kvResults[`${key}:${email}`] = !!value;
      }

      // Check Supabase user_profiles
      const { data: profile } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('email', email)
        .single();

      const flagResults: Record<string, boolean> = {};
      for (const flag of expectedFlags) {
        flagResults[flag] = profile ? profile[flag] === true : false;
      }

      const kvOk = Object.values(kvResults).every(v => v);
      const supabaseOk = Object.values(flagResults).every(v => v);

      results.push({
        email,
        product: productId,
        kv: kvResults,
        supabase: flagResults,
        kv_ok: kvOk,
        supabase_ok: supabaseOk,
        all_ok: kvOk && supabaseOk,
      });
    }

    const allOk = results.filter(r => r.all_ok);
    const issues = results.filter(r => !r.all_ok);

    return NextResponse.json({
      total: results.length,
      all_ok: issues.length === 0,
      passing: allOk.length,
      failing: issues.length,
      issues: issues.map(r => ({
        email: r.email,
        product: r.product,
        kv_ok: r.kv_ok,
        supabase_ok: r.supabase_ok,
        missing_kv: Object.entries(r.kv).filter(([, v]) => !v).map(([k]) => k),
        missing_flags: Object.entries(r.supabase).filter(([, v]) => !v).map(([k]) => k),
      })),
      all_results: results,
    });

  } catch (error) {
    return NextResponse.json(
      { error: `Failed: ${error instanceof Error ? error.message : 'unknown'}` },
      { status: 500 }
    );
  }
}
