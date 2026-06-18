/**
 * POST /api/order
 * Creates a Stripe Customer + PaymentIntent, then persists the pending order.
 * The browser confirms the PaymentIntent with the Payment Element.
 *
 * Body: { name, email, brand, whatsapp?, bump }
 *
 * Response: { clientSecret: string; orderId: string; status: string } on success
 *         | { error: string } on failure
 */

import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { sql, initOrdersTable } from '@/lib/neon';
import { updateZohoLead } from '@/lib/zoho';
import {
  CheckoutInputError,
  buildInitialPaymentIntentParams,
  getInitialOrderAmountCents,
  normalizeInitialOrder,
} from '@/lib/checkout';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as Record<string, unknown>;
    const { name, email, brand, whatsapp, bump } = normalizeInitialOrder(body);
    const amountCents = getInitialOrderAmountCents(bump);

    await initOrdersTable();

    const customer = await stripe.customers.create(
      {
        name: name || undefined,
        email,
        phone: whatsapp || undefined,
        metadata: { brand, whatsapp },
      },
      { idempotencyKey: `cust-${email}-${Date.now()}` }
    );

    const paymentIntent = await stripe.paymentIntents.create(
      buildInitialPaymentIntentParams({
        amountCents,
        customerId: customer.id,
        email,
        brand,
        bump,
      }),
      { idempotencyKey: `pi-${email}-${amountCents}-${Date.now()}` }
    );

    const rows = await sql`
      INSERT INTO orders
        (stripe_customer_id, stripe_payment_method_id, stripe_payment_intent_id,
         email, brand, name, whatsapp, amount_cents, bump, upsells, paid)
      VALUES
        (${customer.id}, ${null}, ${paymentIntent.id},
         ${email}, ${brand}, ${name}, ${whatsapp || null}, ${amountCents}, ${bump}, '[]'::jsonb, false)
      RETURNING id
    `;

    const orderId: string = (rows[0] as { id: string }).id;

    updateZohoLead(email, orderId).catch(e =>
      console.error('[/api/order] Zoho update failed (non-fatal):', e)
    );

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      orderId,
      status: paymentIntent.status,
    });
  } catch (err) {
    if (err instanceof CheckoutInputError) {
      return NextResponse.json({ error: err.message }, { status: err.status });
    }

    console.error('[/api/order] Error:', err);
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
