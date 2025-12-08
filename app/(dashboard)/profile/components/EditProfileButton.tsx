'use client';
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
  DialogFooter,
  DialogDescription,
} from '@/components/ui';
import { useAuth } from '@/contexts';
import { API_BASE_URL } from '@/lib/fetch';
import { zodResolver } from '@hookform/resolvers/zod';
import { Edit2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import { useQueryClient } from '@/app/QueryProvider';
import { formatPhoneNumber } from '@/lib/utils';

const editProfileSchema = z.object({
  last_name: z.string().min(1, { message: 'نام خانوادگی الزامی است' }),
  first_name: z.string().min(1, { message: 'نام الزامی است' }),
  online_shop_shop_name: z
    .string()
    .min(1, { message: 'نام فروشگاه الزامی است' }),
});

function EditProfileButton() {
  const [open, setOpen] = useState(false);
  const { last_name, first_name, online_shop_shop_name } = useAuth();
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof editProfileSchema>>({
    resolver: zodResolver(editProfileSchema),
  });
  const onSubmit = async (data: z.infer<typeof editProfileSchema>) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/info/`, {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Failed to update profile');
      }
      toast.success('اطلاعات با موفقیت ویرایش شد');
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ['user'] });
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (open) {
      reset({
        last_name,
        first_name,
        online_shop_shop_name,
      });
    }
  }, [open, last_name, first_name, online_shop_shop_name, reset]);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Edit2 className="h-4 w-4" />
          ویرایش
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-right">ویرایش</DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-right">
          اطلاعات حساب کاربری خود را ویرایش کنید
        </DialogDescription>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
          <div className="space-y-6">
            {/* Personal Information Section */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="first_name"
                    className="text-sm font-medium text-foreground"
                  >
                    نام
                  </Label>
                  <Input
                    id="first_name"
                    {...register('first_name')}
                    className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                    placeholder="نام خود را وارد کنید"
                  />
                  <div className="min-h-[20px] flex items-start">
                    {errors.first_name && (
                      <p className="text-sm text-destructive animate-in fade-in slide-in-from-top-1 duration-200">
                        {errors.first_name.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="last_name"
                    className="text-sm font-medium text-foreground"
                  >
                    نام خانوادگی
                  </Label>
                  <Input
                    id="last_name"
                    {...register('last_name')}
                    className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                    placeholder="نام خانوادگی خود را وارد کنید"
                  />
                  <div className="min-h-[20px] flex items-start">
                    {errors.last_name && (
                      <p className="text-sm text-destructive animate-in fade-in slide-in-from-top-1 duration-200">
                        {errors.last_name.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Shop Information Section */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="online_shop_shop_name"
                  className="text-sm font-medium text-foreground"
                >
                  نام فروشگاه
                </Label>
                <Input
                  id="online_shop_shop_name"
                  {...register('online_shop_shop_name')}
                  className="transition-all duration-200 focus:ring-2 focus:ring-primary/20"
                  placeholder="نام فروشگاه خود را وارد کنید"
                />
                <div className="min-h-[20px] flex items-start">
                  {errors.online_shop_shop_name && (
                    <p className="text-sm text-destructive animate-in fade-in slide-in-from-top-1 duration-200">
                      {errors.online_shop_shop_name.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="flex flex-row-reverse justify-start gap-3 mt-8 pt-6 border-t border-border">
            <Button type="submit" className="min-w-[100px]">
              ذخیره تغییرات
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="min-w-[100px]"
            >
              انصراف
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export { EditProfileButton };
