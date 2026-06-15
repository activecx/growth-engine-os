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

export default function Home() {
  useEffect(() => {
    window.lucide?.createIcons();

    const nav = document.querySelector(".topk-site nav");
    const onScroll = () => nav?.classList.toggle("scrolled", window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    onScroll();

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -32px 0px" }
    );
    document
      .querySelectorAll(".topk-site .reveal, .topk-site .reveal-left")
      .forEach((el) => obs.observe(el));

    const t = setTimeout(() => {
      document
        .querySelectorAll(".hero-wrap .reveal-left")
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
          <div className="nav-logo-text">
            Top<span>K</span>
          </div>
        </a>
        <div className="nav-links">
          <a href="#services">Services</a>
          <a href="#models">Digital Models</a>
          <Link href="/portfolio">Portfolio</Link>
          <a href="#how">How It Works</a>
          <a className="nav-cta" href="#sample">Get Free Sample</a>
        </div>
      </nav>

      {/* HERO */}
      <div className="hero-wrap" id="top">
        <div className="hero-bg">
          <img src="/topk/hero-model.png" alt="TopK AI Digital Model" />
        </div>
        <div className="hero-inner">
          <div className="reveal-left">
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "22px" }}>
              <div className="hero-eyebrow"><i data-lucide="sparkles"></i>AI Creative Agency</div>
              <div className="sharia-badge"><i data-lucide="shield-check"></i>Sharia-Compliant</div>
            </div>
            <h1>Powered by AI.<br /><span className="grad">Limited by Nothing.</span></h1>
            <p className="hero-sub">
              AI-powered cinematic brand content, commercial advertising artwork, and model
              campaigns — produced at agency quality, delivered at startup speed.
            </p>
            <div className="hero-actions">
              <a className="btn-grad" href="#models">Meet Our Digital Models</a>
              <Link className="btn-outline" href="/portfolio">View Portfolio</Link>
            </div>
            <div className="hero-stats">
              <div><div className="stat-num">90%</div><div className="stat-label">Cost savings</div></div>
              <div><div className="stat-num">48h</div><div className="stat-label">Avg. turnaround</div></div>
              <div><div className="stat-num">9</div><div className="stat-label">AI models</div></div>
              <div><div className="stat-num">∞</div><div className="stat-label">Revisions</div></div>
            </div>
          </div>
        </div>
      </div>

      {/* BRAND MARQUEE */}
      <div className="brand-bar">
        <div className="brand-scroll">
          {Array.from({ length: 2 }).map((_, r) => (
            <span key={r} style={{ display: "flex", gap: "52px" }}>
              {["Almarai", "Coca-Cola", "Nike", "Pepsi", "Heinz", "Dior", "Gucci", "Louis Vuitton", "Prada", "Hermès", "Rolex", "Valentino"].map((b) => (
                <span className="brand-name" key={b + r}>{b}</span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* SERVICES */}
      <section id="services">
        <div className="section-inner">
          <div className="reveal">
            <div className="section-eyebrow"><i data-lucide="layers"></i>What We Do</div>
            <h2 className="section-h2">Four services.<br /><span className="grad">One creative powerhouse.</span></h2>
            <p className="section-sub">Strategy first. AI second. Every output is concept-driven, not prompt-driven.</p>
          </div>
          <div className="services-grid">
            <div className="service-card reveal reveal-delay-1">
              <div className="sc-num">01</div>
              <div className="sc-icon ic-a"><i data-lucide="user"></i></div>
              <div className="sc-title">AI Digital Models</div>
              <p className="sc-body">Hyper-realistic AI humans built to your brand specifications. Consistent across every campaign, every platform, every format. No scheduling. No agency fees. No limitations.</p>
              <div className="sc-tags"><span className="sc-tag">Product Photography</span><span className="sc-tag">Brand Ambassador</span><span className="sc-tag">E-commerce</span></div>
              <a className="sc-btn sc-btn-org" href="#models" style={{ display: "block", textAlign: "center", textDecoration: "none" }}>Explore Digital Models</a>
            </div>
            <div className="service-card reveal reveal-delay-2">
              <div className="sc-num">02</div>
              <div className="sc-icon ic-b"><i data-lucide="megaphone"></i></div>
              <div className="sc-title">AI-Powered Campaigns</div>
              <p className="sc-body">We analyze competitors, develop the creative concept, design the artwork, and deliver production-ready campaign assets. Strategy-led, AI-executed.</p>
              <div className="sc-tags"><span className="sc-tag">Social Media</span><span className="sc-tag">OOH</span><span className="sc-tag">Digital</span></div>
              <a className="sc-btn sc-btn-grad" href="#sample" style={{ display: "block", textAlign: "center", textDecoration: "none" }}>Start a Campaign</a>
            </div>
            <div className="service-card reveal reveal-delay-3">
              <div className="sc-num">03</div>
              <div className="sc-icon ic-c"><i data-lucide="film"></i></div>
              <div className="sc-title">AI Advertising Film</div>
              <p className="sc-body">High-quality AI-generated advertising films and motion content. From concept to final cut — cinematic quality, brand-aligned, at a fraction of traditional production cost.</p>
              <div className="sc-tags"><span className="sc-tag">TV &amp; Digital</span><span className="sc-tag">4K</span><span className="sc-tag">24fps</span></div>
              <Link className="sc-btn sc-btn-ghost" href="/portfolio" style={{ display: "block", textAlign: "center", textDecoration: "none" }}>Learn More</Link>
            </div>
            <div className="service-card reveal reveal-delay-4">
              <div className="sc-num">04</div>
              <div className="sc-icon ic-d"><i data-lucide="play-circle"></i></div>
              <div className="sc-title">Animated Social Content</div>
              <p className="sc-body">Viral-ready animated creatives and motion graphics built to stop the scroll. Platform-optimized, brand-consistent, built for the speed of social media.</p>
              <div className="sc-tags"><span className="sc-tag">Instagram</span><span className="sc-tag">TikTok</span><span className="sc-tag">Reels</span></div>
              <Link className="sc-btn sc-btn-ghost" href="/portfolio" style={{ display: "block", textAlign: "center", textDecoration: "none" }}>Learn More</Link>
            </div>
          </div>
        </div>
      </section>

      {/* MODEL ROSTER */}
      <section id="models" className="models-section" style={{ borderTop: "1px solid var(--border)" }}>
        <div className="section-inner">
          <div className="reveal">
            <div className="section-eyebrow"><i data-lucide="users"></i>Digital Model Roster</div>
            <h2 className="section-h2">9 AI models.<br /><span className="grad">Built for GCC &amp; global brands.</span></h2>
            <p className="section-sub">Every model is hyper-realistic, culturally authentic, and available instantly for any campaign.</p>
          </div>
          <div className="models-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "18px" }}>
            {[
              { n: "Khalid", t: "tag-male", g: "Male · 37", r: "Fitness & Premium Lifestyle", s: ["Saudi / GCC", "Athletic Build"], tags: ["Fitness", "Sportswear", "Grooming", "Watches"] },
              { n: "Salma", t: "tag-female", g: "Female · 26", r: "Modest Fashion & Lifestyle", s: ["Saudi Arabia / GCC"], tags: ["Modest Fashion", "Beauty", "F&B", "Home"] },
              { n: "Noor", t: "tag-female", g: "Female · 41", r: "Healthcare & Executive Authority", s: ["GCC", "Gen X+"], tags: ["Healthcare", "Banking", "Corporate"] },
              { n: "Rayan", t: "tag-male", g: "Male · 28", r: "Men's Lifestyle & Modern Professional", s: ["Jordan · UAE · KSA"], tags: ["Fashion", "Streetwear", "Tech", "F&B"] },
              { n: "Lina", t: "tag-female", g: "Female · 31", r: "Luxury & Premium Lifestyle", s: ["UAE / GCC Premium"], tags: ["Luxury", "Fragrance", "Jewelry", "Skincare"] },
              { n: "Faisal", t: "tag-male", g: "Male · 46", r: "Executive Authority & Corporate Leadership", s: ["GCC", "Gen X"], tags: ["Finance", "Real Estate", "Watches"] },
              { n: "Dana", t: "tag-female", g: "Female · 21", r: "Gen Z Beauty & Tech Lifestyle", s: ["Saudi Arabia / UAE", "Gen Z"], tags: ["Beauty", "Tech", "Gaming", "Social-First"] },
              { n: "Maha", t: "tag-female", g: "Female · 35", r: "Family & Home Lifestyle", s: ["GCC", "Millennials"], tags: ["FMCG", "Food & Bev", "Home", "Family"] },
              { n: "Malina", t: "tag-intl", g: "Intl · 27", r: "Premium Beauty & Lifestyle", s: ["European", "International / GCC"], tags: ["Luxury", "Skincare", "International"] },
            ].map((m, i) => (
              <div className={`model-card reveal reveal-delay-${(i % 3) + 1}`} key={m.n} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "18px", overflow: "hidden" }}>
                <div style={{ aspectRatio: "3/4", background: "linear-gradient(135deg, rgba(249,115,22,0.08), rgba(139,92,246,0.08))", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
                    <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "var(--gradient)", display: "flex", alignItems: "center", justifyContent: "center" }}><i data-lucide="user" style={{ width: 24, height: 24, color: "#fff" }}></i></div>
                    <p style={{ fontFamily: "var(--font-head)", fontSize: "12px", color: "rgba(255,255,255,0.25)" }}>{m.n}</p>
                  </div>
                  <div className={`model-gender-tag ${m.t}`} style={{ position: "absolute", top: "12px", left: "12px", padding: "3px 10px", borderRadius: "9999px", fontFamily: "var(--font-head)", fontSize: "10px", fontWeight: 600, letterSpacing: ".05em", textTransform: "uppercase" }}>{m.g}</div>
                </div>
                <div style={{ padding: "20px" }}>
                  <div style={{ fontFamily: "var(--font-head)", fontWeight: 700, fontSize: "18px", color: "#fff" }}>{m.n}</div>
                  <div style={{ fontFamily: "var(--font-body)", fontSize: "12px", color: "rgba(255,255,255,0.4)", marginBottom: "12px" }}>{m.r}</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "5px" }}>
                    {m.tags.map((t) => (<span key={t} style={{ padding: "2px 8px", borderRadius: "9999px", border: "1px solid rgba(255,255,255,0.08)", fontFamily: "var(--font-body)", fontSize: "11px", color: "rgba(255,255,255,0.38)" }}>{t}</span>))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CAMPAIGN PORTFOLIO */}
      <section id="campaigns" className="campaigns-section">
        <div className="section-inner">
          <div className="reveal">
            <div className="section-eyebrow"><i data-lucide="briefcase"></i>Campaign Portfolio</div>
            <h2 className="section-h2">Concept to campaign.<br /><span className="grad">Powered by AI.</span></h2>
            <p className="section-sub" style={{ marginBottom: "44px" }}>Strategy-led creative for global brands — produced at agency quality, delivered at startup speed.</p>
          </div>
          <div className="campaigns-grid">
            {[
              { i: "milk", tag: "FMCG", c: "Almarai", t: "AI Campaign Concept" },
              { i: "coffee", tag: "Beverage", c: "Coca-Cola", t: "The Pour That Moves Oceans" },
              { i: "zap", tag: "Beverage", c: "Pepsi", t: "Release The Vibe" },
              { i: "trophy", tag: "Sportswear", c: "Nike", t: "Silent Power Unleashed" },
              { i: "utensils", tag: "Food", c: "Heinz", t: "From Nature to Your Table" },
              { i: "sparkles", tag: "Beauty", c: "Brazilian Bum Bum", t: "AI Campaign Visual" },
              { i: "building-2", tag: "Real Estate", c: "Dubai Marina", t: "Night Campaign" },
              { i: "car", tag: "Automotive", c: "EV Environments", t: "Next-Generation Electric" },
            ].map((c, idx) => (
              <div className={`campaign-card reveal reveal-delay-${(idx % 4) + 1}`} key={c.c}>
                <div className="campaign-icon"><i data-lucide={c.i}></i></div>
                <span className="campaign-tag">{c.tag}</span>
                <div className="campaign-info">
                  <div className="campaign-client">{c.c}</div>
                  <div className="campaign-type">{c.t}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="reveal" style={{ marginTop: "32px", textAlign: "center" }}>
            <Link className="btn-outline" href="/portfolio">See Real Client Work →</Link>
          </div>
        </div>
      </section>

      {/* COMPARISON */}
      <section className="compare-section">
        <div className="section-inner">
          <div className="reveal">
            <div className="section-eyebrow"><i data-lucide="git-compare"></i>The Difference</div>
            <h2 className="section-h2">The old way<br />vs. <span className="grad">the TopK way.</span></h2>
            <p className="section-sub" style={{ marginBottom: "40px" }}>Marketers who mastered AI — not a tech company learning marketing.</p>
          </div>
          <div className="compare-grid">
            <div className="compare-col old reveal reveal-delay-1">
              <div className="compare-col-title">Traditional Production</div>
              <div className="compare-col-sub">SAR 6,000–22,000 per campaign · 4–8 weeks</div>
              <ul className="compare-list">
                {["4–8 weeks production timeline", "SAR 500–2,000 model booking fees", "Studio rental and equipment costs", "Weather, travel, scheduling delays", "Generic models — no cultural fit", "Limited revisions, expensive changes"].map((x) => (
                  <li key={x}><i data-lucide="x" className="xi"></i>{x}</li>
                ))}
              </ul>
            </div>
            <div className="compare-col new reveal reveal-delay-2">
              <div className="compare-col-title">TopK AI Production</div>
              <div className="compare-col-sub">SAR 850–3,750 per campaign · Up to 85% savings</div>
              <ul className="compare-list">
                {["Maximum 48h turnaround", "Zero model fees — pay only for content", "No studio, equipment, or travel costs", "9 GCC/International models — all free", "Cultural authenticity built-in", "Unlimited revisions at no extra cost"].map((x) => (
                  <li key={x}><i data-lucide="check" className="ci"></i>{x}</li>
                ))}
              </ul>
              <div className="savings-pill"><i data-lucide="trending-down"></i>Up to 98% cost savings</div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="how-section">
        <div className="section-inner">
          <div style={{ textAlign: "center", marginBottom: "60px" }} className="reveal">
            <div className="section-eyebrow" style={{ justifyContent: "center" }}><i data-lucide="arrow-right"></i>How It Works</div>
            <h2 className="section-h2" style={{ textAlign: "center", margin: "0 auto", maxWidth: "560px" }}>From concept to delivery<br />in four simple steps.</h2>
          </div>
          <div className="steps-grid">
            {[
              { n: 1, t: "Choose Your Model", d: "Browse our roster of 9 AI digital models and select the one that fits your brand and target audience." },
              { n: 2, t: "Submit Your Brief", d: "Fill out the campaign brief, share product details, and set your creative direction." },
              { n: 3, t: "We Create", d: "Our AI produces hyper-realistic content with your product — concept-driven, not prompt-driven." },
              { n: 4, t: "Receive & Publish", d: "Final content delivered in 3–5 days, production-ready for every channel and format." },
            ].map((s) => (
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
          <h2>Get a <span className="grad">free sample</span><br />for your product.</h2>
          <p>Send us your product link. We&apos;ll create a professional ad visual with a digital model — free.</p>
          <div className="cta-perks">
            <div className="cta-perk"><i data-lucide="check"></i>Hyper-realistic AI model with your product</div>
            <div className="cta-perk"><i data-lucide="check"></i>Delivered within 48 hours</div>
            <div className="cta-perk"><i data-lucide="check"></i>No obligation. No credit card.</div>
          </div>
          <div className="cta-btns">
            <a className="btn-grad" href="https://wa.me/962796669365" style={{ fontSize: "16px", padding: "16px 44px" }}>Claim Free Sample</a>
            <a className="btn-outline" href="mailto:sales@topk.agency">Book a Call</a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="footer-inner">
          <div className="footer-top">
            <div>
              <div className="footer-logo"><img src="/topk/topk-logo-white.png" alt="TopK" /></div>
              <div className="footer-tagline">AI-powered cinematic brand content, commercial advertising artwork, and model campaigns — produced at agency quality, delivered at startup speed.</div>
              <div className="footer-contact">
                <a className="footer-contact-item" href="https://topk.agency"><i data-lucide="globe"></i>topk.agency</a>
                <a className="footer-contact-item" href="https://wa.me/962796669365"><i data-lucide="message-circle"></i>+962 79 666 9365</a>
                <a className="footer-contact-item" href="mailto:sales@topk.agency"><i data-lucide="mail"></i>sales@topk.agency</a>
              </div>
            </div>
            <div className="footer-cols">
              <div className="footer-col">
                <div className="footer-col-title">Services</div>
                <a href="#services">AI Digital Models</a>
                <a href="#services">AI-Powered Campaigns</a>
                <a href="#services">AI Advertising Film</a>
                <a href="#services">Animated Social Content</a>
              </div>
              <div className="footer-col">
                <div className="footer-col-title">Company</div>
                <Link href="/portfolio">Portfolio</Link>
                <a href="#how">How It Works</a>
                <a href="#sample">Free Sample</a>
              </div>
              <div className="footer-col">
                <div className="footer-col-title">Legal</div>
                <a href="#">Privacy Policy</a>
                <a href="#">Terms</a>
                <a href="#">Refund Policy</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="footer-copy">© 2026 TopK Agency. Powered by AI. Limited by Nothing.</div>
            <div className="footer-pill">AI-Powered · Sharia-Compliant · Built in the Gulf</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
