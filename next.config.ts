import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {
  experimental: {
    globalNotFound: true,
    // Keep prefetched payloads reusable for a while instead of refetching a
    // route the visitor just came from. `dynamic` defaults to 0, which meant
    // the catalog's prefetch was thrown away the moment it was used.
    staleTimes: {
      dynamic: 30,
      static: 300,
    },
  },
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
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      {
        // Editorial hero imagery for the Products / Pricing / Testimonials headers.
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
