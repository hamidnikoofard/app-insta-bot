'use client';
import { Button, TooltipWrapper } from '@/components/ui';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface SidebarFooterProps {
  isOpen: boolean;
}

function SidebarFooter({ isOpen }: SidebarFooterProps) {
  const router = useRouter();
  const handleLogout = async () => {
    const response = await fetch(`/api/logout`, {
      method: 'POST',
      credentials: 'include',
    });
    const data = await response.json();

    if (data.success) {
      router.push('/');
      toast.success(data.message);
    } else {
      toast.error(data.message);
    }
  };
  return (
    <div className="border-t border-border/40 p-3 shrink-0">
      {isOpen ? (
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-muted-foreground hover:text-foreground hover:bg-accent/50"
          onClick={handleLogout}
        >
          <LogOut className="w-5 h-5" />
          <span className="text-sm font-medium">خروج</span>
        </Button>
      ) : (
        <div className="flex justify-center">
          <TooltipWrapper
            delayDuration={0}
            content="خروج"
            contentProps={{ side: 'right', sideOffset: 8 }}
          >
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 text-muted-foreground hover:text-foreground hover:bg-accent/50"
              onClick={handleLogout}
            >
              <LogOut className="w-5 h-5" />
            </Button>
          </TooltipWrapper>
        </div>
      )}
    </div>
  );
}

export { SidebarFooter };
