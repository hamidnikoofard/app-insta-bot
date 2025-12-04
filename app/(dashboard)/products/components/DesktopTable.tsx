'use client';
import { Button, TooltipWrapper } from '@/components/ui';
import { Edit } from 'lucide-react';
import Image from 'next/image';
import { Product } from '../type';
import { DeleteProductDialog } from './DeleteProductDialog';

interface DesktopTableProps {
  products: Product[];
  onUpdate: (id: number) => void;
  onDelete: (id: number) => void;
}

function DesktopTable({ products, onUpdate, onDelete }: DesktopTableProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fa-IR').format(price);
  };

  return (
    <div className="hidden md:block overflow-x-auto">
      <table className="w-full">
        <thead className="bg-muted/50 border-b border-border">
          <tr>
            <th className="text-center p-4 font-medium text-sm">آیدی</th>
            <th className="text-center p-4 font-medium text-sm">عکس</th>
            <th className="text-center p-4 font-medium text-sm">نام محصول</th>
            <th className="text-center p-4 font-medium text-sm">شناسه یکتا</th>
            <th className="text-center p-4 font-medium text-sm">موجودی</th>
            <th className="text-center p-4 font-medium text-sm">قیمت</th>
            <th className="text-center p-4 font-medium text-sm">
              قیمت با تخفیف
            </th>
            <th className="text-center p-4 font-medium text-sm">عملیات</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr
              key={product.id}
              className="border-b border-border last:border-b-0 hover:bg-muted/30 transition-colors"
            >
              <td className="p-4 text-center">
                <div className="font-medium text-muted-foreground">
                  #{product.id}
                </div>
              </td>
              <td className="p-4 text-center">
                <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-muted mx-auto">
                  <Image
                    src={product.main_image_url || ''}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    unoptimized={true}
                  />
                </div>
              </td>
              <td className="p-4 text-center">
                <div className="font-medium">{product.name}</div>
              </td>
              <td className="p-4 text-center">
                <div className=" text-sm text-muted-foreground">
                  {product.unique_name ? product.unique_name : product.id}
                </div>
              </td>
              <td className="p-4 text-center">
                <div className="font-medium">{product.stock}</div>
              </td>
              <td className="p-4 text-center">
                <div className="text-muted-foreground line-through">
                  {formatPrice(product.primary_cost)} تومان
                </div>
              </td>
              <td className="p-4 text-center">
                <div className="font-medium text-primary">
                  {product.final_cost && product.final_cost > 0
                    ? `${formatPrice(product.final_cost)} تومان`
                    : '-'}
                </div>
              </td>
              <td className="p-4 text-center">
                <div className="flex items-center gap-2 justify-center">
                  <TooltipWrapper
                    delayDuration={0}
                    content="ویرایش محصول"
                    contentProps={{ side: 'top' }}
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onUpdate(product.id)}
                      className="h-8 w-8"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </TooltipWrapper>
                  <DeleteProductDialog
                    productId={product.id}
                    productName={product.name}
                    onDelete={onDelete}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export { DesktopTable };
