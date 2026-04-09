'use client';

import type { User } from '@supabase/supabase-js';

function getUserFullName(user: User): string | null {
  const rawName = user.user_metadata?.full_name || user.user_metadata?.name;
  if (typeof rawName !== 'string') return null;

  const trimmedName = rawName.trim();
  return trimmedName.length > 0 ? trimmedName : null;
}

export async function syncPlannerRegistration(user: User): Promise<void> {
  const normalizedEmail = user.email?.trim().toLowerCase();

  if (!normalizedEmail) return;

  try {
    await fetch('/api/planner/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: normalizedEmail,
        name: getUserFullName(user),
        emailConfirmed: Boolean(user.email_confirmed_at),
      }),
    });
  } catch (error) {
    console.error('Failed to sync planner registration:', error);
  }
}
