import { Metadata } from 'next';
import { Suspense } from 'react';
import { Loading } from '@/components/ui';
import { AddProductPageContent } from './components';

export const metadata: Metadata = {
  title: 'افزودن یا ویرایش محصول - Insta Bot',
  description: 'افزودن یا ویرایش محصول - Insta Bot',
};

export default function AddProductPage() {
  return (
    <Suspense
      fallback={<Loading isLoading={true} message="در حال بارگذاری..." />}
    >
      <AddProductPageContent />
    </Suspense>
  );
}
