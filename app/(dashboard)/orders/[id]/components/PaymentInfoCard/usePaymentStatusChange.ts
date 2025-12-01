import { useState } from 'react';
import { useQueryClient } from '@/app/QueryProvider';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';
import { API_BASE_URL } from '@/lib/fetch';

interface UsePaymentStatusChangeProps {
  paymentId: number;
}

export function usePaymentStatusChange({
  paymentId,
}: UsePaymentStatusChangeProps) {
  const [pending, setPending] = useState(false);
  const queryClient = useQueryClient();
  const params = useParams();
  const orderId = params.id as string;

  const changeStatus = async (newStatus: string) => {
    if (pending) return;
    setPending(true);

    try {
      const response = await fetch(
        `${API_BASE_URL}/bot/payments/${paymentId}/`,
        {
          method: 'PATCH',
          body: JSON.stringify({ status: newStatus }),
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

      // Invalidate order query to refresh data
      queryClient.invalidateQueries({ queryKey: ['order', orderId] });

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
