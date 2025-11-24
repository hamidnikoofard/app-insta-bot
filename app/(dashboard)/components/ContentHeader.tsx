'use client';
import { Button, TooltipWrapper } from '@/components/ui';
import { BellIcon, MenuIcon, X, Moon, Sun } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useTheme, useAuth } from '@/contexts/index';

interface ContentHeaderProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function ContentHeader({ isOpen, onToggle }: ContentHeaderProps) {
  const pathName = usePathname();
  const { theme, toggleTheme } = useTheme();
  const { first_name, last_name } = useAuth();

  const setTitle = () => {
    if (pathName.startsWith('/products')) {
      return 'محصولات';
    }
    if (pathName.startsWith('/settings-message')) {
      return 'تنظیمات پیام';
    }
    if (pathName.startsWith('/messages')) {
      return 'پیام ها';
    }
    if (pathName.startsWith('/profile')) {
      return 'پروفایل';
    }
    switch (pathName) {
      case '/dashboard':
        return 'داشبورد';
      default:
        return 'داشبورد';
    }
  };
  return (
    <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-md supports-backdrop-filter:bg-background/60 mb-6 ">
      <div className="bg-card rounded-xl p-4 mx-4 mt-4 shadow-sm border border-border/50 flex justify-between items-center">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <TooltipWrapper
              delayDuration={0}
              content={isOpen ? 'بستن منو' : 'باز کردن منو'}
              contentProps={{ side: 'bottom' }}
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={onToggle}
                aria-label={isOpen ? 'بستن منو' : 'باز کردن منو'}
                className="md:hidden block"
              >
                {isOpen ? (
                  <X className="h-5 w-5 md:h-4 md:w-4" />
                ) : (
                  <MenuIcon className="h-5 w-5 md:h-4 md:w-4" />
                )}
              </Button>
            </TooltipWrapper>
          </div>
        </div>
        <h2 className="md:text-lg font-medium">{setTitle()}</h2>
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium ">
            {first_name} {last_name}
          </span>
          <div className="flex items-center gap-3">
            <TooltipWrapper
              delayDuration={0}
              content={
                theme === 'light'
                  ? 'فعال‌سازی حالت تاریک'
                  : 'فعال‌سازی حالت روشن'
              }
              contentProps={{ side: 'bottom' }}
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="h-9 w-9 hover:bg-accent/50 transition-colors"
                suppressHydrationWarning
              >
                {theme === 'light' ? (
                  <Moon className="h-4 w-4" />
                ) : theme === 'dark' ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </Button>
            </TooltipWrapper>
            <TooltipWrapper
              delayDuration={0}
              content="اعلان‌ها"
              contentProps={{ side: 'bottom' }}
            >
              <Button variant="ghost" size="icon">
                <BellIcon className="h-4 w-4" />
              </Button>
            </TooltipWrapper>
          </div>
        </div>
      </div>
    </div>
  );
}
