import { DollarSign } from 'lucide-react';
import { formatPrice } from './utils';

interface TotalAmountItemProps {
  totalAmount: number | null;
}

export function TotalAmountItem({ totalAmount }: TotalAmountItemProps) {
  return (
    <div className="flex items-center justify-start gap-4 p-4 rounded-lg bg-accent/5 border-2 border-accent/20 flex-1">
      <div className="flex items-center gap-3 min-w-0">
        <div className="flex items-center justify-center w-9 h-9 rounded-md bg-accent/20 text-accent shrink-0">
          <DollarSign className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-xs text-muted-foreground mb-1">مبلغ سفارش</div>
          <div className="text-lg font-bold text-foreground">
            {totalAmount ? `${formatPrice(totalAmount)} تومان` : '-'}
          </div>
        </div>
      </div>
    </div>
  );
}
