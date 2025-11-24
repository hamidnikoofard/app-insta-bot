'use client';

import { useState, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { TooltipWrapper } from '@/components/ui/tooltip';
import { NavItem as NavItemType } from './navItems';
import { useMobile } from './hooks';
import {
  NavItemLink,
  NavItemDropdownButton,
  NavItemDropdown,
} from './NavItem/';

interface NavItemProps {
  item: NavItemType;
  isActive: boolean;
  isOpen: boolean;
  onItemClick?: () => void;
}

/**
 * کامپوننت اصلی NavItem که از کامپوننت‌های کوچک‌تر تشکیل شده است
 * بهینه شده با useMemo و کامپوننت‌های memoized برای بهبود performance
 */
export function NavItemComponent({
  item,
  isActive,
  isOpen,
  onItemClick,
}: NavItemProps) {
  const pathname = usePathname();
  const isMobile = useMobile();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Memoize handlers برای جلوگیری از re-render غیرضروری
  const handleClick = useMemo(
    () => () => {
      if (isMobile && onItemClick && pathname !== item.href) {
        onItemClick();
      }
    },
    [isMobile, onItemClick, pathname, item.href]
  );

  const handleChildClick = useMemo(
    () => () => {
      if (isMobile && onItemClick) {
        onItemClick();
      }
    },
    [isMobile, onItemClick]
  );

  const handleDropdownClick = useMemo(
    () => () => {
      setIsDropdownOpen((prev) => !prev);
    },
    []
  );

  // بررسی اینکه آیا این آیتم children دارد یا نه
  const hasChildren = item.children && isOpen && item.children.length > 0;

  const linkContent = (
    <div className="relative">
      {hasChildren ? (
        <>
          <NavItemDropdownButton
            icon={item.icon}
            label={item.label}
            isActive={isActive}
            isDropdownOpen={isDropdownOpen}
            isOpen={isOpen}
            isMobile={isMobile}
            onToggle={handleDropdownClick}
          />
          <NavItemDropdown
            children={item.children || []}
            isOpen={isDropdownOpen}
            onChildClick={handleChildClick}
          />
        </>
      ) : (
        <NavItemLink
          href={item.href}
          icon={item.icon}
          label={item.label}
          isActive={isActive}
          isOpen={isOpen}
          isMobile={isMobile}
          onClick={handleClick}
        />
      )}
    </div>
  );

  // اگر منو بسته است و در دسکتاپ هستیم، tooltip نمایش داده می‌شود
  if (!isOpen && !isMobile) {
    return (
      <TooltipWrapper
        delayDuration={0}
        content={item.label}
        contentProps={{ side: 'right', sideOffset: 8 }}
      >
        {linkContent}
      </TooltipWrapper>
    );
  }

  return <div className="relative">{linkContent}</div>;
}
