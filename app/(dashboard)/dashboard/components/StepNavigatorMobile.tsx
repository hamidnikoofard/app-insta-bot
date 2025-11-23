'use client';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEffect, useRef } from 'react';
import { steps } from './StepNavigator.types';

interface StepNavigatorMobileProps {
  currentStatus: number;
}

function StepNavigatorMobile({ currentStatus }: StepNavigatorMobileProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  const getStepStatus = (stepId: number) => {
    if (stepId < currentStatus) return 'completed';
    if (stepId === currentStatus) return 'current';
    return 'pending';
  };

  // Scroll to current step on mount and status change
  useEffect(() => {
    if (scrollContainerRef.current && stepRefs.current[currentStatus - 1]) {
      const currentStepElement = stepRefs.current[currentStatus - 1];
      const container = scrollContainerRef.current;

      if (currentStepElement) {
        const stepLeft = currentStepElement.offsetLeft;
        const stepWidth = currentStepElement.offsetWidth;
        const containerWidth = container.offsetWidth;
        const scrollPosition = stepLeft - containerWidth / 2 + stepWidth / 2;

        container.scrollTo({
          left: scrollPosition,
          behavior: 'smooth',
        });
      }
    }
  }, [currentStatus]);

  return (
    <div className="md:hidden relative h-[150px] flex items-center justify-center">
      {/* Horizontal Scrollable Container */}
      <div ref={scrollContainerRef} className="overflow-x-auto">
        <div className="relative flex">
          {/* Progress Line */}
          <div className="absolute top-9 right-9 left-0 h-0.5 bg-border/50 w-[600px]">
            <div
              className="h-full bg-accent transition-all duration-700 ease-out rounded px-4"
              style={{
                width: `${((currentStatus - 1) / (steps.length - 1)) * 100}%`,
              }}
            />
          </div>

          {/* Steps */}
          {steps.map((step, index) => {
            const status = getStepStatus(step.id);
            const Icon = step.icon;
            const isBeforeCurrent = step.id < currentStatus;
            const isCurrent = step.id === currentStatus;

            return (
              <div
                key={step.id}
                ref={(el) => {
                  stepRefs.current[index] = el;
                }}
                className={cn(
                  'flex flex-col items-center justify-start relative z-10 shrink-0 py-2'
                  // Each step takes 50% of screen width (2 steps visible)
                )}
              >
                {/* Icon Circle */}
                <div
                  className={cn(
                    'relative mb-3 transition-all duration-300',
                    isCurrent && 'scale-110'
                  )}
                >
                  <div
                    className={cn(
                      'w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 border-2',
                      isBeforeCurrent &&
                        'bg-accent border-accent text-accent-foreground shadow-md',
                      isCurrent &&
                        'bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/30',
                      status === 'pending' &&
                        'bg-background border-border/60 text-muted-foreground'
                    )}
                  >
                    {isBeforeCurrent ? (
                      <Check className="w-6 h-6" strokeWidth={2.5} />
                    ) : (
                      <Icon className="w-6 h-6" strokeWidth={2} />
                    )}
                  </div>
                  {isCurrent && (
                    <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
                  )}
                </div>

                {/* Content */}
                <div className="text-center w-full px-2">
                  <div
                    className={cn(
                      'text-sm font-semibold mb-1 transition-colors',
                      isBeforeCurrent && 'text-accent',
                      isCurrent && 'text-foreground',
                      status === 'pending' && 'text-muted-foreground'
                    )}
                  >
                    {step.title}
                  </div>
                  <div
                    className={cn(
                      'text-xs leading-relaxed transition-colors px-1',
                      isBeforeCurrent || status === 'pending'
                        ? 'text-muted-foreground/80'
                        : 'text-muted-foreground'
                    )}
                  >
                    {step.description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export { StepNavigatorMobile };
