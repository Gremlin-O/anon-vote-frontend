import type { NextConfig } from "next";

const serverBaseUrl =
  process.env.NEXT_PUBLIC_SERVER_BASE_URL ??
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost:8080/api";

const nextConfig: NextConfig = {
  compiler: {
    // removeConsole: true,
  },
  devIndicators: false,
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  output: "standalone",

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${serverBaseUrl}/:path*`,
      },
    ];
  },
};

export default nextConfig;
