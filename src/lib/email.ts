/**
 * Transactional email via Resend (REST — no SDK dependency).
 *
 * Required env:
 *   RESEND_API_KEY       — Resend API key
 *   RESEND_FROM          — verified sender, e.g. "TopK <sales@send.topk.agency>"
 *   ORDER_NOTIFY_EMAIL   — where new-order / new-brief alerts go (defaults to Zaid)
 *
 * All sends are best-effort: failures are logged and swallowed so they never
 * break the checkout or brief flow.
 */

const RESEND_ENDPOINT = 'https://api.resend.com/emails';
const NOTIFY_TO = process.env.ORDER_NOTIFY_EMAIL || 'zaidsarhan@gmail.com';

function fromAddress(): string {
  // These are INTERNAL order/brief alerts. Default to Resend's shared sender,
  // which delivers to the Resend account owner with no domain verification.
  // Once send.topk.agency is verified in Resend, set ORDER_NOTIFY_FROM to a
  // branded address, e.g. "TopK Orders <orders@send.topk.agency>".
  const raw = process.env.ORDER_NOTIFY_FROM || 'TopK Orders <onboarding@resend.dev>';
  // Accept either "addr@domain" or "Name <addr@domain>"
  return raw.includes('<') ? raw : `TopK Orders <${raw}>`;
}

interface SendArgs {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
}

/** Low-level send. Returns true on success, false (logged) on any failure. */
export async function sendEmail({ to, subject, html, replyTo }: SendArgs): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('[email] RESEND_API_KEY not set — skipping send:', subject);
    return false;
  }

  try {
    const res = await fetch(RESEND_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: fromAddress(),
        to: Array.isArray(to) ? to : [to],
        subject,
        html,
        ...(replyTo ? { reply_to: replyTo } : {}),
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error(`[email] Resend send failed ${res.status}: ${text}`);
      return false;
    }
    return true;
  } catch (err) {
    console.error('[email] Resend send threw:', err);
    return false;
  }
}

const money = (cents: number) => `$${(cents / 100).toFixed(2)}`;
const esc = (s: string) =>
  String(s ?? '').replace(/[<>&]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c]!));
const row = (label: string, value: string) =>
  `<tr><td style="padding:6px 14px 6px 0;color:#6B7280;font-size:14px;white-space:nowrap;vertical-align:top">${label}</td>` +
  `<td style="padding:6px 0;color:#0A0008;font-size:14px;font-weight:600">${value}</td></tr>`;

interface OrderInfo {
  orderId: string;
  name: string;
  email: string;
  whatsapp?: string | null;
  brand?: string | null;
  amountCents: number;
  bump: boolean;
}

/** Fires the instant a payment clears — so Zaid knows a paying customer arrived. */
export async function sendOrderNotification(o: OrderInfo): Promise<boolean> {
  const wa = o.whatsapp ? esc(o.whatsapp) : '<span style="color:#9CA3AF">— not provided —</span>';
  const html = `
  <div style="font-family:Inter,Arial,sans-serif;max-width:560px;margin:0 auto">
    <h2 style="font-size:20px;color:#0A0008;margin:0 0 4px">💳 New paid order — ${money(o.amountCents)}</h2>
    <p style="color:#6B7280;font-size:14px;margin:0 0 18px">A customer just paid. The creative brief follows when they complete it on the thank-you page.</p>
    <table style="border-collapse:collapse;width:100%">
      ${row('Name', esc(o.name) || '—')}
      ${row('Email', `<a href="mailto:${esc(o.email)}">${esc(o.email)}</a>`)}
      ${row('WhatsApp', wa)}
      ${row('Brand / site', esc(o.brand || '') || '—')}
      ${row('Paid', `${money(o.amountCents)}${o.bump ? ' (incl. rush bump)' : ''}`)}
      ${row('Order ID', `<code>${esc(o.orderId)}</code>`)}
    </table>
  </div>`;
  return sendEmail({
    to: NOTIFY_TO,
    replyTo: o.email,
    subject: `💳 New TopK order — ${o.name || o.email} (${money(o.amountCents)})`,
    html,
  });
}

interface BriefInfo {
  orderId: string;
  name: string;
  email: string;
  whatsapp?: string | null;
  productName: string;
  productUrl?: string | null;
  videoFormat: string;
  notes?: string | null;
  photoUrls: string[];
}

/** Fires when the customer submits the brief — the actual production request. */
export async function sendBriefNotification(b: BriefInfo): Promise<boolean> {
  const wa = b.whatsapp ? esc(b.whatsapp) : '<span style="color:#9CA3AF">— not provided —</span>';
  const url = b.productUrl
    ? `<a href="${esc(b.productUrl)}">${esc(b.productUrl)}</a>`
    : '<span style="color:#9CA3AF">—</span>';
  const photos = b.photoUrls.length
    ? b.photoUrls
        .map(
          (u, i) =>
            `<a href="${esc(u)}" style="display:inline-block;margin:4px 8px 4px 0;color:#F97316">📎 Photo ${i + 1}</a>`
        )
        .join('')
    : '<span style="color:#9CA3AF">— none uploaded —</span>';
  const notes = b.notes ? esc(b.notes).replace(/\n/g, '<br>') : '<span style="color:#9CA3AF">—</span>';

  const html = `
  <div style="font-family:Inter,Arial,sans-serif;max-width:560px;margin:0 auto">
    <h2 style="font-size:20px;color:#0A0008;margin:0 0 4px">🎬 Creative brief received</h2>
    <p style="color:#6B7280;font-size:14px;margin:0 0 18px">${esc(b.name) || esc(b.email)} just sent their product brief. Everything you need to start the ad is below.</p>
    <table style="border-collapse:collapse;width:100%">
      ${row('Customer', `${esc(b.name) || '—'} · <a href="mailto:${esc(b.email)}">${esc(b.email)}</a>`)}
      ${row('WhatsApp', wa)}
      ${row('Product', esc(b.productName) || '—')}
      ${row('Product link', url)}
      ${row('Video style', esc(b.videoFormat) || '—')}
      ${row('Notes', notes)}
      ${row('Photos', photos)}
      ${row('Order ID', `<code>${esc(b.orderId)}</code>`)}
    </table>
  </div>`;
  return sendEmail({
    to: NOTIFY_TO,
    replyTo: b.email,
    subject: `🎬 Brief: ${b.productName || b.name || b.email} — start production`,
    html,
  });
}
