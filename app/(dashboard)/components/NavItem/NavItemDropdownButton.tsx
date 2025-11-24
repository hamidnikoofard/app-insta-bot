'use client';

import { memo } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ChevronDown, LucideIcon } from 'lucide-react';
import { NavIcon } from './NavIcon';

interface NavItemDropdownButtonProps {
  icon: LucideIcon;
  label: string;
  isActive: boolean;
  isDropdownOpen: boolean;
  isOpen: boolean;
  isMobile: boolean;
  onToggle: () => void;
}

/**
 * کامپوننت دکمه dropdown برای آیتم‌های دارای children
 * Memoized برای بهبود performance
 */
const NavItemDropdownButton = memo(function NavItemDropdownButton({
  icon,
  label,
  isActive,
  isDropdownOpen,
  isOpen,
  isMobile,
  onToggle,
}: NavItemDropdownButtonProps) {
  return (
    <Button
      variant="ghost"
      className={cn(
        'flex items-center justify-between rounded-lg px-3 py-2.5 transition-all duration-200 relative overflow-hidden w-full',
        'hover:bg-accent/50 active:bg-accent/70',
        'md:hover:translate-x-[-2px]',
        'touch-manipulation',
        isActive
          ? 'bg-primary/10 text-primary shadow-sm shadow-primary/20'
          : 'text-muted-foreground hover:text-foreground',
        !isOpen && 'justify-center px-2',
        'min-h-[44px]'
      )}
      onClick={onToggle}
    >
      <div className="flex items-center gap-2">
        <NavIcon icon={icon} isActive={isActive} isMobile={isMobile} />
        <span className="text-sm font-medium transition-all duration-300 whitespace-nowrap">
          {label}
        </span>
      </div>
      <ChevronDown
        className={cn(
          'shrink-0 transition-transform duration-300 ease-in-out',
          isDropdownOpen && 'rotate-180'
        )}
      />
    </Button>
  );
});

export { NavItemDropdownButton };
