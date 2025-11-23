import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Insta Bot - ربات اینستاگرام',
    short_name: 'Insta Bot - ربات اینستاگرام',
    description: 'پلتفرم حرفه‌ای برای مدیریت و رشد حساب‌های اینستاگرام',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: '/Logo.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/Logo.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}