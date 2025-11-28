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

function NavItemComponent({
  item,
  isActive,
  isOpen,
  onItemClick,
}: NavItemProps) {
  const pathname = usePathname();
  const isMobile = useMobile();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

export { NavItemComponent };
