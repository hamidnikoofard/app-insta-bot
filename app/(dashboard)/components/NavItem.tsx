import { cn } from '@/lib/utils';
import { NavItem } from './navItems';
import Link from 'next/link';

interface NavItemProps {
  item: NavItem;
  isActive: boolean;
  isOpen: boolean;
}

export function NavItemComponent({ item, isActive, isOpen }: NavItemProps) {
  const Icon = item.icon;

  return (
    <div className="relative group">
      <Link
        href={item.href}
        className={cn(
          'flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all duration-200 relative overflow-hidden',
          'hover:bg-accent/50 hover:translate-x-[-2px]',
          isActive
            ? 'bg-primary/10 text-primary shadow-sm shadow-primary/20'
            : 'text-muted-foreground hover:text-foreground',
          !isOpen && 'justify-center px-2'
        )}
      >
        {/* Active indicator */}
        {isActive && (
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-l-full" />
        )}

        {/* Icon */}
        <Icon
          className={cn(
            'shrink-0 transition-all duration-200',
            isActive && 'scale-110',
            'w-5 h-5'
          )}
        />

        {/* Label */}
        <span
          className={cn(
            'text-sm font-medium transition-all duration-300 whitespace-nowrap',
            isActive && 'font-semibold',
            !isOpen && 'opacity-0 w-0 overflow-hidden',
            isOpen && 'opacity-100'
          )}
        >
          {item.label}
        </span>
      </Link>

      {/* Tooltip for collapsed state */}
      {!isOpen && (
        <div className="absolute right-full mr-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
          <div className="bg-popover text-popover-foreground px-3 py-1.5 rounded-md text-sm font-medium whitespace-nowrap shadow-lg border border-border">
            {item.label}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full w-0 h-0 border-l-4 border-l-popover border-t-4 border-t-transparent border-b-4 border-b-transparent" />
          </div>
        </div>
      )}
    </div>
  );
}
