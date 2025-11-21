import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { API_BASE_URL } from '@/lib/fetch';
import { useQueryClient } from '@/app/QueryProvider';
import { ProductFormData } from './useProductForm';

export function useProductSubmit(productId: string | null) {
  const [pending, setPending] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();

  const submitProduct = async (data: ProductFormData) => {
    if (pending) return;
    setPending(true);

    try {
      const url = productId
        ? `${API_BASE_URL}/bot/products/${productId}/`
        : `${API_BASE_URL}/bot/products/`;
      const method = productId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(
          productId ? 'Failed to update product' : 'Failed to add product',
          {
            cause: response.statusText,
          }
        );
      }

      queryClient.invalidateQueries({ queryKey: ['products'] });
      if (productId) {
        queryClient.invalidateQueries({ queryKey: ['product', productId] });
      }

      toast.success(
        productId ? 'محصول با موفقیت ویرایش شد' : 'محصول با موفقیت ثبت شد'
      );
      router.push('/products');
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : productId
            ? 'خطا در ویرایش محصول'
            : 'خطا در ثبت محصول'
      );
    } finally {
      setPending(false);
    }
  };

  return { submitProduct, pending };
}
