'use client';
import { Instagram, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const connectInstagramSchema = z.object({
  instagram_username: z
    .string()
    .min(1, { message: 'نام کاربری پیج الزامی است' }),
});

function ConnectInstagramForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof connectInstagramSchema>>({
    resolver: zodResolver(connectInstagramSchema),
  });

  const onSubmit = (data: z.infer<typeof connectInstagramSchema>) => {
    console.log(data);
    reset();
  };
  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <div className="bg-card shadow-lg border border-border rounded-2xl p-10 max-w-md w-full text-center">
        <div className="flex items-center justify-center mb-6">
          <div className="w-20 h-20 flex items-center justify-center rounded-full bg-primary text-white shadow-lg">
            <Instagram className="h-10 w-10" strokeWidth={2} />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-card-foreground mb-3">
          اتصال پیج اینستاگرام شما
        </h1>

        <p className="text-muted-foreground text-sm mb-8 leading-relaxed">
          برای شروع، پیجی را که می‌خواهید دستیار ما مدیریت کند وارد کنید کافیست
          نام کاربری پیج را بنویسید
        </p>

        <form
          className="mb-6 flex flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            type="text"
            placeholder="نام کاربری پیج شما (مثال: myshop.ir)"
            dir="ltr"
            className="w-full rounded-xl px-4 py-3 h-auto text-right"
            {...register('instagram_username')}
            onChange={(e) => {
              const value = e.target.value;
              const cleaned = value.replace(/[^a-zA-Z0-9._]/g, '');
              e.target.value = cleaned;
            }}
          />
          {errors.instagram_username && (
            <p className="text-sm text-destructive mt-0.5">
              {errors.instagram_username.message}
            </p>
          )}

          {/* CTA */}
          <Button size="lg" className="w-full shadow-md hover:shadow-lg group">
            <span>اتصال امن به اینستاگرام</span>
            <ArrowLeft className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </form>
      </div>
    </div>
  );
}

export { ConnectInstagramForm };
