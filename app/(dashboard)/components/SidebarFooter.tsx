'use client';
import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui';
import { LogOut } from 'lucide-react';

interface SidebarFooterProps {
  isOpen: boolean;
}

export function SidebarFooter({ isOpen }: SidebarFooterProps) {
  return (
    <div className="border-t border-border/40 p-3 shrink-0">
      {isOpen ? (
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground hover:bg-accent/50"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-sm font-medium">خروج</span>
        </Button>
      ) : (
        <div className="flex justify-center">
          <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 text-muted-foreground hover:text-foreground hover:bg-accent/50"
              >
                <LogOut className="w-5 h-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={8}>
              خروج
            </TooltipContent>
          </Tooltip>
        </div>
      )}
    </div>
  );
}
