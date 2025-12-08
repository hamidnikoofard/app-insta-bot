import { cn } from '@/lib/utils';

interface InfoItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  className?: string;
}

function InfoItem({ icon, label, value, className }: InfoItemProps) {
  return (
    <div
      className={cn(
        'flex items-start gap-4 p-4 rounded-lg bg-muted/30 border border-border/50 transition-all hover:bg-muted/50 hover:border-border',
        className
      )}
    >
      <div className="shrink-0 p-2.5 bg-primary/10 rounded-lg border border-primary/20">
        <div className="text-primary">{icon}</div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wide">
          {label}
        </div>
        <div className="text-base font-semibold text-foreground wrap-break-word">
          {value || '—'}
        </div>
      </div>
    </div>
  );
}

export { InfoItem };
