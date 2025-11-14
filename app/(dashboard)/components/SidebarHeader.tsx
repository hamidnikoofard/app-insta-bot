import { MenuIcon } from 'lucide-react';

interface SidebarHeaderProps {
  isOpen: boolean;
}

export function SidebarHeader({ isOpen }: SidebarHeaderProps) {
  return (
    <div className="h-16 border-b border-border/40 flex items-center px-4 shrink-0 justify-between">
      {isOpen ? (
        <div className="flex items-center gap-3 w-full">
          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <MenuIcon className="h-4 w-4 text-primary" />
          </div>
          <div className="flex-1">
            <h2 className="text-sm font-semibold text-foreground">منو</h2>
            <p className="text-xs text-muted-foreground">Dashboard</p>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center w-full">
          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <MenuIcon className="h-4 w-4 text-primary" />
          </div>
        </div>
      )}
    </div>
  );
}
