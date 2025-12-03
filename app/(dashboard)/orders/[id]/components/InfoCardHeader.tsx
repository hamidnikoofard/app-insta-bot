import { LucideIcon } from 'lucide-react';

interface InfoCardHeaderProps {
  icon: LucideIcon;
  title: string;
  iconBgColor?: string;
  iconColor?: string;
}

export function InfoCardHeader({
  icon: Icon,
  title,
  iconBgColor = 'bg-primary/10',
  iconColor = 'text-primary',
}: InfoCardHeaderProps) {
  return (
    <div className="relative p-6 border-b border-border bg-muted/20">
      <div className="flex items-center gap-3">
        <div
          className={`flex items-center justify-center w-10 h-10 rounded-lg ${iconBgColor} ${iconColor}`}
        >
          <Icon className="w-5 h-5" />
        </div>
        <h2 className="text-xl font-bold text-foreground">{title}</h2>
      </div>
    </div>
  );
}
