import { DollarSign } from 'lucide-react';
import { formatPrice } from './utils';

interface TotalAmountItemProps {
  totalAmount: number | null;
}

export function TotalAmountItem({ totalAmount }: TotalAmountItemProps) {
  return (
    <div className="flex items-center justify-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg bg-accent/5 border-2 border-accent/20 flex-1">
      <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
        <div className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-md bg-accent/20 text-accent shrink-0">
          <DollarSign className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[10px] sm:text-xs text-muted-foreground mb-0.5 sm:mb-1">
            مبلغ سفارش
          </div>
          <div className="text-base sm:text-lg font-bold text-foreground wrap-break-word">
            {totalAmount ? `${formatPrice(totalAmount)} تومان` : '-'}
          </div>
        </div>
      </div>
    </div>
  );
}
