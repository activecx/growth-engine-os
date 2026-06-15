"use client";

interface GuaranteeSealProps {
  onOpenForm: () => void;
}

export default function GuaranteeSeal({ onOpenForm }: GuaranteeSealProps) {
  return (
    <section className="guarantee-section lp-section" aria-label="Zero-risk guarantee">
      <div className="guarantee-section-inner reveal">
        <div className="guarantee-seal" aria-hidden="true">🛡️</div>
        <h2 className="guarantee-title">Zero-Risk Free Sample</h2>
        <p className="guarantee-body">
          We make your video first. You watch it. You love it — or you owe us
          nothing. No credit card. No contract. No awkward cancellation.
          Just a real video of your product, made with AI and our experience,
          delivered in 3–5 days.
        </p>
        <div className="guarantee-items">
          <div className="guarantee-item">No card required</div>
          <div className="guarantee-item">Revisions included</div>
          <div className="guarantee-item">No obligation</div>
          <div className="guarantee-item">Delivered in 3–5 days</div>
        </div>
        <button
          className="btn-grad"
          onClick={onOpenForm}
          style={{ fontSize: "16px", padding: "16px 40px" }}
        >
          Get My Free Sample
        </button>
      </div>
    </section>
  );
}
