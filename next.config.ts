import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  async rewrites() {
    return [
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
    ];
  },
};

export default nextConfig;
