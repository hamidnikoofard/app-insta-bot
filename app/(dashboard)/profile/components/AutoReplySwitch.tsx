'use client';
import { Label, Switch } from '@/components/ui';
import { Bot } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { useUpdateUserInfo } from '@/hooks/useUpdateUserInfo';

type AutoReplySwitchProps = {
  autoReplyEnabled?: boolean | null;
  shopStatus?: number | null;
};

function AutoReplySwitch({
  autoReplyEnabled: initialAutoReplyEnabled,
  shopStatus,
}: AutoReplySwitchProps) {
  const [isAutoReplyEnabled, setIsAutoReplyEnabled] = useState(
    initialAutoReplyEnabled || false
  );

  useEffect(() => {
    setIsAutoReplyEnabled(initialAutoReplyEnabled || false);
  }, [initialAutoReplyEnabled]);

  const { updateUserInfo } = useUpdateUserInfo({
    successMessage: 'فعال‌سازی پاسخ خودکار با موفقیت انجام شد',
    errorMessage: 'خطا در فعال‌سازی پاسخ خودکار',
  });

  const onSubmit = async () => {
    await updateUserInfo({
      online_shop_auto_reply_enabled: !isAutoReplyEnabled,
    });
  };
  const isDisabled = shopStatus !== 4;

  return (
    <div
      className={cn(
        'flex flex-col sm:flex-row items-start gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg bg-muted/30 border border-border/50 transition-all hover:bg-muted/50 mt-4',
        isDisabled && 'opacity-50 cursor-not-allowed'
      )}
    >
      <div className="flex items-center justify-center shrink-0">
        <div className="p-2 sm:p-2.5 bg-primary/10 rounded-lg border border-primary/20">
          <Bot className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 w-full min-w-0">
        <div className="flex flex-col gap-1.5 sm:gap-2 w-full min-w-0">
          <Label
            htmlFor="online_shop_auto_reply_enabled"
            className="text-sm sm:text-sm font-medium text-foreground cursor-pointer"
          >
            <span>فعال‌سازی پاسخ خودکار</span>
          </Label>
          <p className="text-xs text-muted-foreground leading-relaxed">
            <span className="hidden sm:inline">
              با فعال‌سازی پاسخ خودکار، پاسخ خودکار به پیام‌های کاربران از طریق
              ربات خودکار ارسال خواهد شد.
            </span>
            <span className="sm:hidden">
              پاسخ خودکار به پیام‌های کاربران از طریق ربات ارسال می‌شود.
            </span>
          </p>
        </div>
        <div className="flex items-center justify-end sm:justify-start shrink-0 self-end sm:self-auto">
          <Switch
            id="online_shop_auto_reply_enabled"
            checked={isAutoReplyEnabled}
            disabled={isDisabled}
            onCheckedChange={() => onSubmit()}
            className="shrink-0"
          />
        </div>
      </div>
    </div>
  );
}

export { AutoReplySwitch };
