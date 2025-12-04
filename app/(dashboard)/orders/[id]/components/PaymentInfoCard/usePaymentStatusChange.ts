import { useState } from 'react';
import { useQueryClient } from '@/app/QueryProvider';
import { toast } from 'sonner';
import { API_BASE_URL } from '@/lib/fetch';

interface UsePaymentStatusChangeProps {
  orderId: number;
}

export function usePaymentStatusChange({
  orderId,
}: UsePaymentStatusChangeProps) {
  const [pending, setPending] = useState(false);
  const queryClient = useQueryClient();

  const changeStatus = async (newStatus: string) => {
    if (pending) return;
    setPending(true);
    try {
      const response = await fetch(
        `${API_BASE_URL}/bot/payment-approval/${orderId}/`,
        {
          method: 'POST',
          body: JSON.stringify({ is_approved: newStatus }),
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'خطا در تغییر وضعیت پرداخت');
      }

      queryClient.invalidateQueries({ queryKey: ['order', orderId] });
      queryClient.invalidateQueries({ queryKey: ['orders', 'order', orderId] });
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast.success(
        newStatus === 'true'
          ? 'پرداخت با موفقیت تایید شد'
          : 'پرداخت با موفقیت رد شد'
      );

      return true;
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'خطا در تغییر وضعیت پرداخت'
      );
      console.log(error);
      return false;
    } finally {
      setPending(false);
    }
  };

  return {
    changeStatus,
    pending,
  };
}
