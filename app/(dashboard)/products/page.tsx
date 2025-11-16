'use client';
import { useState } from 'react';
import { products as initialProducts } from './mocadta';
import { Button } from '@/components/ui';
import { Plus, Edit, Trash2 } from 'lucide-react';
import Image from 'next/image';

function ProductsPage() {
  const [products, setProducts] = useState(initialProducts);

  const handleDelete = (id: number) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const handleUpdate = (id: number) => {
    // TODO: پیاده‌سازی منطق آپدیت
    console.log('آپدیت محصول:', id);
  };

  const handleAddProduct = () => {
    // TODO: پیاده‌سازی منطق اضافه کردن محصول
    console.log('اضافه کردن محصول جدید');
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fa-IR').format(price);
  };

  return (
    <div className="w-full space-y-6">
      {/* دکمه اضافه کردن محصول */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div className="flex-1 min-w-[200px]">
          <Button
            onClick={handleAddProduct}
            className="w-full sm:w-auto cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            اضافه کردن محصول
          </Button>
        </div>
      </div>

      {/* پیام در صورت نبودن محصول */}
      {products.length === 0 && (
        <div className="bg-card border border-border rounded-xl p-8 text-center space-y-4">
          <div className="text-muted-foreground space-y-2">
            <p className="text-lg font-medium">هنوز محصولی اضافه نشده است</p>
            <p className="text-sm">
              برای شروع، روی دکمه &quot;اضافه کردن محصول&quot; کلیک کنید و اولین
              محصول خود را به سیستم اضافه کنید.
            </p>
          </div>
          <Button
            onClick={handleAddProduct}
            className="w-full sm:w-auto cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            اضافه کردن محصول
          </Button>
        </div>
      )}

      {/* جدول محصولات */}
      {products.length > 0 && (
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          {/* جدول برای دسکتاپ */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50 border-b border-border">
                <tr>
                  <th className="text-right p-4 font-medium text-sm">آیدی</th>
                  <th className="text-right p-4 font-medium text-sm">عکس</th>
                  <th className="text-right p-4 font-medium text-sm">
                    نام محصول
                  </th>
                  <th className="text-right p-4 font-medium text-sm">قیمت</th>
                  <th className="text-right p-4 font-medium text-sm">
                    قیمت با تخفیف
                  </th>
                  <th className="text-right p-4 font-medium text-sm">
                    توضیحات
                  </th>
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
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="font-medium">{product.name}</div>
                    </td>
                    <td className="p-4">
                      <div className="text-muted-foreground line-through">
                        {formatPrice(product.price)} تومان
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="font-medium text-primary">
                        {product.discountedPrice
                          ? `${formatPrice(product.discountedPrice)} تومان`
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
                          onClick={() => handleUpdate(product.id)}
                          className="h-8 w-8"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDelete(product.id)}
                          className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* کارت‌ها برای موبایل */}
          <div className="md:hidden space-y-4 p-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-muted/30 border border-border rounded-lg p-4 space-y-4"
              >
                <div className="flex gap-4">
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-muted shrink-0">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-base">{product.name}</h3>
                      <span className="text-sm text-muted-foreground">
                        #{product.id}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground line-through">
                        {formatPrice(product.price)} تومان
                      </div>
                      {product.discountedPrice && (
                        <div className="font-medium text-primary">
                          {formatPrice(product.discountedPrice)} تومان
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  {product.description}
                </div>
                <div className="flex items-center gap-2 pt-2 border-t border-border">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleUpdate(product.id)}
                    className="flex-1"
                  >
                    <Edit className="h-4 w-4 ml-2" />
                    ویرایش
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(product.id)}
                    className="flex-1 text-destructive border-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4 ml-2" />
                    حذف
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductsPage;
