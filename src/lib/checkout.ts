import type Stripe from 'stripe';

export const BASE_PRICE_CENTS = 4900;
export const BUMP_PRICE_CENTS = 2700;

export type InitialOrder = {
  name: string;
  email: string;
  brand: string;
  whatsapp: string;
  bump: boolean;
};

export class CheckoutInputError extends Error {
  status: number;

  constructor(message: string, status = 400) {
    super(message);
    this.name = 'CheckoutInputError';
    this.status = status;
  }
}

function cleanText(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

export function normalizeInitialOrder(body: Record<string, unknown>): InitialOrder {
  const name = cleanText(body.name);
  const email = cleanText(body.email).toLowerCase();
  const brand = cleanText(body.brand);
  const whatsapp = cleanText(body.whatsapp);
  const bump = body.bump === true;

  if (!email) {
    throw new CheckoutInputError('email is required');
  }

  return { name, email, brand, whatsapp, bump };
}

export function getInitialOrderAmountCents(bump: boolean): number {
  return BASE_PRICE_CENTS + (bump ? BUMP_PRICE_CENTS : 0);
}

export function getInitialOrderDescription(bump: boolean): string {
  return bump
    ? '$49 First AI Video Ad + $27 Rush 24h Delivery'
    : '$49 First AI Video Ad';
}

export function buildInitialPaymentIntentParams({
  amountCents,
  customerId,
  email,
  brand,
  bump,
}: {
  amountCents: number;
  customerId: string;
  email: string;
  brand: string;
  bump: boolean;
}): Stripe.PaymentIntentCreateParams {
  return {
    amount: amountCents,
    currency: 'usd',
    customer: customerId,
    setup_future_usage: 'off_session',
    automatic_payment_methods: { enabled: true },
    description: getInitialOrderDescription(bump),
    metadata: { email, brand, bump: String(bump) },
  };
}

export function buildInitialElementsOptions(amountCents: number) {
  return {
    mode: 'payment' as const,
    amount: amountCents,
    currency: 'usd',
    setupFutureUsage: 'off_session' as const,
    appearance: {
      theme: 'stripe' as const,
      variables: {
        colorPrimary: '#F97316',
        borderRadius: '10px',
        fontFamily: 'Inter, sans-serif',
      },
    },
  };
}
