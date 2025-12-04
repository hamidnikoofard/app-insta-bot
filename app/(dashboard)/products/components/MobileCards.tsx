'use client';
import { Button } from '@/components/ui';
import { Edit, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { Product } from '../type';
import { DeleteProductDialog } from './DeleteProductDialog';

interface MobileCardsProps {
  products: Product[];
  onUpdate: (id: number) => void;
  onDelete: (id: number) => void;
}

function MobileCards({ products, onUpdate, onDelete }: MobileCardsProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fa-IR').format(price);
  };

  return (
    <div className="md:hidden space-y-4 p-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-muted/30 border border-border rounded-lg p-4 space-y-4"
        >
          <div className="flex gap-4">
            <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-muted shrink-0">
              {
                product.main_image_url && product.main_image_url.trim() !== '' ? (
                  <Image
                    src={product.main_image_url}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                ) : (
                  <div className="w-full h-full bg-muted flex items-center justify-center">
                    <p className="text-sm text-muted-foreground">عکس محصول</p>
                  </div>
                )
              }
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-base">{product.name}</h3>
                <span className="text-sm text-muted-foreground">
                  #{product.id}
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                {product.unique_name && (
                  <span>شناسه: {product.unique_name}</span>
                )}
                <span>موجودی: {formatPrice(product.stock)}</span>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground line-through">
                  {formatPrice(product.primary_cost)} تومان
                </div>
                {product.final_cost && (
                  <div className="font-medium text-primary">
                    {formatPrice(product.final_cost)} تومان
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 pt-2 border-t border-border">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onUpdate(product.id)}
              className="flex-1"
            >
              <Edit className="h-4 w-4 ml-2" />
              ویرایش
            </Button>
            <DeleteProductDialog
              productId={product.id}
              productName={product.name}
              onDelete={onDelete}
              trigger={
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 text-destructive border-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4 ml-2" />
                  حذف
                </Button>
              }
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export { MobileCards };
