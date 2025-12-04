import { LucideIcon } from 'lucide-react';
import { StatusChangeDialog } from '../../components/StatusChangeDialog';

interface InfoCardHeaderProps {
  icon: LucideIcon;
  title: string;
  iconBgColor?: string;
  iconColor?: string;
  orderId?: number;
  orderStatus?: number;
}

export function InfoCardHeader({
  icon: Icon,
  title,
  iconBgColor = 'bg-primary/10',
  iconColor = 'text-primary',
  orderId,
  orderStatus,
}: InfoCardHeaderProps) {
  return (
    <div className="relative p-4 sm:p-6 border-b border-border bg-muted/20 flex items-center justify-between gap-3">
      <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
        <div
          className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg ${iconBgColor} ${iconColor} shrink-0`}
        >
          <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
        </div>
        <h2 className="text-base sm:text-xl font-bold text-foreground truncate">
          {title}
        </h2>
      </div>
      {orderId && orderStatus && (
        <div className="shrink-0">
          <StatusChangeDialog orderId={orderId} orderStatus={orderStatus} />
        </div>
      )}
    </div>
  );
}
