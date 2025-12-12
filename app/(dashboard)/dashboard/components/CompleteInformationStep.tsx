'use client';
import { UserCircle, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

function CompleteInformationStep() {
  const router = useRouter();

  const handleGoToProfile = () => {
    router.push('/profile');
  };

  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <div className="bg-card shadow-lg border border-border rounded-2xl p-10 max-w-lg w-full text-center">
        <div className="flex items-center justify-center mb-6">
          <div className="relative">
            <div className="w-24 h-24 flex items-center justify-center rounded-full bg-linear-to-br from-primary/20 via-primary/15 to-primary/10 text-primary shadow-lg shadow-primary/10">
              <UserCircle className="h-12 w-12" strokeWidth={1.5} />
            </div>
            <div className="absolute -bottom-1 -right-1 w-8 h-8 flex items-center justify-center rounded-full bg-primary text-white shadow-md">
              <CheckCircle2 className="h-5 w-5" strokeWidth={2.5} />
            </div>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-card-foreground mb-4">
          تکمیل اطلاعات پروفایل
        </h1>

        <p className="text-muted-foreground text-sm mb-2 leading-relaxed">
          برای ادامه فرآیند راه‌اندازی فروشگاه، لطفاً اطلاعات پروفایل خود را
          تکمیل کنید.
        </p>
        <p className="text-muted-foreground text-sm mb-8 leading-relaxed">
          این اطلاعات برای فعال‌سازی کامل سرویس ضروری است.
        </p>

        <div className="bg-primary/5 border border-primary/10 rounded-xl p-4 mb-8">
          <div className="flex items-start gap-3 text-right">
            <div className="shrink-0 mt-0.5">
              <div className="w-6 h-6 flex items-center justify-center rounded-full bg-primary/10 text-primary">
                <CheckCircle2 className="h-4 w-4" />
              </div>
            </div>
            <div className="flex-1 text-sm text-muted-foreground leading-relaxed">
              <p className="font-medium text-card-foreground mb-1">
                اطلاعات مورد نیاز:
              </p>
              <ul className="space-y-1 text-xs list-disc list-inside">
                <li>اطلاعات شخصی</li>
                <li>اطلاعات فروشگاه</li>
                <li>تنظیمات حساب کاربری</li>
              </ul>
            </div>
          </div>
        </div>

        <Button
          size="lg"
          className="w-full shadow-md hover:shadow-lg transition-all group"
          onClick={handleGoToProfile}
        >
          <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
          <span>رفتن به صفحه پروفایل</span>
        </Button>
      </div>
    </div>
  );
}

export { CompleteInformationStep };
