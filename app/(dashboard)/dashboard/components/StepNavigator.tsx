'use client';
import {
  StepNavigatorMobile,
  StepNavigatorDesktop,
} from '@/app/(dashboard)/dashboard/components';
import { type StepNavigatorProps } from '@/app/(dashboard)/dashboard/components/StepNavigator.types';

function StepNavigator({ currentStatus }: StepNavigatorProps) {
  return (
    <div className="w-full">
      <StepNavigatorDesktop currentStatus={currentStatus} />
      <StepNavigatorMobile currentStatus={currentStatus} />
    </div>
  );
}

export { StepNavigator };
