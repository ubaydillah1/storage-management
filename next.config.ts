import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
