'use client';
import Link from 'next/link';
import { Button } from '@/components/ui';
import { Plus } from 'lucide-react';

function ProductsHeader() {
  return (
    <div className="flex justify-between items-center flex-wrap gap-4">
      <div className="flex-1 min-w-[200px]">
        <Link href="/products/add">
          <Button className="w-full sm:w-auto cursor-pointer">
            <Plus className="h-4 w-4" />
            اضافه کردن محصول
          </Button>
        </Link>
      </div>
    </div>
  );
}

export { ProductsHeader };
