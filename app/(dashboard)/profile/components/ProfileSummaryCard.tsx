'use client';
import { User, Phone, UserCircle, Store } from 'lucide-react';
import { useAuth } from '@/contexts';
import { EditProfileButton, AddShopButton, InfoItem } from './index';
import { formatPhoneNumber } from '@/lib/utils';

function ProfileSummaryCard() {
  const { first_name, last_name, phone_number, online_shop_shop_name } =
    useAuth();

  const fullName = `${first_name || ''} ${last_name || ''}`.trim() || 'نامشخص';

  return (
    <div className="bg-linear-to-br from-card to-card/50 border border-border rounded-2xl overflow-hidden shadow-sm flex-1 w-full">
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
        {/* Avatar Section */}
        <div className="flex items-center gap-4 mb-8 pb-6 border-b border-border">
          <div className="relative">
            <div className="h-20 w-20 rounded-full bg-linear-to-br from-primary/20 to-primary/10 border-4 border-card shadow-md flex items-center justify-center">
              <UserCircle className="h-10 w-10 text-primary" />
            </div>
            <div className="absolute bottom-0 right-0 h-6 w-6 bg-accent rounded-full border-2 border-card flex items-center justify-center">
              <div className="h-2.5 w-2.5 bg-accent-foreground rounded-full"></div>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-foreground mb-1">
              {fullName}
            </h3>
            <p className="text-sm text-muted-foreground">کاربر سیستم</p>
          </div>
        </div>

        {/* Information Grid */}
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
