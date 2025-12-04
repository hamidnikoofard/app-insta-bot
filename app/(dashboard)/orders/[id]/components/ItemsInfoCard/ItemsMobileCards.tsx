'use client';
import { ImageIcon } from 'lucide-react';
import Image from 'next/image';
import { Order } from '../../type';
import { formatPrice } from '../../../utils/formatters';
import { Button } from '@/components/ui';
import { useRouter, useSearchParams } from 'next/navigation';

interface ItemsMobileCardsProps {
  items: Order['items'] | null;
}

function ItemsMobileCards({ items }: ItemsMobileCardsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleViewProduct = (productId: number) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set('id', productId.toString());
    router.push(`/products/add?${newSearchParams.toString()}`);
  };

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div className="md:hidden space-y-4">
      {items.map((item, index) => (
        <div
          key={index}
          className="bg-muted/30 border border-border rounded-lg p-4 space-y-4"
        >
          <div className="flex gap-4">
            <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-muted shrink-0">
              {item.product_main_image_url ? (
                <Image
                  src={item.product_main_image_url}
                  alt={item.product_name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : (
                <div className="w-full h-full rounded-lg bg-muted flex items-center justify-center">
                  <ImageIcon className="size-4 text-muted-foreground" />
                </div>
              )}
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-base">{item.product_name}</h3>
                <span className="text-sm text-muted-foreground">
                  #{item.product_id}
                </span>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground line-through">
                  {formatPrice(item.product_primary_amount)}
                </div>
                <div className="font-medium text-primary">
                  {formatPrice(item.product_final_amount)}
                </div>
              </div>
            </div>
          </div>
          <div className="pt-2 border-t border-border">
            <Button
              onClick={() => handleViewProduct(item.product_id)}
              variant="outline"
              size="sm"
              className="w-full"
            >
              مشاهده محصول
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

export { ItemsMobileCards };
