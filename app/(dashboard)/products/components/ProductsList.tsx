'use client';
import useGetData from '@/hooks/useGetData';
import { ProductsResponse } from '../type';
import {
  DesktopTable,
  MobileCards,
  EmptyState,
  ProductsHeader,
  ProductsPagination,
} from './index';
import { ErrorDisplay, Loading } from '@/components/ui';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { API_BASE_URL } from '@/lib/fetch';
import { useQueryClient } from '@tanstack/react-query';

function ProductsList() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryClient = useQueryClient();

  const {
    data: productsData,
    isLoading,
    error,
  } = useGetData<ProductsResponse>({
    url: `bot/products/?${searchParams.toString()}`,
    queryKey: ['products', searchParams.toString()],
  });

  const count = productsData?.data.count || 0;
  const totalPages = Math.ceil(count / 10);
  const currentPage = parseInt(searchParams.get('page') || '1');

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set('page', page.toString());
    router.push(`/products?${newSearchParams.toString()}`);
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`${API_BASE_URL}/bot/products/${id}/`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Failed to delete product', {
          cause: response.statusText,
        });
      }
      toast.success('محصول با موفقیت حذف شد');
      queryClient.invalidateQueries({ queryKey: ['products'] });
    } catch (error: unknown) {
      toast.error('خطا در حذف محصول');
    }
  };

  const handleUpdate = (id: number) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set('id', id.toString());
    router.push(`/products/add?${newSearchParams.toString()}`);
  };

  if (error)
    return (
      <ErrorDisplay
        error={error}
        title="خطا در دریافت محصولات"
        onRetry={() => window.location.reload()}
      />
    );

  return (
    <>
      <div className="relative w-full min-h-[calc(100vh-12rem)] px-4 pb-8">
        {isLoading && (
          <Loading isLoading={true} message="در حال دریافت محصولات..." />
        )}
        {!isLoading && (
          <div className="w-full space-y-6">
            {productsData?.data.results?.length === 0 ? (
              <EmptyState
                title="هنوز محصولی اضافه نشده است"
                description='برای شروع، روی دکمه "اضافه کردن محصول" کلیک کنید و اولین
          محصول خود را به سیستم اضافه کنید.'
                buttonText="اضافه کردن محصول"
                buttonLink="/products/add"
              />
            ) : (
              <>
                <ProductsHeader />
                <div className="bg-card border border-border rounded-xl overflow-hidden">
                  <DesktopTable
                    products={productsData?.data.results || []}
                    onUpdate={handleUpdate}
                    onDelete={handleDelete}
                  />
                  <MobileCards
                    products={productsData?.data.results || []}
                    onUpdate={handleUpdate}
                    onDelete={handleDelete}
                  />
                </div>
                {totalPages > 1 && (
                  <ProductsPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                )}
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export { ProductsList };
