"use client";

import { useEffect } from "react";
import Link from "next/link";
import Script from "next/script";
import "../topk-site.css";

declare global {
  interface Window {
    lucide?: { createIcons: () => void };
  }
}

const PLAYABLE = [
  { src: "/topk/portfolio/layla-jewelry.mp4", brand: "Layla", niche: "Jewelry · AI Brand Film" },
  { src: "/topk/portfolio/gshock.mp4", brand: "G-Shock", niche: "Watches · Product Ad" },
  { src: "/topk/portfolio/maretti-product.mp4", brand: "Maretti", niche: "F&B · Product Motion" },
  { src: "/topk/portfolio/blackwolf.mp4", brand: "Black Wolf", niche: "Pets · Brand Ad" },
  { src: "/topk/portfolio/adidas.mp4", brand: "Adidas", niche: "Sportswear · Concept Spot" },
  { src: "/topk/portfolio/signal.mp4", brand: "Signal from Tomorrow", niche: "Cinematic · Music Video" },
];

const CLIENTS = [
  { brand: "Sinour", niche: "Fragrance · Client (Nixoria, Sivanor, Grandeur)", icon: "flame" },
  { brand: "Askim", niche: "Cosmetics · Client Campaign", icon: "sparkles" },
  { brand: "Reyhana", niche: "AI Influencer · Original IP", icon: "user" },
  { brand: "Real / Fake", niche: "Viral Social · Hook Series", icon: "play-circle" },
];

export default function Portfolio() {
  useEffect(() => {
    window.lucide?.createIcons();
    const nav = document.querySelector(".topk-site nav");
    const onScroll = () => nav?.classList.toggle("scrolled", window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    onScroll();
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); } }),
      { threshold: 0.08, rootMargin: "0px 0px -32px 0px" }
    );
    document.querySelectorAll(".topk-site .reveal").forEach((el) => obs.observe(el));
    return () => window.removeEventListener("scroll", onScroll);
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
        <Link className="nav-logo" href="/">
          <div className="nav-logo-text">Top<span>K</span></div>
        </Link>
        <div className="nav-links">
          <Link href="/">Home</Link>
          <a href="/#services">Services</a>
          <a href="/#models">Digital Models</a>
          <a className="nav-cta" href="https://wa.me/962796669365">Get Free Sample</a>
        </div>
      </nav>

      {/* HEADER */}
      <section style={{ paddingTop: "150px" }}>
        <div className="section-inner">
          <div className="reveal">
            <div className="section-eyebrow"><i data-lucide="briefcase"></i>Portfolio</div>
            <h2 className="section-h2">Real work.<br /><span className="grad">Real brands.</span></h2>
            <p className="section-sub">
              AI-produced product ads, brand films, and social content — delivered for real clients
              and concept campaigns at agency quality, startup speed.
            </p>
          </div>

          {/* PLAYABLE GALLERY */}
          <div className="gallery-grid">
            {PLAYABLE.map((v, i) => (
              <div className={`gallery-card reveal reveal-delay-${(i % 3) + 1}`} key={v.brand}>
                <video src={v.src} controls muted playsInline preload="metadata" />
                <div className="gallery-info">
                  <div className="gallery-brand">{v.brand}</div>
                  <div className="gallery-niche">{v.niche}</div>
                </div>
              </div>
            ))}
          </div>

          {/* MORE WORK */}
          <div className="reveal" style={{ marginTop: "64px" }}>
            <div className="section-eyebrow"><i data-lucide="layers"></i>More Client &amp; Brand Work</div>
            <p className="section-sub" style={{ marginBottom: "32px" }}>Full reels available on request.</p>
          </div>
          <div className="gallery-grid">
            {CLIENTS.map((c, i) => (
              <div className={`gallery-card reveal reveal-delay-${(i % 3) + 1}`} key={c.brand}>
                <div className="poster"><i data-lucide={c.icon}></i></div>
                <div className="gallery-info">
                  <div className="gallery-brand">{c.brand}</div>
                  <div className="gallery-niche">{c.niche}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section" id="sample">
        <div className="cta-bg"></div>
        <div className="reveal" style={{ position: "relative" }}>
          <h2>Want this for <span className="grad">your product?</span></h2>
          <p>Send us your product — we&apos;ll make a free sample ad. No obligation.</p>
          <div className="cta-btns">
            <a className="btn-grad" href="https://wa.me/962796669365" style={{ fontSize: "16px", padding: "16px 44px" }}>Claim Free Sample</a>
            <a className="btn-outline" href="mailto:sales@topk.agency">Email Us</a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-inner">
          <div className="footer-bottom" style={{ borderTop: "none", paddingTop: 0 }}>
            <div className="footer-copy">© 2026 TopK Agency. Powered by AI. Limited by Nothing.</div>
            <Link className="footer-pill" href="/" style={{ textDecoration: "none" }}>← Back to Home</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
