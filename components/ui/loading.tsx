'use client';

interface LoadingProps {
  isLoading: boolean;
  message?: string;
}

function Loading({
  isLoading,
  message = 'در حال دریافت اطلاعات...',
}: LoadingProps) {
  if (!isLoading) return null;

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-background/50 backdrop-blur-[3px]"></div>

      {/* Modal Content */}
      <div className="relative z-50 max-w-sm w-full mx-4 bg-card/50 backdrop-blur-[1px] border border-border rounded-lg shadow-2xl">
        <div className="flex flex-col items-center justify-center gap-6 py-8 px-6">
          {/* Spinner اصلی با انیمیشن smooth */}
          <div className="relative w-20 h-20">
            {/* حلقه خارجی با انیمیشن چرخشی */}
            <div className="absolute inset-0 border-4 border-primary/20 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-transparent border-t-primary rounded-full animate-spin"></div>

            {/* حلقه داخلی با انیمیشن معکوس */}
            <div className="relative w-16 h-16 flex items-center justify-center mx-auto mt-0.5">
              <div className="absolute inset-0 border-2 border-primary/10 rounded-full"></div>
              <div
                className="absolute inset-0 border-2 border-transparent border-r-primary rounded-full animate-spin"
                style={{
                  animationDirection: 'reverse',
                  animationDuration: '0.8s',
                }}
              ></div>

              {/* نقطه مرکزی */}
              <div className="absolute w-3 h-3 bg-primary rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* متن با انیمیشن fade */}
          <div className="flex flex-col items-center gap-2">
            <p className="text-base font-medium text-foreground animate-pulse">
              {message}
            </p>
            <div className="flex gap-1">
              <span
                className="w-2 h-2 bg-primary rounded-full animate-bounce"
                style={{ animationDelay: '0ms' }}
              ></span>
              <span
                className="w-2 h-2 bg-primary rounded-full animate-bounce"
                style={{ animationDelay: '150ms' }}
              ></span>
              <span
                className="w-2 h-2 bg-primary rounded-full animate-bounce"
                style={{ animationDelay: '300ms' }}
              ></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { Loading };
