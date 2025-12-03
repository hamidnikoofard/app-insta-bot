'use client';
import useGetData from '@/hooks/useGetData';
import { OrdersResponse } from '../type';
import { Loading, ErrorDisplay } from '@/components/ui';
import { EmptyState, ProductsPagination } from '../../products/components';
import { OrdersHeader, DesktopTable, MobileTable } from './index';
import { useRouter, useSearchParams } from 'next/navigation';

function OrderList() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const {
    data: ordersData,
    isLoading,
    isError,
    error,
  } = useGetData<OrdersResponse>({
    url: `bot/orders?${searchParams.toString()}/`,
    queryKey: ['orders'],
  });
  const orders = ordersData?.data.results;
  const totalOrders = ordersData?.data.count;
  const totalPages = Math.ceil((totalOrders || 0) / 10);
  const currentPage = parseInt(searchParams.get('page') || '1');

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set('page', page.toString());
    router.push(`/orders?${newSearchParams.toString()}`);
  };

  if (isError)
    return (
      <ErrorDisplay
        error={error}
        title="خطا در دریافت سفارشات..."
        onRetry={() => window.location.reload()}
      />
    );
  return (
    <div className="relative w-full min-h-[calc(100vh-12rem)] px-4 pb-8">
      {isLoading && (
        <Loading isLoading={true} message="در حال دریافت سفارشات..." />
      )}
      {!isLoading && (
        <div className="w-full space-y-6">
          {orders?.length === 0 ? (
            <EmptyState
              title="هنوز سفارشی اضافه نشده است"
              description="برای شروع، روی دکمه 'اضافه کردن سفارش' کلیک کنید و اولین سفارش خود را به سیستم اضافه کنید."
            />
          ) : (
            <>
              <OrdersHeader totalOrders={totalOrders || 0} />
              <div className="bg-card border border-border rounded-xl overflow-hidden">
                <DesktopTable orders={orders || []} />
                <MobileTable orders={orders || []} />
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
  );
}

export { OrderList };
