import { ImageIcon, ShoppingBag } from 'lucide-react';
import { Order } from '../../type';
import { InfoCardHeader } from '../index';
import { EmptyState } from '@/app/(dashboard)/products/components';
import Image from 'next/image';
import { formatPrice } from '../../../utils/formatters';
import { Button } from '@/components/ui';
import { useRouter, useSearchParams } from 'next/navigation';

interface ItemsInfoCardProps {
  items: Order['items'] | null;
}

function ItemsInfoCard({ items }: ItemsInfoCardProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const handleViewProduct = (productId: number) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set('id', productId.toString());
    router.push(`/products/add?${newSearchParams.toString()}`);
  };
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
      <div className="p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4 md:space-y-5">
        {items &&
          items.map((item, index) => (
            <div
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 border border-border rounded-lg p-3 sm:p-4 bg-muted/30"
              key={index}
            >
              <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                <div className="p-1.5 sm:p-2 rounded-lg bg-muted overflow-hidden border border-border shrink-0">
                  {item.product_main_image_url ? (
                    <Image
                      src={item.product_main_image_url}
                      alt={item.product_name}
                      width={100}
                      height={100}
                      className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 object-cover hover:scale-105 transition-all duration-300 cursor-pointer"
                    />
                  ) : (
                    <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-lg bg-muted flex items-center justify-center overflow-hidden border border-border">
                      <ImageIcon className="size-3 sm:size-4 text-muted-foreground cursor-pointer" />
                    </div>
                  )}
                </div>
                <div className="flex flex-col gap-0.5 sm:gap-1 min-w-0 flex-1">
                  <h3 className="text-base sm:text-lg font-medium truncate">
                    {item.product_name}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    قیمت بدون تخفیف: {formatPrice(item.product_primary_amount)}
                  </p>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    قیمت با تخفیف: {formatPrice(item.product_final_amount)}
                  </p>
                </div>
              </div>
              <Button asChild className="w-full sm:w-auto shrink-0">
                <Button onClick={() => handleViewProduct(item.product_id)}>
                  مشاهده محصول
                </Button>
              </Button>
            </div>
          ))}
      </div>
    </div>
  );
}

export { ItemsInfoCard };
