import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/fitlog",
        destination: "https://api.abcz.workers.dev/api/fitlog",
      },
      {
        source: "/api/fitlog/:path*",
        destination: "https://api.abcz.workers.dev/api/fitlog/:path*",
      },
    ];
  },
};

export default nextConfig;
