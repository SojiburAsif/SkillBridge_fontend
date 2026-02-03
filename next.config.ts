import "./src/env";

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/auth/:path*",
  //       destination: `${process.env.NEXT_PUBLIC_API_URL}/api/auth/:path*`,
  //     },
  //   ];
  // },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `https://skillbridgebackend.vercel.app/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
