'use client';
import React, { Suspense } from 'react';
import { OrderList } from './index';
import { AccessDenied } from '../../products/components';
import { Loading } from '@/components/ui';
import { useAuth } from '@/contexts';

const STATUS_CONFIG: Record<number, () => React.ReactElement | null> = {
  4: () => (
    <Suspense
      fallback={<Loading isLoading={true} message="در حال بارگذاری..." />}
    >
      <OrderList />
    </Suspense>
  ),
  1: () => (
    <AccessDenied
      title="شما اجازه دسترسی به این صفحه را ندارید"
      description="برای دسترسی به این صفحه ابتدا باید پیج اینستاگرام خود را به سیستم وصل کنید"
      status={1}
    />
  ),
  2: () => (
    <AccessDenied
      title="پیج اینستاگرام شما وصل نشده است"
      description="برای دسترسی به این صفحه ابتدا باید پیج اینستاگرام خود را به سیستم وصل کنید"
      status={2}
    />
  ),
  3: () => (
    <AccessDenied
      title="پیج اینستاگرام شما وصل نشده است"
      description="برای دسترسی به این صفحه ابتدا باید پیج اینستاگرام خود را به سیستم وصل کنید و یا پیج شما تایید نشده است"
      status={3}
    />
  ),
};

function OrdersPageContent() {
  const { online_shop } = useAuth();
  const { status } = online_shop;

  const renderContent = STATUS_CONFIG[status];
  return renderContent ? renderContent() : null;
}

export { OrdersPageContent };
