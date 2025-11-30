'use client';
import useGetData from '@/hooks/useGetData';
import { OrdersResponse } from './type';
import { Loading, ErrorDisplay } from '@/components/ui';
import { EmptyState } from '../products/components';
import { OrdersHeader, DesktopTable, MobileTable } from './components';

function OrdersPage() {
  const {
    data: ordersData,
    isLoading,
    isError,
    error,
  } = useGetData<OrdersResponse>({
    url: `bot/orders/`,
    queryKey: ['orders'],
  });
  const orders = ordersData?.data.results;
  const totalOrders = ordersData?.data.count;

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
            </>
          )}
        </div>
      )}
    </div>
  );
}
export default OrdersPage;
