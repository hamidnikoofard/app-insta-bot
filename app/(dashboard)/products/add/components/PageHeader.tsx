'use client';
import { Button } from '@/components/ui';
import { ArrowLeft, Package } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface PageHeaderProps {
  isEditMode: boolean;
}

function PageHeader({ isEditMode }: PageHeaderProps) {
  const router = useRouter();

  return (
    <div className="mb-6 sm:mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary">
            <Package className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
              {isEditMode ? 'ویرایش محصول' : 'افزودن محصول جدید'}
            </h1>
            <p className="text-sm text-muted-foreground mt-1 hidden sm:block">
              {isEditMode
                ? 'اطلاعات محصول را ویرایش کنید'
                : 'اطلاعات محصول جدید را وارد کنید'}
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          onClick={() => router.push('/products')}
          className="flex items-center gap-2 w-full sm:w-auto shrink-0"
        >
          <ArrowLeft className="h-4 w-4" />
          بازگشت
        </Button>
      </div>
    </div>
  );
}

export { PageHeader };