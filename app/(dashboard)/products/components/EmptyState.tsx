'use client';
import Link from 'next/link';
import { Button } from '@/components/ui';
import { Plus } from 'lucide-react';

function EmptyState() {
  return (
    <div className="bg-card border border-border rounded-xl p-8 text-center space-y-4">
      <div className="text-muted-foreground space-y-2">
        <p className="text-lg font-medium">هنوز محصولی اضافه نشده است</p>
        <p className="text-sm">
          برای شروع، روی دکمه &quot;اضافه کردن محصول&quot; کلیک کنید و اولین
          محصول خود را به سیستم اضافه کنید.
        </p>
      </div>
      <Link href="/products/add">
        <Button className="w-full sm:w-auto cursor-pointer">
          <Plus className="h-4 w-4" />
          اضافه کردن محصول
        </Button>
      </Link>
    </div>
  );
}

export { EmptyState };