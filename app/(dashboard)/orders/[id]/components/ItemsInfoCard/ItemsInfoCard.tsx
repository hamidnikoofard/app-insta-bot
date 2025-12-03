import { ImageIcon, ShoppingBag } from 'lucide-react';
import { Order } from '../../type';
import { InfoCardHeader } from '../index';
import { EmptyState } from '@/app/(dashboard)/products/components';
import Image from 'next/image';
import { formatPrice } from '../../../utils/formatters';
import { Button } from '@/components/ui';
import Link from 'next/link';

interface ItemsInfoCardProps {
  items: Order['items'] | null;
}

function ItemsInfoCard({ items }: ItemsInfoCardProps) {
  if (!items) {
    return (
      <EmptyState
        title="محصولات یافت نشد"
        description="محصولاتی با این شناسه یافت نشد"
      />
    );
  }
  return (
    <div className="relative overflow-hidden border border-border rounded-xl bg-card shadow-sm hover:shadow-lg transition-all duration-300 w-full lg:flex-1">
      <InfoCardHeader icon={ShoppingBag} title="محصولات سفارش داده شده" />
      <div className="p-6 space-y-5">
        {items &&
          items.map((item, index) => (
            <div
              className="flex items-center justify-between gap-4 border border-border rounded-lg p-4 bg-muted/30"
              key={index}
            >
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-muted overflow-hidden border border-border ">
                  {item.product_main_image_url ? (
                    <Image
                      src={item.product_main_image_url}
                      alt={item.product_name}
                      width={100}
                      height={100}
                      className="object-cover hover:scale-105 transition-all duration-300 cursor-pointer"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center  overflow-hidden border border-border">
                      <ImageIcon className="size-4 text-muted-foreground cursor-pointer" />
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-lg font-medium">{item.product_name}</h3>
                  <p className="text-sm text-muted-foreground">
                    قیمت بدون تخفیف: {formatPrice(item.product_primary_amount)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    قیمت با تخفیف: {formatPrice(item.product_final_amount)}
                  </p>
                </div>
              </div>
              <Button asChild className="w-full sm:w-auto">
                <Link href={`/products/`}>مشاهده محصول</Link>
              </Button>
            </div>
          ))}
      </div>
    </div>
  );
}

export { ItemsInfoCard };
