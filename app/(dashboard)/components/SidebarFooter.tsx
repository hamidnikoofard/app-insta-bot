'use client';
import { Button, TooltipWrapper } from '@/components/ui';
import { API_BASE_URL } from '@/lib/fetch';
import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useQueryClient } from '@/app/QueryProvider';

interface SidebarFooterProps {
  isOpen: boolean;
}

function SidebarFooter({ isOpen }: SidebarFooterProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const handleLogout = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/logout/`, {
        method: 'delete',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok || response.status === 204) {
        queryClient.clear();
        router.push('/');
        toast.success('با موفقیت خارج شدید');
      } else {
        toast.error('خطا در خروج از حساب کاربری');
      }
    } catch (error) {
      console.error('Logout error:', error);
      queryClient.clear();
      router.push('/');
      toast.success('با موفقیت خارج شدید');
    }
  };
  return (
    <div
      className={`md:border-t border-border/40 p-3 shrink-0 ${
        isOpen ? 'mb-80 md:mb-0' : ''
      }`}
    >
      {isOpen ? (
        <Button
          variant="destructive"
          className="w-full justify-start gap-3"
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
