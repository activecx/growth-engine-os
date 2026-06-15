"use client";

import { useEffect, useState } from "react";

interface StickyCTAProps {
  onOpenForm: () => void;
  /** Hide sticky bar when the form modal is open */
  formOpen: boolean;
}

export default function StickyCTA({ onOpenForm, formOpen }: StickyCTAProps) {
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // Show after scrolling past ~80vh
      setPastHero(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const visible = pastHero && !formOpen;

  return (
    <div
      className={`sticky-cta${visible ? " visible" : ""}`}
      aria-hidden={!visible}
      role="complementary"
      aria-label="Quick sign-up bar"
    >
      <p className="sticky-cta-text">
        Limited spots this month —{" "}
        <span>get your free video sample now.</span>
      </p>
      <button
        className="btn-grad"
        onClick={onOpenForm}
        tabIndex={visible ? 0 : -1}
        style={{ fontSize: "14px", padding: "12px 28px", borderRadius: "10px", whiteSpace: "nowrap" }}
      >
        Get My Free Sample
      </button>
    </div>
  );
}
