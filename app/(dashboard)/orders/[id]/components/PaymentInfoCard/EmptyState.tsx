import { Wallet } from 'lucide-react';

function EmptyState() {
  return (
    <div className="relative overflow-hidden border border-border rounded-xl bg-card shadow-sm hover:shadow-md transition-all duration-300 w-full lg:flex-1">
      {/* Header Section */}
      <div className="relative p-4 sm:p-6 border-b border-border bg-linear-to-r from-muted/30 to-muted/10">
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-secondary/20 text-secondary shadow-sm">
            <Wallet className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <h2 className="text-base sm:text-xl font-bold text-foreground">
            اطلاعات پرداخت
          </h2>
        </div>
      </div>
      {/* Empty State */}
      <div className="p-6 sm:p-8">
        <div className="flex flex-col items-center justify-center py-8 sm:py-12 text-center">
          <div className="flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-muted/50 mb-3 sm:mb-4">
            <Wallet className="w-6 h-6 sm:w-8 sm:h-8 text-muted-foreground" />
          </div>
          <p className="text-sm sm:text-base font-medium text-muted-foreground">
            اطلاعات پرداخت یافت نشد
          </p>
          <p className="text-xs sm:text-sm text-muted-foreground/70 mt-1 px-4">
            هنوز پرداختی برای این سفارش ثبت نشده است
          </p>
        </div>
      </div>
    </div>
  );
}

export { EmptyState };
