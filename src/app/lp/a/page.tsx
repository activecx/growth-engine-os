// NEW light-theme sales page — rebuilt from TopK AI Video Funnel.dc.html
// Replaces old dark /lp/a page. Old _components left in place but unused.
'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

/* ─── Design constants ─────────────────────────────────────── */
const GRAD = 'linear-gradient(135deg,#F97316 0%,#EC4899 50%,#8B5CF6 100%)';
const GRAD_H = 'linear-gradient(90deg,#F97316 0%,#EC4899 50%,#8B5CF6 100%)';

/* ─── Prices (from data-props) ─────────────────────────────── */
const BASE_PRICE = 49;
const COMPARE_PRICE = 149;
const BUMP_PRICE = 27;
const TIMER_START = 14 * 60 + 59; // 14:59

/* ─── Copy (from data-props) ───────────────────────────────── */
const COPY = {
  eyebrow: 'AI VIDEO ADS — DONE FOR YOU',
  headlineLead: 'A video ad of your product used to cost thousands.',
  headlineAccent: 'Now your first one is $49 — Save $100.',
  subhead:
    'No studio. No models. No crew. No weeks of editing. With AI and our experience, we build a 15-second vertical ad of YOUR product — hook, showcase, call-to-action, music and captions — in 48 hours. Regular price $149 — today $49, you save $100. Love it, or it\'s free.',
  urgencyLine: 'Intro launch: your first AI video ad is just $49 — Save $100 off the regular $149. Limited onboarding slots this month.',
  videoCaption: '3 AI ads we shipped this week — in under an hour each',
  orderTitle: 'Claim your first AI ad',
  savePct: 'Save $100',
  bumpName: 'Yes! Add the All-Format Pack',
  bumpDesc:
    'Get your ad resized for Reels, TikTok, Stories, YouTube & feed (9:16, 1:1, 16:9). One click, every platform covered.',
};

/* ─── Value stack — honest deliverables (no fantasy totals) ── */
const VALUE_STACK = [
  { title: 'Custom 15-second vertical (9:16) AI video ad', desc: 'Hook → product showcase → CTA — built for your product' },
  { title: 'Scroll-stopping hook', desc: 'Written for your product before we build a single frame' },
  { title: 'Licensed music', desc: 'Mixed to your ad — cleared for paid channels' },
  { title: 'On-screen captions', desc: 'Styled for sound-off autoplay on every platform' },
  { title: '3 free revisions', desc: 'Until it\'s exactly what you pictured' },
  { title: '48-hour delivery', desc: 'From brief to finished ad — days, not weeks' },
  { title: 'Multi-platform export', desc: 'Ready to run on Meta, TikTok & Instagram (9:16)' },
];

/* ─── Testimonials — PLACEHOLDER: replace with real consented quotes ── */
const TESTIMONIALS = [
  {
    quote: 'We had a finished ad live on Meta the next morning. It outperformed the studio spot we paid 40x for.',
    name: 'Lina Haddad',
    role: 'Head of Growth, DTC beauty',
    initial: 'L',
  },
  {
    quote: 'No crew, no shoot day, no back-and-forth. Brief in, banger out. This is how we ship creative now.',
    name: 'Omar Farouk',
    role: 'Founder, F&B brand',
    initial: 'O',
  },
  {
    quote: 'The hook testing alone paid for itself. Our CPA dropped 31% in the first week.',
    name: 'Dana Saleh',
    role: 'Performance lead, retail',
    initial: 'D',
  },
];

/* ─── Portfolio clips (real files from public/topk/portfolio/) ─── */
const PORTFOLIO_CLIPS = [
  { file: 'iphone.mp4',       label: 'iPhone',       cat: 'Tech · Hyper-Motion', dur: '0:15' },
  { file: 'stylex.mp4',       label: 'Stylex',       cat: 'Jewelry',             dur: '0:08' },
  { file: 'casio.mp4',        label: 'Casio',        cat: 'Watch · G-Shock',     dur: '0:10' },
  { file: 'askim.mp4',        label: 'Askim',        cat: 'Cosmetics',           dur: '0:08' },
  { file: 'askim-2.mp4',      label: 'Askim',        cat: 'Cosmetics · Beauty',  dur: '0:03' },
  { file: 'gucci-floral.mp4', label: 'Gucci Floral', cat: 'Fragrance',           dur: '0:15' },
];

/* ─── Helpers ──────────────────────────────────────────────── */
function money(n: number) {
  return '$' + n.toLocaleString('en-US');
}

function mmss(s: number) {
  const m = Math.floor(s / 60);
  const r = s % 60;
  return m + ':' + (r < 10 ? '0' : '') + r;
}

/* ─── Inline SVG icon components ───────────────────────────── */
function IconLock({ color = 'currentColor', size = 15 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function IconClock({ size = 13 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function IconPlay({ color = '#FFFFFF', size = 32, marginLeft = 5 }: { color?: string; size?: number; marginLeft?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} style={{ marginLeft, position: 'relative' }}>
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function IconArrow({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

function IconCheckCircle({ size = 20, stroke = '#F97316', strokeWidth = 2.5 }: { size?: number; stroke?: string; strokeWidth?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}>
      <path d="M9 12l2 2 4-4" />
      <circle cx="12" cy="12" r="9" />
    </svg>
  );
}

function IconXCircle({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}>
      <circle cx="12" cy="12" r="9" />
      <path d="M15 9l-6 6M9 9l6 6" />
    </svg>
  );
}

function IconCheckMini({ color = '#fff', size = 15 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function IconShield({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function StarFill({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#F97316">
      <path d="M12 2l3 6.5 7 .9-5 4.8 1.3 7L12 18l-6.6 3.2L6.7 14l-5-4.8 7-.9z" />
    </svg>
  );
}

function OrangeCheckCircle({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 1 }}>
      <path d="M9 12l2 2 4-4" /><circle cx="12" cy="12" r="9" />
    </svg>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PAGE COMPONENT
   ═══════════════════════════════════════════════════════════════ */
export default function LpAPage() {
  const router = useRouter();

  /* ── Countdown timer ─────────────────────────────────────── */
  const [seconds, setSeconds] = useState(TIMER_START);
  useEffect(() => {
    const id = setInterval(() => setSeconds(s => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, []);

  /* ── Form step ───────────────────────────────────────────── */
  const [formStep, setFormStep] = useState<'info' | 'pay'>('info');

  /* ── Order bump ──────────────────────────────────────────── */
  const [bump, setBump] = useState(false);

  /* ── Contact fields ──────────────────────────────────────── */
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [brand, setBrand] = useState('');

  /* ── Scroll-to-form ──────────────────────────────────────── */
  const orderRef = useRef<HTMLElement>(null);
  const scrollToOrder = useCallback(() => {
    if (orderRef.current) {
      const top = orderRef.current.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }, []);

  /* ── Derived ─────────────────────────────────────────────── */
  const total = BASE_PRICE + (bump ? BUMP_PRICE : 0);

  /* ── Submit stub ─────────────────────────────────────────── */
  function handleCompleteOrder() {
    // TODO: Zoho lead capture (name/email/brand) + Stripe Checkout $49 (or $76 w/bump)
    const orderNo = 'TK' + Math.floor(100000 + Math.random() * 899999);
    try {
      localStorage.setItem(
        'topk_funnel_cart',
        JSON.stringify({ orderNo, bump, basePrice: BASE_PRICE, bumpPrice: BUMP_PRICE }),
      );
      localStorage.setItem(
        'topk_funnel_step',
        JSON.stringify({ step: 'up1', got1: false, got2: false, gotD1: false, gotD2: false }),
      );
    } catch (_) { /* storage blocked in some contexts */ }
    router.push('/lp/a/oto1');
  }

  /* ── Progress bar colors ──────────────────────────────────── */
  const infoBarColor = GRAD_H;
  const payBarColor = formStep === 'pay' ? 'linear-gradient(90deg,#EC4899,#8B5CF6)' : '#E5E7EB';

  /* ── Bump UI colors (from renderVals) ─────────────────────── */
  const bumpBorder = bump ? '#F97316' : '#E5E7EB';
  const bumpBg     = bump ? 'rgba(249,115,22,.06)' : '#FFFBFA';
  const bumpCheckBg     = bump ? '#F97316' : '#FFFFFF';
  const bumpCheckBorder = bump ? '#F97316' : '#D1D5DB';

  /* ════════════════════════════════════════════════════════════
     RENDER
     ════════════════════════════════════════════════════════════ */
  return (
    <div style={{
      minHeight: '100vh',
      background: '#FFF5F5',
      fontFamily: "'Inter', sans-serif",
      color: '#0A0008',
      lineHeight: 1.6,
    }}>

      {/* ── STICKY HEADER ────────────────────────────────────── */}
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
          <span className="lp-grad-text">TopK</span>
          <span style={{ color: '#0A0008' }}>&nbsp;AI</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#6B7280', fontWeight: 500 }}>
          <IconLock color="#16A34A" size={15} />
          <span>Secure 256-bit checkout</span>
        </div>
      </header>

      {/* ── COUNTDOWN ANNOUNCEMENT BAR ───────────────────────── */}
      <div style={{
        background: '#0A0008', color: '#FFFFFF', textAlign: 'center',
        padding: '11px 20px',
        fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 14,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: 12, flexWrap: 'wrap',
      }}>
        <span style={{ opacity: .78 }}>{COPY.urgencyLine}</span>
        <span style={{
          display: 'inline-flex', alignItems: 'center', gap: 7,
          background: 'rgba(249,115,22,.18)',
          border: '1px solid rgba(249,115,22,.45)',
          color: '#FDBA74',
          padding: '3px 12px', borderRadius: 9999,
        }}>
          <IconClock size={13} />
          <span className="lp-blink">Expires in {mmss(seconds)}</span>
        </span>
      </div>

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section style={{ maxWidth: 880, margin: '0 auto', padding: '54px 24px 6px', textAlign: 'center' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 7,
          padding: '6px 16px', borderRadius: 9999,
          background: 'rgba(249,115,22,.1)', color: '#F97316',
          fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 13,
          letterSpacing: '0.06em', textTransform: 'uppercase',
        }}>
          {COPY.eyebrow}
        </div>
        <h1 style={{
          fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: 54,
          lineHeight: 1.08, letterSpacing: '-0.02em',
          margin: '20px auto 0', maxWidth: '15ch',
        }}>
          {COPY.headlineLead}{' '}
          <span className="lp-grad-text">{COPY.headlineAccent}</span>
        </h1>
        <p style={{ fontSize: 20, color: '#6B7280', maxWidth: '56ch', margin: '20px auto 0' }}>
          {COPY.subhead}
        </p>
      </section>

      {/* ── VSL PLAYER ───────────────────────────────────────── */}
      <section style={{ maxWidth: 760, margin: '0 auto', padding: '28px 24px 0' }}>
        {/* TODO: swap in the final Rihanna VSL video — replace poster img with <video> */}
        <div style={{
          position: 'relative', width: '100%', aspectRatio: '16 / 9',
          borderRadius: 16, overflow: 'hidden',
          boxShadow: '0px 18px 60px rgba(10,0,8,.22)',
          background: '#0A0008',
        }}>
          {/* Poster image — replace with real VSL thumbnail */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/topk/hero-model.png"
            alt="TopK AI ad — VSL thumbnail"
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          />
          {/* Gradient overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(180deg,rgba(10,0,8,.12) 0%,rgba(10,0,8,.55) 100%)',
            pointerEvents: 'none',
          }} />
          {/* Play button — scrolls to order form */}
          <button
            onClick={scrollToOrder}
            aria-label="Play video"
            style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translate(-50%,-50%)',
              width: 88, height: 88,
              border: 'none', borderRadius: '50%',
              background: GRAD, cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 8px 30px rgba(236,72,153,.5)',
            }}
          >
            <span className="lp-pulse-ring" />
            <IconPlay color="#FFFFFF" size={32} marginLeft={5} />
          </button>
          {/* Caption bar */}
          <div style={{
            position: 'absolute', left: 0, right: 0, bottom: 0,
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '14px 18px', color: '#fff',
            fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 14,
          }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: 'rgba(255,255,255,.15)', backdropFilter: 'blur(6px)',
              padding: '4px 10px', borderRadius: 9999, fontSize: 12,
            }}>
              <span className="lp-blink" style={{ width: 7, height: 7, borderRadius: '50%', background: '#F87171', display: 'inline-block' }} />
              WATCH
            </span>
            <span style={{ opacity: .9 }}>{COPY.videoCaption}</span>
          </div>
        </div>
      </section>

      {/* ── 2-STEP ORDER FORM ────────────────────────────────── */}
      <section
        id="order-form"
        ref={orderRef}
        style={{ maxWidth: 560, margin: '0 auto', padding: '40px 24px 8px', scrollMarginTop: 80 }}
      >
        <div style={{
          background: '#FFFFFF', borderRadius: 16,
          border: '1px solid #E5E7EB',
          boxShadow: '0px 4px 24px rgba(0,0,0,.06)',
          overflow: 'hidden',
        }}>

          {/* Gradient price header */}
          <div style={{ background: GRAD, padding: '20px 28px', color: '#fff', textAlign: 'center' }}>
            <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 20 }}>
              {COPY.orderTitle}
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 10, marginTop: 4 }}>
              <span style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: 34, lineHeight: 1 }}>
                {money(BASE_PRICE)}
              </span>
              <span style={{ textDecoration: 'line-through', opacity: .7, fontSize: 17 }}>
                {money(COMPARE_PRICE)}
              </span>
              <span style={{
                background: 'rgba(255,255,255,.2)', padding: '3px 10px',
                borderRadius: 9999, fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 12,
              }}>
                {COPY.savePct}
              </span>
            </div>
          </div>

          {/* Step progress */}
          <div style={{ display: 'flex', gap: 8, padding: '18px 28px 0' }}>
            <div style={{ flex: 1 }}>
              <div style={{ height: 5, borderRadius: 9999, background: infoBarColor }} />
              <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 11, letterSpacing: '.06em', textTransform: 'uppercase', color: '#6B7280', marginTop: 7 }}>
                1 · Your info
              </div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ height: 5, borderRadius: 9999, background: payBarColor }} />
              <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 11, letterSpacing: '.06em', textTransform: 'uppercase', color: '#6B7280', marginTop: 7 }}>
                2 · Payment
              </div>
            </div>
          </div>

          <div style={{ padding: '18px 28px 28px' }}>

            {/* ── Step 1: Contact info ── */}
            {formStep === 'info' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div>
                  <label style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 13, display: 'block', marginBottom: 6 }}>
                    Full name
                  </label>
                  <input
                    type="text"
                    placeholder="Jordan Hayes"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    style={{ width: '100%', padding: '13px 15px', border: '1.5px solid #E5E7EB', borderRadius: 10, fontFamily: "'Inter', sans-serif", fontSize: 16, background: '#fff', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 13, display: 'block', marginBottom: 6 }}>
                    Email address
                  </label>
                  <input
                    type="email"
                    placeholder="you@brand.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    style={{ width: '100%', padding: '13px 15px', border: '1.5px solid #E5E7EB', borderRadius: 10, fontFamily: "'Inter', sans-serif", fontSize: 16, background: '#fff', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 13, display: 'block', marginBottom: 6 }}>
                    Brand / website
                  </label>
                  <input
                    type="text"
                    placeholder="yourbrand.com"
                    value={brand}
                    onChange={e => setBrand(e.target.value)}
                    style={{ width: '100%', padding: '13px 15px', border: '1.5px solid #E5E7EB', borderRadius: 10, fontFamily: "'Inter', sans-serif", fontSize: 16, background: '#fff', boxSizing: 'border-box' }}
                  />
                </div>
                <button
                  className="lp-btn-grad"
                  onClick={() => setFormStep('pay')}
                  style={{
                    marginTop: 4, width: '100%', padding: 16, border: 'none', borderRadius: 14,
                    background: GRAD, color: '#fff',
                    fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 16,
                    cursor: 'pointer', boxShadow: '0px 4px 18px rgba(236,72,153,.32)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  }}
                >
                  Continue to payment
                  <IconArrow size={18} />
                </button>
              </div>
            )}

            {/* ── Step 2: Payment + order bump ── */}
            {formStep === 'pay' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div>
                  <label style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 13, display: 'block', marginBottom: 6 }}>
                    Card number
                  </label>
                  <input
                    type="text"
                    placeholder="1234 1234 1234 1234"
                    style={{ width: '100%', padding: '13px 15px', border: '1.5px solid #E5E7EB', borderRadius: 10, fontFamily: "'Inter', sans-serif", fontSize: 16, background: '#fff', boxSizing: 'border-box' }}
                  />
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 13, display: 'block', marginBottom: 6 }}>
                      Expiry
                    </label>
                    <input
                      type="text"
                      placeholder="MM / YY"
                      style={{ width: '100%', padding: '13px 15px', border: '1.5px solid #E5E7EB', borderRadius: 10, fontFamily: "'Inter', sans-serif", fontSize: 16, background: '#fff', boxSizing: 'border-box' }}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 13, display: 'block', marginBottom: 6 }}>
                      CVC
                    </label>
                    <input
                      type="text"
                      placeholder="123"
                      style={{ width: '100%', padding: '13px 15px', border: '1.5px solid #E5E7EB', borderRadius: 10, fontFamily: "'Inter', sans-serif", fontSize: 16, background: '#fff', boxSizing: 'border-box' }}
                    />
                  </div>
                </div>

                {/* ORDER BUMP */}
                <div
                  onClick={() => setBump(b => !b)}
                  style={{
                    cursor: 'pointer',
                    border: `2px dashed ${bumpBorder}`,
                    background: bumpBg,
                    borderRadius: 12, padding: 16,
                    display: 'flex', gap: 12, alignItems: 'flex-start',
                    transition: 'all .15s ease',
                  }}
                >
                  <div style={{
                    width: 24, height: 24, borderRadius: 6,
                    border: `2px solid ${bumpCheckBorder}`,
                    background: bumpCheckBg,
                    flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginTop: 2,
                  }}>
                    <span style={{ opacity: bump ? 1 : 0 }}>
                      <IconCheckMini color="#fff" size={15} />
                    </span>
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 15, color: '#0A0008' }}>
                      {COPY.bumpName} —{' '}
                      <span style={{ color: '#F97316' }}>+{money(BUMP_PRICE)}</span>
                    </div>
                    <div style={{ fontSize: 14, color: '#6B7280', marginTop: 3 }}>{COPY.bumpDesc}</div>
                  </div>
                </div>

                {/* Complete order CTA */}
                <button
                  className="lp-btn-grad"
                  onClick={handleCompleteOrder}
                  style={{
                    marginTop: 4, width: '100%', padding: 18, border: 'none', borderRadius: 14,
                    background: GRAD, color: '#fff',
                    fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 17,
                    cursor: 'pointer', boxShadow: '0px 2px 16px rgba(236,72,153,.35)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9,
                  }}
                >
                  <IconLock color="#fff" size={19} />
                  Complete my order — {money(total)}
                </button>

                <button
                  onClick={() => setFormStep('info')}
                  style={{
                    background: 'none', border: 'none', color: '#9CA3AF',
                    fontFamily: "'Inter', sans-serif", fontSize: 13,
                    cursor: 'pointer', padding: 0, textDecoration: 'underline', alignSelf: 'center',
                  }}
                >
                  ← Back to your info
                </button>
              </div>
            )}

            {/* Trust row */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              gap: 16, marginTop: 18, paddingTop: 16,
              borderTop: '1px solid #E5E7EB',
              color: '#9CA3AF', fontSize: 12, flexWrap: 'wrap',
            }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                <IconLock color="currentColor" size={13} /> SSL encrypted
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="9"/></svg>
                14-day guarantee
              </span>
              <span>Visa · Mastercard · Amex</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── STORY: THE OLD WAY → THE TOPK WAY ───────────────── */}
      <section style={{ maxWidth: 940, margin: '0 auto', padding: '66px 24px 0' }}>
        <div style={{ textAlign: 'center', maxWidth: 760, margin: '0 auto' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 7,
            padding: '6px 16px', borderRadius: 9999,
            background: 'rgba(10,0,8,.06)', color: '#6B7280',
            fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 13,
            letterSpacing: '.06em', textTransform: 'uppercase',
          }}>
            The old way is broken
          </div>
          <h2 style={{
            fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 38,
            lineHeight: 1.16, letterSpacing: '-0.02em', margin: '18px 0 0',
          }}>
            One good ad used to cost you weeks — and a small fortune
          </h2>
          <p style={{ fontSize: 19, color: '#6B7280', lineHeight: 1.7, margin: '20px 0 0' }}>
            You know the routine. You need one ad, so you go find a model. You book her. You line up a crew,
            a location, a shoot day that&#39;s still two weeks out. Then come the reshoots, the &#34;let&#39;s try one more
            look,&#34; the days of editing traded over email. Weeks pass. An invoice for thousands lands on your
            desk. And the ad? It&#39;s <em>fine</em>. Not great. But you already paid — so you run it anyway.
          </p>
        </div>

        {/* Before / After grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 20, marginTop: 42, alignItems: 'stretch',
        }}>

          {/* BEFORE AI */}
          <div style={{
            background: '#FFFFFF', border: '1px solid #E5E7EB',
            borderRadius: 16, padding: 30, filter: 'grayscale(.25)',
          }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 7,
              padding: '5px 13px', borderRadius: 9999,
              background: '#F3F4F6', color: '#6B7280',
              fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 12, letterSpacing: '.05em',
            }}>
              BEFORE AI
            </div>
            <h3 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 22, margin: '16px 0 4px', color: '#374151' }}>
              Hire. Shoot. Wait. Settle.
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: '18px 0 0', display: 'flex', flexDirection: 'column', gap: 15 }}>
              {[
                "Find a model. Book her. Wait for a shoot day that's weeks away.",
                'A crew, a studio, lighting, a location — all billed by the hour.',
                'Days of editing. Revisions crawling back and forth over email.',
                "Weeks later, an invoice for thousands — for a video you're unsure of.",
                "Don't like the result? Too bad. You already paid. You live with it.",
              ].map((text, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, fontSize: 15, color: '#6B7280', lineHeight: 1.5 }}>
                  <IconXCircle size={20} />
                  {text}
                </li>
              ))}
            </ul>
          </div>

          {/* THE TOPK WAY */}
          <div className="lp-grad-border" style={{ padding: 30 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 7,
              padding: '5px 13px', borderRadius: 9999,
              background: GRAD, color: '#fff',
              fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 12, letterSpacing: '.05em',
            }}>
              THE TOPK WAY
            </div>
            <h3 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 22, margin: '16px 0 4px', color: '#0A0008' }}>
              Brief in. Banger out.
            </h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: '18px 0 0', display: 'flex', flexDirection: 'column', gap: 15 }}>
              {([
                <>Send a brief. We render your ad with an AI model built to your brand.</>,
                <>No casting. No crew. No shoot day. No agency fees. None of it.</>,
                <>Don&#39;t love it? We revise — <strong style={{ color: '#0A0008' }}>free. Three rounds</strong>, until it&#39;s right.</>,
                <>It lands in <strong style={{ color: '#0A0008' }}>days, not weeks</strong>. Usually 48 hours.</>,
                <>Your first ad is <strong style={{ color: '#0A0008' }}>$49 — Save $100</strong> off the regular $149. Love it, or it&apos;s free.</>,
              ] as React.ReactNode[]).map((text, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, fontSize: 15, color: '#374151', lineHeight: 1.5 }}>
                  <IconCheckCircle size={20} stroke="#F97316" strokeWidth={2.5} />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Closing punch + CTA */}
        <div style={{ textAlign: 'center', marginTop: 38 }}>
          <p style={{
            fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 23,
            lineHeight: 1.4, letterSpacing: '-0.01em',
            maxWidth: '24ch', margin: '0 auto',
          }}>
            You write the brief. We do the rest. You only pay if you love it.
          </p>
          <button
            className="lp-btn-grad"
            onClick={scrollToOrder}
            style={{
              marginTop: 24, padding: '16px 34px', border: 'none', borderRadius: 14,
              background: GRAD, color: '#fff',
              fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 16,
              cursor: 'pointer', boxShadow: '0px 4px 18px rgba(236,72,153,.34)',
            }}
          >
            Claim my first ad — {money(BASE_PRICE)}
          </button>
        </div>
      </section>

      {/* ── EXAMPLES SHOWCASE ────────────────────────────────── */}
      <section style={{ maxWidth: 1080, margin: '0 auto', padding: '66px 24px 0' }}>
        <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 7,
            padding: '6px 16px', borderRadius: 9999,
            background: 'rgba(249,115,22,.1)', color: '#F97316',
            fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 13,
            letterSpacing: '.06em', textTransform: 'uppercase',
          }}>
            Proof, not promises
          </div>
          <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 34, letterSpacing: '-0.02em', margin: '16px 0 0' }}>
            Recently shipped — made with AI, live in hours
          </h2>
          <p style={{ fontSize: 17, color: '#6B7280', margin: '14px 0 0' }}>
            Sample ads rendered with our AI models — concept to cut. No studio. No crew. Just a brief.
          </p>
        </div>

        {/* Horizontal scroll strip — 9:16 cards */}
        <div className="lp-scroll-track">
          {PORTFOLIO_CLIPS.map(clip => (
            <div key={clip.file} style={{ flex: '0 0 auto', width: 204, scrollSnapAlign: 'start' }}>
              <div style={{
                position: 'relative', width: '100%', aspectRatio: '9 / 16',
                borderRadius: 16, overflow: 'hidden',
                background: '#0A0008', boxShadow: '0px 6px 26px rgba(10,0,8,.16)',
              }}>
                <video
                  src={`/topk/portfolio/${clip.file}`}
                  loop muted playsInline
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                  onMouseEnter={e => void (e.currentTarget as HTMLVideoElement).play()}
                  onMouseLeave={e => { const v = e.currentTarget as HTMLVideoElement; v.pause(); v.currentTime = 0; }}
                />
                <div style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(180deg,rgba(10,0,8,0) 42%,rgba(10,0,8,.74) 100%)',
                  pointerEvents: 'none',
                }} />
                <div style={{
                  position: 'absolute', top: 10, left: 10,
                  background: 'rgba(255,255,255,.16)', backdropFilter: 'blur(6px)',
                  color: '#fff', fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 10,
                  letterSpacing: '.04em', padding: '3px 9px', borderRadius: 9999,
                }}>
                  9:16 · {clip.dur}
                </div>
                <button
                  aria-label={`Play ${clip.label}`}
                  style={{
                    position: 'absolute', top: '50%', left: '50%',
                    transform: 'translate(-50%,-50%)',
                    width: 46, height: 46, border: 'none', borderRadius: '50%',
                    background: 'rgba(255,255,255,.92)', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 4px 16px rgba(0,0,0,.3)',
                  }}
                  onClick={e => {
                    const v = (e.currentTarget as HTMLElement).parentElement?.querySelector('video') as HTMLVideoElement | null;
                    if (v) { v.paused ? void v.play() : (v.pause(), (v.currentTime = 0)); }
                  }}
                >
                  <IconPlay color="#0A0008" size={17} marginLeft={3} />
                </button>
                <div style={{ position: 'absolute', left: 12, right: 12, bottom: 11, color: '#fff', fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 13 }}>
                  {clip.label}
                  <span style={{ display: 'block', fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: 11, opacity: .82 }}>
                    {clip.cat}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── VALUE STACK ──────────────────────────────────────── */}
      <section style={{ maxWidth: 680, margin: '0 auto', padding: '52px 24px 0' }}>
        <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 34, letterSpacing: '-0.02em', textAlign: 'center', margin: 0 }}>
          Here&#39;s everything included in your first ad
        </h2>
        <div style={{
          background: '#FFFFFF', borderRadius: 16,
          border: '1px solid #E5E7EB', boxShadow: '0px 4px 24px rgba(0,0,0,.06)',
          padding: '8px 28px', marginTop: 24,
        }}>
          {VALUE_STACK.map((row, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'flex-start',
              gap: 13, padding: '18px 0',
              borderBottom: i < VALUE_STACK.length - 1 ? '1px solid #F3F4F6' : 'none',
            }}>
              <OrangeCheckCircle size={22} />
              <div>
                <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 16, color: '#0A0008' }}>{row.title}</div>
                <div style={{ fontSize: 14, color: '#6B7280' }}>{row.desc}</div>
              </div>
            </div>
          ))}
          {/* Pricing summary row */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '20px 0', borderTop: '2px solid #F3F4F6', gap: 12, flexWrap: 'wrap',
          }}>
            <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 17, color: '#0A0008' }}>
              Regular{' '}
              <span style={{ textDecoration: 'line-through', color: '#9CA3AF', fontWeight: 500 }}>{money(COMPARE_PRICE)}</span>
              {' · Today '}
              <span className="lp-grad-text">{money(BASE_PRICE)}</span>
              {' — you Save $100'}
            </div>
            <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 14, color: '#6B7280' }}>
              Love it, or it&apos;s free.
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: 18 }}>
          <button
            className="lp-btn-grad"
            onClick={scrollToOrder}
            style={{
              padding: '15px 32px', border: 'none', borderRadius: 14,
              background: GRAD, color: '#fff',
              fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 16,
              cursor: 'pointer', boxShadow: '0px 4px 18px rgba(236,72,153,.34)',
            }}
          >
            Get My {money(BASE_PRICE)} Ad
          </button>
          <div style={{ marginTop: 10, fontSize: 13, color: '#9CA3AF' }}>
            15-sec vertical ad · music + captions · 3 free revisions · 48-hour delivery · love it or it&apos;s free.
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS — PLACEHOLDER ───────────────────────── */}
      {/* TODO: replace with real consented quotes before launch */}
      <section style={{ maxWidth: 880, margin: '0 auto', padding: '52px 24px 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
          {TESTIMONIALS.map((t, i) => (
            <div key={i} style={{
              background: '#FFFFFF', borderRadius: 16,
              border: '1px solid #E5E7EB', boxShadow: '0px 4px 24px rgba(0,0,0,.06)',
              padding: 24,
            }}>
              <div style={{ display: 'flex', gap: 3, marginBottom: 12 }}>
                {[0,1,2,3,4].map(s => <StarFill key={s} size={16} />)}
              </div>
              <p style={{ margin: 0, color: '#0A0008', fontSize: 15, lineHeight: 1.55 }}>{t.quote}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 11, marginTop: 16 }}>
                <div style={{
                  width: 38, height: 38, borderRadius: '50%',
                  background: 'linear-gradient(135deg,#F97316,#8B5CF6)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 15,
                }}>
                  {t.initial}
                </div>
                <div>
                  <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 14 }}>{t.name}</div>
                  <div style={{ fontSize: 13, color: '#9CA3AF' }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section style={{ maxWidth: 680, margin: '0 auto', padding: '52px 24px 0' }}>
        <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 34, letterSpacing: '-0.02em', textAlign: 'center', margin: '0 0 32px' }}>
          Common questions
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {([
            {
              q: 'What exactly do I get for $49?',
              a: 'One finished 15-second vertical (9:16) AI video ad of your product, built as hook → product showcase → call-to-action, with licensed music and on-screen captions. You get 3 free revisions, and it\'s delivered within 48 hours, ready to run on Meta, TikTok, and Instagram. The regular price is $149 — today it\'s $49, so you save $100 on your first one.',
            },
            {
              q: 'How long is the video?',
              a: '15 seconds. It\'s a vertical (9:16) ad built to stop the scroll and drive a click — short on purpose, because that\'s what performs in the feed. Want longer 30-second cuts or more variations? Those live in the Campaign Pack after your first ad.',
            },
            {
              q: 'How fast do I get it?',
              a: 'Within 48 hours of receiving your product photos and brief.',
            },
            {
              q: 'What do you need from me?',
              a: 'A few photos of your product and a one-line brief. That\'s it — no studio, no models, no crew, nothing to ship.',
            },
            {
              q: 'What if I don\'t like it?',
              a: 'Then it\'s free. You get 3 free revisions to make it right, and if you still don\'t love it, you don\'t pay — full refund. "Love it, or it\'s free."',
            },
            {
              q: 'Can I run it on Meta, TikTok, and Instagram?',
              a: 'Yes. It\'s delivered ready to run on all of them. Want every other size too (1:1, 4:5, 16:9)? Add the All-Format Pack for $27 at checkout.',
            },
            {
              q: 'Is this really only $49?',
              a: 'Yes — that\'s our intro launch price, $100 off the regular $149, while this month\'s onboarding slots last. When they\'re filled, the intro price is gone.',
            },
          ] as { q: string; a: string }[]).map((item, i, arr) => (
            <div key={i} style={{
              background: '#FFFFFF', borderRadius: i === 0 ? '12px 12px 0 0' : i === arr.length - 1 ? '0 0 12px 12px' : 0,
              border: '1px solid #E5E7EB',
              borderTop: i === 0 ? '1px solid #E5E7EB' : 'none',
              padding: '22px 28px',
            }}>
              <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 16, color: '#0A0008', marginBottom: 8 }}>
                {item.q}
              </div>
              <div style={{ fontSize: 15, color: '#6B7280', lineHeight: 1.65 }}>
                {item.a}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── GUARANTEE + FINAL CTA ────────────────────────────── */}
      <section style={{ maxWidth: 680, margin: '0 auto', padding: '52px 24px 72px' }}>
        <div style={{ background: '#0A0008', borderRadius: 16, padding: 40, textAlign: 'center', color: '#fff' }}>
          <div style={{
            width: 64, height: 64, borderRadius: '50%', background: GRAD,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 18px',
          }}>
            <IconShield size={30} />
          </div>
          <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 32, letterSpacing: '-0.02em', margin: 0, color: '#fff' }}>
            Love it, or it&#39;s free. Simple as that.
          </h2>
          <p style={{ color: '#D1D5DB', fontSize: 18, lineHeight: 1.7, maxWidth: '50ch', margin: '16px auto 0' }}>
            Here&#39;s the deal, plainly. You send the brief. We render your first ad and put it in front of you
            in days — not weeks. Don&#39;t love it? We revise it free, up to three rounds, until it&#39;s right.
          </p>
          <p style={{ color: '#9CA3AF', fontSize: 17, lineHeight: 1.7, maxWidth: '50ch', margin: '14px auto 28px' }}>
            And if it still isn&#39;t scroll-stopping? You don&#39;t pay a cent — and you keep the files anyway.
            No invoice for thousands. No shoot day. No risk on your side. Just one great ad — $49, Save $100 off the regular $149.
          </p>
          <button
            className="lp-btn-grad"
            onClick={scrollToOrder}
            style={{
              padding: '17px 38px', border: 'none', borderRadius: 14,
              background: GRAD, color: '#fff',
              fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 17,
              cursor: 'pointer', boxShadow: '0px 4px 18px rgba(236,72,153,.4)',
            }}
          >
            Claim my first ad — {money(BASE_PRICE)}
          </button>
          <div style={{ marginTop: 16, fontSize: 13, color: '#6B7280' }}>
            Risk-free · 3 free revisions · 48-hour delivery · no subscription · love it or it&apos;s free
          </div>
        </div>
      </section>

    </div>
  );
}
