'use client';

import { memo } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';
import { ActiveIndicator } from './ActiveIndicator';
import { NavIcon } from './NavIcon';

interface NavItemLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
  isActive: boolean;
  isOpen: boolean;
  isMobile: boolean;
  onClick?: () => void;
}

/**
 * کامپوننت لینک ساده برای آیتم‌های بدون children
 * Memoized برای بهبود performance
 */
const NavItemLink = memo(function NavItemLink({
  href,
  icon,
  label,
  isActive,
  isOpen,
  isMobile,
  onClick,
}: NavItemLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        'flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all duration-200 relative overflow-hidden',
        'hover:bg-accent/50 active:bg-accent/70',
        'md:hover:translate-x-[-2px]',
        'touch-manipulation',
        isActive
          ? 'bg-primary/10 text-primary shadow-sm shadow-primary/20'
          : 'text-muted-foreground hover:text-foreground',
        !isOpen && 'justify-center px-2',
        'min-h-[44px]'
      )}
    >
      {/* Active indicator */}
      {isActive && <ActiveIndicator />}

      {/* Icon */}
      <NavIcon icon={icon} isActive={isActive} isMobile={isMobile} />

      {/* Label */}
      <span
        className={cn(
          'text-sm font-medium transition-all duration-300 whitespace-nowrap',
          isActive && 'font-semibold',
          !isOpen && 'opacity-0 w-0 overflow-hidden',
          isOpen && 'opacity-100',
          isMobile && 'text-base'
        )}
      >
        {label}
      </span>
    </Link>
  );
});

export { NavItemLink };
