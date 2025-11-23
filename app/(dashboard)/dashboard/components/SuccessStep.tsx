'use client';
import { PartyPopper, CheckCircle2 } from 'lucide-react';

function SuccessStep() {
  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <div className="bg-card shadow-lg border border-border rounded-2xl p-10 max-w-md w-full text-center">
        <div className="flex items-center justify-center mb-6">
          <div className="relative">
            <div className="w-24 h-24 flex items-center justify-center rounded-full bg-primary/10 text-primary shadow-lg">
              <PartyPopper className="h-12 w-12" strokeWidth={2} />
            </div>
            <div className="absolute -bottom-1 -right-1 w-10 h-10 flex items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
              <CheckCircle2 className="h-6 w-6" strokeWidth={2.5} />
            </div>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-card-foreground mb-3">
          تبریک! پیج شما با موفقیت ثبت شد
        </h1>

        <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
          پیج اینستاگرام شما با موفقیت به حساب کاربری شما متصل شد. حالا
          می‌توانید از تمام امکانات پلتفرم لینکزا استفاده کنید.
        </p>

        <div className="mt-8 pt-6 border-t border-border">
          <p className="text-xs text-muted-foreground">
            می‌توانید از منوی سمت راست به بخش‌های مختلف دسترسی داشته باشید
          </p>
        </div>
      </div>
    </div>
  );
}

export { SuccessStep };
