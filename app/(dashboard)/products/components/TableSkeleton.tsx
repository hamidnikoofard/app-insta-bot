'use client';
import { Skeleton } from '@/components/ui';

export function TableSkeleton() {
  return (
    <>
      {/* جدول اسکلتون برای دسکتاپ */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="text-right p-4 font-medium text-sm">آیدی</th>
              <th className="text-right p-4 font-medium text-sm">عکس</th>
              <th className="text-right p-4 font-medium text-sm">نام محصول</th>
              <th className="text-right p-4 font-medium text-sm">قیمت</th>
              <th className="text-right p-4 font-medium text-sm">
                قیمت با تخفیف
              </th>
              <th className="text-right p-4 font-medium text-sm">توضیحات</th>
              <th className="text-right p-4 font-medium text-sm">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 5 }).map((_, index) => (
              <tr
                key={index}
                className="border-b border-border last:border-b-0"
              >
                <td className="p-4">
                  <Skeleton className="h-5 w-12" />
                </td>
                <td className="p-4">
                  <Skeleton className="w-16 h-16 rounded-lg" />
                </td>
                <td className="p-4">
                  <Skeleton className="h-5 w-32" />
                </td>
                <td className="p-4">
                  <Skeleton className="h-5 w-24" />
                </td>
                <td className="p-4">
                  <Skeleton className="h-5 w-24" />
                </td>
                <td className="p-4">
                  <Skeleton className="h-5 w-48 max-w-xs" />
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-8 w-8 rounded" />
                    <Skeleton className="h-8 w-8 rounded" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* کارت‌های اسکلتون برای موبایل */}
      <div className="md:hidden space-y-4 p-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="bg-muted/30 border border-border rounded-lg p-4 space-y-4"
          >
            <div className="flex gap-4">
              <Skeleton className="w-20 h-20 rounded-lg shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-4 w-12" />
                </div>
                <div className="space-y-1">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-28" />
                </div>
              </div>
            </div>
            <Skeleton className="h-4 w-full" />
            <div className="flex items-center gap-2 pt-2 border-t border-border">
              <Skeleton className="h-9 flex-1 rounded-md" />
              <Skeleton className="h-9 flex-1 rounded-md" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
