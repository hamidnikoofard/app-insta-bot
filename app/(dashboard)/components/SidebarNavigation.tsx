'use client';
import { useEffect } from 'react';
import {
  SidebarHeader,
  SidebarNav,
  SidebarFooter,
} from '@/app/(dashboard)/components';
import { cn } from '@/lib/utils';

interface SidebarNavigationProps {
  isOpen: boolean;
  pathname: string;
  onToggle: () => void;
}

function SidebarNavigation({
  isOpen,
  pathname,
  onToggle,
}: SidebarNavigationProps) {
  // قفل کردن اسکرول body هنگام باز بودن منو در موبایل
  useEffect(() => {
    if (isOpen) {
      // بررسی اینکه آیا در موبایل هستیم
      const isMobile = window.innerWidth < 768;
      if (isMobile) {
        const originalStyle = window.getComputedStyle(document.body).overflow;
        document.body.style.overflow = 'hidden';
        return () => {
          document.body.style.overflow = originalStyle;
        };
      }
    }
  }, [isOpen]);

  return (
    <>
      {/* Overlay برای موبایل */}
      <div
        className={cn(
          'fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ease-in-out md:hidden',
          isOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        )}
        onClick={onToggle}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <aside
        className={cn(
          'flex fixed right-0 top-0 h-screen bg-card border-l border-border/50 shadow-xl flex-col',
          'transition-all duration-300 ease-in-out',
          'md:z-30 z-50',

          isOpen ? 'md:w-[280px]' : 'md:w-18',

          isOpen ? 'w-[320px] max-w-[85vw]' : 'w-0 overflow-hidden'
        )}
      >
        <SidebarHeader isOpen={isOpen} onToggle={onToggle} />
        <SidebarNav
          pathname={pathname}
          isOpen={isOpen}
          onItemClick={onToggle}
        />
        <SidebarFooter isOpen={isOpen} />
      </aside>
    </>
  );
}

export { SidebarNavigation };
