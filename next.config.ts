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
};

export default withPWA(nextConfig);
