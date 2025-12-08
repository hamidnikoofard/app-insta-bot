'use client';
import { Store } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  Label,
  Input,
} from '@/components/ui';
import { API_BASE_URL } from '@/lib/fetch';
import { toast } from 'sonner';
import { useQueryClient } from '@/app/QueryProvider';

const addShopSchema = z.object({
  online_shop_shop_name: z
    .string()
    .min(1, { message: 'نام فروشگاه الزامی است' }),
});

function AddShopButton() {
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
    <div className="md:col-span-1 flex items-center gap-2 p-2 rounded-lg bg-muted/30 border border-border/50 transition-all hover:bg-muted/50 hover:border-border">
      <div className="shrink-0 p-2.5 bg-primary/10 rounded-lg border border-primary/20">
        <Store className="h-5 w-5 text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" className="text-xs w-full sm:w-auto">
              اضافه کردن فروشگاه
            </Button>
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
                  <Input id="shopName" {...register('online_shop_shop_name')} />
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
  );
}

export { AddShopButton };
