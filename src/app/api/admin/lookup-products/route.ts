import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// One-off admin endpoint to look up Stripe product names by ID
export async function POST(request: NextRequest) {
  const { password, productIds } = await request.json();

  if (password !== (process.env.ADMIN_PASSWORD || 'admin123')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '');
  const results: Array<{ id: string; name: string; description: string | null }> = [];

  for (const id of productIds) {
    try {
      const product = await stripe.products.retrieve(id);
      results.push({ id, name: product.name, description: product.description });
    } catch {
      results.push({ id, name: 'NOT FOUND', description: null });
    }
  }

  return NextResponse.json({ results });
}
