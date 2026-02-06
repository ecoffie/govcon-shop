import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

function getAdminClient() {
  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Supabase credentials not configured');
    return null;
  }
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: { persistSession: false }
  });
}

export interface UserProfile {
  id: string;
  email: string;
  name?: string;
  stripe_customer_id?: string;
  access_hunter_pro: boolean;
  access_content_standard: boolean;
  access_content_full_fix: boolean;
  access_assassin_standard: boolean;
  access_assassin_premium: boolean;
  access_recompete: boolean;
  access_contractor_db: boolean;
  license_key?: string;
  license_activated_at?: string;
  bundle?: string;
  created_at: string;
  updated_at: string;
}

export type ProductAccessFlag =
  | 'access_hunter_pro'
  | 'access_content_standard'
  | 'access_content_full_fix'
  | 'access_assassin_standard'
  | 'access_assassin_premium'
  | 'access_recompete'
  | 'access_contractor_db';

// Generate a license key in format XXXX-XXXX-XXXX-XXXX
export function generateLicenseKey(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const segments: string[] = [];
  for (let i = 0; i < 4; i++) {
    let segment = '';
    for (let j = 0; j < 4; j++) {
      segment += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    segments.push(segment);
  }
  return segments.join('-');
}

// Get or create a user profile by email
export async function getOrCreateProfile(email: string, name?: string): Promise<UserProfile | null> {
  const supabase = getAdminClient();
  if (!supabase) return null;

  const normalizedEmail = email.toLowerCase().trim();

  const { data: existing, error: fetchError } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('email', normalizedEmail)
    .single();

  if (existing && !fetchError) {
    return existing as UserProfile;
  }

  const licenseKey = generateLicenseKey();

  const { data: newProfile, error: insertError } = await supabase
    .from('user_profiles')
    .insert({
      email: normalizedEmail,
      name: name || null,
      license_key: licenseKey,
      access_hunter_pro: false,
      access_content_standard: false,
      access_content_full_fix: false,
      access_assassin_standard: false,
      access_assassin_premium: false,
      access_recompete: false,
      access_contractor_db: false,
    })
    .select()
    .single();

  if (insertError) {
    console.error('Error creating user profile:', insertError);
    return null;
  }

  console.log(`Created new user profile for ${normalizedEmail} with license key ${licenseKey}`);
  return newProfile as UserProfile;
}

// Get user profile by email
export async function getProfileByEmail(email: string): Promise<UserProfile | null> {
  const supabase = getAdminClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('email', email.toLowerCase().trim())
    .single();

  if (error) {
    if (error.code !== 'PGRST116') {
      console.error('Error fetching profile:', error);
    }
    return null;
  }

  return data as UserProfile;
}

// Update access flags based on tier and/or bundle from Stripe metadata
export async function updateAccessFlags(
  email: string,
  tier?: string,
  bundle?: string
): Promise<Record<string, boolean>> {
  const supabase = getAdminClient();
  if (!supabase) return {};

  const normalizedEmail = email.toLowerCase().trim();
  const updates: Record<string, boolean> = {};

  // Bundle access grants
  if (bundle) {
    if (bundle === 'starter' || bundle === 'govcon-starter-bundle') {
      updates.access_hunter_pro = true;
      updates.access_recompete = true;
      updates.access_contractor_db = true;
    } else if (bundle === 'pro' || bundle === 'pro-giant-bundle') {
      updates.access_contractor_db = true;
      updates.access_recompete = true;
      updates.access_assassin_standard = true;
      updates.access_content_standard = true;
    } else if (bundle === 'ultimate' || bundle === 'ultimate-govcon-bundle' || bundle === 'complete') {
      updates.access_content_standard = true;
      updates.access_content_full_fix = true;
      updates.access_contractor_db = true;
      updates.access_recompete = true;
      updates.access_assassin_standard = true;
      updates.access_assassin_premium = true;
    }
  } else if (tier) {
    if (tier === 'hunter_pro') updates.access_hunter_pro = true;
    if (tier === 'content_standard') updates.access_content_standard = true;
    if (tier === 'content_full_fix') {
      updates.access_content_full_fix = true;
      updates.access_content_standard = true;
    }
    if (tier === 'assassin_standard') updates.access_assassin_standard = true;
    if (tier === 'assassin_premium') {
      updates.access_assassin_premium = true;
      updates.access_assassin_standard = true;
    }
    if (tier === 'recompete') updates.access_recompete = true;
    if (tier === 'contractor_db') updates.access_contractor_db = true;
    if (tier === 'assassin_premium_upgrade') {
      updates.access_assassin_premium = true;
      updates.access_assassin_standard = true;
    }
    if (tier === 'content_full_fix_upgrade') {
      updates.access_content_full_fix = true;
      updates.access_content_standard = true;
    }
  }

  if (Object.keys(updates).length === 0) return {};

  // Ensure profile exists
  await getOrCreateProfile(normalizedEmail);

  const { error } = await supabase
    .from('user_profiles')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('email', normalizedEmail);

  if (error) {
    console.error('Error updating access flags:', error);
    return {};
  }

  console.log(`Updated access flags for ${normalizedEmail}:`, Object.keys(updates));
  return updates;
}

// Check if user has access to a specific product
export async function hasAccess(email: string, accessFlag: ProductAccessFlag): Promise<boolean> {
  const profile = await getProfileByEmail(email);
  if (!profile) return false;
  return profile[accessFlag] === true;
}
