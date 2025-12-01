'use client';
import useGetData from '@/hooks/useGetData';
import { Order } from './type';
import { useParams } from 'next/navigation';
import { Loading } from '@/components/ui';
import { EmptyState } from '../../products/components';
import { OrderInfoCard, PaymentInfoCard } from './components';

function page() {
  const params = useParams();
  const { id } = params;

  const { data: orderData, isLoading } = useGetData<Order>({
    url: `bot/orders/${id}/`,
    queryKey: ['order', id as string],
  });

  console.log(orderData?.data);

  if (!orderData?.data)
    return (
      <EmptyState
        title="سفارش یافت نشد"
        description="سفارشی با این شناسه یافت نشد"
      />
    );
  return (
    <div className="relative w-full min-h-[calc(100vh-12rem)] px-4 pb-8">
      {isLoading && (
        <Loading isLoading={true} message="در حال دریافت سفارش..." />
      )}
      {!isLoading && (
        <div className="w-full space-y-6">
          <h1 className="text-2xl font-bold">سفارش {orderData?.data.id}</h1>
          <div className="flex flex-col lg:flex-row items-start gap-4">
            <OrderInfoCard order={orderData.data} />
            <PaymentInfoCard payment={orderData.data.payment} />
          </div>
        </div>
      )}
    </div>
  );
}

export default page;
