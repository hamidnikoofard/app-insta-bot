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
  DialogDescription,
} from '@/components/ui';
import { useAuth } from '@/contexts';
import { zodResolver } from '@hookform/resolvers/zod';
import { Edit2, IdCard, Store, User, UserCircle, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useUpdateUserInfo } from '@/hooks/useUpdateUserInfo';

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
  const { updateUserInfo } = useUpdateUserInfo({
    onSuccess: () => setOpen(false),
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof editProfileSchema>>({
    defaultValues: {
      last_name,
      first_name,
      online_shop_shop_name,
    },
    resolver: zodResolver(editProfileSchema),
  });
  const onSubmit = async (data: z.infer<typeof editProfileSchema>) => {
    await updateUserInfo(data);
  };

  useEffect(() => {
    if (open) {
      reset({
        last_name,
        first_name,
        online_shop_shop_name,
      });
    }
  }, [open, reset, last_name, first_name, online_shop_shop_name]);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Edit2 className="h-4 w-4" />
          <span>ویرایش</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader className="space-y-3 pb-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary">
              <UserCircle className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <DialogTitle className="text-right text-xl font-bold">
                ویرایش پروفایل
              </DialogTitle>
              <DialogDescription className="text-right text-sm text-muted-foreground mt-1">
                اطلاعات حساب کاربری خود را ویرایش کنید
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label
                htmlFor="first_name"
                className="flex items-center gap-2 text-sm font-semibold"
              >
                <User className="h-4 w-4 text-primary" />
                <span>نام</span>
              </Label>
              <div className="relative">
                <User className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                <Input
                  id="first_name"
                  {...register('first_name')}
                  className="pr-10"
                  placeholder="نام خود را وارد کنید"
                />
              </div>
              {errors.first_name && (
                <p className="text-sm text-destructive mt-1.5 flex items-center gap-1.5">
                  <span className="text-destructive">•</span>
                  {errors.first_name.message}
                </p>
              )}
            </div>
            <div className="space-y-3">
              <Label
                htmlFor="last_name"
                className="flex items-center gap-2 text-sm font-semibold"
              >
                <IdCard className="h-4 w-4 text-primary" />
                <span>نام خانوادگی</span>
              </Label>
              <div className="relative">
                <IdCard className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                <Input
                  id="last_name"
                  {...register('last_name')}
                  className="pr-10"
                  placeholder="نام خانوادگی خود را وارد کنید"
                />
              </div>
              {errors.last_name && (
                <p className="text-sm text-destructive mt-1.5 flex items-center gap-1.5">
                  <span className="text-destructive">•</span>
                  {errors.last_name.message}
                </p>
              )}
            </div>
          </div>
          <div className="space-y-3">
            <Label
              htmlFor="online_shop_shop_name"
              className="flex items-center gap-2 text-sm font-semibold"
            >
              <Store className="h-4 w-4 text-primary" />
              <span>نام فروشگاه</span>
            </Label>
            <div className="relative">
              <Store className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <Input
                id="online_shop_shop_name"
                {...register('online_shop_shop_name')}
                className="pr-10"
                placeholder="نام فروشگاه خود را وارد کنید"
              />
            </div>
            {errors.online_shop_shop_name && (
              <p className="text-sm text-destructive mt-1.5 flex items-center gap-1.5">
                <span className="text-destructive">•</span>
                {errors.online_shop_shop_name.message}
              </p>
            )}
          </div>
          <div className="flex items-center gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="flex-1"
            >
              <X className="h-4 w-4" />
              <span>انصراف</span>
            </Button>
            <Button type="submit" className="flex-1">
              <Edit2 className="h-4 w-4" />
              <span>ذخیره تغییرات</span>
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export { EditProfileButton };
