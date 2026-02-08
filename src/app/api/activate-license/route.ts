import { NextRequest, NextResponse } from 'next/server';
import { getProfileByEmail } from '@/lib/supabase/user-profiles';
import {
  hasOpportunityHunterProAccess,
  hasContentGeneratorAccess,
  getContentGeneratorAccess,
  hasMarketAssassinAccess,
  getMarketAssassinAccess,
  hasRecompeteAccess,
  hasEmailDatabaseAccess,
} from '@/lib/access-codes';

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
    const products: string[] = [];

    // Primary: check Supabase user_profiles flags
    const profile = await getProfileByEmail(normalizedEmail);

    if (profile) {
      for (const [flag, name] of Object.entries(ACCESS_FLAG_NAMES)) {
        if (profile[flag as keyof typeof profile] === true) {
          if (flag === 'access_assassin_standard' && profile.access_assassin_premium) continue;
          if (flag === 'access_content_standard' && profile.access_content_full_fix) continue;
          products.push(name);
        }
      }
    }

    // Fallback: check Vercel KV access (covers customers without user_profiles rows)
    if (products.length === 0) {
      const [ospro, contentgen, ma, recompete, db] = await Promise.all([
        hasOpportunityHunterProAccess(normalizedEmail),
        hasContentGeneratorAccess(normalizedEmail),
        hasMarketAssassinAccess(normalizedEmail),
        hasRecompeteAccess(normalizedEmail),
        hasEmailDatabaseAccess(normalizedEmail),
      ]);

      if (ospro) products.push('Opportunity Hunter Pro');

      if (contentgen) {
        const cgAccess = await getContentGeneratorAccess(normalizedEmail);
        if (cgAccess?.tier === 'full-fix') {
          products.push('GovCon Content Generator (Full Fix)');
        } else {
          products.push('GovCon Content Generator');
        }
      }

      if (ma) {
        const maAccess = await getMarketAssassinAccess(normalizedEmail);
        if (maAccess?.tier === 'premium') {
          products.push('Federal Market Assassin (Premium)');
        } else {
          products.push('Federal Market Assassin (Standard)');
        }
      }

      if (recompete) products.push('Recompete Contracts Tracker');
      if (db) products.push('Federal Contractor Database');
    }

    if (products.length === 0) {
      return NextResponse.json(
        { error: 'No account found for this email. Please use the same email you used at checkout.' },
        { status: 404 }
      );
    }

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
