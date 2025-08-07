import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // <- tambahkan ini
  },
  typescript: {
    ignoreBuildErrors: true, // <- tambahkan ini juga
  },
  images: {
    domains: ['pocketbase-app-production.up.railway.app'],
  },
};


export default nextConfig;
