'use client';
import { Button } from '@/components/ui';
import { BellIcon, MenuIcon, X } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface ContentHeaderProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function ContentHeader({ isOpen, onToggle }: ContentHeaderProps) {
  const pathName = usePathname();
  const setTitle = () => {
    switch (pathName) {
      case '/dashboard':
        return 'داشبورد';
      case '/profile':
        return 'پروفایل';
      case '/projects':
        return 'پروژه‌ها';
      case '/analytics':
        return 'آمار و گزارش';
      case '/notifications':
        return 'اعلان‌ها';
      case '/settings':
        return 'تنظیمات';
      default:
        return 'داشبورد';
    }
  };
  return (
    <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-md supports-backdrop-filter:bg-background/60 mb-6 ">
      <div className="bg-card rounded-xl p-4 mx-4 mt-4 shadow-sm border border-border/50 flex justify-between items-center">
        <div className="md:flex items-center justify-between hidden">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggle}
              className="h-9 w-9 hover:bg-accent/50 transition-colors"
              aria-label={isOpen ? 'بستن منو' : 'باز کردن منو'}
            >
              {isOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <MenuIcon className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
        <h2 className="md:text-lg font-medium">{setTitle()}</h2>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium ">حمید نیکوفرد</span>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon">
              <BellIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
