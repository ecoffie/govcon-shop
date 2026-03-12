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

// Note: hasBriefingAccess is in market-assassin project, not here
// Briefings are checked via user_profiles table instead

// Tool definitions with URLs (tools are on tools.govcongiants.org)
const TOOLS_BASE = 'https://tools.govcongiants.org';

interface ToolInfo {
  name: string;
  url: string;
  key: string;
}

const ACCESS_FLAG_TO_TOOL: Record<string, ToolInfo> = {
  access_hunter_pro: { name: 'Opportunity Hunter Pro', url: `${TOOLS_BASE}/opportunity-hunter`, key: 'access_hunter_pro' },
  access_content_standard: { name: 'Content Reaper', url: `${TOOLS_BASE}/content-generator`, key: 'access_content_standard' },
  access_content_full_fix: { name: 'Content Reaper (Full Fix)', url: `${TOOLS_BASE}/content-generator`, key: 'access_content_full_fix' },
  access_assassin_standard: { name: 'Federal Market Assassin', url: `${TOOLS_BASE}/market-assassin`, key: 'access_assassin_standard' },
  access_assassin_premium: { name: 'Federal Market Assassin (Premium)', url: `${TOOLS_BASE}/market-assassin`, key: 'access_assassin_premium' },
  access_recompete: { name: 'Recompete Tracker', url: `${TOOLS_BASE}/recompete`, key: 'access_recompete' },
  access_contractor_db: { name: 'Federal Contractor Database', url: `${TOOLS_BASE}/contractor-database`, key: 'access_contractor_db' },
  access_briefings: { name: 'Daily Briefings', url: `${TOOLS_BASE}/briefings`, key: 'access_briefings' },
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
    const tools: ToolInfo[] = [];

    // Primary: check Supabase user_profiles flags
    const profile = await getProfileByEmail(normalizedEmail);

    if (profile) {
      for (const [flag, toolInfo] of Object.entries(ACCESS_FLAG_TO_TOOL)) {
        if (profile[flag as keyof typeof profile] === true) {
          // Skip standard if premium exists (avoid duplicates)
          if (flag === 'access_assassin_standard' && profile.access_assassin_premium) continue;
          if (flag === 'access_content_standard' && profile.access_content_full_fix) continue;
          tools.push(toolInfo);
        }
      }
    }

    // Fallback: check Vercel KV access (covers customers without user_profiles rows)
    if (tools.length === 0) {
      const [ospro, contentgen, ma, recompete, db] = await Promise.all([
        hasOpportunityHunterProAccess(normalizedEmail),
        hasContentGeneratorAccess(normalizedEmail),
        hasMarketAssassinAccess(normalizedEmail),
        hasRecompeteAccess(normalizedEmail),
        hasEmailDatabaseAccess(normalizedEmail),
      ]);

      if (ospro) tools.push(ACCESS_FLAG_TO_TOOL.access_hunter_pro);

      if (contentgen) {
        const cgAccess = await getContentGeneratorAccess(normalizedEmail);
        if (cgAccess?.tier === 'full-fix') {
          tools.push(ACCESS_FLAG_TO_TOOL.access_content_full_fix);
        } else {
          tools.push(ACCESS_FLAG_TO_TOOL.access_content_standard);
        }
      }

      if (ma) {
        const maAccess = await getMarketAssassinAccess(normalizedEmail);
        if (maAccess?.tier === 'premium') {
          tools.push(ACCESS_FLAG_TO_TOOL.access_assassin_premium);
        } else {
          tools.push(ACCESS_FLAG_TO_TOOL.access_assassin_standard);
        }
      }

      if (recompete) tools.push(ACCESS_FLAG_TO_TOOL.access_recompete);
      if (db) tools.push(ACCESS_FLAG_TO_TOOL.access_contractor_db);
      // Note: briefings checked via user_profiles only (KV key is in market-assassin project)
    }

    if (tools.length === 0) {
      return NextResponse.json(
        { error: 'No account found for this email. Please use the same email you used at checkout.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Your tools are activated! You have access to the following products.',
      tools,
      // Keep products array for backwards compatibility
      products: tools.map(t => t.name),
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
