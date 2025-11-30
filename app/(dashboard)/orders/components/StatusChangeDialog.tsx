'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  RadioGroup,
  RadioGroupItem,
  Label,
  Button,
  badgeVariants,
} from '@/components/ui';
import { getStatusInfo, statusOptions } from '../utils/status';
import { Orders } from '../type';
import { cn } from '@/lib/utils';
import { Edit, Pencil } from 'lucide-react';

interface StatusChangeDialogProps {
  order: Orders;
}

function StatusChangeDialog({ order }: StatusChangeDialogProps) {
  const [selectedStatus, setSelectedStatus] = useState<string>(
    order.status.toString()
  );
  const [open, setOpen] = useState(false);

  const handleStatusChange = async (newStatus: string) => {
    // TODO: اینجا API call برای تغییر وضعیت اضافه می‌شود
    // مثال:
    // try {
    //   await updateOrderStatus(order.id, parseInt(newStatus));
    //   setOpen(false);
    //   // ممکن است نیاز به refresh داده‌ها باشد
    // } catch (error) {
    //   console.error('خطا در تغییر وضعیت:', error);
    // }

    setSelectedStatus(newStatus);
  };

  const handleSave = () => {
    handleStatusChange(selectedStatus);
    setOpen(false);
  };

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      // Reset به وضعیت اصلی وقتی Dialog بسته می‌شود بدون ذخیره
      setSelectedStatus(order.status.toString());
    }
  };

  const statusInfo = getStatusInfo(order.status);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <div className="flex items-center gap-1.5 cursor-pointer">
          <Edit className="text-muted-foreground " size={16} />
          <button
            type="button"
            className={cn(
              badgeVariants(),
              statusInfo.className,
              'cursor-pointer '
            )}
          >
            {statusInfo.text}
          </button>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-right">
            تغییر وضعیت سفارش #{order.id}
          </DialogTitle>
          <DialogDescription className="text-right">
            وضعیت فعلی: {getStatusInfo(order.status).text}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <RadioGroup
            value={selectedStatus}
            onValueChange={setSelectedStatus}
            className="space-y-3"
          >
            {statusOptions.map((option) => (
              <div
                key={option.value}
                className="flex items-center gap-2 flex-row-reverse"
              >
                <RadioGroupItem
                  value={option.value}
                  id={`status-${order.id}-${option.value}`}
                  className="cursor-pointer"
                />
                <Label
                  htmlFor={`status-${order.id}-${option.value}`}
                  className="cursor-pointer text-right"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        <DialogFooter className="flex-row-reverse gap-2">
          <Button
            type="button"
            variant="default"
            onClick={handleSave}
            disabled={selectedStatus === order.status.toString()}
          >
            ذخیره تغییرات
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
          >
            انصراف
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { StatusChangeDialog };
