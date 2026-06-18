/**
 * POST /api/stripe/webhook
 * Verifies Stripe events and marks paid orders in Neon.
 *
 * Forward locally:
 *   stripe listen --forward-to localhost:3002/api/stripe/webhook
 */

import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { stripe } from '@/lib/stripe';
import { sql } from '@/lib/neon';
import { sendOrderNotification } from '@/lib/email';

type PaidOrderRow = {
  id: string;
  name: string | null;
  email: string;
  whatsapp: string | null;
  brand: string | null;
  amount_cents: number;
  bump: boolean;
};

function paymentMethodIdFromIntent(pi: Stripe.PaymentIntent): string | null {
  if (!pi.payment_method) return null;
  return typeof pi.payment_method === 'string' ? pi.payment_method : pi.payment_method.id;
}

export async function POST(req: NextRequest) {
  const body = await req.text();
  const headersList = await headers();
  const sig = headersList.get('stripe-signature');

  if (!sig) {
    return new NextResponse('Missing stripe-signature header', { status: 400 });
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error('[webhook] STRIPE_WEBHOOK_SECRET is not set');
    return new NextResponse('Webhook secret not configured', { status: 500 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    console.error('[webhook] Signature verification failed:', err);
    return new NextResponse('Webhook signature verification failed', { status: 400 });
  }

  try {
    switch (event.type) {
      case 'payment_intent.succeeded': {
        const pi = event.data.object as Stripe.PaymentIntent;
        const paymentMethodId = paymentMethodIdFromIntent(pi);

        const rows = await sql`
          UPDATE orders
          SET
            paid = true,
            stripe_payment_method_id = COALESCE(${paymentMethodId}, stripe_payment_method_id)
          WHERE stripe_payment_intent_id = ${pi.id}
            AND paid = false
          RETURNING id, name, email, whatsapp, brand, amount_cents, bump
        `;

        const order = rows[0] as PaidOrderRow | undefined;
        if (order) {
          sendOrderNotification({
            orderId: order.id,
            name: order.name ?? '',
            email: order.email,
            whatsapp: order.whatsapp ?? '',
            brand: order.brand ?? '',
            amountCents: order.amount_cents,
            bump: order.bump,
          }).catch(e => console.error('[webhook] order email failed (non-fatal):', e));
        }

        console.log(`[webhook] payment_intent.succeeded - PI ${pi.id} marked paid`);
        break;
      }

      case 'payment_intent.payment_failed': {
        const pi = event.data.object as Stripe.PaymentIntent;
        console.warn(`[webhook] payment_intent.payment_failed - PI ${pi.id}, reason: ${pi.last_payment_error?.message ?? 'unknown'}`);
        break;
      }

      default:
        break;
    }
  } catch (err) {
    console.error('[webhook] Handler error:', err);
    return new NextResponse('Internal handler error', { status: 500 });
  }

  return new NextResponse(null, { status: 200 });
}
