'use client';
import { Suspense } from 'react';
import useGetData from '@/hooks/useGetData';
import { ProductsResponse } from './type';
import {
  DesktopTable,
  MobileCards,
  EmptyState,
  ProductsHeader,
} from './components';
import { ErrorDisplay, Loading } from '@/components/ui';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';
import { API_BASE_URL } from '@/lib/fetch';
import { useQueryClient } from '@tanstack/react-query';

function ProductsPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const {
    data: productsData,
    isLoading,
    error,
  } = useGetData<ProductsResponse>({
    url: 'bot/products',
    queryKey: ['products'],
  });

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
    } catch (error) {
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
    <div className="relative w-full min-h-[calc(100vh-12rem)]">
      {isLoading && (
        <Loading isLoading={true} message="در حال دریافت محصولات..." />
      )}
      {!isLoading && (
        <div className="w-full space-y-6">
          {productsData?.data.results?.length === 0 ? (
            <EmptyState />
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
            </>
          )}
        </div>
      )}
    </div>
  );
}

function ProductsPage() {
  return (
    <Suspense
      fallback={<Loading isLoading={true} message="در حال بارگذاری..." />}
    >
      <ProductsPageContent />
    </Suspense>
  );
}

export default ProductsPage;
