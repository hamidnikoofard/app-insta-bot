'use client';

import { memo } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { NavItem } from '../navItems';
import { ActiveIndicator } from './ActiveIndicator';
import { NavIcon } from './NavIcon';

interface NavItemChildProps {
  child: NavItem;
  isActive: boolean;
  onChildClick?: () => void;
}

/**
 * کامپوننت نمایش هر child در dropdown menu
 * Memoized برای بهبود performance
 */
const NavItemChild = memo(function NavItemChild({
  child,
  isActive,
  onChildClick,
}: NavItemChildProps) {
  return (
    <Link
      href={child.href}
      className={cn(
        'relative px-4 py-2.5 text-sm font-medium text-muted-foreground rounded-md transition-all duration-200 whitespace-nowrap flex items-center gap-2',
        'hover:bg-accent/50 active:bg-accent/70 hover:text-foreground',
        'md:hover:translate-x-[-2px]',
        isActive && 'bg-primary/10 text-primary font-medium'
      )}
      onClick={onChildClick}
    >
      {/* Active indicator */}
      {isActive && <ActiveIndicator />}

      {/* Icon */}
      <NavIcon icon={child.icon} isActive={isActive} size="small" />

      {/* Label */}
      <span
        className={cn(
          'text-sm font-medium transition-all duration-300 whitespace-nowrap',
          isActive && 'font-semibold'
        )}
      >
        {child.label}
      </span>
    </Link>
  );
});

export { NavItemChild };
