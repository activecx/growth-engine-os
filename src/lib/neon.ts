import { neon } from '@neondatabase/serverless';
import type { NeonQueryFunction } from '@neondatabase/serverless';

// Lazily instantiated so `next build` doesn't throw when DATABASE_URL is absent.
// Every route that calls sql() will throw a clear error at request time if unset.
let _sql: NeonQueryFunction<false, false> | null = null;

function getSql(): NeonQueryFunction<false, false> {
  if (!_sql) {
    if (!process.env.DATABASE_URL) {
      throw new Error(
        'DATABASE_URL is not set. Add your Neon connection string to .env.local before handling requests.'
      );
    }
    _sql = neon(process.env.DATABASE_URL);
  }
  return _sql;
}

// Proxy so callers can write `sql\`...\`` exactly like the real neon client.
export const sql: NeonQueryFunction<false, false> = new Proxy((() => {}) as unknown as NeonQueryFunction<false, false>, {
  apply(_target, _thisArg, args) {
    const client = getSql();
    return (client as unknown as (...a: unknown[]) => unknown)(...args);
  },
});

/** Initialise the orders table on first cold start (idempotent) */
export async function initOrdersTable(): Promise<void> {
  const client = getSql();
  await client`
    CREATE TABLE IF NOT EXISTS orders (
      id                       UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
      stripe_customer_id       TEXT,
      stripe_payment_method_id TEXT,
      stripe_payment_intent_id TEXT,
      email                    TEXT        NOT NULL,
      brand                    TEXT,
      name                     TEXT,
      amount_cents             INTEGER     NOT NULL,
      bump                     BOOLEAN     NOT NULL DEFAULT false,
      upsells                  JSONB       NOT NULL DEFAULT '[]'::jsonb,
      paid                     BOOLEAN     NOT NULL DEFAULT false,
      created_at               TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;

  // ── Contact + creative-brief columns (added idempotently so existing
  //    deployments upgrade in place). whatsapp is captured at checkout;
  //    the rest are filled in by the brief form on the thank-you page. ──
  await client`ALTER TABLE orders ADD COLUMN IF NOT EXISTS whatsapp        TEXT`;
  await client`ALTER TABLE orders ADD COLUMN IF NOT EXISTS product_name    TEXT`;
  await client`ALTER TABLE orders ADD COLUMN IF NOT EXISTS product_url     TEXT`;
  await client`ALTER TABLE orders ADD COLUMN IF NOT EXISTS video_format    TEXT`;
  await client`ALTER TABLE orders ADD COLUMN IF NOT EXISTS brief_notes     TEXT`;
  await client`ALTER TABLE orders ADD COLUMN IF NOT EXISTS photo_urls      JSONB   NOT NULL DEFAULT '[]'::jsonb`;
  await client`ALTER TABLE orders ADD COLUMN IF NOT EXISTS brief_completed BOOLEAN NOT NULL DEFAULT false`;
  await client`ALTER TABLE orders ADD COLUMN IF NOT EXISTS brief_at        TIMESTAMPTZ`;
}

export type Order = {
  id: string;
  stripe_customer_id: string | null;
  stripe_payment_method_id: string | null;
  stripe_payment_intent_id: string | null;
  email: string;
  brand: string | null;
  name: string | null;
  amount_cents: number;
  bump: boolean;
  upsells: string[];
  paid: boolean;
  created_at: string;
  // contact + brief
  whatsapp: string | null;
  product_name: string | null;
  product_url: string | null;
  video_format: string | null;
  brief_notes: string | null;
  photo_urls: string[];
  brief_completed: boolean;
  brief_at: string | null;
};
