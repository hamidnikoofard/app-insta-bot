import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  // مجاز کردن درخواست‌های cross-origin در محیط توسعه
  allowedDevOrigins: ['127.0.0.1', 'localhost'],
};

export default nextConfig;
