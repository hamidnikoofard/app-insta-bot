'use client';

import { useState } from 'react';
import { Order } from '../type';
import {
  EmptyState,
  PaymentHeader,
  CardNumberAndAmount,
  ReceiptImage,
  PaymentActionButtons,
  usePaymentStatusChange,
} from './index';
import { CheckCircle, XCircle } from 'lucide-react';
import { useParams } from 'next/navigation';
import { formatPrice } from '../../utils/formatters';

interface PaymentInfoCardProps {
  payment: Order['payment'] | null;
  order: Order;
}

function PaymentInfoCard({ payment, order }: PaymentInfoCardProps) {
  const [approveDialogOpen, setApproveDialogOpen] = useState(false);
  const [rejectDialogOpen, setRejectDialogOpen] = useState(false);
  const params = useParams();
  const orderId = params.id as string;

  const { changeStatus, pending } = usePaymentStatusChange({
    orderId: Number(orderId),
  });

  const canChangeStatus = payment?.status;

  const handelChangrStatus = async (newStatus: string) => {
    const success = await changeStatus(newStatus);
    if (success) {
      setApproveDialogOpen(false);
    }
  };

  if (!payment) {
    return <EmptyState />;
  }

  return (
    <div className="relative overflow-hidden border border-border rounded-xl bg-card shadow-sm hover:shadow-lg transition-all duration-300 w-full lg:flex-1">
      <PaymentHeader payment={payment} />

      <div className="p-4 sm:p-6 space-y-3 sm:space-y-4">
        <div className="flex flex-col lg:flex-row gap-3 sm:gap-4">
          <div className="flex flex-col gap-3 w-full lg:w-1/2">
            <CardNumberAndAmount payment={payment} />
            <div className="border border-border rounded-lg p-3 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-xs text-nowrap">
                  مبلغ اولیه اقلام
                </span>
                <span className="font-medium text-muted-foreground text-sm">
                  {formatPrice(order.items_primary_amount)}
                </span>
              </div>
              <div className="flex items-center justify-between ">
                <span className="text-muted-foreground text-xs text-nowrap">
                  مبلغ نهایی اقلام
                </span>
                <span className="font-medium text-foreground text-sm">
                  {formatPrice(order.items_final_amount)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground text-xs text-nowrap">
                  هزینه ارسال{' '}
                </span>
                <span className="font-medium text-sm">
                  {formatPrice(order.shipping_amount)}
                </span>
              </div>

              {order.items_primary_amount > order.items_final_amount && (
                <div className="flex items-center justify-between text-xs pt-2 border-t border-border">
                  <span className="text-muted-foreground">تخفیف</span>
                  <span className="font-medium text-muted-foreground">
                    {formatPrice(
                      order.items_primary_amount - order.items_final_amount
                    )}
                  </span>
                </div>
              )}
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <span className="text-sm font-semibold">مبلغ کل</span>
                <span className="text-base font-bold text-primary">
                  {formatPrice(order.total_amount)}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 w-full lg:w-1/2">
            <ReceiptImage receiptImageUrl={payment.receipt_image_url} />

            {canChangeStatus === 2 ? (
              <PaymentActionButtons
                pending={pending}
                approveDialogOpen={approveDialogOpen}
                rejectDialogOpen={rejectDialogOpen}
                onApproveDialogChange={setApproveDialogOpen}
                onRejectDialogChange={setRejectDialogOpen}
                handelChangrStatus={handelChangrStatus}
              />
            ) : canChangeStatus === 3 ? (
              <div className="p-4 rounded-lg border border-border/50 bg-muted/20 flex items-center justify-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <p>پرداخت تایید شده</p>
              </div>
            ) : canChangeStatus === 4 ? (
              <div className="p-4 rounded-lg border border-border/50 bg-muted/20 flex items-center justify-center gap-2">
                <XCircle className="w-4 h-4 text-red-500" />
                <p>پرداخت رد شده</p>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export { PaymentInfoCard };
