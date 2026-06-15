// Single source of truth for TopK's AI video services.
// Each type's `examples` holds up to 4 videos: { src, label }. Drop new examples here.

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
  tagline: string;
  types: VideoType[];
};

export const CATEGORIES: Category[] = [
  {
    id: "marketing-studio",
    name: "Marketing Studio Videos",
    eyebrow: "Marketing Studio",
    tagline: "Production-grade product videos for ads, e-commerce, and brand campaigns.",
    types: [
      { id: "ugc", name: "UGC Videos", icon: "users", short: "Authentic creator-style content people actually trust.", long: "User-generated-style videos that feel real, not produced — the relatable, creator-first content that drives trust and conversions on every platform.", examples: [] },
      { id: "tutorials", name: "Tutorials", icon: "graduation-cap", short: "Step-by-step videos that teach and sell at once.", long: "Clear, engaging product tutorials that walk your customer through value step by step — educating and selling in the same clip.", examples: [] },
      { id: "how-to", name: "How To Use It", icon: "book-open", short: "Simple demos of exactly how your product works.", long: "Straightforward how-to demos that remove buying hesitation by showing precisely how your product works and why it matters.", examples: [] },
      { id: "unboxing", name: "Unboxing Videos", icon: "package-open", short: "The satisfying first-impression reveal.", long: "The premium unboxing moment — that satisfying first-impression reveal that builds desire and makes your packaging part of the product.", examples: [] },
      { id: "hyper-motion", name: "Hyper-Motion Videos", icon: "zap", short: "Physics-defying product motion that stops the scroll.", long: "High-energy, physics-defying product motion — liquid, light, and movement choreographed to stop the scroll in the first second.", examples: [
        { src: "/topk/portfolio/layla-jewelry.mp4", label: "Layla — Jewelry" },
      ] },
      { id: "wild-card", name: "Wild Card Videos", icon: "wand-2", short: "Bold, unexpected concepts built to go viral.", long: "Bold, surprising creative concepts designed to break the pattern, spark conversation, and earn shares — the swing-for-the-fences ideas.", examples: [] },
      { id: "tv-spots", name: "TV Spots", icon: "tv", short: "Broadcast-quality commercials, fraction of the cost.", long: "Cinematic, broadcast-ready commercial spots with the polish of traditional TV production — at a fraction of the time and cost.", examples: [] },
      { id: "ugc-try-ons", name: "UGC Try-Ons", icon: "shirt", short: "Real-feel try-on content before they buy.", long: "Authentic try-on content that lets shoppers see your product worn and used in real life — the proof that closes the sale.", examples: [] },
      { id: "brand-commercials", name: "Product Brand Commercials", icon: "clapperboard", short: "Full brand stories with premium production value.", long: "Full product brand commercials that tell your story with premium, cinematic production value — the hero film for your brand.", examples: [
        { src: "/topk/portfolio/sinour-nixoria.mp4", label: "Sinour — Nixoria" },
        { src: "/topk/portfolio/sinour-sivanor.mp4", label: "Sinour — Sivanor" },
        { src: "/topk/portfolio/sinour-grandeur.mp4", label: "Sinour — Grandeur" },
        { src: "/topk/portfolio/askim.mp4", label: "Askim — Cosmetics" },
      ] },
    ],
  },
  {
    id: "social",
    name: "Social Videos",
    eyebrow: "Social",
    tagline: "Platform-native short video built to win attention and grow your brand.",
    types: [
      { id: "social-hooks", name: "Short-Form Social Hooks", icon: "flame", short: "Scroll-stopping opening seconds, engineered.", long: "The first-frame hooks engineered to grab attention before anyone can scroll past — the single most important seconds of any social video.", examples: [] },
      { id: "social-videos", name: "Short-Form Social Videos", icon: "smartphone", short: "Native short video for Reels, TikTok & Shorts.", long: "Full platform-native short videos built for Reels, TikTok, and Shorts — paced, formatted, and styled for how people actually watch.", examples: [] },
      { id: "talking-avatars", name: "Talking Tutorial Avatars", icon: "messages-square", short: "Your AI brand ambassador, on every platform.", long: "A custom AI avatar that becomes your brand's spokesperson — a consistent, always-available ambassador who explains, demos, and sells in your voice across every channel.", examples: [] },
    ],
  },
];

export function findType(id: string): { type: VideoType; category: Category } | null {
  for (const category of CATEGORIES) {
    const type = category.types.find((t) => t.id === id);
    if (type) return { type, category };
  }
  return null;
}
