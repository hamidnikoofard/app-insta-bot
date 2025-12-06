import { LucideIcon } from 'lucide-react';
import { formatPrice } from './utils';

interface OrderInfoItemProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  iconBgColor?: string;
  iconColor?: string;
  valueClassName?: string;
  containerClassName?: string;
}

export function OrderInfoItem({
  icon: Icon,
  label,
  value,
  iconBgColor = 'bg-primary/10',
  iconColor = 'text-primary',
  containerClassName = 'bg-muted/30 hover:bg-muted/50',
}: OrderInfoItemProps) {
  const displayValue =
    typeof value === 'number' ? `#${formatPrice(value)}` : value;

  return (
    <div
      className={`flex items-center justify-between gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg ${containerClassName} transition-colors border border-transparent`}
    >
      <div className="flex items-center gap-2.5 sm:gap-3 flex-1 min-w-0">
        <div
          className={`flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-md ${iconBgColor} ${iconColor} shrink-0`}
        >
          <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[10px] sm:text-xs text-muted-foreground mb-0.5 sm:mb-1">
            {label}
          </div>
          <div
            className={`text-sm sm:text-base font-semibold text-foreground wrap-break-word`}
          >
            {displayValue}
          </div>
        </div>
      </div>
    </div>
  );
}
