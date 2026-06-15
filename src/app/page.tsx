"use client";

import { useEffect } from "react";
import Link from "next/link";
import Script from "next/script";
import "./topk-site.css";

declare global {
  interface Window {
    lucide?: { createIcons: () => void };
  }
}

const WORK = [
  { src: "/topk/portfolio/sinour-nixoria.mp4", brand: "Sinour — Nixoria", type: "Fragrance Product Ad" },
  { src: "/topk/portfolio/askim.mp4", brand: "Askim", type: "Cosmetics Ad" },
  { src: "/topk/portfolio/layla-jewelry.mp4", brand: "Layla", type: "Jewelry Brand Film" },
  { src: "/topk/portfolio/sinour-sivanor.mp4", brand: "Sinour — Sivanor", type: "Cinematic Fragrance" },
  { src: "/topk/portfolio/sinour-grandeur.mp4", brand: "Sinour — Grandeur", type: "Luxury Reveal" },
];

const TYPES = [
  { i: "megaphone", t: "Product Ads", d: "Punchy 15-second ads built to stop the scroll and sell." },
  { i: "film", t: "Cinematic Films", d: "Premium brand storytelling with a luxury, editorial feel." },
  { i: "flame", t: "Social Hooks", d: "Viral-ready vertical clips for Instagram, TikTok & Reels." },
  { i: "rotate-3d", t: "360° Showcase", d: "Turntable and multi-angle views that show every detail." },
  { i: "sparkles", t: "Lifestyle & UGC", d: "Your product in the real world — authentic and relatable." },
  { i: "music", t: "Music-Driven", d: "Beat-synced montages with energy that travels." },
];

const STEPS = [
  { n: 1, t: "Send Your Product", d: "Share a photo or a link to your product. That's all we need to start." },
  { n: 2, t: "We Create", d: "We produce your AI video in the style you choose — concept-driven, on brand." },
  { n: 3, t: "Receive in Days", d: "Final video delivered in 3–5 days, ready to post on every channel." },
];

export default function Home() {
  useEffect(() => {
    window.lucide?.createIcons();
    const nav = document.querySelector(".topk-site nav");
    const onScroll = () => nav?.classList.toggle("scrolled", window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    onScroll();
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            obs.unobserve(e.target);
          }
        }),
      { threshold: 0.1, rootMargin: "0px 0px -32px 0px" }
    );
    document
      .querySelectorAll(".topk-site .reveal, .topk-site .reveal-left, .topk-site .reveal-right")
      .forEach((el) => obs.observe(el));
    const t = setTimeout(() => {
      document
        .querySelectorAll(".hero2 .reveal-left, .hero2 .reveal-right")
        .forEach((el) => el.classList.add("visible"));
    }, 150);
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(t);
    };
  }, []);

  return (
    <div className="topk-site">
      <Script
        src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"
        strategy="afterInteractive"
        onLoad={() => window.lucide?.createIcons()}
      />

      {/* NAV */}
      <nav>
        <a className="nav-logo" href="#top">
          <div className="nav-logo-text">Top<span>K</span></div>
        </a>
        <div className="nav-links">
          <a href="#work">Work</a>
          <a href="#types">Video Types</a>
          <a href="#how">How It Works</a>
          <Link href="/portfolio">Portfolio</Link>
          <a className="nav-cta" href="#sample">Get Free Sample</a>
        </div>
      </nav>

      {/* HERO */}
      <div id="top" className="hero2">
        <div className="reveal-left">
          <div className="hero-eyebrow"><i data-lucide="clapperboard"></i>AI Product Videos</div>
          <h1>AI videos that<br /><span className="grad">sell your product.</span></h1>
          <p className="hero-sub">
            We turn your product into scroll-stopping video ads — every style, delivered in days,
            at a fraction of studio cost.
          </p>
          <div className="hero-actions">
            <a className="btn-grad" href="#sample">Get a Free Sample</a>
            <a className="btn-outline" href="#work">See Our Work</a>
          </div>
          <div className="hero-stats">
            <div><div className="stat-num">3-5d</div><div className="stat-label">Turnaround</div></div>
            <div><div className="stat-num">$150</div><div className="stat-label">From / video</div></div>
            <div><div className="stat-num">∞</div><div className="stat-label">Revisions</div></div>
          </div>
        </div>
        <div className="hero2-video reveal-right">
          <video src="/topk/portfolio/sinour-nixoria.mp4" autoPlay muted loop playsInline />
        </div>
      </div>

      {/* WORK */}
      <section id="work">
        <div className="section-inner">
          <div className="reveal">
            <div className="section-eyebrow"><i data-lucide="play-circle"></i>Our Work</div>
            <h2 className="section-h2">Real products.<br /><span className="grad">Real AI videos.</span></h2>
            <p className="section-sub">A few we&apos;ve made for real brands — fragrance, cosmetics, jewelry and more.</p>
          </div>
          <div className="gallery-grid">
            {WORK.map((w, i) => (
              <div className={`gallery-card reveal reveal-delay-${(i % 3) + 1}`} key={w.brand}>
                <video src={w.src} controls muted playsInline preload="metadata" />
                <div className="gallery-info">
                  <div className="gallery-brand">{w.brand}</div>
                  <div className="gallery-niche">{w.type}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="reveal" style={{ marginTop: "28px" }}>
            <Link className="btn-outline" href="/portfolio">View Full Portfolio →</Link>
          </div>
        </div>
      </section>

      {/* TYPES */}
      <section id="types" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="section-inner">
          <div className="reveal">
            <div className="section-eyebrow"><i data-lucide="layers"></i>What We Create</div>
            <h2 className="section-h2">Every type of<br /><span className="grad">product video.</span></h2>
            <p className="section-sub">Whatever your product needs to look its best — we make it with AI.</p>
          </div>
          <div className="types-grid">
            {TYPES.map((t, i) => (
              <div className={`type-card reveal reveal-delay-${(i % 3) + 1}`} key={t.t}>
                <div className="type-icon"><i data-lucide={t.i}></i></div>
                <div className="type-title">{t.t}</div>
                <div className="type-desc">{t.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="how-section">
        <div className="section-inner">
          <div style={{ textAlign: "center", marginBottom: "56px" }} className="reveal">
            <div className="section-eyebrow" style={{ justifyContent: "center" }}><i data-lucide="arrow-right"></i>How It Works</div>
            <h2 className="section-h2" style={{ textAlign: "center", margin: "0 auto", maxWidth: "560px" }}>From product to video<br />in three simple steps.</h2>
          </div>
          <div className="steps-grid" style={{ gridTemplateColumns: "repeat(3, 1fr)", maxWidth: "900px", margin: "0 auto" }}>
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

      {/* CTA */}
      <section className="cta-section" id="sample">
        <div className="cta-bg"></div>
        <div className="reveal" style={{ position: "relative" }}>
          <h2>Get a <span className="grad">free sample</span><br />of your product.</h2>
          <p>Send us your product — we&apos;ll make a short AI video of it, free. No obligation.</p>
          <div className="cta-perks">
            <div className="cta-perk"><i data-lucide="check"></i>A real AI video of your product</div>
            <div className="cta-perk"><i data-lucide="check"></i>Delivered in a few days</div>
            <div className="cta-perk"><i data-lucide="check"></i>No obligation. No credit card.</div>
          </div>
          <div className="cta-btns">
            <a className="btn-grad" href="https://wa.me/962796669365" style={{ fontSize: "16px", padding: "16px 44px" }}>Claim Free Sample</a>
            <a className="btn-outline" href="mailto:sales@topk.agency">Email Us</a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-inner">
          <div className="footer-top">
            <div>
              <div className="footer-logo"><img src="/topk/topk-logo-white.png" alt="TopK" /></div>
              <div className="footer-tagline">AI product videos — every style, produced at agency quality and delivered at startup speed.</div>
              <div className="footer-contact">
                <a className="footer-contact-item" href="https://topk.agency"><i data-lucide="globe"></i>topk.agency</a>
                <a className="footer-contact-item" href="https://wa.me/962796669365"><i data-lucide="message-circle"></i>+962 79 666 9365</a>
                <a className="footer-contact-item" href="mailto:sales@topk.agency"><i data-lucide="mail"></i>sales@topk.agency</a>
              </div>
            </div>
            <div className="footer-cols">
              <div className="footer-col">
                <div className="footer-col-title">Explore</div>
                <a href="#work">Our Work</a>
                <a href="#types">Video Types</a>
                <Link href="/portfolio">Portfolio</Link>
                <a href="#sample">Free Sample</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="footer-copy">© 2026 TopK Agency. AI videos for products.</div>
            <div className="footer-pill">AI-Powered · Built in the Gulf</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
