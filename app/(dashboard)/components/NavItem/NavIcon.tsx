'use client';

import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface NavIconProps {
  icon: LucideIcon;
  isActive?: boolean;
  isMobile?: boolean;
  size?: 'default' | 'small';
}

/**
 * کامپوننت نمایش آیکون در navigation
 */
function NavIcon({
  icon: Icon,
  isActive = false,
  isMobile = false,
  size = 'default',
}: NavIconProps) {
  const iconSize = size === 'small' ? 'w-4 h-4' : 'w-5 h-5 md:w-5 md:h-5';
  const mobileSize = isMobile && size === 'default' ? 'w-6 h-6' : '';

  return (
    <Icon
      className={cn(
        'shrink-0 transition-all duration-200',
        isActive && 'scale-110',
        iconSize,
        mobileSize
      )}
    />
  );
}

export { NavIcon };
