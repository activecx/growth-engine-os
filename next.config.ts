import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  async rewrites() {
    return {
      // beforeFiles: checked before filesystem routes — shadows src/app/page.tsx at root
      beforeFiles: [
        // Root "/" serves the funnel landing (URL stays "/")
        {
          source: "/",
          destination: "/lp/a",
        },
      ],
      // afterFiles: checked after filesystem routes (existing aliases)
      afterFiles: [
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
