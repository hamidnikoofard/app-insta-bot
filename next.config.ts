import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  // مجاز کردن درخواست‌های cross-origin در محیط توسعه
  allowedDevOrigins: ['127.0.0.1', 'localhost'],
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8000',
        pathname: '/media/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/media/**',
      },
      {
        protocol: 'https',
        hostname: 'lookaside.fbsbx.com',
      },
      {
        protocol: 'https',
        hostname: 'direshop.shop',
      },
      {
        protocol: 'https',
        hostname: 'www.598.ir',
      }
    ],
  },
};

export default nextConfig;