'use client';

import { useState, useEffect } from 'react';
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
import { cn } from '@/lib/utils';
import { Edit } from 'lucide-react';
import { API_BASE_URL } from '@/lib/fetch';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';

interface StatusChangeDialogProps {
  orderId: number;
  orderStatus: number;
}

function StatusChangeDialog({ orderId, orderStatus }: StatusChangeDialogProps) {
  const [open, setOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(orderStatus);
  const queryClient = useQueryClient();
  // همگام‌سازی selectedStatus با orderStatus وقتی prop تغییر می‌کند
  useEffect(() => {
    setSelectedStatus(orderStatus);
  }, [orderStatus]);

  const handleStatusChange = async (newStatus: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/bot/orders/${orderId}/`, {
        method: 'PATCH',
        body: JSON.stringify({ status: newStatus }),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Failed to change order status');
      }
      toast.success('وضعیت سفارش با موفقیت تغییر کرد');
      queryClient.invalidateQueries({ queryKey: ['order', orderId] });
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      setSelectedStatus(newStatus);
      setOpen(false);
    } catch (error) {
      toast.error('خطا در تغییر وضعیت' + (error as Error).message);
    }
  };

  const shouldDisableOption = (optionValue: number) => {
    if (orderStatus <= 3) {
      return true;
    }
    const hasPassedPaymentApproval = orderStatus >= 3;
    return hasPassedPaymentApproval && optionValue < 4;
  };

  useEffect(() => {
    shouldDisableOption(selectedStatus);
  }, [orderStatus]);

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) setSelectedStatus(orderStatus);
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="flex items-center gap-1.5 cursor-pointer">
          <Edit className="text-muted-foreground " size={16} />
          <button
            type="button"
            className={cn(
              badgeVariants(),
              getStatusInfo(selectedStatus).className,
              'cursor-pointer '
            )}
          >
            {getStatusInfo(selectedStatus).text}
          </button>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-right">
            تغییر وضعیت سفارش #{orderId}
          </DialogTitle>
          <DialogDescription className="text-right">
            وضعیت فعلی: {getStatusInfo(selectedStatus).text}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <RadioGroup
            value={selectedStatus?.toString()}
            onValueChange={(value) => setSelectedStatus(Number(value))}
            className="space-y-3"
          >
            {statusOptions.map((option) => (
              <div
                key={option.value}
                className="flex items-center gap-2 flex-row-reverse"
              >
                <RadioGroupItem
                  value={option.value.toString()}
                  id={`status-${orderId}-${option.value}`}
                  className="cursor-pointer"
                  disabled={shouldDisableOption(option.value)}
                />
                <Label
                  htmlFor={`status-${orderId}-${option.value}`}
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
            onClick={() => handleStatusChange(selectedStatus)}
            disabled={selectedStatus === orderStatus}
          >
            ذخیره تغییرات
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => handleOpenChange(false)}
          >
            انصراف
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export { StatusChangeDialog };
