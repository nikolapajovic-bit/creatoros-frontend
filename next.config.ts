import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
  allowedDevOrigins: ["192.168.100.6"],
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
