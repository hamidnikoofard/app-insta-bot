'use client';
import { Button, TooltipWrapper } from '@/components/ui';
import { MenuIcon, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SidebarHeaderProps {
  isOpen: boolean;
  onToggle: () => void;
}

function SidebarHeader({ isOpen, onToggle }: SidebarHeaderProps) {
  return (
    <div className="h-16 border-b border-border/40 flex items-center px-4 shrink-0 justify-between bg-card">
      {isOpen ? (
        <div className="flex items-center justify-between gap-3 w-full">
          <div className="flex-1">
            <h2 className="text-base md:text-sm font-semibold text-foreground">
              منو
            </h2>
          </div>
          <TooltipWrapper
            delayDuration={0}
            content="بستن منو"
            contentProps={{ side: 'left' }}
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggle}
              className={cn(
                'h-10 w-10 md:h-9 md:w-9',
                'hover:bg-accent/50 active:bg-accent/70',
                'transition-colors touch-manipulation',
                'min-h-[44px] min-w-[44px] md:min-h-0 md:min-w-0'
              )}
              aria-label="بستن منو"
            >
              <X className="h-5 w-5 md:h-4 md:w-4" />
            </Button>
          </TooltipWrapper>
        </div>
      ) : (
        <div className="items-center justify-center w-full hidden md:flex">
          <TooltipWrapper
            delayDuration={0}
            content="باز کردن منو"
            contentProps={{ side: 'left' }}
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggle}
              className="h-9 w-9 hover:bg-accent/50 transition-colors"
              aria-label="باز کردن منو"
            >
              <MenuIcon className="h-4 w-4" />
            </Button>
          </TooltipWrapper>
        </div>
      )}
    </div>
  );
}

export { SidebarHeader };
