'use client';
import { User, Phone, UserCircle, Store } from 'lucide-react';
import { useAuth } from '@/contexts';
import { EditProfileButton, AddShopButton, InfoItem } from './index';
import { formatPhoneNumber } from '@/lib/utils';

function ProfileSummaryCard() {
  const { first_name, last_name, phone_number, online_shop_shop_name } =
    useAuth();

  return (
    <div className="bg-linear-to-br from-card to-card/50 border border-border rounded-2xl overflow-hidden shadow-sm h-full w-full">
      <div className="p-6 border-b border-border bg-muted/20">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-foreground mb-1">
              اطلاعات شخصی
            </h2>
            <p className="text-sm text-muted-foreground">
              اطلاعات حساب کاربری شما
            </p>
          </div>
          <EditProfileButton />
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InfoItem
            icon={<User className="h-5 w-5" />}
            label="نام"
            value={first_name || ''}
          />
          <InfoItem
            icon={<User className="h-5 w-5" />}
            label="نام خانوادگی"
            value={last_name || ''}
          />
          <InfoItem
            icon={<Phone className="h-5 w-5" />}
            label="شماره تلفن"
            value={formatPhoneNumber(phone_number || '')}
            className="md:col-span-1"
          />
          {online_shop_shop_name ? (
            <InfoItem
              icon={<Store className="h-5 w-5" />}
              label="نام فروشگاه"
              value={online_shop_shop_name}
              className="md:col-span-1"
            />
          ) : (
            <AddShopButton />
          )}
        </div>
      </div>
    </div>
  );
}

export { ProfileSummaryCard };
