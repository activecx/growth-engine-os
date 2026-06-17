/**
 * POST /api/brief
 * Saves the creative brief the customer fills in on the thank-you page,
 * then notifies Zaid by email and attaches the brief to the Zoho lead.
 *
 * Body: { orderId, productName, productUrl?, videoFormat, notes?, photoUrls?: string[] }
 * Response: { ok: true } | { error: string }
 */

import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/neon';
import { sendBriefNotification } from '@/lib/email';
import { attachZohoBrief } from '@/lib/zoho';

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as {
      orderId?: string;
      productName?: string;
      productUrl?: string;
      videoFormat?: string;
      notes?: string;
      photoUrls?: unknown;
    };

    const orderId     = (body.orderId ?? '').trim();
    const productName = (body.productName ?? '').trim();
    const productUrl  = (body.productUrl ?? '').trim();
    const videoFormat = (body.videoFormat ?? '').trim();
    const notes       = (body.notes ?? '').trim();
    const photoUrls   = Array.isArray(body.photoUrls)
      ? body.photoUrls.filter((u): u is string => typeof u === 'string').slice(0, 12)
      : [];

    if (!orderId || !UUID_RE.test(orderId)) {
      return NextResponse.json({ error: 'A valid orderId is required' }, { status: 400 });
    }
    if (!productName) {
      return NextResponse.json({ error: 'productName is required' }, { status: 400 });
    }
    if (!videoFormat) {
      return NextResponse.json({ error: 'videoFormat is required' }, { status: 400 });
    }

    // 1. Persist the brief onto the order row, and read the contact info back.
    const rows = await sql`
      UPDATE orders
      SET product_name    = ${productName},
          product_url     = ${productUrl || null},
          video_format    = ${videoFormat},
          brief_notes     = ${notes || null},
          photo_urls      = ${JSON.stringify(photoUrls)}::jsonb,
          brief_completed = true,
          brief_at        = now()
      WHERE id = ${orderId}
      RETURNING email, name, whatsapp
    `;

    if (rows.length === 0) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    const { email, name, whatsapp } = rows[0] as {
      email: string; name: string | null; whatsapp: string | null;
    };

    // 2. Email Zaid the production-ready brief (non-fatal).
    sendBriefNotification({
      orderId,
      name: name ?? '',
      email,
      whatsapp,
      productName,
      productUrl,
      videoFormat,
      notes,
      photoUrls,
    }).catch(e => console.error('[/api/brief] brief email failed (non-fatal):', e));

    // 3. Attach the brief to the Zoho lead (non-fatal).
    attachZohoBrief(email, orderId, {
      whatsapp: whatsapp || undefined,
      productName,
      productUrl: productUrl || undefined,
      videoFormat,
      notes: notes || undefined,
      photoUrls,
    }).catch(e => console.error('[/api/brief] Zoho brief attach failed (non-fatal):', e));

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[/api/brief] Error:', err);
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
