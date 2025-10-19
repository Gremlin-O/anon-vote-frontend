import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: process.env.NEXT_PUBLIC_SERVER_BASE_URL + "/:path*",
      },
    ];
  },
};

export default nextConfig;
