import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set.');
}

// The Stripe v22 package ships 2026-05-27.dahlia as its locked version.
// We cast to `never` then to the type it actually wants to silence the mismatch.
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2026-05-27.dahlia' as never,
});
