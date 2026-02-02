import "./src/env";

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: "/api/auth/:path*",
        destination: `http://localhost:5000/api/auth/:path*`,
      },
    ];
  },
};

export default nextConfig;
