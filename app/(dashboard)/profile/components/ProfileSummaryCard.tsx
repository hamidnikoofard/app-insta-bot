'use client';
import {
  User,
  Phone,
  UserCircle,
  Edit2,
  Store,
  CheckCircle,
} from 'lucide-react';
import { useAuth } from '@/contexts';
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  Label,
  Input,
} from '@/components/ui';
import { InfoItem } from './InfoItem';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { API_BASE_URL } from '@/lib/fetch';
import { toast } from 'sonner';
import { useQueryClient } from '@/app/QueryProvider';

const addShopSchema = z.object({
  online_shop_shop_name: z
    .string()
    .min(1, { message: 'نام فروشگاه الزامی است' }),
});

function ProfileSummaryCard() {
  const { first_name, last_name, phone_number, online_shop_shop_name } =
    useAuth();

  const fullName = `${first_name || ''} ${last_name || ''}`.trim() || 'نامشخص';
  const [isOpen, setIsOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<z.infer<typeof addShopSchema>>({
    resolver: zodResolver(addShopSchema),
  });
  const queryClient = useQueryClient();
  const formatPhoneNumber = (phone: string) => {
    if (!phone) return '';

    if (phone.startsWith('+98')) {
      return '0' + phone.substring(3);
    }
    return phone;
  };

  const onSubmit = async (data: z.infer<typeof addShopSchema>) => {
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
        throw new Error('Failed to add shop', { cause: response.statusText });
      }
      toast.success('فروشگاه با موفقیت اضافه شد');
      queryClient.invalidateQueries({ queryKey: ['user'] });
      reset();
      setIsOpen(false);
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <div className="bg-linear-to-br from-card to-card/50 border border-border rounded-2xl overflow-hidden shadow-sm flex-1">
      <div className="p-6 border-b border-border bg-muted/20">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-foreground mb-1">
              اطلاعات شخصی
            </h2>
            <p className="text-sm text-muted-foreground">
              اطلاعات حساب کاربری شما
            </p>
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <Edit2 className="h-4 w-4" />
            <span>ویرایش</span>
          </Button>
        </div>
      </div>

      <div className="p-6">
        {/* Avatar Section */}
        <div className="flex items-center gap-4 mb-8 pb-6 border-b border-border">
          <div className="relative">
            <div className="h-20 w-20 rounded-full bg-linear-to-br from-primary/20 to-primary/10 border-4 border-card shadow-md flex items-center justify-center">
              <UserCircle className="h-10 w-10 text-primary" />
            </div>
            <div className="absolute bottom-0 right-0 h-6 w-6 bg-accent rounded-full border-2 border-card flex items-center justify-center">
              <div className="h-2.5 w-2.5 bg-accent-foreground rounded-full"></div>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-foreground mb-1">
              {fullName}
            </h3>
            <p className="text-sm text-muted-foreground">کاربر سیستم</p>
          </div>
        </div>

        {/* Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InfoItem
            icon={<User className="h-5 w-5" />}
            label="نام"
            value={first_name || ''}
          />
          <InfoItem
            icon={<User className="h-5 w-5" />}
            label="نام خانوادگی"
            value={last_name || ''}
          />
          <InfoItem
            icon={<Phone className="h-5 w-5" />}
            label="شماره تلفن"
            value={formatPhoneNumber(phone_number || '')}
            className="md:col-span-1"
          />
          {online_shop_shop_name ? (
            <InfoItem
              icon={<Store className="h-5 w-5" />}
              label="نام فروشگاه"
              value={online_shop_shop_name}
              className="md:col-span-1"
            />
          ) : (
            <div className="md:col-span-1 flex items-center gap-4 p-4 rounded-lg bg-muted/30 border border-border/50 transition-all hover:bg-muted/50 hover:border-border">
              <div className="shrink-0 p-2.5 bg-primary/10 rounded-lg border border-primary/20">
                <Store className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline">اضافه کردن فروشگاه</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="text-right">
                        اضافه کردن فروشگاه
                      </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="grid gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="shopName">نام فروشگاه</Label>
                          <Input
                            id="shopName"
                            {...register('online_shop_shop_name')}
                          />
                          {errors.online_shop_shop_name && (
                            <p className="text-sm text-destructive">
                              {errors.online_shop_shop_name.message}
                            </p>
                          )}
                        </div>
                      </div>
                      <DialogFooter className="flex justify-end mt-4 w-full">
                        <Button type="submit" className="w-full">
                          اضافه کردن
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export { ProfileSummaryCard };
