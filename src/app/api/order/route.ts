/**
 * POST /api/order
 * Creates a Stripe Customer + PaymentIntent, persists the order in Neon.
 * Called from the payment step of /lp/a when the user submits the card.
 *
 * Body: { name, email, brand, bump, paymentMethodId }
 *   paymentMethodId — collected from the Stripe PaymentElement on the client
 *
 * Response: { clientSecret: string; orderId: string } on success
 *         | { error: string } on failure
 */

import { NextRequest, NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { sql, initOrdersTable } from '@/lib/neon';
import { updateZohoLead } from '@/lib/zoho';

const BASE_PRICE_CENTS = 4900;   // $49.00
const BUMP_PRICE_CENTS  = 2700;  // $27.00

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as {
      name?: string;
      email?: string;
      brand?: string;
      bump?: boolean;
      paymentMethodId?: string;
    };

    const name  = (body.name  ?? '').trim();
    const email = (body.email ?? '').trim().toLowerCase();
    const brand = (body.brand ?? '').trim();
    const bump  = body.bump === true;
    const paymentMethodId = (body.paymentMethodId ?? '').trim();

    if (!email)            return NextResponse.json({ error: 'email is required' }, { status: 400 });
    if (!paymentMethodId)  return NextResponse.json({ error: 'paymentMethodId is required' }, { status: 400 });

    const amountCents = BASE_PRICE_CENTS + (bump ? BUMP_PRICE_CENTS : 0);

    // 1. Ensure orders table exists (idempotent)
    await initOrdersTable();

    // 2. Create Stripe Customer
    const customer = await stripe.customers.create(
      { name: name || undefined, email, metadata: { brand } },
      { idempotencyKey: `cust-${email}-${Date.now()}` }
    );

    // 3. Attach the payment method to the customer
    await stripe.paymentMethods.attach(paymentMethodId, { customer: customer.id });

    // 4. Set it as the default
    await stripe.customers.update(customer.id, {
      invoice_settings: { default_payment_method: paymentMethodId },
    });

    // 5. Create PaymentIntent — setup_future_usage keeps the PM for off-session upsells
    const paymentIntent = await stripe.paymentIntents.create(
      {
        amount: amountCents,
        currency: 'usd',
        customer: customer.id,
        payment_method: paymentMethodId,
        setup_future_usage: 'off_session',
        confirmation_method: 'manual',
        confirm: true,
        description: bump
          ? '$49 First AI Video Ad + $27 Rush 24h Delivery'
          : '$49 First AI Video Ad',
        metadata: { email, brand, bump: String(bump) },
        return_url: `${process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3002'}/lp/a/oto1`,
      },
      { idempotencyKey: `pi-${email}-${amountCents}-${Date.now()}` }
    );

    // 6. Persist order in Neon
    const rows = await sql`
      INSERT INTO orders
        (stripe_customer_id, stripe_payment_method_id, stripe_payment_intent_id,
         email, brand, name, amount_cents, bump, upsells, paid)
      VALUES
        (${customer.id}, ${paymentMethodId}, ${paymentIntent.id},
         ${email}, ${brand}, ${name}, ${amountCents}, ${bump}, '[]'::jsonb, false)
      RETURNING id
    `;

    const orderId: string = (rows[0] as { id: string }).id;

    // 7. Update Zoho lead (non-fatal)
    updateZohoLead(email, orderId).catch(e =>
      console.error('[/api/order] Zoho update failed (non-fatal):', e)
    );

    // 8. Return clientSecret so the client can confirm if needed (3DS), plus orderId
    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      orderId,
      status: paymentIntent.status,
    });
  } catch (err) {
    console.error('[/api/order] Error:', err);
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
