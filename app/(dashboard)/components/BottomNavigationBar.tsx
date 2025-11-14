'use client';
import { Button } from '@/components/ui/button';
import React from 'react';
import { navItems } from './navItems';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

function BottomNavigationBar() {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;
  return (
    <div className="flex rounded-t-xl mb-2 fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-md supports-backdrop-filter:bg-background/60 z-50 border-t border-border/50 md:hidden p-2">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center justify-between w-full">
          {navItems.map((item) => (
            <Button
              variant="ghost"
              className="flex flex-col items-center justify-center gap-1 h-auto py-2 px-3"
              asChild
              key={item.href}
            >
              <Link
                href={item.href}
                className={cn(
                  isActive(item.href) ? 'text-primary' : 'text-muted-foreground'
                )}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}

export { BottomNavigationBar };
