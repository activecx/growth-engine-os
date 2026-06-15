"use client";

import { useEffect } from "react";
import Link from "next/link";
import Script from "next/script";
import "./topk-site.css";
import { CATEGORIES, TOTAL_TYPES } from "./services-data";

declare global {
  interface Window {
    lucide?: { createIcons: () => void };
  }
}

const STEPS = [
  { n: 1, t: "Send Your Product", d: "Share a photo or a link to your product. That's all we need to start." },
  { n: 2, t: "Pick a Video Type", d: "Choose the style — a product ad, a social hook, an avatar, anything below." },
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
      { threshold: 0.08, rootMargin: "0px 0px -32px 0px" }
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
          <a href="#marketing-studio">Marketing Studio</a>
          <a href="#social">Social</a>
          <Link href="/portfolio">Portfolio</Link>
          <a className="nav-cta" href="#sample">Get Free Sample</a>
        </div>
      </nav>

      {/* HERO */}
      <div id="top" className="hero2">
        <div className="reveal-left">
          <div className="hero-eyebrow"><i data-lucide="clapperboard"></i>AI Video Studio</div>
          <h1>Every video<br /><span className="grad">your product needs.</span></h1>
          <p className="hero-sub">
            From product ads to social hooks to talking AI avatars — TopK makes every type of
            video for your brand, in days, at a fraction of studio cost.
          </p>
          <div className="hero-actions">
            <a className="btn-grad" href="#sample">Get a Free Sample</a>
            <a className="btn-outline" href="#marketing-studio">Explore Video Types</a>
          </div>
          <div className="hero-stats">
            <div><div className="stat-num">{TOTAL_TYPES}</div><div className="stat-label">Video formats</div></div>
            <div><div className="stat-num">3-5d</div><div className="stat-label">Turnaround</div></div>
            <div><div className="stat-num">∞</div><div className="stat-label">Revisions</div></div>
          </div>
        </div>
        <div className="hero2-video reveal-right">
          <video src="/topk/portfolio/sinour-nixoria.mp4" autoPlay muted loop playsInline />
        </div>
      </div>

      {/* CATEGORIES */}
      {CATEGORIES.map((cat, ci) => {
        const feat = cat.types[0];
        const count = Math.min(feat.examples.length, 4);
        return (
        <section id={cat.id} key={cat.id} style={ci > 0 ? { borderTop: "1px solid var(--border)" } : undefined}>
          <div className="section-inner">
            <div className="reveal">
              <div className="section-eyebrow"><i data-lucide={cat.icon}></i>{cat.eyebrow}</div>
              <h2 className="section-h2">{cat.name}</h2>
              <p className="section-sub">{cat.tagline}</p>
            </div>

            {cat.layout === "grid" ? (
              <div className="types-grid">
                {cat.types.map((t, i) => (
                  <Link href={`/services/${t.id}`} className={`type-card type-link reveal reveal-delay-${(i % 3) + 1}`} key={t.id}>
                    <div className="type-icon"><i data-lucide={t.icon}></i></div>
                    <div className="type-title">{t.name}</div>
                    <div className="type-desc">{t.short}</div>
                    <div className="type-cta">{t.examples.length > 0 ? `${t.examples.length} example${t.examples.length > 1 ? "s" : ""} →` : "View examples →"}</div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="feature-row">
                <div className="reveal-left">
                  <p className="feature-long">{feat.long}</p>
                  <Link href={`/services/${feat.id}`} className="btn-outline">Explore {cat.name} →</Link>
                </div>
                <div className="reveal-right">
                  {count > 0 ? (
                    <div className={`feature-media-grid count-${count}`}>
                      {feat.examples.slice(0, 4).map((ex) => (
                        <video key={ex.src} src={ex.src} controls muted playsInline preload="metadata" />
                      ))}
                    </div>
                  ) : (
                    <div className="feature-empty"><i data-lucide={feat.icon}></i><span>Examples coming soon</span></div>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>
      );
      })}

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
              <div className="footer-tagline">Every type of AI video for your product — produced at agency quality, delivered at startup speed.</div>
              <div className="footer-contact">
                <a className="footer-contact-item" href="https://topk.agency"><i data-lucide="globe"></i>topk.agency</a>
                <a className="footer-contact-item" href="https://wa.me/962796669365"><i data-lucide="message-circle"></i>+962 79 666 9365</a>
                <a className="footer-contact-item" href="mailto:sales@topk.agency"><i data-lucide="mail"></i>sales@topk.agency</a>
              </div>
            </div>
            <div className="footer-cols">
              <div className="footer-col">
                <div className="footer-col-title">Marketing Studio</div>
                {CATEGORIES[0].types.slice(0, 5).map((t) => (
                  <Link href={`/services/${t.id}`} key={t.id}>{t.name}</Link>
                ))}
              </div>
              <div className="footer-col">
                <div className="footer-col-title">More Video</div>
                <Link href="/services/brand-films">Cinematic Films</Link>
                <Link href="/services/product-ecommerce">E-commerce</Link>
                <Link href="/services/social-hooks">Social Hooks</Link>
                <Link href="/services/social-viral">Social Viral</Link>
                <Link href="/services/hyper-real">Hyper-Real</Link>
                <Link href="/portfolio">Portfolio</Link>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="footer-copy">© 2026 TopK Agency. Every video your product needs.</div>
            <div className="footer-pill">AI-Powered · Built in the Gulf</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
