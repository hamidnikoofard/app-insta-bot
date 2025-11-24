'use client';

import { memo } from 'react';
import { cn } from '@/lib/utils';
import { NavItem } from '../navItems';
import { NavItemChild } from './NavItemChild';
import { usePathname } from 'next/navigation';

interface NavItemDropdownProps {
  children: NavItem[];
  isOpen: boolean;
  onChildClick?: () => void;
}

/**
 * کامپوننت dropdown menu برای نمایش children
 * Memoized برای بهبود performance
 */
const NavItemDropdown = memo(function NavItemDropdown({
  children,
  isOpen,
  onChildClick,
}: NavItemDropdownProps) {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        'overflow-hidden transition-all duration-300 ease-in-out',
        isOpen ? 'max-h-[500px] opacity-100 mt-2' : 'max-h-0 opacity-0 mt-0'
      )}
    >
      <div className="flex flex-col gap-1 py-2 px-3 bg-card rounded-lg shadow-lg border border-border/50 mx-2">
        {children.map((child) => (
          <NavItemChild
            key={child.href}
            child={child}
            isActive={pathname === child.href}
            onChildClick={onChildClick}
          />
        ))}
      </div>
    </div>
  );
});

export { NavItemDropdown };
