import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { activateLicenseKey, validateLicenseKey, PRODUCTS } from '@/lib/lemonsqueezy';

// Initialize Supabase client
function getSupabase() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase configuration missing');
  }

  return createClient(supabaseUrl, supabaseKey);
}

// Map product IDs to friendly names
function getProductName(productId: string): string {
  const productNames: Record<string, string> = {
    'ai-content-generator': 'AI Content Generator',
    'contractor-database': 'Contractor Database',
    'recompete-contracts': 'Recompete Contracts Database',
    'market-assassin-standard': 'Federal Market Assassin (Standard)',
    'market-assassin-premium': 'Federal Market Assassin (Premium)',
    'opportunity-hunter-pro': 'Opportunity Hunter Pro',
    'govcon-starter-bundle': 'GovCon Starter Bundle',
    'ultimate-govcon-bundle': 'Ultimate GovCon Bundle',
    'complete-govcon-bundle': 'Complete GovCon Bundle',
  };
  return productNames[productId] || productId;
}

export async function POST(request: NextRequest) {
  try {
    const { licenseKey, email } = await request.json();

    if (!licenseKey || !email) {
      return NextResponse.json(
        { error: 'License key and email are required' },
        { status: 400 }
      );
    }

    // First, try to validate the license with Lemon Squeezy
    const validation = await validateLicenseKey(licenseKey);

    if (!validation.valid) {
      return NextResponse.json(
        { error: 'Invalid license key. Please check and try again.' },
        { status: 400 }
      );
    }

    // Activate the license
    const activation = await activateLicenseKey(licenseKey, `web-${Date.now()}`);

    if (!activation.success) {
      // License might already be activated, which is fine
      console.log('License activation returned false - may already be activated');
    }

    const supabase = getSupabase();

    // Look up purchases by email and license key
    const { data: purchases, error: lookupError } = await supabase
      .from('purchases')
      .select('*')
      .eq('user_email', email.toLowerCase())
      .eq('status', 'completed');

    if (lookupError) {
      console.error('Error looking up purchases:', lookupError);
    }

    // If we found purchases, update them with the license key if not already set
    if (purchases && purchases.length > 0) {
      for (const purchase of purchases) {
        if (!purchase.license_key) {
          await supabase
            .from('purchases')
            .update({ license_key: licenseKey, activated_at: new Date().toISOString() })
            .eq('id', purchase.id);
        }
      }

      const productNames = purchases.map(p => getProductName(p.product_id));

      return NextResponse.json({
        success: true,
        message: 'Your license has been activated! You now have access to your tools.',
        products: productNames,
        email: email,
      });
    }

    // If no purchases found but license is valid, record the activation
    // This handles cases where webhook didn't fire or purchase was made differently
    const { error: insertError } = await supabase.from('purchases').insert({
      user_email: email.toLowerCase(),
      license_key: licenseKey,
      product_id: validation.productId || 'unknown',
      status: 'completed',
      activated_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
    });

    if (insertError) {
      console.error('Error recording activation:', insertError);
    }

    return NextResponse.json({
      success: true,
      message: 'Your license has been activated successfully!',
      products: [getProductName(validation.productId || 'your-product')],
      email: email,
    });

  } catch (error) {
    console.error('Activation error:', error);
    return NextResponse.json(
      { error: 'Failed to activate license. Please try again or contact support.' },
      { status: 500 }
    );
  }
}
