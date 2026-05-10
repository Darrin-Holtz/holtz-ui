import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "kswgfqxr6n.ufs.sh",
        port: "",
      },{
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
      }
    ],
  },
  experimental: {
    serverActions: {
      allowedOrigins: [
        "localhost:3000",
        "*.app.github.dev",
      ],
    },
  },
};

export default nextConfig;
