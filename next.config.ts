import type { NextConfig } from 'next';
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
});

// تمام تنظیمات فقط در یک آبجکت واحد
const nextConfig: NextConfig = {
  reactStrictMode: true,

  // تنظیمات مخصوص توسعه
  allowedDevOrigins: ['127.0.0.1', 'localhost'],

  images: {
    unoptimized: true,
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
        hostname: 'www.598.ir',
      },
      {
        protocol: 'https',
        hostname: 'direshop.shop',
      },
      {
        protocol: 'https',
        hostname: 'www.598.ir',
      },
    ],
  },
};

export default withPWA(nextConfig);
