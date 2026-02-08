import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const KNOWN_PRODUCT_IDS = [
  'contractor-database',
  'opportunity-hunter-pro',
  'market-assassin-standard',
  'market-assassin-premium',
  'ai-content-generator',
  'recompete-contracts',
  'govcon-starter-bundle',
  'pro-giant-bundle',
  'ultimate-govcon-bundle',
];

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

export async function POST(request: NextRequest) {
  try {
    const { password, dryRun } = await request.json();

    if (password !== (process.env.ADMIN_PASSWORD || 'admin123')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = getSupabase();
    if (!supabase) {
      return NextResponse.json({ error: 'No Supabase connection' }, { status: 500 });
    }

    // Get all purchases
    const { data: allPurchases, error: fetchError } = await supabase
      .from('purchases')
      .select('id, user_email, product_id, product_name, amount_paid, order_id');

    if (fetchError) {
      return NextResponse.json({ error: fetchError.message }, { status: 500 });
    }

    const toolPurchases = (allPurchases || []).filter(p => KNOWN_PRODUCT_IDS.includes(p.product_id));
    const nonToolPurchases = (allPurchases || []).filter(p => !KNOWN_PRODUCT_IDS.includes(p.product_id));

    if (dryRun) {
      return NextResponse.json({
        dryRun: true,
        total: allPurchases?.length || 0,
        keeping: toolPurchases.length,
        deleting: nonToolPurchases.length,
        toDelete: nonToolPurchases.map(p => ({
          id: p.id,
          email: p.user_email,
          product_id: p.product_id,
          product_name: p.product_name,
          amount: p.amount_paid,
        })),
        keeping_list: toolPurchases.map(p => ({
          email: p.user_email,
          product_id: p.product_id,
          product_name: p.product_name,
        })),
      });
    }

    // Delete non-tool purchases
    const idsToDelete = nonToolPurchases.map(p => p.id);
    let deleted = 0;

    if (idsToDelete.length > 0) {
      const { error: deleteError } = await supabase
        .from('purchases')
        .delete()
        .in('id', idsToDelete);

      if (deleteError) {
        return NextResponse.json({ error: `Delete failed: ${deleteError.message}` }, { status: 500 });
      }
      deleted = idsToDelete.length;
    }

    return NextResponse.json({
      success: true,
      total_before: allPurchases?.length || 0,
      deleted,
      remaining: toolPurchases.length,
    });

  } catch (error) {
    return NextResponse.json(
      { error: `Failed: ${error instanceof Error ? error.message : 'unknown'}` },
      { status: 500 }
    );
  }
}
