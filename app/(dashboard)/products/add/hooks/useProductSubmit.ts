import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { API_BASE_URL } from '@/lib/fetch';
import { useQueryClient } from '@/app/QueryProvider';
import { ProductFormData } from './useProductForm';

export function useProductSubmit(productId: string | null) {
  const [pending, setPending] = useState(false);
  const queryClient = useQueryClient();

  const submitProduct = async (data: ProductFormData) => {
    if (pending) return;
    setPending(true);
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('primary_cost', data.primary_cost);
    formData.append('stock', data.stock);
    formData.append('final_cost', data.final_cost || '');
    formData.append('unique_name', data.unique_name || '');

    data.existing_images?.forEach((imageId) => {
      formData.append('existing_images', imageId.toString());
    });

    // Append new image files (each file separately)
    if (data.new_images && data.new_images.length > 0) {
      data.new_images.forEach((file) => {
        formData.append('new_images', file);
      });
    }

    try {
      const url = productId
        ? `${API_BASE_URL}/bot/products/${productId}/`
        : `${API_BASE_URL}/bot/products/`;
      const method = productId ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        body: formData,
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
