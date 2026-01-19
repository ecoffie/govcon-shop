import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase/client';

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json(
        { error: 'Verification token is required' },
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

    // Find lead with this verification token
    const { data: lead, error: fetchError } = await supabase
      .from('leads')
      .select('*')
      .eq('verification_token', token)
      .single();

    if (fetchError || !lead) {
      return NextResponse.json(
        { error: 'Invalid or expired verification link' },
        { status: 400 }
      );
    }

    // Check if token has expired (24 hours)
    if (lead.verification_sent_at) {
      const sentAt = new Date(lead.verification_sent_at);
      const now = new Date();
      const hoursDiff = (now.getTime() - sentAt.getTime()) / (1000 * 60 * 60);

      if (hoursDiff > 24) {
        return NextResponse.json(
          { error: 'Verification link has expired. Please request a new one.' },
          { status: 400 }
        );
      }
    }

    // Mark email as verified
    const { error: updateError } = await supabase
      .from('leads')
      .update({
        email_verified: true,
        verified_at: new Date().toISOString(),
        verification_token: null, // Clear token after use
      })
      .eq('id', lead.id);

    if (updateError) {
      console.error('Error verifying email:', updateError);
      return NextResponse.json(
        { error: 'Failed to verify email' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      email: lead.email,
      message: 'Email verified successfully!',
    });
  } catch (error) {
    console.error('Verification error:', error);
    return NextResponse.json(
      { error: 'Failed to process verification' },
      { status: 500 }
    );
  }
}

// Also support GET for direct link clicks
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');

  if (!token) {
    return NextResponse.json(
      { error: 'Verification token is required' },
      { status: 400 }
    );
  }

  // Redirect to the verification page with the token
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://shop.govcongiants.org';
  return NextResponse.redirect(`${baseUrl}/verify-email?token=${token}`);
}
