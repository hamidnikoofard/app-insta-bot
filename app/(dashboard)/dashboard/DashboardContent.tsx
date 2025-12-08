'use client';
import { ConnectInstagramForm } from './components/ConnectInstagramForm';
import { StepNavigator } from './components/StepNavigator';
import { PendingApprovalStep } from './components/PendingApprovalStep';
import { InstagramAccessStep } from './components/InstagramAccessStep';
import { SuccessStep } from './components/SuccessStep';
import { useAuth } from '@/contexts/AuthProvider';

export function DashboardContent() {
  const { online_shop_status } = useAuth();
  console.log(online_shop_status);
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
