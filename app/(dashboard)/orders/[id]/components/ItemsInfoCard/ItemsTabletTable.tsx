'use client';
import { ImageIcon } from 'lucide-react';
import Image from 'next/image';
import { Order } from '../../type';
import { formatPrice } from '../../../utils/formatters';
import { Button } from '@/components/ui';
import { useRouter, useSearchParams } from 'next/navigation';

interface ItemsTabletTableProps {
  items: Order['items'] | null;
}

function ItemsTabletTable({ items }: ItemsTabletTableProps) {
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
    <div className="hidden md:block lg:hidden overflow-x-auto">
      <table className="w-full">
        <thead className="bg-muted/50 border-b border-border">
          <tr>
            <th className="text-center p-3 font-medium text-xs">آیدی</th>
            <th className="text-center p-3 font-medium text-xs">عکس</th>
            <th className="text-center p-3 font-medium text-xs">نام محصول</th>
            <th className="text-center p-3 font-medium text-xs">قیمت</th>
            <th className="text-center p-3 font-medium text-xs">عملیات</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr
              key={index}
              className="border-b border-border last:border-b-0 hover:bg-muted/30 transition-colors"
            >
              <td className="p-3 text-center">
                <div className="text-xs text-muted-foreground">
                  #{item.product_id}
                </div>
              </td>
              <td className="p-3 text-center">
                <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-muted mx-auto">
                  {item.product_main_image_url ? (
                    <Image
                      src={item.product_main_image_url}
                      alt={item.product_name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      unoptimized={true}
                    />
                  ) : (
                    <div className="w-full h-full rounded-lg bg-muted flex items-center justify-center">
                      <ImageIcon className="size-3 text-muted-foreground" />
                    </div>
                  )}
                </div>
              </td>
              <td className="p-3 text-center">
                <div className="font-medium text-sm truncate max-w-[150px] mx-auto">
                  {item.product_name}
                </div>
              </td>
              <td className="p-3 text-center">
                <div className="space-y-1">
                  <div className="text-xs text-muted-foreground line-through">
                    {formatPrice(item.product_primary_amount)}
                  </div>
                  <div className="font-medium text-primary text-xs">
                    {formatPrice(item.product_final_amount)}
                  </div>
                </div>
              </td>
              <td className="p-3 text-center">
                <Button
                  onClick={() => handleViewProduct(item.product_id)}
                  variant="outline"
                  size="sm"
                  className="text-xs px-2 py-1 h-7"
                >
                  مشاهده
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export { ItemsTabletTable };

