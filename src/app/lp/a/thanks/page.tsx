'use client';

// THANKS — Order Confirmation
// Reached after accepting a bundle or declining the downsell.
// Reads localStorage to determine which bundle (if any) was taken
// and shows the correct soft-line. No new ask — this is the exhale page.

import { useEffect, useState } from 'react';

/* ─── Design constants (match /lp/a) ─────────────────────── */
const GRAD = 'linear-gradient(135deg,#F97316 0%,#EC4899 50%,#8B5CF6 100%)';

/* ─── Purchased bundle type ───────────────────────────────── */
type BundleType = 'six' | 'three' | 'none';

/* ─── SVG helpers ─────────────────────────────────────────── */
function IconLock() {
  return (
    <svg width={17} height={17} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function IconCheckCircle({ size = 20, stroke = '#F97316' }: { size?: number; stroke?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
      <path d="M9 12l2 2 4-4" />
      <circle cx="12" cy="12" r="9" />
    </svg>
  );
}

function IconShield() {
  return (
    <svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

/* ─── What-happens-next steps ─────────────────────────────── */
const STEPS = [
  {
    n: '1',
    title: 'Check your inbox.',
    body: 'In the next few minutes you\'ll get a short email from us to collect your product photos and a one-line brief — just tell us your product, we handle the rest.',
  },
  {
    n: '2',
    title: 'We build your ad.',
    body: 'AI plus our experience — hook, product showcase, call-to-action, music, captions. Nothing for you to film, ship, or set up.',
  },
  {
    n: '3',
    title: 'It lands in 48 hours.',
    body: 'Once we have your photos and brief, your finished ad is in your inbox within 48 hours — ready to run on Meta, TikTok, and Instagram.',
  },
];

/* ═══════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════ */
export default function ThanksPage() {
  const [bundle, setBundle] = useState<BundleType>('none');

  /* Read funnel state from localStorage (set by oto1/down1 accept handlers) */
  useEffect(() => {
    try {
      const step = JSON.parse(localStorage.getItem('topk_funnel_step') || '{}');
      if (step.got1) setBundle('six');
      else if (step.gotD1) setBundle('three');
    } catch (_) { /* storage blocked */ }
  }, []);

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

      {/* ── MAIN ── */}
      <main style={{ maxWidth: 640, margin: '0 auto', padding: '56px 24px 80px', textAlign: 'center' }}>

        {/* Success icon */}
        <div style={{
          width: 72, height: 72, borderRadius: '50%',
          background: GRAD,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 24px',
          boxShadow: '0px 6px 28px rgba(236,72,153,.36)',
        }}>
          <svg width={34} height={34} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>

        {/* Headline — verbatim from UPSELL_copy.md */}
        <h1 style={{
          fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: 38,
          lineHeight: 1.14, letterSpacing: '-0.02em', margin: 0,
        }}>
          You're in. Your ad is officially in the works.{' '}
          <span style={{ background: GRAD, WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            🎉
          </span>
        </h1>

        {/* Body intro */}
        <p style={{ fontSize: 18, color: '#6B7280', maxWidth: '50ch', margin: '18px auto 0', lineHeight: 1.7 }}>
          Thank you — your order is confirmed and your spot for this month is locked.
          Here's exactly what happens next, so there are no surprises:
        </p>

        {/* What-happens-next card */}
        <div style={{
          background: '#FFFFFF', borderRadius: 16,
          border: '1px solid #E5E7EB',
          boxShadow: '0px 4px 24px rgba(0,0,0,.06)',
          padding: '8px 28px', marginTop: 32, textAlign: 'left',
        }}>
          {STEPS.map((s, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'flex-start', gap: 16,
              padding: '22px 0',
              borderBottom: i < STEPS.length - 1 ? '1px solid #F3F4F6' : 'none',
            }}>
              {/* Step number */}
              <div style={{
                width: 36, height: 36, borderRadius: '50%',
                background: GRAD, color: '#fff',
                fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 15,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0, marginTop: 1,
              }}>
                {s.n}
              </div>
              <div>
                <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 16, color: '#0A0008', marginBottom: 4 }}>
                  {s.title}
                </div>
                <div style={{ fontSize: 15, color: '#6B7280', lineHeight: 1.6 }}>
                  {s.body}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Guarantee / reassurance */}
        <div style={{
          background: '#0A0008', borderRadius: 16, padding: '28px 32px',
          marginTop: 24, color: '#fff', display: 'flex', gap: 16,
          alignItems: 'flex-start', textAlign: 'left',
        }}>
          <div style={{
            width: 52, height: 52, borderRadius: '50%', background: GRAD,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <IconShield />
          </div>
          <div>
            <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 18, color: '#fff', marginBottom: 6 }}>
              Love it, or it's free.
            </div>
            <div style={{ fontSize: 15, color: '#D1D5DB', lineHeight: 1.65 }}>
              Watch it, run it — and if you don't love it, you don't pay. The risk is entirely on us.
              All you have to do is reply to that email with your photos.
            </div>
          </div>
        </div>

        {/* Bundle soft-line — only shown if they took OTO1 or DS1 */}
        {bundle !== 'none' && (
          <div style={{
            background: '#FFFFFF', borderRadius: 16,
            border: '1.5px solid #F97316',
            padding: '20px 24px', marginTop: 20,
            display: 'flex', alignItems: 'flex-start', gap: 13, textAlign: 'left',
          }}>
            <IconCheckCircle size={22} stroke="#F97316" />
            <div style={{ fontSize: 15, color: '#374151', lineHeight: 1.6 }}>
              {bundle === 'six' ? (
                <>
                  <strong style={{ color: '#0A0008' }}>And because you locked the 6-Ad Bundle</strong> —
                  your other five ads are reserved at your $49 price too. We'll plan them with you right
                  after your first one lands, so your feed never goes quiet.
                </>
              ) : (
                <>
                  <strong style={{ color: '#0A0008' }}>And because you grabbed the 3-Ad Starter Bundle</strong> —
                  your other two ads are reserved at your $49 price. We'll line them up right after your
                  first one lands, so you've always got fresh creative ready.
                </>
              )}
            </div>
          </div>
        )}

        {/* Closing line */}
        <p style={{ fontSize: 16, color: '#6B7280', marginTop: 32, lineHeight: 1.7 }}>
          Keep an eye on your inbox — the faster you send your photos, the faster your brand becomes
          impossible to scroll past. Talk soon.{' '}
          <strong style={{ color: '#0A0008' }}>— The TopK team</strong>
        </p>

      </main>
    </div>
  );
}
