import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pinimg.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.gosupps.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '4.bp.blogspot.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;