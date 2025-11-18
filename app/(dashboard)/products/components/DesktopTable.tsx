'use client';
import { Button } from '@/components/ui';
import { Edit } from 'lucide-react';
import Image from 'next/image';
import { Product } from '../type';
import { DeleteProductDialog } from './DeleteProductDialog';

interface DesktopTableProps {
  products: Product[];
  onUpdate: (id: number) => void;
  onDelete: (id: number) => void;
}

export function DesktopTable({
  products,
  onUpdate,
  onDelete,
}: DesktopTableProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fa-IR').format(price);
  };

  return (
    <div className="hidden md:block overflow-x-auto">
      <table className="w-full">
        <thead className="bg-muted/50 border-b border-border">
          <tr>
            <th className="text-right p-4 font-medium text-sm">آیدی</th>
            <th className="text-right p-4 font-medium text-sm">عکس</th>
            <th className="text-right p-4 font-medium text-sm">نام محصول</th>
            <th className="text-right p-4 font-medium text-sm">قیمت</th>
            <th className="text-right p-4 font-medium text-sm">
              قیمت با تخفیف
            </th>
            <th className="text-right p-4 font-medium text-sm">توضیحات</th>
            <th className="text-right p-4 font-medium text-sm">عملیات</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr
              key={product.id}
              className="border-b border-border last:border-b-0 hover:bg-muted/30 transition-colors"
            >
              <td className="p-4">
                <div className="font-medium text-muted-foreground">
                  #{product.id}
                </div>
              </td>
              <td className="p-4">
                <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-muted">
                  <Image
                    src={'/Grand-mil-bl3.webp'}
                    alt={'product image'}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </td>
              <td className="p-4">
                <div className="font-medium">{product.name}</div>
              </td>
              <td className="p-4">
                <div className="text-muted-foreground line-through">
                  {formatPrice(product.primary_cost)} تومان
                </div>
              </td>
              <td className="p-4">
                <div className="font-medium text-primary">
                  {product.final_cost && product.final_cost > 0
                    ? `${formatPrice(product.final_cost)} تومان`
                    : '-'}
                </div>
              </td>
              <td className="p-4">
                <div className="text-sm text-muted-foreground max-w-xs truncate">
                  {product.description}
                </div>
              </td>
              <td className="p-4">
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onUpdate(product.id)}
                    className="h-8 w-8"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
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
