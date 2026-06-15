"use client";

import { useState } from "react";

interface FAQItem {
  q: string;
  a: string;
}

const FAQS: FAQItem[] = [
  {
    q: "Is it actually free? What's the catch?",
    a: "Yes — completely free. No credit card, no hidden fees, no obligation. We make you a short video of your product at no cost. Our bet is that you love it and want more. If you don't, no hard feelings — you keep the video.",
  },
  {
    q: "How long does the free sample take?",
    a: "3–5 business days for the standard track. If you add the Rush 48h upgrade, we prioritise your project and deliver within 48 hours.",
  },
  {
    q: "What kind of video will you make for my product?",
    a: "We make scroll-stopping product ads, UGC-style creator videos, unboxing reveals, hyper-motion hero shots, and more. When you fill out the form you can pick a style — or tell us to surprise you and we'll choose what fits your product best.",
  },
  {
    q: "Do I need to send you my physical product?",
    a: "No. Just share a photo, a product link, or even just a description. Our AI and design team work from your product reference — no shipping required.",
  },
  {
    q: "What happens after the free sample?",
    a: "You see your video. If you love it, you can turn it into a finished polished ad for $150 — or order a 3-pack for a bigger campaign. There's no pressure and no automatic charges. You decide what happens next.",
  },
];

interface FAQAccordionProps {
  /** Which item index to open by default. Default 0 (first). */
  defaultOpen?: number;
}

export default function FAQAccordion({ defaultOpen = 0 }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number>(defaultOpen);

  function toggle(i: number) {
    setOpenIndex((prev) => (prev === i ? -1 : i));
  }

  return (
    <section className="faq-section" aria-label="Frequently asked questions">
      <div className="faq-section-inner">
        <div className="reveal" style={{ textAlign: "center" }}>
          <div className="section-eyebrow" style={{ justifyContent: "center" }}>FAQ</div>
          <h2 className="section-h2" style={{ textAlign: "center", margin: "0 auto", maxWidth: "520px" }}>
            Questions we always get.
          </h2>
        </div>

        <ul className="faq-list" role="list">
          {FAQS.map((faq, i) => (
            <li
              key={i}
              className={`faq-item reveal reveal-delay-${Math.min(i + 1, 4)}${openIndex === i ? " open" : ""}`}
            >
              <button
                className="faq-question"
                onClick={() => toggle(i)}
                aria-expanded={openIndex === i}
                aria-controls={`faq-answer-${i}`}
              >
                <span className="faq-q-text">{faq.q}</span>
                <span className="faq-icon" aria-hidden="true">+</span>
              </button>
              <div
                id={`faq-answer-${i}`}
                className="faq-answer"
                role="region"
                aria-label={faq.q}
              >
                {faq.a}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
