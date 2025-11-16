type Product = {
  id: number;
  name: string;
  price: number;
  discountedPrice?: number;
  image: string;
  description: string;
};

export const products: Product[] = [
  {
    id: 1,
    name: 'ربات فالوور اینستاگرام',
    price: 500000,
    discountedPrice: 400000,
    image: '/Grand-mil-bl3.webp',
    description:
      'ربات حرفه‌ای برای افزایش فالوورهای واقعی و فعال در اینستاگرام با الگوریتم‌های پیشرفته',
  },
  {
    id: 2,
    name: 'ربات لایک و کامنت',
    price: 300000,
    image: '/Grand-mil-bl3.webp',
    description: 'افزایش تعامل پست‌های شما با لایک و کامنت‌های هدفمند و طبیعی',
  },
  {
    id: 3,
    name: 'ربات استوری ویو',
    price: 250000,
    discountedPrice: 200000,
    image: '/Grand-mil-bl3.webp',
    description:
      'افزایش بازدید استوری‌های شما برای دیده شدن بیشتر توسط مخاطبان',
  },
  {
    id: 4,
    name: 'ربات DM خودکار',
    price: 350000,
    image: '/Grand-mil-bl3.webp',
    description: 'ارسال پیام‌های خودکار و شخصی‌سازی شده به فالوورهای جدید',
  },
  {
    id: 5,
    name: 'ربات هشتگ هوشمند',
    price: 200000,
    discountedPrice: 150000,
    image: '/Grand-mil-bl3.webp',
    description:
      'پیدا کردن و استفاده از بهترین هشتگ‌ها برای افزایش ر reach پست‌های شما',
  },
  {
    id: 6,
    name: 'ربات آنالیز رقبا',
    price: 450000,
    image: '/Grand-mil-bl3.webp',
    description:
      'تحلیل کامل رقبای شما و استراتژی‌های موفق آن‌ها برای بهبود عملکرد',
  },
  {
    id: 7,
    name: 'ربات پست خودکار',
    price: 400000,
    discountedPrice: 320000,
    image: '/Grand-mil-bl3.webp',
    description:
      'زمان‌بندی و انتشار خودکار پست‌ها در بهترین ساعات برای بیشترین تعامل',
  },
  {
    id: 8,
    name: 'ربات فالو/آنفالو',
    price: 280000,
    image: '/Grand-mil-bl3.webp',
    description: 'مدیریت هوشمند فالو و آنفالو برای حفظ نسبت متعادل فالوورها',
  },
  {
    id: 9,
    name: 'ربات کامنت هوشمند',
    price: 320000,
    discountedPrice: 280000,
    image: '/Grand-mil-bl3.webp',
    description: 'ارسال کامنت‌های هوشمند و مرتبط با محتوا برای افزایش تعامل',
  },
  {
    id: 10,
    name: 'پکیج کامل ربات اینستاگرام',
    price: 1500000,
    discountedPrice: 1200000,
    image: '/Grand-mil-bl3.webp',
    description:
      'پکیج کامل شامل تمام قابلیت‌های ربات‌ها با قیمت ویژه و پشتیبانی 24/7',
  },
];
