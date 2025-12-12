'use client';
import { useAuth } from '@/contexts';
import { CreditCard, Instagram } from 'lucide-react';
import { InfoItem } from './index';
import { AutoReplySwitch, EditSettingsDialog } from './index';
function ProfileSettingsCard() {
  const {
    online_shop_card_number,
    online_shop_auto_reply_enabled,
    online_shop_instagram_username,
    online_shop_status,
  } = useAuth();
  return (
    <div className="bg-linear-to-br from-card to-card/50 border border-border rounded-2xl overflow-hidden shadow-sm h-full w-full">
      <div className="p-6 border-b border-border bg-muted/20">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-foreground mb-1">
              تنظیمات حساب
            </h2>
            <p className="text-sm text-muted-foreground">
              مدیریت تنظیمات و امنیت حساب کاربری
            </p>
          </div>
          <EditSettingsDialog
            online_shop_card_number={online_shop_card_number}
            online_shop_instagram_username={online_shop_instagram_username}
            online_shop_auto_reply_enabled={online_shop_auto_reply_enabled}
            online_shop_status={online_shop_status}
          />
        </div>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {online_shop_card_number ? (
            <InfoItem
              icon={<CreditCard className="h-5 w-5 text-primary" />}
              label="شماره کارت"
              value={online_shop_card_number}
            />
          ) : (
            <div className="flex bg-card/85 p-4 items-center justify-center h-full border border-border/50 rounded-lg">
              <p className="text-xs text-muted-foreground leading-relaxed text-center">
                هنوز شماره کارت ثبت نشده است روی دکمه ویرایش کلیک کنید و شماره
                کارت خود را وارد کنید.
              </p>
            </div>
          )}
          {online_shop_instagram_username ? (
            <InfoItem
              icon={<Instagram className="h-5 w-5 text-primary" />}
              label="پیج اینستاگرام"
              value={online_shop_instagram_username}
            />
          ) : (
            <div className="flex bg-card/85 p-4 items-center justify-center h-full border border-border/50 rounded-lg">
              <p className="text-xs text-muted-foreground leading-relaxed text-center">
                هنوز پیج اینستاگرام ثبت نشده است روی دکمه ویرایش کلیک کنید و پیج
                اینستاگرام خود را متصل کنید.
              </p>
            </div>
          )}
        </div>
        <AutoReplySwitch
          autoReplyEnabled={online_shop_auto_reply_enabled}
          shopStatus={online_shop_status}
        />
      </div>
    </div>
  );
}

export { ProfileSettingsCard };
