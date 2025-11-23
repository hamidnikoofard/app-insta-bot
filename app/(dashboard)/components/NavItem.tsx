'use client';

import { cn } from '@/lib/utils';
import { NavItem } from './navItems';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface NavItemProps {
  item: NavItem;
  isActive: boolean;
  isOpen: boolean;
  onItemClick?: () => void;
}

export function NavItemComponent({
  item,
  isActive,
  isOpen,
  onItemClick,
}: NavItemProps) {
  const Icon = item.icon;
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleClick = () => {
    if (isMobile && onItemClick && pathname !== item.href) {
      onItemClick();
    }
  };

  const linkContent = (
    <Link
      href={item.href}
      onClick={handleClick}
      className={cn(
        'flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all duration-200 relative overflow-hidden',
        'hover:bg-accent/50 active:bg-accent/70',
        // بهبود برای موبایل: touch target بزرگتر
        'md:hover:translate-x-[-2px]',
        'touch-manipulation', // بهبود عملکرد touch
        isActive
          ? 'bg-primary/10 text-primary shadow-sm shadow-primary/20'
          : 'text-muted-foreground hover:text-foreground',
        !isOpen && 'justify-center px-2',
        // حداقل ارتفاع برای موبایل
        'min-h-[44px]'
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
          'w-5 h-5 md:w-5 md:h-5',
          // بزرگتر در موبایل
          isMobile && 'w-6 h-6'
        )}
      />

      {/* Label */}
      <span
        className={cn(
          'text-sm font-medium transition-all duration-300 whitespace-nowrap',
          isActive && 'font-semibold',
          !isOpen && 'opacity-0 w-0 overflow-hidden',
          isOpen && 'opacity-100',
          // بزرگتر در موبایل
          isMobile && 'text-base'
        )}
      >
        {item.label}
      </span>
    </Link>
  );

  // اگر منو بسته است و در دسکتاپ هستیم، tooltip نمایش داده می‌شود
  if (!isOpen && !isMobile) {
    return (
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
        <TooltipContent side="right" sideOffset={8}>
          {item.label}
        </TooltipContent>
      </Tooltip>
    );
  }

  return <div className="relative">{linkContent}</div>;
}
