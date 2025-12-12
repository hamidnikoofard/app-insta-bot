'use client';
import { Clock, CheckCircle, ExternalLink } from 'lucide-react';
import { useAuth } from '@/contexts';
import { Button } from '@/components/ui';

function PendingApprovalStep() {
  const { online_shop_is_added_to_meta } = useAuth();
  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <div className="bg-card shadow-lg border border-border rounded-2xl p-10 max-w-md w-full text-center">
        <div className="flex items-center justify-center mb-6">
          <div className="w-20 h-20 flex items-center justify-center rounded-full bg-primary/10 text-primary shadow-lg">
            <Clock className="h-10 w-10" strokeWidth={2} />
          </div>
        </div>
        {!online_shop_is_added_to_meta ? (
          <div className="space-y-4">
            <h1 className="text-2xl font-bold text-card-foreground mb-3">
              پیج شما با موفقیت ثبت شد
            </h1>

            <p className="text-muted-foreground text-sm mb-8 leading-relaxed">
              پیج شما در صف بررسی قرار دارد. پس از تأیید توسط تیم ما، نتیجه از
              طریق پنل و ایمیل به شما اطلاع‌رسانی خواهد شد.
            </p>

            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <CheckCircle className="h-4 w-4" />
              <span>در حال بررسی توسط تیم ما</span>
            </div>
          </div>
        ) : (
          <div className="space-y-4 flex flex-col items-center justify-center">
            <h1 className="text-2xl font-bold text-card-foreground mb-3">
              پیچ شما با موفقیت در متا ثبت شد
            </h1>

            <p className="text-muted-foreground text-sm mb-8 leading-relaxed">
              در این مرحله باید از قسمت تنظیمات اینستاگرام خود، قسمت Apps and
              Websites و بعد{' '}
              <span className="font-bold text-primary text-base">
                Tester invitations{' '}
              </span>
              در خواست استفاده از سرویس را قبول کنید. برای اینکار می توانید روی
              دکمه زیر کلیک کنید تا به بخش موردنظر هدایت شوید
            </p>
            <Button
              variant="outline"
              onClick={() => {
                const url = new URL(
                  'https://www.instagram.com/accounts/manage_access/'
                );

                window.open(url.toString(), '_blank', 'noopener,noreferrer');
              }}
            >
              قبول درخواست استفاده از سرویس
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export { PendingApprovalStep };
