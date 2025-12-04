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
    <div className="relative  border border-border rounded-xl bg-card shadow-sm w-full lg:flex-1">
      <AddressInfoCardHeader />
      <div className=" space-y-2">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 px-2">
          <AddressInfoItem
            icon={Building2}
            label="استان"
            value={address.province}
            iconBgColor="bg-secondary/10"
            iconColor="text-secondary"
          />
          <AddressInfoItem
            icon={Building2}
            label="شهر"
            value={address.city}
            iconBgColor="bg-secondary/10"
            iconColor="text-secondary"
          />
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
        <hr />
        <div className="px-2">
          <AddressInfoItem icon={MapPin} label="آدرس" value={address.address} />
        </div>
      </div>
    </div>
  );
}

export { AddressInfoCard };
