import { NextRequest, NextResponse } from 'next/server';
import {
  hasMarketAssassinAccess,
  getMarketAssassinAccess,
  hasEmailDatabaseAccess,
  hasOpportunityHunterProAccess,
  hasContentGeneratorAccess,
  getContentGeneratorAccess,
  hasRecompeteAccess,
} from '@/lib/access-codes';

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

    // Check all products in Vercel KV by email
    const [
      maAccess,
      dbAccess,
      hunterAccess,
      contentAccess,
      recompeteAccess,
    ] = await Promise.all([
      getMarketAssassinAccess(normalizedEmail),
      hasEmailDatabaseAccess(normalizedEmail),
      hasOpportunityHunterProAccess(normalizedEmail),
      getContentGeneratorAccess(normalizedEmail),
      hasRecompeteAccess(normalizedEmail),
    ]);

    const products: string[] = [];

    if (maAccess) {
      const tierLabel = maAccess.tier === 'premium' ? 'Premium' : 'Standard';
      products.push(`Federal Market Assassin (${tierLabel})`);
    }
    if (dbAccess) {
      products.push('Federal Contractor Database');
    }
    if (hunterAccess) {
      products.push('Opportunity Hunter Pro');
    }
    if (contentAccess) {
      const tierLabel = contentAccess.tier === 'full-fix' ? 'Full Fix' : 'Content Engine';
      products.push(`GovCon Content Generator (${tierLabel})`);
    }
    if (recompeteAccess) {
      products.push('Recompete Contracts Tracker');
    }

    if (products.length === 0) {
      return NextResponse.json(
        { error: 'No purchases found for this email. Please use the same email you used at checkout.' },
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
