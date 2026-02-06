import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { getBundleIncludes, getProductName } from '@/lib/products';

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

// Check if a user has access to a specific product
export async function POST(request: NextRequest) {
  try {
    const { email, productId } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email required' },
        { status: 400 }
      );
    }

    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID required' },
        { status: 400 }
      );
    }

    const supabase = getSupabase();
    if (!supabase) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 500 }
      );
    }

    const { data: purchases, error } = await supabase
      .from('purchases')
      .select('product_id')
      .eq('user_email', email.toLowerCase())
      .eq('status', 'completed');

    if (error) {
      console.error('Error checking access:', error);
      return NextResponse.json(
        { error: 'Failed to verify access' },
        { status: 500 }
      );
    }

    if (!purchases || purchases.length === 0) {
      return NextResponse.json({ hasAccess: false, productId });
    }

    // Check direct purchase
    const hasDirectAccess = purchases.some(p => p.product_id === productId);
    if (hasDirectAccess) {
      return NextResponse.json({
        hasAccess: true,
        accessType: 'purchase',
        productId,
      });
    }

    // Check bundle access — does any purchased bundle include this product?
    for (const purchase of purchases) {
      const bundleIncludes = getBundleIncludes(purchase.product_id);
      if (bundleIncludes.includes(productId)) {
        return NextResponse.json({
          hasAccess: true,
          accessType: 'bundle',
          bundleId: purchase.product_id,
          productId,
        });
      }
    }

    return NextResponse.json({ hasAccess: false, productId });
  } catch (error) {
    console.error('Access verification error:', error);
    return NextResponse.json(
      { error: 'Verification failed' },
      { status: 500 }
    );
  }
}

// Get all products a user has access to
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { error: 'Email required' },
        { status: 400 }
      );
    }

    const supabase = getSupabase();
    if (!supabase) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 500 }
      );
    }

    const { data: purchases, error } = await supabase
      .from('purchases')
      .select('product_id, product_name, created_at')
      .eq('user_email', email.toLowerCase())
      .eq('status', 'completed');

    if (error) {
      console.error('Error fetching purchases:', error);
      return NextResponse.json(
        { error: 'Failed to fetch purchases' },
        { status: 500 }
      );
    }

    // Expand bundles into individual products
    const accessibleProducts: string[] = [];

    for (const purchase of purchases || []) {
      accessibleProducts.push(purchase.product_id);
      const bundleIncludes = getBundleIncludes(purchase.product_id);
      accessibleProducts.push(...bundleIncludes);
    }

    const uniqueProducts = [...new Set(accessibleProducts)];

    return NextResponse.json({
      email,
      purchases: purchases || [],
      accessibleProducts: uniqueProducts,
      productNames: uniqueProducts.map(id => getProductName(id)),
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch access' },
      { status: 500 }
    );
  }
}
