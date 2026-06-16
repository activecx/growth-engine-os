/**
 * POST /api/stripe/webhook
 * Verifies the Stripe signature and processes payment events.
 * This is the source of truth for marking orders paid.
 *
 * Forward locally:
 *   stripe listen --forward-to localhost:3002/api/stripe/webhook
 */

import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { stripe } from '@/lib/stripe';
import { sql } from '@/lib/neon';

// Required: tell Next.js not to parse the body — Stripe needs the raw bytes
export const config = { api: { bodyParser: false } };

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
        const piId = pi.id;

        // Mark the main order paid when the initial PI succeeds
        await sql`
          UPDATE orders
          SET paid = true
          WHERE stripe_payment_intent_id = ${piId}
        `;

        console.log(`[webhook] payment_intent.succeeded — PI ${piId} marked paid`);
        break;
      }

      case 'payment_intent.payment_failed': {
        const pi = event.data.object as Stripe.PaymentIntent;
        console.warn(`[webhook] payment_intent.payment_failed — PI ${pi.id}, reason: ${pi.last_payment_error?.message ?? 'unknown'}`);
        break;
      }

      default:
        // Unhandled event types — ignore silently
        break;
    }
  } catch (err) {
    console.error('[webhook] Handler error:', err);
    return new NextResponse('Internal handler error', { status: 500 });
  }

  return new NextResponse(null, { status: 200 });
}
