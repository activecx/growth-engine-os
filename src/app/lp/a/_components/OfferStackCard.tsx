"use client";

interface OfferStackCardProps {
  onOpenForm: () => void;
}

const STACK_LINES = [
  { name: "Free video sample of your product", val: "$250 value" },
  { name: "Unlimited revisions until you love it", val: "$100 value" },
  { name: "Platform-optimised cut (TikTok / Reels / Feed)", val: "Included" },
];

export default function OfferStackCard({ onOpenForm }: OfferStackCardProps) {
  return (
    <section className="offer-section lp-section" style={{ borderTop: "1px solid var(--border)" }}>
      <div className="offer-section-inner">
        <div className="reveal" style={{ textAlign: "center" }}>
          <div className="section-eyebrow" style={{ justifyContent: "center" }}>
            What you get — free
          </div>
          <h2 className="section-h2" style={{ textAlign: "center", margin: "0 auto", maxWidth: "560px" }}>
            Everything in your free sample — no catch.
          </h2>
          <p className="section-sub" style={{ margin: "14px auto 0", textAlign: "center", maxWidth: "480px" }}>
            We put real value in your hands first. You decide if you want more.
          </p>
        </div>

        <div className="offer-card reveal">
          <div className="offer-stack-title">Free sample — what&apos;s included</div>
          <ul className="offer-stack-lines">
            {STACK_LINES.map((line) => (
              <li key={line.name} className="offer-line">
                <span className="offer-line-name">
                  <svg style={{ display: "inline", marginRight: "8px", verticalAlign: "middle", color: "var(--orange)", width: "15px", height: "15px" }} viewBox="0 0 15 15" fill="none" aria-hidden="true">
                    <path d="M2.5 7.5L6 11L12.5 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {line.name}
                </span>
                <span className="offer-line-val">{line.val}</span>
              </li>
            ))}
          </ul>

          <div className="offer-total-row">
            <div className="offer-total-label">You pay today</div>
            <div className="offer-total-price">
              <span className="offer-total-old">$350+</span>
              <span className="offer-total-new">FREE</span>
            </div>
          </div>

          <button
            className="btn-grad"
            onClick={onOpenForm}
            style={{ width: "100%", fontSize: "17px", padding: "18px" }}
          >
            Get My Free Sample
          </button>

          <p style={{ textAlign: "center", marginTop: "14px", fontFamily: "var(--font-body)", fontSize: "12px", color: "rgba(255,255,255,0.3)" }}>
            Love it? Turn it into your first finished ad for just $150. No obligation if you don&apos;t.
          </p>
        </div>
      </div>
    </section>
  );
}
