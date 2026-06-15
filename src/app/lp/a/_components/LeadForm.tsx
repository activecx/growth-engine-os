"use client";

import { useState } from "react";

interface LeadFormData {
  name: string;
  email: string;
  whatsapp: string;
  productName: string;
  productUrl: string;
  videoFormat: string;
  rushUpgrade: boolean;
}

interface LeadFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const VIDEO_FORMATS = [
  "Product Ad (scroll-stopping hook)",
  "UGC-style creator video",
  "Unboxing / reveal",
  "Hyper-motion hero shot",
  "Cinematic brand film",
  "Social hook (8-sec)",
  "Not sure — surprise me",
];

const INITIAL: LeadFormData = {
  name: "",
  email: "",
  whatsapp: "",
  productName: "",
  productUrl: "",
  videoFormat: "",
  rushUpgrade: false,
};

export default function LeadForm({ isOpen, onClose }: LeadFormProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [data, setData] = useState<LeadFormData>(INITIAL);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  function set<K extends keyof LeadFormData>(key: K, value: LeadFormData[K]) {
    setData((prev) => ({ ...prev, [key]: value }));
  }

  function handleOverlayClick(e: React.MouseEvent<HTMLDivElement>) {
    if (e.target === e.currentTarget) onClose();
  }

  function handleStep1(e: React.FormEvent) {
    e.preventDefault();
    setStep(2);
  }

  async function handleStep2(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // TODO: POST lead to Zoho + route to /lp/a/oto1
    console.log("[LeadForm] Submitted:", data);
    await new Promise((r) => setTimeout(r, 600)); // simulate async
    setLoading(false);
    setSubmitted(true);
  }

  function handleClose() {
    onClose();
    // Reset after animation out
    setTimeout(() => {
      setStep(1);
      setData(INITIAL);
      setSubmitted(false);
    }, 300);
  }

  return (
    <div className="modal-overlay" onClick={handleOverlayClick} role="dialog" aria-modal="true" aria-label="Get your free sample">
      <div className="modal-box">
        <button className="modal-close" onClick={handleClose} aria-label="Close">×</button>

        {submitted ? (
          <div className="form-success">
            <div className="form-success-icon">🎬</div>
            <div className="form-success-title">You&apos;re in!</div>
            <p className="form-success-sub">
              We received your request{data.rushUpgrade ? " with the Rush 48h upgrade" : ""}.<br />
              Expect your free video sample within <strong style={{ color: "#fb923c" }}>3–5 days</strong>.<br />
              We&apos;ll reach out on WhatsApp to confirm your product details.
            </p>
          </div>
        ) : (
          <>
            {/* Step indicator */}
            <div className="modal-step-indicator" aria-label={`Step ${step} of 2`}>
              <div className={`modal-step-dot ${step >= 1 ? "active" : ""}`} />
              <div className={`modal-step-dot ${step >= 2 ? "active" : ""}`} />
            </div>

            {step === 1 && (
              <>
                <div className="modal-title">Let&apos;s make your video.</div>
                <p className="modal-sub">Step 1 of 2 — Tell us who you are.</p>
                <form onSubmit={handleStep1} noValidate>
                  <div className="form-field">
                    <label className="form-label" htmlFor="lf-name">Your name</label>
                    <input
                      id="lf-name"
                      className="form-input"
                      type="text"
                      placeholder="Sarah"
                      required
                      value={data.name}
                      onChange={(e) => set("name", e.target.value)}
                    />
                  </div>
                  <div className="form-field">
                    <label className="form-label" htmlFor="lf-email">Email</label>
                    <input
                      id="lf-email"
                      className="form-input"
                      type="email"
                      placeholder="sarah@brand.com"
                      required
                      value={data.email}
                      onChange={(e) => set("email", e.target.value)}
                    />
                  </div>
                  <div className="form-field">
                    <label className="form-label" htmlFor="lf-wa">WhatsApp number</label>
                    <input
                      id="lf-wa"
                      className="form-input"
                      type="tel"
                      placeholder="+962 79 000 0000"
                      required
                      value={data.whatsapp}
                      onChange={(e) => set("whatsapp", e.target.value)}
                    />
                  </div>
                  <button type="submit" className="btn-grad form-submit">
                    Continue →
                  </button>
                </form>
              </>
            )}

            {step === 2 && (
              <>
                <div className="modal-title">Your product.</div>
                <p className="modal-sub">Step 2 of 2 — Tell us what you&apos;re selling.</p>
                <form onSubmit={handleStep2} noValidate>
                  <div className="form-field">
                    <label className="form-label" htmlFor="lf-product">Product name</label>
                    <input
                      id="lf-product"
                      className="form-input"
                      type="text"
                      placeholder="Sinour Nixoria Perfume"
                      required
                      value={data.productName}
                      onChange={(e) => set("productName", e.target.value)}
                    />
                  </div>
                  <div className="form-field">
                    <label className="form-label" htmlFor="lf-url">Product link (optional)</label>
                    <input
                      id="lf-url"
                      className="form-input"
                      type="url"
                      placeholder="https://yourstore.com/product"
                      value={data.productUrl}
                      onChange={(e) => set("productUrl", e.target.value)}
                    />
                  </div>
                  <div className="form-field">
                    <label className="form-label" htmlFor="lf-format">Video style</label>
                    <select
                      id="lf-format"
                      className="form-select"
                      required
                      value={data.videoFormat}
                      onChange={(e) => set("videoFormat", e.target.value)}
                    >
                      <option value="">Pick a style</option>
                      {VIDEO_FORMATS.map((f) => (
                        <option key={f} value={f}>{f}</option>
                      ))}
                    </select>
                  </div>

                  {/* Order bump */}
                  <label className="order-bump">
                    <input
                      type="checkbox"
                      checked={data.rushUpgrade}
                      onChange={(e) => set("rushUpgrade", e.target.checked)}
                    />
                    <div className="order-bump-text">
                      <div className="order-bump-label">
                        Yes — add <span>Rush 48h delivery</span> for $49
                      </div>
                      <div className="order-bump-desc">
                        Skip the queue. Get your free sample back in 48 hours instead of 3–5 days.
                        Billed only if you love it and move forward.
                      </div>
                    </div>
                  </label>

                  <button
                    type="submit"
                    className="btn-grad form-submit"
                    disabled={loading}
                    style={{ marginTop: "20px", opacity: loading ? 0.7 : 1 }}
                  >
                    {loading ? "Sending…" : "Send My Product"}
                  </button>
                  <div style={{ textAlign: "center", marginTop: "12px" }}>
                    <button type="button" className="btn-link" onClick={() => setStep(1)}>
                      ← Back
                    </button>
                  </div>
                </form>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
