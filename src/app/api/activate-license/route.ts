import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { getProductName, getBundleIncludes } from '@/lib/products';

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key);
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
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

    const normalizedEmail = email.trim().toLowerCase();

    // Look up all completed purchases for this email
    const { data: purchases, error } = await supabase
      .from('purchases')
      .select('product_id, product_name, created_at')
      .eq('user_email', normalizedEmail)
      .eq('status', 'completed');

    if (error) {
      console.error('Error looking up purchases:', error);
      return NextResponse.json(
        { error: 'Failed to look up purchases' },
        { status: 500 }
      );
    }

    if (!purchases || purchases.length === 0) {
      return NextResponse.json(
        { error: 'No purchases found for this email. Please use the same email you used at checkout.' },
        { status: 404 }
      );
    }

    // Build list of accessible products (expand bundles)
    const productSet = new Set<string>();

    for (const purchase of purchases) {
      productSet.add(purchase.product_id);

      // If it's a bundle, add included products
      const bundleIncludes = getBundleIncludes(purchase.product_id);
      for (const included of bundleIncludes) {
        productSet.add(included);
      }
    }

    // Convert to friendly names
    const products = Array.from(productSet).map(id => getProductName(id));

    return NextResponse.json({
      success: true,
      message: 'Your tools are activated! You have access to the following products.',
      products,
      email: normalizedEmail,
    });

  } catch (error) {
    console.error('Activation error:', error);
    return NextResponse.json(
      { error: 'Failed to look up your access. Please try again or contact support at service@govcongiants.com' },
      { status: 500 }
    );
  }
}
