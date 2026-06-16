'use client';

// DOWN1 — 3-Ad Starter Bundle ($147)
// Shown only after declining OTO1. Same one-click mechanic, same card on file.
// Accept → stub Stripe charge $147 → /lp/a/thanks
// Decline → /lp/a/thanks (no hard wall — they get their one ad)

import { useRouter } from 'next/navigation';

/* ─── Design constants (match /lp/a) ─────────────────────── */
const GRAD = 'linear-gradient(135deg,#F97316 0%,#EC4899 50%,#8B5CF6 100%)';

/* ─── Prices ─────────────────────────────────────────────── */
const PRICE = 147;
const COMPARE = 447;
const SAVE = 300;
const AD_COUNT = 3;

/* ─── Benefit bullets — verbatim from UPSELL_copy.md ──────── */
const BULLETS = [
  {
    bold: 'Three hooks beats one guess.',
    rest: ' Even three ads lets you test which angle stops the scroll — so your one shot isn\'t a coin flip.',
  },
  {
    bold: 'Two weeks of fresh content, ready.',
    rest: ' Three ads keeps your feed alive while you see what\'s working — you stay visible instead of posting once and going dark.',
  },
  {
    bold: 'Keep rotating, stay seen.',
    rest: ' Swap creative as one tires and your brand stays in front of people instead of fading out of the feed.',
  },
  {
    bold: `Pay $${PRICE}, not $${COMPARE}.`,
    rest: ` Three ads at $49 each is $${PRICE} — versus $${COMPARE} at the regular $149. You save $${SAVE}, today only.`,
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

function IconDownArrow() {
  return (
    <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v5M9.5 11l2.5 2.5 2.5-2.5" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════ */
export default function Down1Page() {
  const router = useRouter();

  function handleAccept() {
    // TODO: Stripe one-click charge $147 to card on file from the $49 order.
    // Example:
    //   const res = await fetch('/api/checkout/down1', { method: 'POST' });
    //   const { url } = await res.json();
    //   window.location.href = url;
    try {
      const prev = JSON.parse(localStorage.getItem('topk_funnel_step') || '{}');
      localStorage.setItem(
        'topk_funnel_step',
        JSON.stringify({ ...prev, gotD1: true, step: 'thanks' }),
      );
    } catch (_) { /* storage blocked */ }
    router.push('/lp/a/thanks');
  }

  function handleDecline() {
    router.push('/lp/a/thanks');
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

      {/* ── REASSURANCE STRIP ── */}
      <div style={{
        background: 'rgba(249,115,22,.1)', color: '#F97316', textAlign: 'center',
        padding: '11px 20px',
        fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 14,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: 10, flexWrap: 'wrap',
        borderBottom: '1px solid rgba(249,115,22,.18)',
      }}>
        <IconDownArrow />
        <span>No problem — that one was a big jump. Here's a smaller way to lock your $49 price.</span>
      </div>

      {/* ── MAIN ── */}
      <main style={{ maxWidth: 680, margin: '0 auto', padding: '48px 24px 80px', textAlign: 'center' }}>

        {/* Eyebrow badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 7,
          padding: '7px 18px', borderRadius: 9999,
          background: 'rgba(249,115,22,.1)', color: '#F97316',
          fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 13,
          letterSpacing: '.04em', textTransform: 'uppercase',
        }}>
          WAIT — A SMALLER OPTION
        </div>

        {/* Headline */}
        <h1 style={{
          fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: 38,
          lineHeight: 1.14, letterSpacing: '-0.02em',
          margin: '22px auto 0', maxWidth: '20ch',
        }}>
          Totally fair — start smaller.{' '}
          <span style={{ background: GRAD, WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Get {AD_COUNT} ads at your $49 price.
          </span>
        </h1>

        {/* Sub-headline */}
        <p style={{ fontSize: 19, color: '#6B7280', maxWidth: '52ch', margin: '18px auto 0', lineHeight: 1.65 }}>
          Six was a lot at once — no pressure. But don't walk away from the $49 intro price entirely.
          Grab <strong style={{ color: '#0A0008' }}>3 ads</strong> at $49 each, still on this page only,
          before the price goes back to $149.
        </p>

        {/* Offer card */}
        <div style={{
          background: '#FFFFFF', borderRadius: 16,
          border: '1px solid #E5E7EB',
          boxShadow: '0px 8px 40px rgba(0,0,0,.08)',
          padding: 30, marginTop: 28, textAlign: 'left',
        }}>
          <div style={{ display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap' }}>

            {/* Bullets column */}
            <div style={{ flex: 1, minWidth: 200 }}>
              <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 21, color: '#0A0008', marginBottom: 16 }}>
                3-Ad Starter Bundle
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

            {/* Price pill — orange accent (downsell visual step-down from gradient) */}
            <div style={{
              width: 188, flexShrink: 0,
              background: '#FFF5F5',
              border: '1.5px solid #F97316',
              borderRadius: 14, padding: 22, textAlign: 'center',
            }}>
              <div style={{ fontSize: 13, color: '#9CA3AF', textDecoration: 'line-through', fontFamily: "'Poppins', sans-serif" }}>
                ${COMPARE}
              </div>
              <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: 42, lineHeight: 1.05, color: '#F97316' }}>
                ${PRICE}
              </div>
              <div style={{ fontSize: 12, color: '#6B7280', fontFamily: "'Poppins', sans-serif", fontWeight: 600, letterSpacing: '.04em' }}>
                {AD_COUNT} ADS · ONE-TIME
              </div>
              <div style={{
                marginTop: 10, fontSize: 12, fontFamily: "'Poppins', sans-serif", fontWeight: 700,
                background: 'rgba(249,115,22,.12)', color: '#F97316',
                padding: '4px 12px', borderRadius: 9999,
                display: 'inline-block',
              }}>
                Save ${SAVE}
              </div>
            </div>

          </div>
        </div>

        {/* ACCEPT CTA */}
        <button
          className="lp-btn-grad"
          onClick={handleAccept}
          style={{
            marginTop: 28, width: '100%', maxWidth: 520, padding: '18px 24px',
            border: 'none', borderRadius: 14,
            background: GRAD, color: '#fff',
            fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 17,
            cursor: 'pointer',
            boxShadow: '0px 4px 18px rgba(249,115,22,.34)',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 9,
          }}
        >
          Yes — add 3 ads for ${PRICE}
          <IconArrow />
        </button>

        {/* Micro-copy */}
        <div style={{ marginTop: 9, fontSize: 13, color: '#9CA3AF' }}>
          One click · same card on file · save ${SAVE} vs. ${COMPARE} · love it, or it's free.
        </div>

        {/* DECLINE link */}
        <div style={{ marginTop: 18 }}>
          <button
            onClick={handleDecline}
            style={{
              background: 'none', border: 'none',
              color: '#9CA3AF',
              fontFamily: "'Inter', sans-serif", fontSize: 14,
              cursor: 'pointer', textDecoration: 'underline', padding: 0,
            }}
          >
            No thanks — just my one ad.
          </button>
        </div>

      </main>
    </div>
  );
}
