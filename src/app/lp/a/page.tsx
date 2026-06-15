"use client";

import { useEffect } from "react";
import Image from "next/image";
import VSLHero from "./_components/VSLHero";
import CostCompare from "./_components/CostCompare";
import OfferStackCard from "./_components/OfferStackCard";
import CountdownTimer from "./_components/CountdownTimer";
import GuaranteeSeal from "./_components/GuaranteeSeal";
import FAQAccordion from "./_components/FAQAccordion";

/* ── Types ──────────────────────────────────────────────── */
declare global {
  interface Window {
    __topkOpenForm?: () => void;
  }
}

/* ── Helpers ─────────────────────────────────────────────── */
function openForm() {
  if (typeof window !== "undefined") {
    window.__topkOpenForm?.();
  }
}

/* ── Proof gallery clips ────────────────────────────────── */
const GALLERY_CLIPS = [
  { src: "/topk/portfolio/sinour-nixoria.mp4", brand: "Sinour", niche: "Luxury Fragrance" },
  { src: "/topk/portfolio/askim.mp4", brand: "Askim", niche: "Cosmetics" },
  { src: "/topk/portfolio/layla-jewelry.mp4", brand: "Layla", niche: "Jewelry" },
  { src: "/topk/portfolio/watch.mp4", brand: "Watch Brand", niche: "Accessories" },
  { src: "/topk/portfolio/iphone.mp4", brand: "Tech Brand", niche: "Consumer Electronics" },
  { src: "/topk/portfolio/ugc-beauty.mp4", brand: "Beauty Brand", niche: "UGC · Creator Style" },
] as const;

/* ── Client logos (greyscale bar) ───────────────────────── */
const BRAND_NAMES = ["Sinour", "Askim", "Layla Jewelry", "TopK Clients"];

/* ── Steps data ─────────────────────────────────────────── */
const STEPS = [
  {
    n: 1,
    t: "Send Your Product",
    d: "Share a photo, a link, or a short description. That's all we need to start making your video.",
  },
  {
    n: 2,
    t: "Pick a Format",
    d: "Choose a style — product ad, UGC creator, unboxing, hero shot — or let us pick what fits best.",
  },
  {
    n: 3,
    t: "Get It in Days",
    d: "Your free video sample lands in your inbox in 3–5 days, ready to post on every channel.",
  },
];

/* ── Page component ─────────────────────────────────────── */
export default function LpAPage() {
  /* IntersectionObserver for .reveal / .reveal-left / .reveal-right */
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            obs.unobserve(e.target);
          }
        }),
      { threshold: 0.08, rootMargin: "0px 0px -32px 0px" }
    );
    document
      .querySelectorAll(
        ".lp-page .reveal, .lp-page .reveal-left, .lp-page .reveal-right"
      )
      .forEach((el) => obs.observe(el));

    // Hero reveals immediately
    const t = setTimeout(() => {
      document
        .querySelectorAll(".vsl-hero .reveal, .vsl-hero .reveal-left, .vsl-hero .reveal-right")
        .forEach((el) => el.classList.add("visible"));
    }, 120);

    return () => {
      obs.disconnect();
      clearTimeout(t);
    };
  }, []);

  return (
    <>
      {/* ─── S1 VSL Hero ──────────────────────────────────── */}
      <VSLHero
        onOpenForm={openForm}
        // videoSrc="/topk/portfolio/sinour-nixoria.mp4" // TODO: swap in final VSL avatar video
      />

      {/* ─── S2 Problem ───────────────────────────────────── */}
      <section className="lp-section" aria-label="Problem — flat photo vs motion">
        <div className="lp-section-inner">
          <div className="reveal">
            <div className="section-eyebrow">The scroll problem</div>
            <h2 className="section-h2">
              Flat photos don&apos;t sell.{" "}
              <span className="grad">Motion does.</span>
            </h2>
            <p className="section-sub">
              Your competitors are running video every single day. A static image
              loses every time — not because your product isn&apos;t good, but
              because the feed moved on before anyone noticed it.
            </p>
          </div>

          <div className="problem-grid">
            {/* Old — static photo */}
            <div className="problem-col old reveal-left">
              <div className="problem-col-label">What most brands post</div>
              <div className="problem-visual">
                <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
                  <rect x="4" y="4" width="32" height="32" rx="4" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" strokeDasharray="4 3" />
                  <circle cx="20" cy="18" r="5" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
                  <path d="M8 32L14 24L19 29L25 22L32 32H8Z" fill="rgba(255,255,255,0.08)" />
                </svg>
                <span>Static product photo</span>
              </div>
              <div className="problem-caption">Flat photo</div>
              <p className="problem-body">
                Gets skipped in 0.3 seconds. No motion means no attention — and
                no attention means no sale.
              </p>
            </div>

            {/* New — video motion */}
            <div className="problem-col new reveal-right">
              <div className="problem-col-label">What TopK makes you</div>
              <div className="problem-visual motion">
                <video
                  src="/topk/portfolio/sinour-nixoria.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  aria-label="Sinour Nixoria product video example"
                />
              </div>
              <div className="problem-caption" style={{ color: "#fb923c" }}>
                Scroll-stopping video
              </div>
              <p className="problem-body">
                Motion captures attention in the first frame. Your competitors
                run video every day — now you can too, at a fraction of the cost.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── S3 CostCompare ───────────────────────────────── */}
      <CostCompare onOpenForm={openForm} />

      {/* ─── S4 3-Step ────────────────────────────────────── */}
      <section className="lp-section" aria-label="How it works — 3 steps">
        <div className="lp-section-inner">
          <div className="reveal" style={{ textAlign: "center", marginBottom: "0" }}>
            <div className="section-eyebrow" style={{ justifyContent: "center" }}>
              How it works
            </div>
            <h2 className="section-h2" style={{ textAlign: "center", margin: "0 auto", maxWidth: "520px" }}>
              From product to video in three simple steps.
            </h2>
          </div>
          <div className="steps-grid">
            {STEPS.map((s) => (
              <div className={`step reveal reveal-delay-${s.n}`} key={s.n}>
                <div className="step-num">{s.n}</div>
                <div className="step-title">{s.t}</div>
                <p className="step-desc">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── S5 Proof Gallery ─────────────────────────────── */}
      <section className="lp-section" style={{ borderTop: "1px solid var(--border)" }} aria-label="Proof gallery — real client work">
        <div className="lp-section-inner">
          <div className="reveal" style={{ textAlign: "center" }}>
            <div className="section-eyebrow" style={{ justifyContent: "center" }}>
              Real proof
            </div>
            <h2 className="section-h2" style={{ textAlign: "center", margin: "0 auto", maxWidth: "560px" }}>
              Real products. Real videos. Built to sell.
            </h2>
            <p className="section-sub" style={{ margin: "14px auto 0", textAlign: "center" }}>
              We already do this for brands like Sinour fragrance, Askim
              cosmetics, and Layla jewelry. Here&apos;s what we made for them.
            </p>
          </div>

          <div className="gallery-grid">
            {GALLERY_CLIPS.map((clip, i) => (
              <div
                key={clip.src}
                className={`gallery-card reveal reveal-delay-${(i % 3) + 1}`}
              >
                <video
                  src={clip.src}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  onMouseEnter={(e) => (e.currentTarget as HTMLVideoElement).play()}
                  onMouseLeave={(e) => (e.currentTarget as HTMLVideoElement).pause()}
                  aria-label={`${clip.brand} product video`}
                />
                <div className="gallery-info">
                  <div className="gallery-brand">{clip.brand}</div>
                  <div className="gallery-niche">{clip.niche}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Greyscale logo bar */}
          <div className="logo-bar reveal">
            {BRAND_NAMES.map((name) => (
              <div key={name} className="logo-bar-item">{name}</div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── S6 Offer Stack Card ──────────────────────────── */}
      <OfferStackCard onOpenForm={openForm} />

      {/* ─── S7 Countdown Timer ───────────────────────────── */}
      <CountdownTimer spotsLeft={7} onOpenForm={openForm} />

      {/* ─── S8 Guarantee Seal ────────────────────────────── */}
      <GuaranteeSeal onOpenForm={openForm} />

      {/* ─── S9 Testimonials — OMITTED FOR NOW ───────────── */}
      {/* TODO: add Sinour / Askim / Layla consented quotes before launch */}

      {/* ─── S10 FAQ ──────────────────────────────────────── */}
      <FAQAccordion defaultOpen={0} />

      {/* ─── S11 Final CTA ────────────────────────────────── */}
      <section className="final-cta-section" aria-label="Final call to action">
        <div className="final-cta-bg" aria-hidden="true" />
        <div className="final-cta-inner reveal">
          <h2 className="final-cta-h2">
            Make your brand{" "}
            <span className="grad">impossible to scroll past.</span>
          </h2>
          <p className="final-cta-sub">
            One video. Zero risk. 3–5 days. See your product the way the algorithm rewards it.
          </p>
          <div className="final-cta-perks">
            <div className="final-cta-perk">No card needed</div>
            <div className="final-cta-perk">1 free video</div>
            <div className="final-cta-perk">Delivered in 3–5 days</div>
            <div className="final-cta-perk">Revisions included</div>
          </div>
          <button
            className="btn-grad"
            onClick={openForm}
            style={{ fontSize: "18px", padding: "18px 48px" }}
          >
            Get My Free Sample
          </button>
        </div>
      </section>

      {/* ─── S13 Footer ───────────────────────────────────── */}
      <footer className="lp-footer">
        <div className="lp-footer-inner">
          <div>
            <div className="lp-footer-logo">
              <Image
                src="/topk/topk-logo-white.png"
                alt="TopK Agency"
                width={80}
                height={24}
                style={{ height: "24px", width: "auto" }}
              />
            </div>
            <p className="lp-footer-tagline">
              Every type of AI video for your product — agency quality, startup speed.
            </p>
          </div>
          <div className="lp-footer-links">
            <a href="https://topk.agency">topk.agency</a>
            <a href="mailto:sales@topk.agency">sales@topk.agency</a>
            <a href="https://wa.me/962796669365">WhatsApp us</a>
          </div>
          <div className="lp-footer-copy">
            © 2026 TopK Agency. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}
