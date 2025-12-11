'use client';
import { Button, Input, Label } from '@/components/ui';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui';
import { Pencil, CreditCard, Instagram, Settings2, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@/lib/utils';
import { useUpdateUserInfo } from '@/hooks/useUpdateUserInfo';

interface EditSettingsDialogProps {
  online_shop_card_number: string;
  online_shop_instagram_username: string;
  online_shop_auto_reply_enabled: boolean;
  online_shop_status: number;
}

const editSettingsSchema = z.object({
  online_shop_card_number: z
    .string()
    .min(16, { message: 'شماره کارت باید 16 رقم باشد' }),
  online_shop_instagram_username: z
    .string()
    .min(1, { message: 'پیج اینستاگرام الزامی است' }),
});

function EditSettingsDialog({
  online_shop_card_number,
  online_shop_instagram_username,
  online_shop_auto_reply_enabled,
  online_shop_status,
}: EditSettingsDialogProps) {
  const [open, setOpen] = useState(false);
  const { updateUserInfo } = useUpdateUserInfo({
    onSuccess: () => setOpen(false),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof editSettingsSchema>>({
    resolver: zodResolver(editSettingsSchema),
    defaultValues: {
      online_shop_card_number,
      online_shop_instagram_username,
    },
  });
  const isDisabled = online_shop_status === 5;
  const onSubmit = async (data: z.infer<typeof editSettingsSchema>) => {
    await updateUserInfo(data);
  };

  useEffect(() => {
    if (open) {
      reset({
        online_shop_card_number,
        online_shop_instagram_username,
      });
    }
  }, [open, reset, online_shop_card_number, online_shop_instagram_username]);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <Pencil className="h-4 w-4" />
          <span>ویرایش</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader className="space-y-3 pb-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary">
              <Settings2 className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <DialogTitle className="text-right text-xl font-bold">
                ویرایش تنظیمات
              </DialogTitle>
              <DialogDescription className="text-right text-sm text-muted-foreground mt-1">
                اطلاعات حساب کاربری خود را ویرایش کنید
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pt-4">
          <div className="space-y-3">
            <Label
              htmlFor="online_shop_card_number"
              className="flex items-center gap-2 text-sm font-semibold"
            >
              <CreditCard className="h-4 w-4 text-primary" />
              <span>شماره کارت</span>
            </Label>
            <div className="relative">
              <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <Input
                id="online_shop_card_number"
                type="text"
                placeholder="1234 5678 9012 3456"
                className="pr-10"
                {...register('online_shop_card_number')}
              />
            </div>
            {errors.online_shop_card_number && (
              <p className="text-sm text-destructive mt-1.5 flex items-center gap-1.5">
                <span className="text-destructive">•</span>
                {errors.online_shop_card_number.message}
              </p>
            )}
          </div>
          <div
            className={cn(
              'space-y-3',
              isDisabled && 'pointer-events-none opacity-50 cursor-not-allowed'
            )}
          >
            <Label
              htmlFor="online_shop_instagram_username"
              className="flex items-center gap-2 text-sm font-semibold"
            >
              <Instagram className="h-4 w-4 text-primary" />
              <span>پیج اینستاگرام</span>
            </Label>
            <div className="relative">
              <Instagram className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              <Input
                id="online_shop_instagram_username"
                type="text"
                placeholder="@username"
                className="pr-10"
                {...register('online_shop_instagram_username')}
              />
            </div>
            {errors.online_shop_instagram_username && (
              <p className="text-sm text-destructive mt-1.5 flex items-center gap-1.5">
                <span className="text-destructive">•</span>
                {errors.online_shop_instagram_username.message}
              </p>
            )}
            {isDisabled && (
              <p className="text-xs text-muted-foreground mt-2 bg-muted/50 p-2 rounded-md border border-border/50">
                در حال حاضر امکان ویرایش پیج اینستاگرام وجود ندارد
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
              <Pencil className="h-4 w-4" />
              <span>ذخیره تغییرات</span>
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export { EditSettingsDialog };
