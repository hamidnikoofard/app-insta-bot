'use client';

import { Hash, Calendar, Package } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { Order } from '../type';
import { InfoCardHeader, OrderInfoItem, TotalAmountItem } from './index';

interface OrderInfoCardProps {
  order: Order;
}

function OrderInfoCard({ order }: OrderInfoCardProps) {
  return (
    <div className="relative overflow-hidden border border-border rounded-xl bg-card shadow-sm  w-full lg:flex-1">
      <InfoCardHeader icon={Package} title="اطلاعات سفارش" orderId={order.id} orderStatus={order.status} />

      <div className="p-6 space-y-5">
        <div className="flex items-start justify-between gap-4">
          {/* <OrderInfoItem
            icon={Hash}
            label="شناسه سفارش"
            value={order.id || 0}
          /> */}
          <OrderInfoItem
            icon={Calendar}
            label="تاریخ سفارش"
            value={order.created_at ? formatDate(order.created_at) : '-'}
            iconBgColor="bg-secondary/10"
            iconColor="text-secondary"
          />
          <TotalAmountItem totalAmount={order.total_amount} />
        </div>

      </div>
    </div>
  );
}

export { OrderInfoCard };
