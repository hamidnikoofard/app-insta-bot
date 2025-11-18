import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { API_BASE_URL } from '@/lib/fetch';
import { Product } from '../../type';
import { formatNumberWithCommas } from '../utils/formatNumber';
import { UseFormReset } from 'react-hook-form';
import { ProductFormData } from './useProductForm';

interface UseProductFetchProps {
  id: string | null;
  reset: UseFormReset<ProductFormData>;
  setPrimaryCostDisplay: (value: string) => void;
  setFinalCostDisplay: (value: string) => void;
  setExistingImages: (images: string[]) => void;
}

export function useProductFetch({
  id,
  reset,
  setPrimaryCostDisplay,
  setFinalCostDisplay,
  setExistingImages,
}: UseProductFetchProps) {
  const router = useRouter();

  const {
    data: productData,
    isLoading,
    isError,
    error,
  } = useQuery<Product>({
    queryKey: ['product', id],
    queryFn: async () => {
      if (!id) throw new Error('Product ID is required');

      const response = await fetch(`${API_BASE_URL}/bot/products/${id}/`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch product', {
          cause: response.statusText,
        });
      }

      return response.json();
    },
    enabled: !!id, // فقط زمانی که id وجود دارد query اجرا شود
    staleTime: 1000 * 60 * 5, // 5 دقیقه
    retry: 2,
  });

  // پر کردن فرم با داده‌های دریافت شده
  useEffect(() => {
    if (!productData) return;

    // پر کردن فرم با اطلاعات محصول
    reset({
      name: productData.name,
      description: productData.description,
      primary_cost: productData.primary_cost.toString(),
      final_cost: productData.final_cost?.toString() || '',
    });

    // تنظیم نمایش قیمت‌ها با فرمت کاما
    setPrimaryCostDisplay(
      formatNumberWithCommas(productData.primary_cost.toString())
    );
    if (productData.final_cost) {
      setFinalCostDisplay(
        formatNumberWithCommas(productData.final_cost.toString())
      );
    }

    // تنظیم تصاویر موجود
    if (productData.images && productData.images.length > 0) {
      setExistingImages(productData.images.map((img) => img.image_url));
    }
  }, [
    productData,
    reset,
    setPrimaryCostDisplay,
    setFinalCostDisplay,
    setExistingImages,
  ]);

  // مدیریت خطا
  useEffect(() => {
    if (isError && error) {
      toast.error('خطا در دریافت اطلاعات محصول');
      router.push('/products');
    }
  }, [isError, error, router]);

  return { loading: isLoading };
}
