'use client';

// OTO1 — 6-Ad Campaign Bundle ($294)
// Brunson one-decision page: one gradient accept CTA + plain-text decline link.
// Accept → off-session Stripe charge $294 → /lp/a/thanks
// Decline → /lp/a/down1

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, Suspense } from 'react';
import { track } from '@/lib/track';

/* ─── Design constants (match /lp/a) ─────────────────────── */
const GRAD = 'linear-gradient(135deg,#F97316 0%,#EC4899 50%,#8B5CF6 100%)';

/* ─── Prices ─────────────────────────────────────────────── */
const PRICE = 294;
const COMPARE = 894;
const SAVE = 600;
const AD_COUNT = 6;

/* ─── Benefit bullets — verbatim from UPSELL_copy.md ──────── */
const BULLETS = [
  {
    bold: 'Test 6 hooks, not 1.',
    rest: ' The first hook rarely wins. Six gives you real shots at the one that stops the thumb — so you find your scroll-stopper instead of guessing.',
  },
  {
    bold: 'Never run dry.',
    rest: ' Six ads is weeks of fresh content queued up — you post consistently instead of going quiet the moment your one ad gets tired.',
  },
  {
    bold: 'Stay top-of-feed.',
    rest: ' The feed forgets brands that post once. Rotate fresh creative and you stay the brand people keep seeing — visible, not invisible.',
  },
  {
    bold: 'Cover every format in one go.',
    rest: ' Spread your six across hooks, UGC, unboxings, and hero shots — so you\'re seen everywhere your audience scrolls, not just one spot.',
  },
  {
    bold: 'Beat ad fatigue before it starts.',
    rest: ' When one ad burns out, the next is already live. No dead air, no scramble — your brand never disappears mid-month.',
  },
  {
    bold: `Pay $${PRICE}, not $${COMPARE}.`,
    rest: ` Six ads at your $49 intro price is $${PRICE} — versus $${COMPARE} at the regular $149 each. You save $${SAVE}, today only.`,
  },
];

/* ─── SVG helpers ─────────────────────────────────────────── */
function IconLock() {
  return (
    <svg width={17} height={17} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function IconArrow() {
  return (
    <svg width={19} height={19} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function IconCheckCircle() {
  return (
    <svg width={20} height={20} viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}>
      <path d="M9 12l2 2 4-4" />
      <circle cx="12" cy="12" r="9" />
    </svg>
  );
}

function IconInfo() {
  return (
    <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="#FDBA74" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v4M12 16h.01" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════ */
function Oto1Inner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId') ?? (typeof window !== 'undefined' ? localStorage.getItem('topk_funnel_order') : null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleAccept() {
    if (!orderId) {
      // Fallback: route without charging (edge case: cookies cleared)
      router.push('/lp/a/thanks');
      return;
    }
    setError(null);
    setLoading(true);

    try {
      const res = await fetch('/api/upsell', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, offer: 'oto1' }),
      });
      const data = await res.json() as { ok?: boolean; error?: string; requires_action?: boolean };

      if (data.error) {
        setError(data.error);
        setLoading(false);
        return;
      }

      try {
        const prev = JSON.parse(localStorage.getItem('topk_funnel_step') || '{}');
        localStorage.setItem('topk_funnel_step', JSON.stringify({ ...prev, got1: true, step: 'thanks' }));
      } catch (_) { /* storage blocked */ }

      track('Purchase', { value: PRICE, currency: 'USD', content_name: 'oto1-6-ad-bundle', num_items: AD_COUNT });

      router.push('/lp/a/thanks');
    } catch {
      setError('Network error — please try again or contact support.');
      setLoading(false);
    }
  }

  function handleDecline() {
    router.push(`/lp/a/down1${orderId ? `?orderId=${orderId}` : ''}`);
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#FFF5F5',
      fontFamily: "'Inter', sans-serif",
      color: '#0A0008',
      lineHeight: 1.6,
    }}>

      {/* ── STICKY HEADER ── */}
      <header style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '14px 28px',
        background: '#FFFFFF',
        borderBottom: '1px solid #E5E7EB',
        position: 'sticky', top: 0, zIndex: 50,
      }}>
        <div style={{
          fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: 23,
          letterSpacing: '-0.02em', display: 'flex', alignItems: 'center',
        }}>
          <span style={{ background: GRAD, WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            TopK
          </span>
          <span style={{ color: '#0A0008' }}>&nbsp;AI</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#6B7280', fontWeight: 500 }}>
          <IconLock />
          <span>Secure 256-bit checkout</span>
        </div>
      </header>

      {/* ── REASSURANCE STRIP (Brunson: confirm first, then upsell) ── */}
      <div style={{
        background: '#0A0008', color: '#FFFFFF', textAlign: 'center',
        padding: '11px 20px',
        fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 14,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: 10, flexWrap: 'wrap',
      }}>
        <IconInfo />
        <span>Your $49 ad is confirmed. ✅ One quick thing before your receipt — this offer is on this page only.</span>
      </div>

      {/* ── MAIN ── */}
      <main style={{ maxWidth: 720, margin: '0 auto', padding: '48px 24px 80px', textAlign: 'center' }}>

        {/* Eyebrow badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 7,
          padding: '7px 18px', borderRadius: 9999,
          background: '#0A0008', color: '#fff',
          fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 13,
          letterSpacing: '.04em', textTransform: 'uppercase',
        }}>
          WAIT — LOCK YOUR $49 PRICE BEFORE IT'S GONE
        </div>

        {/* Headline */}
        <h1 style={{
          fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: 42,
          lineHeight: 1.12, letterSpacing: '-0.02em',
          margin: '22px auto 0', maxWidth: '18ch',
        }}>
          Wait — lock your $49 price before it's gone.{' '}
          <span style={{ background: GRAD, WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Get {AD_COUNT} ads, not 1.
          </span>
        </h1>

        {/* Sub-headline */}
        <p style={{ fontSize: 19, color: '#6B7280', maxWidth: '54ch', margin: '18px auto 0', lineHeight: 1.65 }}>
          You just got your first ad at $49. Right now — and only on this page — you can keep that exact intro
          price across <strong style={{ color: '#0A0008' }}>6 ads</strong> instead of paying $149 each later. That's a full month-plus of content,
          ready to keep your brand in the feed.
        </p>

        {/* Offer card */}
        <div style={{
          background: '#FFFFFF', borderRadius: 16,
          border: '1px solid #E5E7EB',
          boxShadow: '0px 8px 40px rgba(0,0,0,.10)',
          padding: 32, marginTop: 32, textAlign: 'left',
        }}>
          <div style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>

            {/* Bullets column */}
            <div style={{ flex: 1, minWidth: 220 }}>
              <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 22, color: '#0A0008', marginBottom: 16 }}>
                6-Ad Campaign Bundle
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 13 }}>
                {BULLETS.map((b, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 11, fontSize: 15, color: '#374151', lineHeight: 1.55 }}>
                    <IconCheckCircle />
                    <span><strong style={{ color: '#0A0008' }}>{b.bold}</strong>{b.rest}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Price pill */}
            <div style={{
              width: 200, flexShrink: 0,
              background: GRAD,
              borderRadius: 14, padding: 24, color: '#fff', textAlign: 'center',
            }}>
              <div style={{ fontSize: 13, opacity: .85, textDecoration: 'line-through', fontFamily: "'Poppins', sans-serif" }}>
                ${COMPARE}
              </div>
              <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: 44, lineHeight: 1.05 }}>
                ${PRICE}
              </div>
              <div style={{ fontSize: 13, fontFamily: "'Poppins', sans-serif", fontWeight: 600, letterSpacing: '.04em', opacity: .9 }}>
                {AD_COUNT} ADS · ONE-TIME
              </div>
              <div style={{
                marginTop: 10, fontSize: 12, fontFamily: "'Poppins', sans-serif", fontWeight: 700,
                background: 'rgba(255,255,255,.22)', padding: '4px 12px', borderRadius: 9999,
                display: 'inline-block',
              }}>
                Save ${SAVE}
              </div>
            </div>

          </div>
        </div>

        {/* Urgency line */}
        <p style={{
          marginTop: 22,
          fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 15,
          color: '#0A0008',
        }}>
          This is the only time you'll see $49/ad on a bundle.{' '}
          Lock it on this page and your price holds for all {AD_COUNT} — leave this page and every future ad is $149.
        </p>

        {error && (
          <div style={{
            margin: '12px auto 0', maxWidth: 520,
            background: 'rgba(220,38,38,.06)', border: '1px solid rgba(220,38,38,.2)',
            borderRadius: 10, padding: '12px 16px',
            color: '#DC2626', fontSize: 14, fontFamily: "'Inter', sans-serif",
          }}>
            {error}
          </div>
        )}

        {/* ACCEPT CTA */}
        <button
          className="lp-btn-grad"
          onClick={handleAccept}
          disabled={loading}
          style={{
            marginTop: 8, width: '100%', maxWidth: 520, padding: '19px 24px',
            border: 'none', borderRadius: 14,
            background: GRAD, color: '#fff',
            fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 18,
            cursor: loading ? 'wait' : 'pointer',
            opacity: loading ? 0.75 : 1,
            boxShadow: '0px 4px 20px rgba(236,72,153,.4)',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 9,
          }}
        >
          {loading ? 'Processing…' : `Yes — add my 6-Ad Bundle for $${PRICE}`}
          {!loading && <IconArrow />}
        </button>

        {/* Micro-copy */}
        <div style={{ marginTop: 9, fontSize: 13, color: '#9CA3AF' }}>
          One click · same card on file · save ${SAVE} vs. ${COMPARE} · love it, or it's free.
        </div>

        {/* DECLINE link */}
        <div style={{ marginTop: 18 }}>
          <button
            onClick={handleDecline}
            disabled={loading}
            style={{
              background: 'none', border: 'none',
              color: '#9CA3AF',
              fontFamily: "'Inter', sans-serif", fontSize: 14,
              cursor: 'pointer', textDecoration: 'underline', padding: 0,
            }}
          >
            No thanks — I'll keep just my one ad.
          </button>
        </div>

        {/* One-time note */}
        <div style={{ marginTop: 12, fontSize: 13, color: '#C4B5C9' }}>
          This offer is only shown once and won't appear again.
        </div>

      </main>
    </div>
  );
}

export default function Oto1Page() {
  return (
    <Suspense>
      <Oto1Inner />
    </Suspense>
  );
}
