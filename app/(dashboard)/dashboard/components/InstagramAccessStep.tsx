'use client';
import { ExternalLink, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';

function InstagramAccessStep() {
  const handleOpenInstagram = () => {
    // Open Instagram in a new tab
    window.open('https://www.instagram.com', '_blank');
  };

  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <div className="bg-card shadow-lg border border-border rounded-2xl p-10 max-w-md w-full text-center">
        <div className="flex items-center justify-center mb-6">
          <div className="w-20 h-20 flex items-center justify-center rounded-full bg-primary text-white shadow-lg">
            <ExternalLink className="h-10 w-10" strokeWidth={2} />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-card-foreground mb-3">
          در انتظار تأیید دسترسی اینستاگرام
        </h1>

        <p className="text-muted-foreground text-sm mb-8 leading-relaxed">
          لطفاً درخواست دسترسی ارسال‌شده از سوی Meta را بررسی و تأیید کنید. این
          تأیید برای فعال‌سازی اتصال امن میان پیج کاری شما و لینکزا ضروری است.
          پس از تأیید، اتصال به‌طور خودکار کامل می‌شود.
        </p>

        <Button
          size="lg"
          className="w-full shadow-md hover:shadow-lg group"
          onClick={handleOpenInstagram}
        >
          <Instagram className="h-5 w-5" />
          <span>ورود به اینستاگرام</span>
          <ExternalLink className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </div>
  );
}

export { InstagramAccessStep };
