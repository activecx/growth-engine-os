// Single source of truth for TopK's AI video services.
// Each type's `examples` holds up to 4 videos: { src, label }. Drop new examples here.
// Categories render either as a card grid ("grid") or an inline example section ("feature").

export type Example = { src: string; label: string };
export type VideoType = {
  id: string;
  name: string;
  icon: string; // lucide icon name
  short: string; // one-liner for cards
  long: string; // explanation for the detail page
  examples: Example[];
};
export type Category = {
  id: string;
  name: string;
  eyebrow: string;
  icon: string; // lucide section icon
  tagline: string;
  layout: "grid" | "feature";
  types: VideoType[];
};

export const CATEGORIES: Category[] = [
  {
    id: "marketing-studio",
    name: "Marketing Studio",
    eyebrow: "Marketing Studio",
    icon: "clapperboard",
    tagline: "One-click, conversion-focused product ads — purpose-built for every platform.",
    layout: "grid",
    types: [
      { id: "ugc", name: "UGC Ads", icon: "users", short: "Fake-authentic creator content that converts.", long: "Fake-authentic creator content — a real-feeling person holding and talking about your product straight to camera. The workhorse format for TikTok and Reels performance ads, with full control over the opening hook and the setting.", examples: [] },
      { id: "tutorial", name: "Tutorials & How-To", icon: "graduation-cap", short: "Step-by-step demos that teach and sell at once.", long: "Step-by-step “how to use it” videos. Perfect for products that need a demonstration to sell — skincare routines, gadgets, app features — educating and converting in the same clip.", examples: [] },
      { id: "unboxing", name: "Unboxing", icon: "package-open", short: "The satisfying package-open reveal.", long: "The package-open reveal — a powerful trust-builder for e-commerce and DTC that taps straight into the satisfying-reveal trend and makes your packaging part of the product.", examples: [] },
      { id: "hyper-motion", name: "Hyper Motion", icon: "zap", short: "Kinetic product hero shots that stop the scroll.", long: "Fast, kinetic product hero shots — product spinning, ingredients flying, dramatic motion and light. Pure visual appeal, no talking head: built to stop the scroll in the first second.", examples: [
        { src: "/topk/portfolio/gucci-floral.mp4", label: "Floral Fragrance" },
        { src: "/topk/portfolio/soda.mp4", label: "Sparkling Soda" },
        { src: "/topk/portfolio/iphone.mp4", label: "Tech Product" },
      ] },
      { id: "product-review", name: "Product Reviews", icon: "star", short: "Honest influencer-style takes that build trust.", long: "Authentic review-style talking content — like an influencer giving an honest take on your product. Builds credibility and pre-sells skeptical buyers before they ever reach your page.", examples: [] },
      { id: "tv-spots", name: "TV Spots", icon: "tv", short: "Broadcast-style brand storytelling, amplified.", long: "Polished, broadcast-style brand commercials — authentic stories, amplified. The high-production format for when you want your product to feel like a household name.", examples: [
        { src: "/topk/portfolio/adidas.mp4", label: "Sportswear — Concept Spot" },
      ] },
      { id: "wild-card", name: "Wild Card", icon: "wand-2", short: "Open creative mode for scroll-breaking concepts.", long: "Open creative mode for custom concepts that don’t fit any template. Where surreal, conceptual, swing-for-the-fences campaign ideas come to life.", examples: [] },
      { id: "try-on", name: "Virtual Try-On", icon: "shirt", short: "Your product worn on a real-looking model.", long: "Show your product on a person — apparel, jewelry, accessories, eyewear. Built for fashion and jewelry brands, available in standard UGC and higher-fidelity Pro versions.", examples: [
        { src: "/topk/portfolio/jewelry.mp4", label: "Jewelry — On Model" },
        { src: "/topk/portfolio/layla-jewelry.mp4", label: "Layla — Jewelry" },
      ] },
    ],
  },
  {
    id: "cinematic",
    name: "Cinematic & Brand Films",
    eyebrow: "Cinematic",
    icon: "film",
    tagline: "Cinema-grade brand films — anthems, founder stories, and dramatic product reveals.",
    layout: "feature",
    types: [
      { id: "brand-films", name: "Cinematic Brand Films", icon: "film", short: "Film-quality brand content, not ad templates.", long: "Beyond ad templates — cinema-grade brand films. Brand anthems, founder stories, emotional brand films, and dramatic product reveals, produced with the most advanced cinema models (Cinema Studio 3.0, Google Veo 3.1, Kling 3.0). Use these when the deliverable is a film, not a performance ad.", examples: [
        { src: "/topk/portfolio/sinour-nixoria.mp4", label: "Sinour — Nixoria" },
        { src: "/topk/portfolio/sinour-sivanor.mp4", label: "Sinour — Sivanor" },
        { src: "/topk/portfolio/sinour-grandeur.mp4", label: "Sinour — Grandeur" },
        { src: "/topk/portfolio/gucci-floral.mp4", label: "Fragrance — Brand Film" },
      ] },
    ],
  },
  {
    id: "ecommerce",
    name: "E-commerce & Product",
    eyebrow: "E-commerce",
    icon: "shopping-bag",
    tagline: "Reference-driven product video where identity and consistency matter.",
    layout: "feature",
    types: [
      { id: "product-ecommerce", name: "Product & E-commerce Video", icon: "shopping-bag", short: "360° turntables and multi-SKU, perfectly consistent.", long: "Reference-driven product video (powered by Seedance 2.0) for when identity and product consistency matter. It holds a consistent face or product across every shot and handles multi-SKU ranges — powering 360° turntables, multi-angle showcases, and campaigns where the same model or product must stay identical across clips.", examples: [
        { src: "/topk/portfolio/iphone.mp4", label: "Tech — Product" },
        { src: "/topk/portfolio/soda.mp4", label: "FMCG — Beverage" },
        { src: "/topk/portfolio/askim.mp4", label: "Askim — Cosmetics" },
        { src: "/topk/portfolio/luna.mp4", label: "Beauty — Skincare" },
      ] },
    ],
  },
  {
    id: "social",
    name: "Social Videos",
    eyebrow: "Social",
    icon: "smartphone",
    tagline: "Short-form vertical content built for TikTok, Reels, and Shorts.",
    layout: "grid",
    types: [
      { id: "social-hooks", name: "Social Hooks", icon: "flame", short: "3-second scroll-stoppers engineered to grab attention.", long: "Scroll-stopping, top-of-funnel openers — visual attention grabbers engineered to stop the thumb before anyone can scroll past. Not a full product pitch: pure hook, built to win the first three seconds.", examples: [
        { src: "/topk/portfolio/hook-airplane.mp4", label: "Aviation Hook" },
        { src: "/topk/portfolio/hook-glass-bridge.mp4", label: "Glass Bridge Hook" },
        { src: "/topk/portfolio/hook-ottoman.mp4", label: "Palace Hook" },
        { src: "/topk/portfolio/hook-helicopter.mp4", label: "Action Hook" },
      ] },
      { id: "social-viral", name: "Social Viral Videos", icon: "trending-up", short: "Trend-led content engineered to spread.", long: "Viral-style social content engineered to spread — trend-led, high-shareability formats built for growing reach fast on TikTok, Reels, and Shorts.", examples: [
        { src: "/topk/portfolio/viral-power.mp4", label: "Power" },
        { src: "/topk/portfolio/viral-clarity.mp4", label: "Clarity" },
        { src: "/topk/portfolio/viral-dignity.mp4", label: "Dignity" },
        { src: "/topk/portfolio/viral-self-care.mp4", label: "Self-Care" },
      ] },
    ],
  },
  {
    id: "stylized",
    name: "Stylized & Animated",
    eyebrow: "Stylized",
    icon: "palette",
    tagline: "Non-photoreal brand worlds — animated, illustrated, and mascot-driven.",
    layout: "feature",
    types: [
      { id: "stylized", name: "Stylized & Animated", icon: "palette", short: "Animated explainers, mascots, illustrated brand worlds.", long: "Non-photoreal brand content (powered by Wan 2.6/2.7 plus cartoon and anime aesthetics) — animated explainers, mascot-driven pieces, and illustrated brand worlds. For clients who want a distinct illustrated identity rather than live-action realism.", examples: [] },
    ],
  },
  {
    id: "hyper-real",
    name: "Hyper-Real Video",
    eyebrow: "Hyper-Real",
    icon: "sparkles",
    tagline: "Ultra-realistic video that audiences never read as AI.",
    layout: "feature",
    types: [
      { id: "hyper-real", name: "Hyper-Real Video", icon: "sparkles", short: "Super-natural video that doesn’t look AI-generated.", long: "Ultra-realistic, super-natural video that doesn’t read as AI-generated — available in popular Asian-market styles: tutorials, podcast-style, talking-head, and any format you prefer. Natural lighting, believable people, real-world feel — ideal for brands that want content audiences trust instantly.", examples: [
        { src: "/topk/portfolio/hyperreal-host.mp4", label: "Talking-Head Host" },
      ] },
    ],
  },
];

export const TOTAL_TYPES = CATEGORIES.reduce((n, c) => n + c.types.length, 0);

export function findType(id: string): { type: VideoType; category: Category } | null {
  for (const category of CATEGORIES) {
    const type = category.types.find((t) => t.id === id);
    if (type) return { type, category };
  }
  return null;
}
