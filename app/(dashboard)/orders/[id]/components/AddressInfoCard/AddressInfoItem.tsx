import { LucideIcon } from 'lucide-react';

interface AddressInfoItemProps {
  icon: LucideIcon;
  label: string;
  value: string;
  iconBgColor?: string;
  iconColor?: string;
  valueClassName?: string;
  containerClassName?: string;
}

export function AddressInfoItem({
  icon: Icon,
  label,
  value,
  iconBgColor = 'bg-primary/10',
  iconColor = 'text-primary',
  valueClassName = 'text-base font-semibold',
  containerClassName = 'bg-muted/30 hover:bg-muted/50',
}: AddressInfoItemProps) {
  return (
    <div
      className={`flex items-center justify-between gap-4 p-4 rounded-lg ${containerClassName} border border-transparent`}
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {/* <div
          className={`flex items-center justify-center w-9 h-9 rounded-md ${iconBgColor} ${iconColor} shrink-0`}
        >
          <Icon className="w-4 h-4" />
        </div> */}
        <div className="flex-1 min-w-0">
          <div className="text-xs text-muted-foreground mb-1">{label}</div>
          <div className={`${valueClassName} text-foreground text-sm`}>
            {value || '-'}
          </div>
        </div>
      </div>
    </div>
  );
}
