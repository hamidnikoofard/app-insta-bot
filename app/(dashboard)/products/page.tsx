'use client';
import { Suspense } from 'react';
import { ProductsList, AccessDenied } from './components';
import { Loading } from '@/components/ui';
import { useAuth } from '@/contexts/AuthProvider';

function ProductsPageContent() {
  const { online_shop } = useAuth();
  const { status } = online_shop;
  console.log(status);
  if (status === 4) {
    return (
      <Suspense
        fallback={<Loading isLoading={true} message="در حال بارگذاری..." />}
      >
        <ProductsList />
      </Suspense>
    );
  }
  if (status === 1) {
    return (
      <AccessDenied
        title="شما اجازه دسترسی به این صفحه را ندارید"
        description="برای دسترسی به این صفحه ابتدا باید پیج اینستاگرام خود را به سیستم وصل کنید"
        status={status}
      />
    );
  }
  if (status === 2) {
    return (
      <AccessDenied
        title="پیج اینستاگرام شما وصل نشده است"
        description="برای دسترسی به این صفحه ابتدا باید پیج اینستاگرام خود را به سیستم وصل کنید"
        status={status}
      />
    );
  }
  if (status === 3) {
    return (
      <AccessDenied
        title="پیج اینستاگرام شما وصل نشده است"
        description="برای دسترسی به این صفحه ابتدا باید پیج اینستاگرام خود را به سیستم وصل کنید و یا پیج شما تایید نشده است"
        status={status}
      />
    );
  }
  return null;
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
