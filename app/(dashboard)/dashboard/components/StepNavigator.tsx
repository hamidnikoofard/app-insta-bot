'use client';
import { StepNavigatorDesktop } from './StepNavigatorDesktop';
import { StepNavigatorMobile } from './StepNavigatorMobile';
import { type StepNavigatorProps } from './StepNavigator.types';

function StepNavigator({ currentStatus }: StepNavigatorProps) {
  return (
    <div className="w-full">
      <StepNavigatorDesktop currentStatus={currentStatus} />
      <StepNavigatorMobile currentStatus={currentStatus} />
    </div>
  );
}

export { StepNavigator };
