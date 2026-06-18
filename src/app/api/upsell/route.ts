/**
 * POST /api/upsell
 * Off-session charge for OTO1 ($294) or DS1 ($147).
 * Uses the Stripe Customer + PaymentMethod saved during the initial order.
 *
 * Body: { orderId: string; offer: 'oto1' | 'ds1' }
 * Response: { ok: true } | { error: string; requires_action?: true }
 */

import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { stripe } from '@/lib/stripe';
import { sql } from '@/lib/neon';
import type { Order } from '@/lib/neon';

const UPSELL_AMOUNTS: Record<string, number> = {
  oto1: 29400,
  ds1: 14700,
};

const UPSELL_DESCRIPTIONS: Record<string, string> = {
  oto1: '6-Ad Campaign Bundle ($294)',
  ds1: '3-Ad Starter Bundle ($147)',
};

function paymentMethodIdFromIntent(pi: Stripe.PaymentIntent): string | null {
  if (!pi.payment_method) return null;
  return typeof pi.payment_method === 'string' ? pi.payment_method : pi.payment_method.id;
}

async function ensureSavedPaymentMethod(order: Order): Promise<string | null> {
  if (order.stripe_payment_method_id) {
    return order.stripe_payment_method_id;
  }

  if (!order.stripe_payment_intent_id) {
    return null;
  }

  const initialPayment = await stripe.paymentIntents.retrieve(order.stripe_payment_intent_id);
  if (initialPayment.status !== 'succeeded') {
    return null;
  }

  const paymentMethodId = paymentMethodIdFromIntent(initialPayment);
  if (!paymentMethodId) {
    return null;
  }

  await sql`
    UPDATE orders
    SET stripe_payment_method_id = ${paymentMethodId}, paid = true
    WHERE id = ${order.id}
  `;

  return paymentMethodId;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as { orderId?: string; offer?: string };

    const orderId = (body.orderId ?? '').trim();
    const offer = (body.offer ?? '').trim() as 'oto1' | 'ds1';

    if (!orderId) return NextResponse.json({ error: 'orderId is required' }, { status: 400 });
    if (!UPSELL_AMOUNTS[offer]) {
      return NextResponse.json({ error: `Unknown offer: ${offer}` }, { status: 400 });
    }

    const rows = await sql`
      SELECT * FROM orders WHERE id = ${orderId} LIMIT 1
    `;

    const order = rows[0] as Order | undefined;
    if (!order) return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    if (!order.stripe_customer_id) {
      return NextResponse.json({ error: 'No Stripe customer for this order' }, { status: 400 });
    }

    const paymentMethodId = await ensureSavedPaymentMethod(order);
    if (!paymentMethodId) {
      return NextResponse.json(
        { error: 'Your initial payment is still being confirmed. Please wait a few seconds and try again.' },
        { status: 409 }
      );
    }

    const amountCents = UPSELL_AMOUNTS[offer];

    let paymentIntent;
    try {
      paymentIntent = await stripe.paymentIntents.create(
        {
          amount: amountCents,
          currency: 'usd',
          customer: order.stripe_customer_id,
          payment_method: paymentMethodId,
          off_session: true,
          confirm: true,
          description: UPSELL_DESCRIPTIONS[offer],
          metadata: { orderId, offer },
        },
        { idempotencyKey: `upsell-${orderId}-${offer}` }
      );
    } catch (stripeErr: unknown) {
      if (
        stripeErr instanceof Error &&
        'code' in stripeErr &&
        (stripeErr as { code?: string }).code === 'authentication_required'
      ) {
        console.warn('[/api/upsell] 3DS required for off-session charge - returning requires_action');
        return NextResponse.json(
          { error: 'Your card requires additional verification. Please contact us to complete this purchase.', requires_action: true },
          { status: 402 }
        );
      }
      throw stripeErr;
    }

    await sql`
      UPDATE orders
      SET upsells = upsells || ${JSON.stringify([offer])}::jsonb
      WHERE id = ${orderId}
    `;

    return NextResponse.json({ ok: true, paymentIntentId: paymentIntent.id });
  } catch (err) {
    console.error('[/api/upsell] Error:', err);
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
