import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { getOrCreateProfile } from '@/lib/supabase/user-profiles';

function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) return null;

  return createClient(url, key, {
    auth: { persistSession: false },
  });
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export async function POST(request: NextRequest) {
  try {
    const { email, name, emailConfirmed } = await request.json();

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ success: false, error: 'Email is required' }, { status: 400 });
    }

    const supabase = getAdminClient();

    if (!supabase) {
      return NextResponse.json(
        { success: false, error: 'Supabase admin client not configured' },
        { status: 500 }
      );
    }

    const normalizedEmail = normalizeEmail(email);
    const trimmedName = typeof name === 'string' && name.trim() ? name.trim() : null;

    const profile = await getOrCreateProfile(normalizedEmail, trimmedName ?? undefined);

    if (!profile) {
      return NextResponse.json(
        { success: false, error: 'Failed to create or load user profile' },
        { status: 500 }
      );
    }

    if (trimmedName && profile.name !== trimmedName) {
      await supabase
        .from('user_profiles')
        .update({
          name: trimmedName,
          updated_at: new Date().toISOString(),
        })
        .eq('email', normalizedEmail);
    }

    const { data: existingLead, error: leadFetchError } = await supabase
      .from('leads')
      .select('email, name, source, resources_accessed, email_verified, verified_at')
      .eq('email', normalizedEmail)
      .maybeSingle();

    if (leadFetchError) {
      console.error('Error fetching planner lead:', leadFetchError);
      return NextResponse.json(
        { success: false, error: 'Failed to load planner lead' },
        { status: 500 }
      );
    }

    const plannerResourceId = 'planner';
    const existingResources = existingLead?.resources_accessed ?? [];
    const resourcesAccessed = existingResources.includes(plannerResourceId)
      ? existingResources
      : [...existingResources, plannerResourceId];

    const leadPayload = {
      email: normalizedEmail,
      name: trimmedName ?? existingLead?.name ?? null,
      source: existingLead?.source ?? plannerResourceId,
      resources_accessed: resourcesAccessed,
      email_verified: Boolean(emailConfirmed) || Boolean(existingLead?.email_verified),
      verified_at:
        emailConfirmed && !existingLead?.verified_at
          ? new Date().toISOString()
          : existingLead?.verified_at ?? null,
      updated_at: new Date().toISOString(),
    };

    if (existingLead) {
      const { error: updateError } = await supabase
        .from('leads')
        .update(leadPayload)
        .eq('email', normalizedEmail);

      if (updateError) {
        console.error('Error updating planner lead:', updateError);
        return NextResponse.json(
          { success: false, error: 'Failed to update planner lead' },
          { status: 500 }
        );
      }
    } else {
      const { error: insertError } = await supabase.from('leads').insert({
        ...leadPayload,
        created_at: new Date().toISOString(),
      });

      if (insertError) {
        console.error('Error creating planner lead:', insertError);
        return NextResponse.json(
          { success: false, error: 'Failed to create planner lead' },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Planner registration sync failed:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to sync planner registration' },
      { status: 500 }
    );
  }
}
