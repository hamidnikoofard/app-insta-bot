import { Metadata } from 'next';
import { Suspense } from 'react';
import { Loading } from '@/components/ui';
import { ProductsPageContent } from './components/ProductsPageContent';

export const metadata: Metadata = {
  title: 'محصولات - Insta Bot',
  description: 'مدیریت محصولات - Insta Bot',
};

export default function ProductsPage() {
  return (
    <Suspense
      fallback={<Loading isLoading={true} message="در حال بارگذاری..." />}
    >
      <ProductsPageContent />
    </Suspense>
  );
}
