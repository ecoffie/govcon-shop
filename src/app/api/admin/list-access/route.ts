import { NextResponse } from 'next/server';
import { getAllMarketAssassinAccess, getAllContentGeneratorAccess, getAllRecompeteAccess, getAllDatabaseAccess } from '@/lib/access-codes';
import { kv } from '@vercel/kv';
import { createClient } from '@supabase/supabase-js';

// Admin endpoint to list all access records.
// Each source is fetched independently so one failing (e.g. KV not configured) doesn't break the whole page.
async function safeGet<T>(name: string, fn: () => Promise<T>): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    console.error(`[list-access] ${name} failed:`, err);
    return [] as T;
  }
}

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) return null;

  return createClient(url, key, {
    auth: { persistSession: false },
  });
}

export async function GET() {
  const [marketAssassin, opportunityScoutPro, contentGenerator, recompete, database, planner] = await Promise.all([
    safeGet('marketAssassin', getAllMarketAssassinAccess),
    safeGet('opportunityScoutPro', async () => {
      const osProEmails = (await kv.lrange('ospro:all', 0, -1)) as string[];
      if (!osProEmails?.length) return [];
      const out: unknown[] = [];
      for (const email of osProEmails) {
        const access = await kv.get(`ospro:${email}`);
        if (access) out.push(access);
      }
      return out;
    }),
    safeGet('contentGenerator', getAllContentGeneratorAccess),
    safeGet('recompete', getAllRecompeteAccess),
    safeGet('database', getAllDatabaseAccess),
    safeGet('planner', async () => {
      const supabase = getSupabase();
      if (!supabase) return [];

      const { data, error } = await supabase
        .from('leads')
        .select('email, name, email_verified, verified_at, created_at, resources_accessed')
        .contains('resources_accessed', ['planner'])
        .order('created_at', { ascending: false });

      if (error) {
        throw error;
      }

      return data.map((lead) => ({
        email: lead.email,
        name: lead.name,
        emailVerified: lead.email_verified,
        verifiedAt: lead.verified_at,
        createdAt: lead.created_at,
      }));
    }),
  ]);

  return NextResponse.json({
    marketAssassin,
    opportunityScoutPro,
    contentGenerator,
    recompete,
    database,
    planner,
  });
}
