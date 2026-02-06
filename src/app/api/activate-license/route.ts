import { NextRequest, NextResponse } from 'next/server';
import { getProfileByEmail } from '@/lib/supabase/user-profiles';

// Map access flags to friendly product names
const ACCESS_FLAG_NAMES: Record<string, string> = {
  access_hunter_pro: 'Opportunity Hunter Pro',
  access_content_standard: 'GovCon Content Generator',
  access_content_full_fix: 'GovCon Content Generator (Full Fix)',
  access_assassin_standard: 'Federal Market Assassin (Standard)',
  access_assassin_premium: 'Federal Market Assassin (Premium)',
  access_recompete: 'Recompete Contracts Tracker',
  access_contractor_db: 'Federal Contractor Database',
};

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Look up user profile with access flags
    const profile = await getProfileByEmail(normalizedEmail);

    if (!profile) {
      return NextResponse.json(
        { error: 'No account found for this email. Please use the same email you used at checkout.' },
        { status: 404 }
      );
    }

    // Collect all products this user has access to
    const products: string[] = [];

    for (const [flag, name] of Object.entries(ACCESS_FLAG_NAMES)) {
      if (profile[flag as keyof typeof profile] === true) {
        // Skip standard if they have premium (avoid showing both)
        if (flag === 'access_assassin_standard' && profile.access_assassin_premium) continue;
        if (flag === 'access_content_standard' && profile.access_content_full_fix) continue;
        products.push(name);
      }
    }

    if (products.length === 0) {
      return NextResponse.json(
        { error: 'No active products found for this email. If you just purchased, it may take a moment to activate.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Your tools are activated! You have access to the following products.',
      products,
      email: normalizedEmail,
      licenseKey: profile.license_key || undefined,
    });

  } catch (error) {
    console.error('Activation error:', error);
    return NextResponse.json(
      { error: 'Failed to look up your access. Please try again or contact support at service@govcongiants.com' },
      { status: 500 }
    );
  }
}
