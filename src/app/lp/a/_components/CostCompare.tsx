"use client";

import { useEffect, useRef, useState } from "react";

interface CostCompareProps {
  onOpenForm: () => void;
}

const OLD_ITEMS = [
  { label: "Studio rental", val: "$2,000+" },
  { label: "Models / talent", val: "$1,500+" },
  { label: "Film crew", val: "$3,000+" },
  { label: "Editing & post", val: "Included in crew cost" },
  { label: "Timeline", val: "4–6 weeks" },
];

const NEW_ITEMS = [
  { label: "Studio rental", val: "$0 — no studio needed" },
  { label: "Models / talent", val: "$0 — AI-generated" },
  { label: "Film crew", val: "$0 — no crew needed" },
  { label: "Editing & post", val: "Included — done for you" },
  { label: "Timeline", val: "3–5 days" },
];

export default function CostCompare({ onOpenForm }: CostCompareProps) {
  const oldColRef = useRef<HTMLDivElement>(null);
  const [crossed, setCrossed] = useState(false);

  /* Cross-out old numbers when the column scrolls into view */
  useEffect(() => {
    const el = oldColRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Small delay so user notices the strike-through animation
          setTimeout(() => setCrossed(true), 400);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className="compare-section" aria-label="Cost comparison">
      <div className="compare-section-inner">
        <div className="reveal" style={{ textAlign: "center", marginBottom: "0" }}>
          <div className="section-eyebrow" style={{ justifyContent: "center" }}>
            The real cost breakdown
          </div>
          <h2 className="section-h2" style={{ textAlign: "center", margin: "0 auto", maxWidth: "600px" }}>
            What a traditional video shoot actually costs you
          </h2>
          <p className="section-sub" style={{ margin: "14px auto 0", textAlign: "center" }}>
            Most brands see the invoice and never test a second angle.
            Here&apos;s what changes with TopK.
          </p>
        </div>

        <div className="compare-grid">
          {/* Old way */}
          <div
            ref={oldColRef}
            className={`compare-col old reveal-left${crossed ? " crossed" : ""}`}
          >
            <div className="compare-col-title">The old way</div>
            <div className="compare-col-sub">Traditional studio production</div>
            <ul className="compare-list">
              {OLD_ITEMS.map((item) => (
                <li key={item.label}>
                  <svg className="xi" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                    <path d="M11.5 3.5L3.5 11.5M3.5 3.5L11.5 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                  <span className="line-label">{item.label}</span>
                  <span className="line-val strike">{item.val}</span>
                </li>
              ))}
            </ul>
            <div className="compare-total">
              <span className="compare-total-label">Total</span>
              <span className="compare-total-val bad">$6,500+ / 6 weeks</span>
            </div>
          </div>

          {/* TopK way */}
          <div className="compare-col new reveal-right">
            <div className="compare-col-title">TopK way</div>
            <div className="compare-col-sub">AI-powered · delivered in days</div>
            <ul className="compare-list">
              {NEW_ITEMS.map((item) => (
                <li key={item.label}>
                  <svg className="ci" viewBox="0 0 15 15" fill="none" aria-hidden="true">
                    <path d="M2.5 7.5L6 11L12.5 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span className="line-label">{item.label}</span>
                  <span className="line-val" style={{ color: "#fb923c" }}>{item.val}</span>
                </li>
              ))}
            </ul>
            <div className="compare-total">
              <span className="compare-total-label">Total</span>
              <span className="compare-total-val good">FREE sample / 3–5 days</span>
            </div>
            <div style={{ marginTop: "16px" }}>
              <div className="savings-pill">
                You save $6,500+ and 6 weeks of your life
              </div>
            </div>
          </div>
        </div>

        <div className="compare-cta-wrap reveal">
          <button className="btn-grad" onClick={onOpenForm} style={{ fontSize: "16px", padding: "16px 40px" }}>
            Get My Free Sample
          </button>
          <p style={{ marginTop: "12px", fontFamily: "var(--font-body)", fontSize: "13px", color: "rgba(255,255,255,0.35)" }}>
            No card needed. No obligation. Delivered in 3–5 days.
          </p>
        </div>
      </div>
    </section>
  );
}
