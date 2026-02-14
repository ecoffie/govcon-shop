import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { getProductName } from '@/lib/products';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

const _log = (msg: string, d: object) => {
  fetch('http://127.0.0.1:7242/ingest/630e181d-fcdb-4854-b1ec-e7f23188881f', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ location: 'purchases-report/route.ts', message: msg, data: d, timestamp: Date.now() }) }).catch(() => {});
};

export async function GET(request: NextRequest) {
  // #region agent log
  _log('API GET entry', { hasAdminHeader: !!request.headers.get('x-admin-password') });
  // #endregion
  const adminPassword = request.headers.get('x-admin-password');
  if (adminPassword !== ADMIN_PASSWORD) {
    // #region agent log
    _log('API auth failed', { expectedLen: (ADMIN_PASSWORD || '').length, gotLen: (adminPassword || '').length });
    // #endregion
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = getSupabase();
  // #region agent log
  _log('Supabase client', { hasSupabase: !!supabase, hasUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL, hasKey: !!process.env.SUPABASE_SERVICE_ROLE_KEY });
  // #endregion
  if (!supabase) {
    return NextResponse.json(
      { error: 'Database not configured' },
      { status: 500 }
    );
  }

  const { searchParams } = new URL(request.url);
  const days = parseInt(searchParams.get('days') || '14', 10);
  const daysClamp = Math.min(Math.max(days, 1), 90);

  const since = new Date();
  since.setDate(since.getDate() - daysClamp);
  const sinceIso = since.toISOString();

  try {
    const { data: purchases, error } = await supabase
      .from('purchases')
      .select('id, user_email, product_id, product_name, amount_paid, status, created_at')
      .gte('created_at', sinceIso)
      .order('created_at', { ascending: false });

    if (error) {
      // #region agent log
      _log('Supabase query error', { errorCode: error.code, errorMsg: error.message });
      // #endregion
      console.error('Purchases report error:', error);
      return NextResponse.json(
        { error: 'Failed to fetch purchases' },
        { status: 500 }
      );
    }

    // Only completed purchases for revenue
    const completed = (purchases || []).filter((p) => p.status === 'completed');

    // Aggregate by product
    const byProduct: Record<
      string,
      { count: number; revenue: number; displayName: string }
    > = {};

    for (const p of completed) {
      const pid = p.product_id || 'unknown';
      const name = p.product_name || getProductName(pid);
      if (!byProduct[pid]) {
        byProduct[pid] = { count: 0, revenue: 0, displayName: name };
      }
      byProduct[pid].count += 1;
      byProduct[pid].revenue += p.amount_paid || 0;
    }

    const summary = {
      totalPurchases: completed.length,
      totalRevenue: completed.reduce((sum, p) => sum + (p.amount_paid || 0), 0),
      refundedCount: (purchases || []).filter((p) => p.status === 'refunded').length,
    };

    const productBreakdown = Object.entries(byProduct).map(
      ([productId, data]) => ({
        productId,
        productName: data.displayName,
        count: data.count,
        revenue: data.revenue,
      })
    );

    // Sort by revenue desc
    productBreakdown.sort((a, b) => b.revenue - a.revenue);

    // #region agent log
    _log('API success', { purchaseCount: completed.length, productCount: productBreakdown.length, totalRevenue: summary.totalRevenue });
    // #endregion
    return NextResponse.json({
      days: daysClamp,
      since: sinceIso,
      summary,
      byProduct: productBreakdown,
      purchases: completed.map((p) => ({
        id: p.id,
        email: p.user_email,
        productId: p.product_id,
        productName: p.product_name || getProductName(p.product_id || ''),
        amountPaid: p.amount_paid,
        createdAt: p.created_at,
      })),
    });
  } catch (err) {
    // #region agent log
    _log('API catch error', { errMsg: err instanceof Error ? err.message : String(err) });
    // #endregion
    console.error('Purchases report error:', err);
    return NextResponse.json(
      { error: 'Failed to generate report' },
      { status: 500 }
    );
  }
}
