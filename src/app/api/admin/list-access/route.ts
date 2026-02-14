import { NextResponse } from 'next/server';
import { getAllMarketAssassinAccess, getAllContentGeneratorAccess, getAllRecompeteAccess, getAllDatabaseAccess } from '@/lib/access-codes';
import { kv } from '@vercel/kv';

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

export async function GET() {
  const [marketAssassin, opportunityScoutPro, contentGenerator, recompete, database] = await Promise.all([
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
  ]);

  return NextResponse.json({
    marketAssassin,
    opportunityScoutPro,
    contentGenerator,
    recompete,
    database,
  });
}
