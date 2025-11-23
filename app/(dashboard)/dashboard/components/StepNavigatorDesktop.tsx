'use client';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { steps, type Step } from './StepNavigator.types';

interface StepNavigatorDesktopProps {
  currentStatus: number;
}

function StepNavigatorDesktop({ currentStatus }: StepNavigatorDesktopProps) {
  const getStepStatus = (stepId: number) => {
    if (stepId < currentStatus) return 'completed';
    if (stepId === currentStatus) return 'current';
    return 'pending';
  };

  return (
    <div className="hidden md:block">
      <div className="max-w-3xl mx-auto">
        <div className="relative">
          {/* Progress Line */}
          <div
            className={`absolute top-6 ${currentStatus === 2 ? 'right-2' : 'right-0'} ${currentStatus === 3 ? 'left-2' : 'left-0'} h-0.5 bg-border/50`}
          >
            <div className="relative h-full">
              {/* Completed Steps - Green */}
              {currentStatus > 1 && (
                <div
                  className="absolute h-full bg-accent transition-all duration-700 ease-out"
                  style={{
                    width: `${((currentStatus - 1) / (steps.length - 1)) * 100}%`,
                  }}
                />
              )}
              {/* Progress to Current Step - Blue */}
              <div
                className="absolute h-full bg-accent transition-all duration-700 ease-out"
                style={{
                  width: `${((currentStatus - 1) / (steps.length - 1)) * 100}%`,
                }}
              />
            </div>
          </div>

          {/* Steps */}
          <div className="relative flex items-start justify-between">
            {steps.map((step) => {
              const status = getStepStatus(step.id);
              const Icon = step.icon;

              return (
                <div
                  key={step.id}
                  className={cn(
                    'flex flex-col items-center relative z-10 flex-1'
                  )}
                >
                  {/* Step Number & Icon */}
                  <div
                    className={cn(
                      'relative mb-3 transition-all duration-300',
                      status === 'current' && 'scale-110'
                    )}
                  >
                    <div
                      className={cn(
                        'w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 border-2',
                        status === 'completed' &&
                          'bg-accent border-accent text-accent-foreground',
                        status === 'current' &&
                          'bg-primary border-primary text-primary-foreground shadow-lg shadow-primary/30',
                        status === 'pending' &&
                          'bg-background border-border/60 text-muted-foreground'
                      )}
                    >
                      {status === 'completed' ? (
                        <Check className="w-5 h-5" strokeWidth={2.5} />
                      ) : (
                        <Icon className="w-5 h-5" strokeWidth={2} />
                      )}
                    </div>
                    {status === 'current' && (
                      <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="text-center max-w-[140px]">
                    <div
                      className={cn(
                        'text-xs font-medium mb-1 transition-colors',
                        status === 'completed' && 'text-accent',
                        status === 'current' && 'text-foreground',
                        status === 'pending' && 'text-muted-foreground'
                      )}
                    >
                      {step.title}
                    </div>
                    <div
                      className={cn(
                        'text-[10px] leading-relaxed transition-colors',
                        status === 'completed' || status === 'pending'
                          ? 'text-muted-foreground/70'
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
    </div>
  );
}

export { StepNavigatorDesktop };
