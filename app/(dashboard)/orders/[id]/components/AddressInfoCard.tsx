'use client';

import { MapPin, Building2, Phone, Mail } from 'lucide-react';
import { customer_address } from '../type';
import { AddressInfoCardHeader, AddressInfoItem } from './AddressInfoCard/';
import { EmptyState } from '@/app/(dashboard)/products/components';

interface AddressInfoCardProps {
  address: customer_address;
}

function AddressInfoCard({ address }: AddressInfoCardProps) {
  if (!address) {
    return (
      <EmptyState
        title="آدرس یافت نشد"
        description="آدرسی با این شناسه یافت نشد"
      />
    );
  }
  return (
    <div className="relative overflow-hidden border border-border rounded-xl bg-card shadow-sm hover:shadow-md transition-all duration-300 w-full lg:flex-1">
      <AddressInfoCardHeader />

      <div className="p-6 space-y-5">
        <AddressInfoItem icon={MapPin} label="آدرس" value={address.address} />
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col items-start justify-between gap-4">
            <AddressInfoItem
              icon={Building2}
              label="شهر"
              value={address.city}
              iconBgColor="bg-secondary/10"
              iconColor="text-secondary"
            />
            <AddressInfoItem
              icon={Building2}
              label="استان"
              value={address.province}
              iconBgColor="bg-secondary/10"
              iconColor="text-secondary"
            />
          </div>
          <div className="flex items-start justify-between gap-4 flex-col">
            <AddressInfoItem
              icon={Phone}
              label="شماره تماس"
              value={address.phone_number}
              iconBgColor="bg-accent/10"
              iconColor="text-accent"
            />
            <AddressInfoItem
              icon={Mail}
              label="کد پستی"
              value={address.postal_code}
              iconBgColor="bg-accent/10"
              iconColor="text-accent"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export { AddressInfoCard };
