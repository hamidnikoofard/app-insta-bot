'use client';
import { Button } from '@/components/ui';
import { navItems } from './navItems';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

function BottomNavigationBar() {
  const pathname = usePathname();
  const isActive = (href: string) => {
    if (pathname === href) return true;
    if (pathname.startsWith(href + '/')) return true;
    return false;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-md supports-backdrop-filter:bg-background/80 z-40 border-t border-border/50 md:hidden shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
      <div className="flex items-center justify-around w-full px-2 py-2 max-w-screen-sm mx-auto">
        {navItems.map((item) => (
          <Button
            variant="ghost"
            className={cn(
              'flex flex-col items-center justify-center gap-1 h-auto py-2 px-2 min-w-[60px] flex-1',
              'touch-manipulation active:bg-accent/50',
              isActive(item.href) && 'text-primary'
            )}
            asChild
            key={item.href}
          >
            <Link
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center gap-1 w-full',
                isActive(item.href) ? 'text-primary' : 'text-muted-foreground'
              )}
            >
              <item.icon
                className={cn(
                  'w-5 h-5 transition-transform',
                  isActive(item.href) && 'scale-110'
                )}
              />
              <span
                className={cn(
                  'text-[10px] font-medium leading-tight',
                  isActive(item.href) && 'font-semibold'
                )}
              >
                {item.label}
              </span>
            </Link>
          </Button>
        ))}
      </div>
    </div>
  );
}

export { BottomNavigationBar };
