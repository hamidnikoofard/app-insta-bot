import { Package } from 'lucide-react';

interface OrdersHeaderProps {
  totalOrders: number;
}

function OrdersHeader({ totalOrders }: OrdersHeaderProps) {
  return (
    <div className="flex justify-between items-center flex-wrap gap-4">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Package className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">سفارشات</h1>
            <p className="text-sm text-muted-foreground">
              {new Intl.NumberFormat('fa-IR').format(totalOrders)} سفارش
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export { OrdersHeader };
