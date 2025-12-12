'use client';
import { ImageIcon } from 'lucide-react';
import Image from 'next/image';
import { Order } from '../../type';
import { formatPrice } from '../../../utils/formatters';
import { Button } from '@/components/ui';
import { useRouter, useSearchParams } from 'next/navigation';

interface ItemsDesktopTableProps {
  items: Order['items'] | null;
}

function ItemsDesktopTable({ items }: ItemsDesktopTableProps) {
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
    <div className="hidden lg:block overflow-x-auto">
      <table className="w-full">
        <thead className="bg-muted/50 border-b border-border">
          <tr>
            <th className="text-center p-4 font-medium text-sm">آیدی آیتم</th>
            <th className="text-center p-4 font-medium text-sm">عکس محصول</th>
            <th className="text-center p-4 font-medium text-sm">نام محصول</th>
            <th className="text-center p-4 font-medium text-sm">
              قیمت بدون تخفیف
            </th>
            <th className="text-center p-4 font-medium text-sm">
              قیمت با تخفیف
            </th>
            <th className="text-center p-4 font-medium text-sm">عملیات</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr
              key={index}
              className="border-b border-border last:border-b-0 hover:bg-muted/30 transition-colors"
            >
              <td className="p-4 text-center">
                <div className="text-sm text-muted-foreground">
                  #{item.product_id}
                </div>
              </td>
              <td className="p-4 text-center">
                <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-muted mx-auto">
                  {item.product_main_image_url ? (
                    <Image
                      src={item.product_main_image_url}
                      alt={item.product_name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority={true}
                    />
                  ) : (
                    <div className="w-full h-full rounded-lg bg-muted flex items-center justify-center">
                      <ImageIcon className="size-4 text-muted-foreground" />
                    </div>
                  )}
                </div>
              </td>
              <td className="p-4 text-center">
                <div className="font-medium">{item.product_name}</div>
              </td>
              <td className="p-4 text-center">
                <div className="text-muted-foreground line-through">
                  {formatPrice(item.product_primary_amount)}
                </div>
              </td>
              <td className="p-4 text-center">
                <div className="font-medium text-primary">
                  {formatPrice(item.product_final_amount)}
                </div>
              </td>
              <td className="p-4 text-center">
                <Button
                  onClick={() => handleViewProduct(item.product_id)}
                  variant="outline"
                  size="sm"
                >
                  مشاهده محصول
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export { ItemsDesktopTable };
