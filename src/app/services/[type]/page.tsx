"use client";

import { useEffect } from "react";
import Link from "next/link";
import Script from "next/script";
import { useParams } from "next/navigation";
import "../../topk-site.css";
import { findType } from "../../services-data";

declare global {
  interface Window {
    lucide?: { createIcons: () => void };
  }
}

export default function ServiceTypePage() {
  const params = useParams();
  const id = String(params.type || "");
  const found = findType(id);

  useEffect(() => {
    window.lucide?.createIcons();
    const nav = document.querySelector(".topk-site nav");
    const onScroll = () => nav?.classList.toggle("scrolled", window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    onScroll();
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); } }),
      { threshold: 0.06, rootMargin: "0px 0px -32px 0px" }
    );
    document.querySelectorAll(".topk-site .reveal").forEach((el) => obs.observe(el));
    return () => window.removeEventListener("scroll", onScroll);
  }, [id]);

  const Nav = (
    <nav>
      <Link className="nav-logo" href="/"><div className="nav-logo-text">Top<span>K</span></div></Link>
      <div className="nav-links">
        <Link href="/">Home</Link>
        <a href="/#marketing-studio">Marketing Studio</a>
        <a href="/#social">Social</a>
        <a className="nav-cta" href="https://wa.me/962796669365">Get Free Sample</a>
      </div>
    </nav>
  );

  if (!found) {
    return (
      <div className="topk-site">
        <Script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js" strategy="afterInteractive" onLoad={() => window.lucide?.createIcons()} />
        {Nav}
        <section style={{ paddingTop: "160px", minHeight: "70vh" }}>
          <div className="section-inner reveal">
            <h2 className="section-h2">Video type not found.</h2>
            <p className="section-sub">That service doesn&apos;t exist. Browse all video types from the home page.</p>
            <Link className="btn-grad" href="/">← Back Home</Link>
          </div>
        </section>
      </div>
    );
  }

  const { type, category } = found;
  const siblings = category.types.filter((t) => t.id !== type.id);
  const placeholders = Math.max(0, 4 - type.examples.length);

  return (
    <div className="topk-site">
      <Script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js" strategy="afterInteractive" onLoad={() => window.lucide?.createIcons()} />
      {Nav}

      <section style={{ paddingTop: "150px" }}>
        <div className="section-inner">
          <div className="reveal">
            <Link className="back-link" href={`/#${category.id}`}>← {category.name}</Link>
            <div className="section-eyebrow"><i data-lucide={type.icon}></i>{category.eyebrow}</div>
            <h2 className="section-h2">{type.name}</h2>
            <p className="section-sub">{type.long}</p>
          </div>

          {/* EXAMPLES (up to 4) */}
          <div className="gallery-grid">
            {type.examples.map((ex, i) => (
              <div className={`gallery-card reveal reveal-delay-${(i % 3) + 1}`} key={ex.src}>
                <video src={ex.src} controls muted playsInline preload="metadata" />
                <div className="gallery-info">
                  <div className="gallery-brand">{ex.label}</div>
                  <div className="gallery-niche">{type.name}</div>
                </div>
              </div>
            ))}
            {Array.from({ length: placeholders }).map((_, i) => (
              <div className={`gallery-card reveal reveal-delay-${(i % 3) + 1}`} key={`ph-${i}`}>
                <div className="poster"><i data-lucide={type.icon}></i></div>
                <div className="gallery-info">
                  <div className="gallery-brand" style={{ color: "rgba(255,255,255,0.5)" }}>Example coming soon</div>
                  <div className="gallery-niche">{type.name}</div>
                </div>
              </div>
            ))}
          </div>

          {/* MORE IN CATEGORY */}
          <div className="reveal" style={{ marginTop: "64px" }}>
            <div className="section-eyebrow"><i data-lucide="layers"></i>More {category.name}</div>
          </div>
          <div className="types-grid">
            {siblings.map((t, i) => (
              <Link href={`/services/${t.id}`} className={`type-card type-link reveal reveal-delay-${(i % 3) + 1}`} key={t.id}>
                <div className="type-icon"><i data-lucide={t.icon}></i></div>
                <div className="type-title">{t.name}</div>
                <div className="type-desc">{t.short}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section" id="sample">
        <div className="cta-bg"></div>
        <div className="reveal" style={{ position: "relative" }}>
          <h2>Want a <span className="grad">{type.name}</span><br />for your product?</h2>
          <p>Send us your product — we&apos;ll make a free sample. No obligation.</p>
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
            <div className="footer-copy">© 2026 TopK Agency. Every video your product needs.</div>
            <Link className="footer-pill" href="/" style={{ textDecoration: "none" }}>← Back to Home</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
