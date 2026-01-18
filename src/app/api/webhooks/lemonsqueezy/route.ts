import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { verifyWebhookSignature, parseWebhookPayload, PRODUCTS } from '@/lib/lemonsqueezy';

// Initialize Supabase client with service role for webhook operations
function getSupabase() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase configuration missing');
  }

  return createClient(supabaseUrl, supabaseKey);
}

// Map variant IDs to product IDs
function getProductIdFromVariant(variantId: number): string {
  for (const product of Object.values(PRODUCTS)) {
    if (product.variantId === variantId.toString()) {
      return product.id;
    }
    // Check for additional variant IDs (like AI Content Generator has two)
    if ('variantIdFullFix' in product && product.variantIdFullFix === variantId.toString()) {
      return product.id;
    }
  }
  return `variant-${variantId}`;
}

// Get products included in a bundle
function getBundleProducts(productId: string): string[] {
  for (const product of Object.values(PRODUCTS)) {
    if (product.id === productId && 'includes' in product) {
      return product.includes as string[];
    }
  }
  return [productId];
}

export async function POST(request: NextRequest) {
  try {
    // Get raw body for signature verification
    const rawBody = await request.text();

    // Get signature from headers
    const signature = request.headers.get('x-signature');

    if (!signature) {
      console.error('Webhook: Missing signature');
      return NextResponse.json({ error: 'Missing signature' }, { status: 401 });
    }

    // Verify signature
    const webhookSecret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;
    if (!webhookSecret) {
      console.error('Webhook: LEMONSQUEEZY_WEBHOOK_SECRET not configured');
      return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 });
    }

    const isValid = verifyWebhookSignature(rawBody, signature, webhookSecret);
    if (!isValid) {
      console.error('Webhook: Invalid signature');
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    // Parse the webhook payload
    const payload = parseWebhookPayload(rawBody);
    const eventName = payload.meta.event_name;
    const attributes = payload.data.attributes;

    console.log(`Webhook received: ${eventName}`, {
      orderId: attributes.order_id,
      email: attributes.user_email,
      productId: attributes.product_id,
    });

    const supabase = getSupabase();

    // Handle different event types
    switch (eventName) {
      case 'order_created': {
        // Record the purchase
        const productId = getProductIdFromVariant(attributes.variant_id);
        const bundleProducts = getBundleProducts(productId);

        // Insert a purchase record for each product in the order
        // (handles bundles by creating records for each included product)
        for (const pid of bundleProducts) {
          const { error } = await supabase.from('purchases').insert({
            user_email: attributes.user_email.toLowerCase(),
            product_id: pid,
            product_name: attributes.first_order_item?.product_name || productId,
            order_id: attributes.order_id?.toString(),
            amount_paid: attributes.total || 0,
            status: 'completed',
            created_at: new Date().toISOString(),
          });

          if (error) {
            console.error(`Error inserting purchase for ${pid}:`, error);
          } else {
            console.log(`Purchase recorded for ${pid} - ${attributes.user_email}`);
          }
        }

        return NextResponse.json({
          success: true,
          message: `Order recorded for ${attributes.user_email}`,
          products: bundleProducts,
        });
      }

      case 'order_refunded': {
        // Mark the purchase as refunded
        const { error } = await supabase
          .from('purchases')
          .update({ status: 'refunded', updated_at: new Date().toISOString() })
          .eq('order_id', attributes.order_id?.toString())
          .eq('user_email', attributes.user_email.toLowerCase());

        if (error) {
          console.error('Error updating refund:', error);
        } else {
          console.log(`Order refunded for ${attributes.user_email}`);
        }

        return NextResponse.json({ success: true, message: 'Refund processed' });
      }

      case 'license_key_created': {
        // Update purchase with license key
        const licenseKey = attributes.license_key || attributes.key;

        if (licenseKey) {
          const { error } = await supabase
            .from('purchases')
            .update({
              license_key: licenseKey,
              updated_at: new Date().toISOString(),
            })
            .eq('order_id', attributes.order_id?.toString())
            .eq('user_email', attributes.user_email.toLowerCase());

          if (error) {
            console.error('Error updating license key:', error);
          } else {
            console.log(`License key recorded for ${attributes.user_email}`);
          }
        }

        return NextResponse.json({ success: true, message: 'License key recorded' });
      }

      default:
        // Log but don't fail for unhandled events
        console.log(`Unhandled webhook event: ${eventName}`);
        return NextResponse.json({ success: true, message: `Event ${eventName} acknowledged` });
    }

  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

// Lemon Squeezy may send GET requests to verify the endpoint
export async function GET() {
  return NextResponse.json({ status: 'Webhook endpoint active' });
}
