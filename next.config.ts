import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  async rewrites() {
    return {
      // beforeFiles: run BEFORE filesystem routes, so this overrides the root
      // page.tsx. The homepage (lp.topk.agency/) now serves the AI-videos VSL
      // funnel (/lp/a). The old services page at src/app/page.tsx is kept in the
      // repo but no longer shown at root. URL stays a clean "/".
      beforeFiles: [
        {
          source: "/",
          destination: "/lp/a",
        },
      ],
      // afterFiles: checked after filesystem routes (existing aliases)
      afterFiles: [
        // /claude-operator-pitch → static HTML wrapper (URL stays /claude-operator-pitch)
        {
          source: "/claude-operator-pitch",
          destination: "/claude-operator-pitch/index.html",
        },
        // The Claude Operator Master Class — hub + per-Part decks (URLs stay clean)
        {
          source: "/claude-operator-master-class",
          destination: "/claude-operator-master-class/index.html",
        },
        {
          source: "/claude-operator-master-class/foundation",
          destination: "/claude-operator-master-class/foundation/index.html",
        },
        {
          source: "/claude-operator-master-class/part-1-chat",
          destination: "/claude-operator-master-class/part-1-chat/index.html",
        },
        {
          source: "/claude-operator-master-class/part-2-design",
          destination: "/claude-operator-master-class/part-2-design/index.html",
        },
        {
          source: "/claude-operator-master-class/part-3-code",
          destination: "/claude-operator-master-class/part-3-code/index.html",
        },
        // /ai-videos → /lp/a  (URL stays /ai-videos)
        {
          source: "/ai-videos",
          destination: "/lp/a",
        },
        // /ai-videos/:path* → /lp/a/:path*  (upsell flow: oto1, down1, thanks)
        {
          source: "/ai-videos/:path*",
          destination: "/lp/a/:path*",
        },
        // /video-services → /lp/a  (URL stays /video-services)
        {
          source: "/video-services",
          destination: "/lp/a",
        },
        // /video-services/:path* → /lp/a/:path*  (upsell flow: oto1, down1, thanks)
        {
          source: "/video-services/:path*",
          destination: "/lp/a/:path*",
        },
      ],
      fallback: [],
    };
  },
};

export default nextConfig;
