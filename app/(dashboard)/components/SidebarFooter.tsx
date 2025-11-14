import { Button } from '@/components/ui';
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
          <Button
            variant="ghost"
            size="icon"
            className="h-10 w-10 text-muted-foreground hover:text-foreground hover:bg-accent/50 relative group cursor-pointer"
            title="خروج"
          >
            <LogOut className="w-5 h-5" />
            {/* Tooltip */}
            <div className="absolute right-full mr-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-50">
              <div className="bg-popover text-popover-foreground px-3 py-1.5 rounded-md text-sm font-medium whitespace-nowrap shadow-lg border border-border">
                خروج
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-full w-0 h-0 border-l-4 border-l-popover border-t-4 border-t-transparent border-b-4 border-b-transparent" />
              </div>
            </div>
          </Button>
        </div>
      )}
    </div>
  );
}
