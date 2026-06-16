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
  { src: "/topk/portfolio/sinour-nixoria.mp4", brand: "Sinour — Nixoria", niche: "Fragrance · Brand Film" },
  { src: "/topk/portfolio/sinour-sivanor.mp4", brand: "Sinour — Sivanor", niche: "Fragrance · Brand Film" },
  { src: "/topk/portfolio/sinour-grandeur.mp4", brand: "Sinour — Grandeur", niche: "Fragrance · Brand Film" },
  { src: "/topk/portfolio/askim.mp4", brand: "Askim", niche: "Cosmetics · E-commerce" },
  { src: "/topk/portfolio/stylex.mp4", brand: "Stylex", niche: "Jewelry · Brand Film" },
  { src: "/topk/portfolio/jewelry.mp4", brand: "Jewelry", niche: "Accessories · Virtual Try-On" },
  { src: "/topk/portfolio/casio.mp4", brand: "Casio", niche: "Watch · G-Shock" },
  { src: "/topk/portfolio/iphone.mp4", brand: "Tech Product", niche: "Electronics · Hyper Motion" },
  { src: "/topk/portfolio/soda.mp4", brand: "Fruit Splash", niche: "Beverage · E-commerce" },
  { src: "/topk/portfolio/luna.mp4", brand: "Beverage Can", niche: "FMCG · E-commerce" },
  { src: "/topk/portfolio/cinema-truck.mp4", brand: "Automotive", niche: "Cinematic · TV Spot" },
  { src: "/topk/portfolio/ugc-couch.mp4", brand: "Creator UGC", niche: "Lifestyle · UGC" },
  { src: "/topk/portfolio/host-male.mp4", brand: "Talking Host", niche: "Review · Hyper-Real" },
  { src: "/topk/portfolio/adidas.mp4", brand: "Sportswear", niche: "Apparel · TV Spot" },
  { src: "/topk/portfolio/hook-glass-bridge.mp4", brand: "Glass Bridge", niche: "Social · Hook" },
  { src: "/topk/portfolio/hook-helicopter.mp4", brand: "Action Hook", niche: "Social · Hook" },
  { src: "/topk/portfolio/viral-power.mp4", brand: "Power", niche: "Social · Viral" },
  { src: "/topk/portfolio/viral-clarity.mp4", brand: "Clarity", niche: "Social · Viral" },
  { src: "/topk/portfolio/hyperreal-host.mp4", brand: "Talking-Head Host", niche: "Hyper-Real · Avatar" },
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
          <a href="/#marketing-studio">Marketing Studio</a>
          <a href="/#social">Social</a>
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
