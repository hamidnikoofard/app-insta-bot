'use client';
import { Instagram, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { API_BASE_URL } from '@/lib/fetch';
import { toast } from 'sonner';
import { useQueryClient } from '@/app/QueryProvider';

const connectInstagramSchema = z.object({
  online_shop_instagram_username: z
    .string()
    .min(1, { message: 'نام کاربری پیج الزامی است' }),
});

function ConnectInstagramForm() {
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof connectInstagramSchema>>({
    resolver: zodResolver(connectInstagramSchema),
  });

  const onSubmit = async (data: z.infer<typeof connectInstagramSchema>) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/info/`, {
        method: 'PATCH',
        body: JSON.stringify(data),
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to connect Instagram', {
          cause: response.statusText,
        });
      }
      const result = await response.json();
      console.log(result);
      toast.success('اتصال با موفقیت انجام شد');
      queryClient.invalidateQueries({ queryKey: ['user'] });
      reset();
    } catch (error) {
      console.log(error);
      toast.error('خطا در اتصال به اینستاگرام');
    }
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
            {...register('online_shop_instagram_username')}
            onChange={(e) => {
              const value = e.target.value;
              const cleaned = value.replace(/[^a-zA-Z0-9._]/g, '');
              e.target.value = cleaned;
            }}
          />
          {errors.online_shop_instagram_username && (
            <p className="text-sm text-destructive mt-0.5">
              {errors.online_shop_instagram_username.message}
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
