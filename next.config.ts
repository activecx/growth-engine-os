import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  async rewrites() {
    return {
      beforeFiles: [],
      // afterFiles: checked after filesystem routes (existing aliases)
      afterFiles: [
        // /claude-operator-pitch → static HTML wrapper (URL stays /claude-operator-pitch)
        {
          source: "/claude-operator-pitch",
          destination: "/claude-operator-pitch/index.html",
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
