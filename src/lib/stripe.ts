import Stripe from 'stripe';

// Lazily instantiated so `next build` doesn't throw when STRIPE_SECRET_KEY is
// absent (e.g. during static page-data collection on a preview without env).
// Every route that touches `stripe` will throw a clear error at request time
// if the key is unset.
let _stripe: Stripe | null = null;

function getStripe(): Stripe {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      throw new Error('STRIPE_SECRET_KEY is not set.');
    }
    // The Stripe v22 package ships 2026-05-27.dahlia as its locked version.
    _stripe = new Stripe(key, { apiVersion: '2026-05-27.dahlia' as never });
  }
  return _stripe;
}

// Proxy so callers can write `stripe.customers.create(...)` exactly like the
// real client; the client is created on first property access (request time).
export const stripe = new Proxy({} as Stripe, {
  get(_target, prop, receiver) {
    const client = getStripe();
    const value = Reflect.get(client as object, prop, receiver);
    return typeof value === 'function' ? (value as (...a: unknown[]) => unknown).bind(client) : value;
  },
});
