import { Orders } from '../type';
import Link from 'next/link';
import { Button } from '@/components/ui';
import { StatusChangeDialog } from './StatusChangeDialog';
import { formatDate, formatPrice } from '../utils/formatters';
import {
  CalendarDays,
  Hash,
  HandCoins,
  BadgeCheck,
  DollarSign,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface DesktopTableProps {
  orders: Orders[];
}

function DesktopTable({ orders }: DesktopTableProps) {
  return (
    <div className="hidden md:block overflow-x-auto">
      <table className="w-full table-fixed">
        <thead className="bg-muted/50 border-b border-border">
          <tr>
            <th className="text-right p-4 font-medium text-sm w-[20%]">
              <div className="flex items-center justify-start gap-1.5">
                <Hash className="text-muted-foreground" size={16} />
                شناسه
              </div>
            </th>
            <th className="text-center p-4 font-medium text-sm w-[20%]">
              <div className="flex items-center justify-center gap-1.5">
                <CalendarDays className="text-muted-foreground" size={16} />
                تاریخ
              </div>
            </th>
            <th className="text-center p-4 font-medium text-sm w-[20%]">
              <div className="flex items-center justify-center gap-1.5">
                <DollarSign className="text-muted-foreground" size={16} />
                مبلغ
              </div>
            </th>
            <th className="text-center p-4 font-medium text-sm w-[20%]">
              <div className="flex items-center justify-center gap-1.5">
                <BadgeCheck className="text-muted-foreground" size={16} />
                <span>وضعیت</span>
              </div>
            </th>
            <th className="text-center p-4 font-medium text-sm w-[20%]">
              مشاهده جزئیات
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <OrderRow key={order.id} order={order} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function OrderRow({ order }: { order: Orders }) {
  return (
    <tr className="border-b border-border last:border-b-0 hover:bg-muted/30 transition-colors">
      <td className="text-start p-4">
        <div className="font-medium text-muted-foreground">{order.id}#</div>
      </td>
      <td className="text-center p-4">
        <div className="font-medium text-muted-foreground text-sm flex items-start justify-center gap-1.5">
          {formatDate(order.created_at)}
        </div>
      </td>
      <td className="text-center p-4">
        <div className="font-medium text-muted-foreground">
          {formatPrice(order.total_amount)}
        </div>
      </td>
      <td className="text-center p-4">
        <div className="flex justify-center items-center gap-2">
          <StatusChangeDialog order={order} />
        </div>
      </td>
      <td className="text-center p-4">
        <div className="flex justify-center">
          <Button variant="default" size="sm" asChild>
            <Link href={`/orders/${order.id}`}>مشاهده جزئیات</Link>
          </Button>
        </div>
      </td>
    </tr>
  );
}

export { DesktopTable };
