'use client';

import { Hash, Calendar } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { Order } from '../type';
import { OrderInfoCardHeader, TotalAmountItem, OrderInfoItem } from './index';

interface OrderInfoCardProps {
  order: Order;
}

function OrderInfoCard({ order }: OrderInfoCardProps) {
  return (
    <div className="relative overflow-hidden border border-border rounded-xl bg-card shadow-sm hover:shadow-md transition-all duration-300 w-full lg:flex-1">
      <OrderInfoCardHeader />

      <div className="p-6 space-y-5">
        <div className="flex items-start justify-between gap-4">
          <OrderInfoItem
            icon={Hash}
            label="شناسه سفارش"
            value={order.id || 0}
          />
          <OrderInfoItem
            icon={Calendar}
            label="تاریخ سفارش"
            value={order.created_at ? formatDate(order.created_at) : '-'}
            iconBgColor="bg-secondary/10"
            iconColor="text-secondary"
          />
        </div>

        <TotalAmountItem totalAmount={order.total_amount} />
      </div>
    </div>
  );
}

export { OrderInfoCard };
