import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase/client';
import { sendFreeResourceVerificationEmail } from '@/lib/send-email';
import crypto from 'crypto';

// Generate a secure verification token
function generateVerificationToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

export async function POST(request: NextRequest) {
  try {
    const { email, source } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const normalizedEmail = email.toLowerCase().trim();
    const supabase = getSupabase();

    if (!supabase) {
      return NextResponse.json(
        { error: 'Database not configured' },
        { status: 500 }
      );
    }

    // Check if email already exists and is verified
    const { data: existingLead, error: fetchError } = await supabase
      .from('leads')
      .select('*')
      .eq('email', normalizedEmail)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      console.error('Error checking lead:', fetchError);
    }

    // If already verified, redirect to resources
    if (existingLead?.email_verified) {
      return NextResponse.json({
        success: true,
        alreadyVerified: true,
        message: 'Email already verified. Redirecting to resources.',
      });
    }

    // Generate new verification token
    const verificationToken = generateVerificationToken();
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://shop.govcongiants.org';
    const verificationLink = `${baseUrl}/verify-email?token=${verificationToken}`;

    if (existingLead) {
      // Update existing lead with new verification token
      const { error: updateError } = await supabase
        .from('leads')
        .update({
          verification_token: verificationToken,
          verification_sent_at: new Date().toISOString(),
          source: source || existingLead.source,
        })
        .eq('email', normalizedEmail);

      if (updateError) {
        console.error('Error updating lead:', updateError);
        return NextResponse.json(
          { error: 'Failed to update verification' },
          { status: 500 }
        );
      }
    } else {
      // Create new lead with verification token
      const { error: insertError } = await supabase.from('leads').insert({
        email: normalizedEmail,
        source: source || 'free-resources',
        verification_token: verificationToken,
        verification_sent_at: new Date().toISOString(),
        email_verified: false,
        resources_accessed: [],
      });

      if (insertError) {
        console.error('Error creating lead:', insertError);
        return NextResponse.json(
          { error: 'Failed to create verification' },
          { status: 500 }
        );
      }
    }

    // Send verification email
    const emailSent = await sendFreeResourceVerificationEmail({
      to: normalizedEmail,
      verificationLink,
    });

    if (!emailSent) {
      return NextResponse.json(
        { error: 'Failed to send verification email. Please try again.' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Verification email sent! Check your inbox.',
    });
  } catch (error) {
    console.error('Verification request error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
