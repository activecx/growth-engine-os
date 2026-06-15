"use client";

import { useState } from "react";
import Script from "next/script";
import LeadForm from "./_components/LeadForm";
import LpNav from "./_components/LpNav";
import StickyCTA from "./_components/StickyCTA";
import "../../lp/lp.css";

declare global {
  interface Window {
    lucide?: { createIcons: () => void };
  }
}

export default function LpALayout({ children }: { children: React.ReactNode }) {
  const [formOpen, setFormOpen] = useState(false);

  function openForm() { setFormOpen(true); }
  function closeForm() { setFormOpen(false); }

  /**
   * We need to pass `onOpenForm` down to all page sections.
   * Because this is a Server-Component-compatible layout, we inject it via a
   * data attribute on the wrapper and let page sections call window.__topkOpenForm.
   * However, since page.tsx is also a client component, we pass it through
   * a global so page sections can call it without prop drilling through RSC.
   */
  if (typeof window !== "undefined") {
    (window as Window & { __topkOpenForm?: () => void }).__topkOpenForm = openForm;
  }

  return (
    <div className="lp-page">
      <Script
        src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"
        strategy="afterInteractive"
        onLoad={() => window.lucide?.createIcons()}
      />

      {/* S0 — Nav (logo-only, no leak links) */}
      <LpNav onOpenForm={openForm} />

      {/* Page sections (S1–S11 + S13) injected here */}
      {children}

      {/* S12 — Sticky CTA (shared open-state) */}
      <StickyCTA onOpenForm={openForm} formOpen={formOpen} />

      {/* 2-step LeadForm modal */}
      <LeadForm isOpen={formOpen} onClose={closeForm} />
    </div>
  );
}
