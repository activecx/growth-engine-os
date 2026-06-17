'use client';

// THANKS — Order Confirmation + Creative Brief intake.
// Reached after accepting a bundle or declining the downsell.
// This page now DOUBLES as the brief form: while motivation is highest and the
// customer is still in-session, we collect the product, style, notes, and photos
// needed to actually build the ad — saved to the order via /api/brief, which
// emails Zaid and attaches the brief to Zoho. Email is only the backup channel.

import { useEffect, useState } from 'react';
import { upload } from '@vercel/blob/client';

/* ─── Design constants (match /lp/a) ─────────────────────── */
const GRAD = 'linear-gradient(135deg,#F97316 0%,#EC4899 50%,#8B5CF6 100%)';

const VIDEO_FORMATS = [
  'Product Ad (scroll-stopping hook)',
  'UGC-style creator video',
  'Unboxing / reveal',
  'Hyper-motion hero shot',
  'Cinematic brand film',
  'Social hook (8-sec)',
  'Not sure — surprise me',
];

/* ─── Purchased bundle type ───────────────────────────────── */
type BundleType = 'six' | 'three' | 'none';

interface Photo { url: string; name: string; }

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

/* ─── Shared input styles ─────────────────────────────────── */
const labelStyle: React.CSSProperties = {
  fontFamily: "'Poppins', sans-serif", fontWeight: 600, fontSize: 13,
  display: 'block', marginBottom: 6, color: '#0A0008',
};
const inputStyle: React.CSSProperties = {
  width: '100%', padding: '13px 15px', border: '1.5px solid #E5E7EB', borderRadius: 10,
  fontFamily: "'Inter', sans-serif", fontSize: 16, background: '#fff', boxSizing: 'border-box',
};

/* ─── What-happens-next steps (shown AFTER the brief is sent) ── */
const STEPS = [
  {
    n: '1',
    title: 'We\'ve got your brief.',
    body: 'Your product, style, and photos are in. Nothing else for you to film, ship, or set up.',
  },
  {
    n: '2',
    title: 'We build your ad.',
    body: 'AI plus our experience — hook, product showcase, call-to-action, music, captions. We do the rest.',
  },
  {
    n: '3',
    title: 'It lands in 48 hours.',
    body: 'Your finished ad is in your inbox within 48 hours — ready to run on Meta, TikTok, and Instagram.',
  },
];

/* ═══════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════ */
export default function ThanksPage() {
  const [bundle, setBundle] = useState<BundleType>('none');
  const [orderId, setOrderId] = useState<string | null>(null);

  /* Brief form state */
  const [productName, setProductName] = useState('');
  const [productUrl, setProductUrl] = useState('');
  const [videoFormat, setVideoFormat] = useState('');
  const [notes, setNotes] = useState('');
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /* Read funnel state from localStorage (set by order/oto1/down1 handlers) */
  useEffect(() => {
    try {
      const step = JSON.parse(localStorage.getItem('topk_funnel_step') || '{}');
      if (step.got1) setBundle('six');
      else if (step.gotD1) setBundle('three');

      const oid = localStorage.getItem('topk_funnel_order');
      if (oid) setOrderId(oid);
    } catch (_) { /* storage blocked */ }
  }, []);

  async function handlePhotoSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    e.target.value = ''; // allow re-selecting the same file
    if (!files.length) return;

    setError(null);
    setUploading(true);
    try {
      for (const file of files.slice(0, 12 - photos.length)) {
        const blob = await upload(file.name, file, {
          access: 'public',
          handleUploadUrl: '/api/brief/upload',
        });
        setPhotos((prev) => [...prev, { url: blob.url, name: file.name }]);
      }
    } catch (err) {
      console.error('[thanks] upload failed:', err);
      setError('A photo failed to upload. You can also reply to your confirmation email with photos.');
    } finally {
      setUploading(false);
    }
  }

  function removePhoto(url: string) {
    setPhotos((prev) => prev.filter((p) => p.url !== url));
  }

  async function handleSubmitBrief() {
    if (!productName.trim()) { setError('Please tell us your product name.'); return; }
    if (!videoFormat) { setError('Please pick a video style.'); return; }
    if (!orderId) {
      setError('We couldn\'t find your order automatically — please reply to your confirmation email with these details.');
      return;
    }
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch('/api/brief', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId,
          productName: productName.trim(),
          productUrl: productUrl.trim(),
          videoFormat,
          notes: notes.trim(),
          photoUrls: photos.map((p) => p.url),
        }),
      });
      const data = await res.json() as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) {
        setError(data.error ?? 'Something went wrong — please try again, or reply to your confirmation email.');
        setSubmitting(false);
        return;
      }
      setSubmitted(true);
    } catch {
      setError('Network error — please try again, or reply to your confirmation email.');
    } finally {
      setSubmitting(false);
    }
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

        {/* Headline */}
        <h1 style={{
          fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: 38,
          lineHeight: 1.14, letterSpacing: '-0.02em', margin: 0,
        }}>
          You&apos;re in. Your ad is officially in the works.{' '}
          <span style={{ background: GRAD, WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            🎉
          </span>
        </h1>

        {!submitted ? (
          <>
            {/* Body intro — directs them straight into the brief */}
            <p style={{ fontSize: 18, color: '#6B7280', maxWidth: '52ch', margin: '18px auto 0', lineHeight: 1.7 }}>
              Payment confirmed and your spot is locked. One last step — tell us about your product
              so we can start building. It takes 60 seconds.
            </p>

            {/* ── BRIEF FORM CARD ── */}
            <div style={{
              background: '#FFFFFF', borderRadius: 16,
              border: '1.5px solid #F97316',
              boxShadow: '0px 6px 28px rgba(249,115,22,.12)',
              padding: '28px', marginTop: 32, textAlign: 'left',
            }}>
              <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 19, marginBottom: 4 }}>
                Your creative brief
              </div>
              <p style={{ fontSize: 14, color: '#6B7280', margin: '0 0 22px' }}>
                The more we know, the sharper your ad. You write the brief — we do the rest.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <label style={labelStyle} htmlFor="b-product">Product name *</label>
                  <input id="b-product" type="text" style={inputStyle}
                    placeholder="e.g. Sinour Nixoria Perfume"
                    value={productName} onChange={(e) => setProductName(e.target.value)} />
                </div>

                <div>
                  <label style={labelStyle} htmlFor="b-url">
                    Product link{' '}
                    <span style={{ color: '#9CA3AF', fontWeight: 500 }}>(optional)</span>
                  </label>
                  <input id="b-url" type="url" style={inputStyle}
                    placeholder="https://yourstore.com/product"
                    value={productUrl} onChange={(e) => setProductUrl(e.target.value)} />
                </div>

                <div>
                  <label style={labelStyle} htmlFor="b-format">Video style *</label>
                  <select id="b-format" style={{ ...inputStyle, appearance: 'auto' }}
                    value={videoFormat} onChange={(e) => setVideoFormat(e.target.value)}>
                    <option value="">Pick a style</option>
                    {VIDEO_FORMATS.map((f) => <option key={f} value={f}>{f}</option>)}
                  </select>
                </div>

                <div>
                  <label style={labelStyle} htmlFor="b-notes">
                    Anything we should know?{' '}
                    <span style={{ color: '#9CA3AF', fontWeight: 500 }}>(optional)</span>
                  </label>
                  <textarea id="b-notes" rows={3} style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.5 }}
                    placeholder="Brand colors, vibe, what makes it special, a line you want featured…"
                    value={notes} onChange={(e) => setNotes(e.target.value)} />
                </div>

                {/* Photo upload */}
                <div>
                  <label style={labelStyle}>
                    Product photos{' '}
                    <span style={{ color: '#9CA3AF', fontWeight: 500 }}>(the more angles, the better)</span>
                  </label>

                  <label htmlFor="b-photos" style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    gap: 6, padding: '24px', border: '1.5px dashed #D1D5DB', borderRadius: 12,
                    background: '#FAFAFA', cursor: uploading ? 'wait' : 'pointer', textAlign: 'center',
                  }}>
                    <svg width={26} height={26} viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                    <span style={{ fontSize: 14, fontWeight: 600, color: '#0A0008' }}>
                      {uploading ? 'Uploading…' : 'Tap to upload photos'}
                    </span>
                    <span style={{ fontSize: 12, color: '#9CA3AF' }}>JPG, PNG or WebP · up to 15MB each</span>
                  </label>
                  <input id="b-photos" type="file" accept="image/*" multiple
                    onChange={handlePhotoSelect} disabled={uploading} style={{ display: 'none' }} />

                  {photos.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 12 }}>
                      {photos.map((p) => (
                        <div key={p.url} style={{
                          position: 'relative', width: 64, height: 64, borderRadius: 8,
                          overflow: 'hidden', border: '1px solid #E5E7EB',
                        }}>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={p.url} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          <button type="button" onClick={() => removePhoto(p.url)} aria-label="Remove photo" style={{
                            position: 'absolute', top: 2, right: 2, width: 18, height: 18, borderRadius: '50%',
                            background: 'rgba(0,0,0,.65)', color: '#fff', border: 'none', cursor: 'pointer',
                            fontSize: 12, lineHeight: '18px', padding: 0, textAlign: 'center',
                          }}>×</button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {error && (
                  <div style={{ color: '#DC2626', fontSize: 13 }}>{error}</div>
                )}

                <button onClick={handleSubmitBrief} disabled={submitting || uploading} style={{
                  marginTop: 4, width: '100%', padding: 16, border: 'none', borderRadius: 14,
                  background: GRAD, color: '#fff',
                  fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 16,
                  cursor: submitting || uploading ? 'wait' : 'pointer',
                  opacity: submitting || uploading ? 0.75 : 1,
                  boxShadow: '0px 4px 18px rgba(236,72,153,.32)',
                }}>
                  {submitting ? 'Sending…' : 'Send my brief →'}
                </button>

                <p style={{ fontSize: 12, color: '#9CA3AF', textAlign: 'center', margin: 0 }}>
                  Prefer email? You can also just reply to your confirmation email with these details.
                </p>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* ── BRIEF RECEIVED — confirmation + what happens next ── */}
            <p style={{ fontSize: 18, color: '#6B7280', maxWidth: '50ch', margin: '18px auto 0', lineHeight: 1.7 }}>
              Brief received — we&apos;ve got everything we need. Here&apos;s exactly what happens next:
            </p>

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
          </>
        )}

        {/* Guarantee / reassurance — always shown */}
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
              Love it, or it&apos;s free.
            </div>
            <div style={{ fontSize: 15, color: '#D1D5DB', lineHeight: 1.65 }}>
              Watch it, run it — and if you don&apos;t love it, you don&apos;t pay. The risk is entirely on us.
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
                  your other five ads are reserved at your $49 price too. We&apos;ll plan them with you right
                  after your first one lands, so your feed never goes quiet.
                </>
              ) : (
                <>
                  <strong style={{ color: '#0A0008' }}>And because you grabbed the 3-Ad Starter Bundle</strong> —
                  your other two ads are reserved at your $49 price. We&apos;ll line them up right after your
                  first one lands, so you&apos;ve always got fresh creative ready.
                </>
              )}
            </div>
          </div>
        )}

        {/* Next-rung invite (soft — the value ladder continues here, no checkout) */}
        <div style={{
          background: '#FFFFFF', borderRadius: 16,
          border: '1px solid #E5E7EB', boxShadow: '0px 4px 24px rgba(0,0,0,.06)',
          padding: '22px 26px', marginTop: 20, textAlign: 'left',
        }}>
          <div style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 700, fontSize: 17, color: '#0A0008', marginBottom: 6 }}>
            Want fresh ads in the feed every week?
          </div>
          <div style={{ fontSize: 15, color: '#6B7280', lineHeight: 1.65 }}>
            Most brands don&apos;t stop at one. When your first ad lands, just reply to that email and ask about{' '}
            <strong style={{ color: '#0A0008' }}>TopK Autopilot</strong> — a steady stream of new ads each month so your
            brand never goes quiet. No commitment now; we&apos;ll show you how it works after you see your first ad.
          </div>
        </div>

        {/* Closing line */}
        <p style={{ fontSize: 16, color: '#6B7280', marginTop: 32, lineHeight: 1.7 }}>
          {submitted
            ? 'Sit tight — your brand is about to become impossible to scroll past. Talk soon.'
            : 'The faster you send your brief, the faster your ad lands. Talk soon.'}{' '}
          <strong style={{ color: '#0A0008' }}>— The TopK team</strong>
        </p>

      </main>
    </div>
  );
}
