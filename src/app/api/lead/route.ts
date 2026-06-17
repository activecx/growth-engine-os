/**
 * POST /api/lead
 * Called at step 1 (name/email/brand collected) BEFORE the card form.
 * Creates a Zoho CRM lead so the email is captured even if the customer abandons.
 *
 * Body: { name: string; email: string; brand: string; whatsapp?: string }
 * Response: { ok: true } | { error: string }
 */

import { NextRequest, NextResponse } from 'next/server';
import { createZohoLead } from '@/lib/zoho';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as { name?: string; email?: string; brand?: string; whatsapp?: string };

    const name = (body.name ?? '').trim();
    const email = (body.email ?? '').trim().toLowerCase();
    const brand = (body.brand ?? '').trim();
    const whatsapp = (body.whatsapp ?? '').trim();

    if (!email) {
      return NextResponse.json({ error: 'email is required' }, { status: 400 });
    }

    await createZohoLead({ name, email, brand, whatsapp: whatsapp || undefined });

    return NextResponse.json({ ok: true });
  } catch (err) {
    // Non-fatal — log and continue. Don't block the checkout flow.
    console.error('[/api/lead] Zoho lead creation failed:', err);
    // Still return 200 so the client-side flow continues.
    return NextResponse.json({ ok: true, warning: 'lead capture failed' });
  }
}
