import { Wallet } from 'lucide-react';
import { Badge } from '@/components/ui';
import { getPaymentStatus } from './utils';
import { Order } from '../../type';

interface PaymentHeaderProps {
  payment: Order['payment'];
}

function PaymentHeader({ payment }: PaymentHeaderProps) {
  const statusInfo = getPaymentStatus(payment.status);

  return (
    <div className="relative p-4 sm:p-6 border-b border-border bg-linear-to-r from-muted/30 to-muted/10">
      <div className="flex items-center justify-between gap-2 sm:gap-4">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
          <div className="flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-primary/10 text-primary shadow-sm shrink-0">
            <Wallet className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="text-base sm:text-xl font-bold text-foreground truncate">
              اطلاعات پرداخت
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5 hidden sm:block">
              جزئیات پرداخت سفارش
            </p>
          </div>
        </div>
        <Badge variant={statusInfo.variant} className="shrink-0 text-xs">
          <span className="flex items-center gap-1 sm:gap-1.5">
            {statusInfo.icon && (
              <statusInfo.icon className="w-3 h-3 sm:w-4 sm:h-4" />
            )}
            <span className="hidden sm:inline">{statusInfo.text}</span>
            <span className="sm:hidden">
              {statusInfo.text.length > 10
                ? statusInfo.text.substring(0, 8) + '...'
                : statusInfo.text}
            </span>
          </span>
        </Badge>
      </div>
    </div>
  );
}

export { PaymentHeader };
