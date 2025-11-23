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
  const { online_shop } = useAuth();
  const { status } = online_shop;

  return (
    <div className="w-full min-h-full py-8 ">
      {status !== 4 && (
        <div className="mb-8">
          <StepNavigator currentStatus={status} />
        </div>
      )}

      <div className="flex-1">
        {status === 1 ? (
          <ConnectInstagramForm />
        ) : status === 2 ? (
          <PendingApprovalStep />
        ) : status === 3 ? (
          <InstagramAccessStep />
        ) : status === 4 ? (
          <SuccessStep />
        ) : null}
      </div>
    </div>
  );
}
