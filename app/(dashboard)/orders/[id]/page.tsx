'use client';
import useGetData from '@/hooks/useGetData';
import { Order } from './type';
import { useParams } from 'next/navigation';
import { Button, Loading } from '@/components/ui';
import { EmptyState } from '../../products/components';
import {
  OrderInfoCard,
  PaymentInfoCard,
  AddressInfoCard,
  ItemsInfoCard,
} from './components';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
function OrderDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const { data: orderData, isLoading } = useGetData<Order>({
    url: `bot/orders/${id}/`,
    queryKey: ['order', Number(id)],
  });
 
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
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">سفارش {orderData?.data.id}</h1>
            <Button variant="outline" onClick={() => router.back()}>
              بازگشت
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-col lg:flex-row items-start gap-4">
            <div className="w-full lg:w-auto lg:flex-1 flex flex-col gap-4">
              <OrderInfoCard order={orderData.data} />
              <AddressInfoCard address={orderData.data.customer_address} />
            </div>
            <div className="w-full lg:w-auto lg:flex-1 flex flex-col gap-4">
              <PaymentInfoCard payment={orderData.data.payment} />
              <ItemsInfoCard items={orderData.data.items} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default OrderDetailsPage;
