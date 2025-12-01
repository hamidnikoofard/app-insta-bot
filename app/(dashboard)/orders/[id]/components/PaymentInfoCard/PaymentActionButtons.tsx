'use client';

import { CheckCircle2, XCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui';

interface PaymentActionButtonsProps {
  pending: boolean;
  approveDialogOpen: boolean;
  rejectDialogOpen: boolean;
  onApproveDialogChange: (open: boolean) => void;
  onRejectDialogChange: (open: boolean) => void;
  handelChangrStatus: (newStatus: string) => void;
}

function PaymentActionButtons({
  pending,
  approveDialogOpen,
  rejectDialogOpen,
  onApproveDialogChange,
  onRejectDialogChange,
  handelChangrStatus,
}: PaymentActionButtonsProps) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <AlertDialog
        open={approveDialogOpen}
        onOpenChange={onApproveDialogChange}
      >
        <AlertDialogTrigger asChild>
          <Button
            size="sm"
            disabled={pending}
            className="gap-2 bg-green-600 hover:bg-green-700 text-white disabled:opacity-50 w-full text-sm sm:text-base h-10 sm:h-9"
          >
            {pending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <CheckCircle2 className="w-4 h-4" />
            )}
            تایید پرداخت
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="max-w-[90vw] sm:max-w-[425px]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-right text-base sm:text-lg">
              تایید پرداخت
            </AlertDialogTitle>
            <AlertDialogDescription className="text-right text-sm">
              آیا از تایید این پرداخت اطمینان دارید؟ این عمل وضعیت پرداخت را به
              "تایید شده" تغییر خواهد داد.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col-reverse sm:flex-row gap-2">
            <AlertDialogCancel disabled={pending} className="w-full sm:w-auto">
              انصراف
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => handelChangrStatus('true')}
              disabled={pending}
              className="bg-green-600 hover:bg-green-700 w-full sm:w-auto"
            >
              {pending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin ml-2" />
                  در حال تایید...
                </>
              ) : (
                'تایید'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={rejectDialogOpen} onOpenChange={onRejectDialogChange}>
        <AlertDialogTrigger asChild>
          <Button
            size="sm"
            variant="destructive"
            disabled={pending}
            className="gap-2 disabled:opacity-50 w-full text-sm sm:text-base h-10 sm:h-9"
          >
            {pending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <XCircle className="w-4 h-4" />
            )}
            رد پرداخت
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="max-w-[90vw] sm:max-w-[425px]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-right text-base sm:text-lg">
              رد پرداخت
            </AlertDialogTitle>
            <AlertDialogDescription className="text-right text-sm">
              آیا از رد کردن این پرداخت اطمینان دارید؟ این عمل وضعیت پرداخت را
              به "رد شده" تغییر خواهد داد.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col-reverse sm:flex-row gap-2">
            <AlertDialogCancel disabled={pending} className="w-full sm:w-auto">
              انصراف
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => handelChangrStatus('false')}
              disabled={pending}
              className="bg-destructive hover:bg-destructive/90 w-full sm:w-auto"
            >
              {pending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin ml-2" />
                  در حال رد...
                </>
              ) : (
                'رد'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export { PaymentActionButtons };
