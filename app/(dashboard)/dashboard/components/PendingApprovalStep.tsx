'use client';
import { Clock, CheckCircle } from 'lucide-react';

function PendingApprovalStep() {
  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <div className="bg-card shadow-lg border border-border rounded-2xl p-10 max-w-md w-full text-center">
        <div className="flex items-center justify-center mb-6">
          <div className="w-20 h-20 flex items-center justify-center rounded-full bg-primary/10 text-primary shadow-lg">
            <Clock className="h-10 w-10" strokeWidth={2} />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-card-foreground mb-3">
          پیج اینستاگرام شما با موفقیت ثبت شد
        </h1>

        <p className="text-muted-foreground text-sm mb-8 leading-relaxed">
          پیج شما در صف بررسی قرار دارد. پس از تأیید توسط تیم ما، نتیجه از طریق
          پنل و ایمیل به شما اطلاع‌رسانی خواهد شد.
        </p>

        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <CheckCircle className="h-4 w-4" />
          <span>در حال بررسی توسط تیم ما</span>
        </div>
      </div>
    </div>
  );
}

export { PendingApprovalStep };
