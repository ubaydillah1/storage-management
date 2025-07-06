import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "100MB",
    },
  },
  images: {
    domains: [
      "upload.wikimedia.org",
      "images.unsplash.com",
      "res.cloudinary.com",
      "img.freepik.com",
    ],
  },
};

export default nextConfig;
