'use client';

/**
 * کامپوننت نمایش Active Indicator
 * یک خط عمودی در سمت راست برای نشان دادن آیتم فعال
 */
function ActiveIndicator() {
  return (
    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-primary rounded-l-full" />
  );
}

export { ActiveIndicator };
