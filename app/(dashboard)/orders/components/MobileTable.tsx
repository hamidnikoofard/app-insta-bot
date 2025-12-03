import { Orders } from '../type';
import Link from 'next/link';
import { Button } from '@/components/ui';
import { StatusChangeDialog } from './StatusChangeDialog';
import { formatPrice } from '../utils/formatters';
import { formatDate } from '@/lib/utils';

interface MobileTableProps {
  orders: Orders[];
}

function MobileTable({ orders }: MobileTableProps) {
  return (
    <div className="md:hidden space-y-4 p-4">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
}

function OrderCard({ order }: { order: Orders }) {
  return (
    <div className="bg-muted/30 border border-border rounded-lg p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-base">سفارش #{order.id}</h3>
        <StatusChangeDialog order={order} />
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">تاریخ:</span>
          <span className="font-medium">{formatDate(order.created_at)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">مبلغ:</span>
          <span className="font-medium">{formatPrice(order.total_amount)}</span>
        </div>
      </div>

      <div className="pt-2 border-t border-border">
        <Button variant="default" size="sm" className="w-full" asChild>
          <Link href={`/orders/${order.id}`}>مشاهده جزئیات</Link>
        </Button>
      </div>
    </div>
  );
}

export { MobileTable };
