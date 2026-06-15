"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface LpNavProps {
  onOpenForm: () => void;
}

export default function LpNav({ onOpenForm }: LpNavProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`lp-nav${scrolled ? " scrolled" : ""}`}>
      <a className="lp-nav-logo" href="#top" aria-label="TopK Agency">
        <Image
          src="/topk/topk-logo-white.png"
          alt="TopK"
          width={80}
          height={26}
          style={{ height: "26px", width: "auto" }}
          priority
        />
      </a>
      <div className="lp-nav-cta">
        <button className="btn-grad" onClick={onOpenForm}>
          Get My Free Sample
        </button>
      </div>
    </nav>
  );
}
