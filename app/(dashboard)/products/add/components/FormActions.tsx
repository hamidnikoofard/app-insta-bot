'use client';
import { Button } from '@/components/ui';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface FormActionsProps {
  isEditMode: boolean;
  pending: boolean;
}

function FormActions({ isEditMode, pending }: FormActionsProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 pt-4 border-t border-border">
      <Button
        type="button"
        variant="outline"
        onClick={() => router.push('/products')}
        className="w-full sm:w-auto"
        disabled={pending}
      >
        انصراف
      </Button>
      <Button
        type="submit"
        className="w-full sm:w-auto min-w-[140px]"
        disabled={pending}
      >
        {pending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin ml-2" />
            در حال ثبت...
          </>
        ) : (
          <>{isEditMode ? 'ثبت تغییرات' : 'ثبت محصول'}</>
        )}
      </Button>
    </div>
  );
}

export { FormActions };