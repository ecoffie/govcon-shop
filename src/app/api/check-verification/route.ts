import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase/client';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();
    const supabase = getSupabase();

    if (!supabase) {
      return NextResponse.json({ verified: false });
    }

    const { data: lead, error } = await supabase
      .from('leads')
      .select('email_verified, verified_at')
      .eq('email', normalizedEmail)
      .single();

    if (error || !lead) {
      return NextResponse.json({ verified: false });
    }

    return NextResponse.json({
      verified: lead.email_verified === true,
      verifiedAt: lead.verified_at,
    });
  } catch (error) {
    console.error('Check verification error:', error);
    return NextResponse.json({ verified: false });
  }
}
