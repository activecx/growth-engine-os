"use client";

// TODO: swap in final VSL avatar video (replace poster + add <video> element when file is ready)

interface VSLHeroProps {
  onOpenForm: () => void;
  headline?: string;
  /** Path to the VSL video. If omitted, shows the poster placeholder. */
  videoSrc?: string;
}

const DEFAULT_HEADLINE = (
  <>
    Premium product video used to cost a fortune.{" "}
    <em>Not anymore.</em>
  </>
);

export default function VSLHero({
  onOpenForm,
  headline,
  videoSrc,
}: VSLHeroProps) {
  return (
    <section className="vsl-hero" id="top">
      <div className="vsl-hero-bg" aria-hidden="true" />
      <div className="vsl-hero-inner">
        {/* Eyebrow */}
        <div className="vsl-eyebrow reveal">
          For brands that want premium product video
        </div>

        {/* H1 */}
        <h1 className="reveal reveal-delay-1">
          {headline ?? DEFAULT_HEADLINE}
        </h1>

        {/* Sub-headline */}
        <p className="vsl-hero-sub reveal reveal-delay-2">
          Studio, models, crew, weeks of editing — gone. With AI and our
          experience, we make the same scroll-stopping video at a fraction of
          the cost. See your product as a video first, free.
        </p>

        {/* VSL video / placeholder */}
        <div className="vsl-video-wrap reveal reveal-delay-2">
          {/* Poster image always shown as fallback / loading state */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="vsl-poster"
            src="/topk/hero-model.png"
            alt="TopK premium product video sample"
          />

          {videoSrc ? (
            /* TODO: swap in final VSL avatar video — remove poster overlay when live */
            <video
              src={videoSrc}
              controls
              playsInline
              preload="metadata"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          ) : (
            /* Gradient play button placeholder */
            <div
              className="vsl-play-btn"
              role="button"
              aria-label="Play VSL video (coming soon)"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && onOpenForm()}
              onClick={onOpenForm}
            >
              <div className="vsl-play-circle">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          )}
        </div>

        {/* CTA #1 */}
        <div className="vsl-cta-wrap reveal reveal-delay-3">
          <button className="btn-grad" onClick={onOpenForm} style={{ fontSize: "18px", padding: "18px 44px" }}>
            Get My Free Sample
          </button>
          <div className="vsl-micro">
            <span>No card needed</span>
            <span>1 free video</span>
            <span>Delivered in 3–5 days</span>
          </div>
        </div>

        {/* Stats */}
        <div className="hero-stats reveal reveal-delay-4">
          <div className="stat-item">
            <div className="stat-num">1/10th</div>
            <div className="stat-label">of studio cost</div>
          </div>
          <div className="stat-item">
            <div className="stat-num">3–5d</div>
            <div className="stat-label">turnaround</div>
          </div>
          <div className="stat-item">
            <div className="stat-num">FREE</div>
            <div className="stat-label">first video</div>
          </div>
        </div>
      </div>
    </section>
  );
}
