'use client';
import {
  ConnectInstagramForm,
  StepNavigator,
  PendingApprovalStep,
  InstagramAccessStep,
  SuccessStep,
} from './index';
import { useAuth } from '@/contexts';

export function DashboardContent() {
  const { online_shop_status } = useAuth();

  return (
    <div className="w-full min-h-full py-8 ">
      {online_shop_status !== 4 && (
        <div className="mb-8">
          <StepNavigator currentStatus={online_shop_status} />
        </div>
      )}

      <div className="flex-1">
        {online_shop_status === 1 ? (
          <ConnectInstagramForm />
        ) : online_shop_status === 2 ? (
          <PendingApprovalStep />
        ) : online_shop_status === 3 ? (
          <InstagramAccessStep />
        ) : online_shop_status === 4 ? (
          <SuccessStep />
        ) : null}
      </div>
    </div>
  );
}
