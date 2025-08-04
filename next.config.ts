import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // <- tambahkan ini
  },
  typescript: {
    ignoreBuildErrors: true, // <- tambahkan ini juga
  },
};


export default nextConfig;
