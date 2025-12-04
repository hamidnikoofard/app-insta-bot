import { ShoppingBag } from 'lucide-react';
import { Order } from '../../type';
import { InfoCardHeader } from '../index';
import { EmptyState } from '@/app/(dashboard)/products/components';
import { ItemsDesktopTable } from './ItemsDesktopTable';
import { ItemsTabletTable } from './ItemsTabletTable';
import { ItemsMobileCards } from './ItemsMobileCards';

interface ItemsInfoCardProps {
  items: Order['items'] | null;
}

function ItemsInfoCard({ items }: ItemsInfoCardProps) {
  if (items?.length === 0) {
    return (
      <EmptyState
        title="محصولات یافت نشد"
        description="هنوز محصولی سفارش داده نشده است"
      />
    );
  }
  return (
    <div className="relative overflow-hidden border border-border rounded-xl bg-card shadow-sm hover:shadow-lg transition-all duration-300 w-full lg:flex-1">
      <InfoCardHeader icon={ShoppingBag} title="محصولات سفارش داده شده" />
      <div className="p-3 sm:p-4 md:p-6">
        <ItemsDesktopTable items={items} />
        <ItemsTabletTable items={items} />
        <ItemsMobileCards items={items} />
      </div>
    </div>
  );
}

export { ItemsInfoCard };
