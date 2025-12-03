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

interface PaymentInfoCardProps {
  payment: Order['payment'] | null;
}

function PaymentInfoCard({ payment }: PaymentInfoCardProps) {
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
          <CardNumberAndAmount payment={payment} />

          <div className="flex flex-col gap-3">
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
