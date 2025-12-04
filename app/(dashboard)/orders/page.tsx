import { Metadata } from 'next';
import { Suspense } from 'react';
import { Loading } from '@/components/ui';
import { OrdersPageContent } from './components/OrdersPageContent';

export const metadata: Metadata = {
  title: 'سفارشات - Insta Bot',
  description: 'مدیریت سفارشات - Insta Bot',
};

export default function OrdersPage() {
  return (
    <Suspense
      fallback={<Loading isLoading={true} message="در حال بارگذاری..." />}
    >
      <OrdersPageContent />
    </Suspense>
  );
}
