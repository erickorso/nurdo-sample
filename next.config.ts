import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      new URL('https://cdn2.thecatapi.com/**'),
      new URL('https://27.media.tumblr.com/'),
      new URL('https://30.media.tumblr.com/')
    ]
  },
};

export default nextConfig;
