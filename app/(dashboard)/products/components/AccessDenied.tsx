'use client';
import Link from 'next/link';
import { Button } from '@/components/ui';

function AccessDenied({
  title,
  description,
  status,
}: {
  title: string;
  description: string;
  status: number;
}) {
  return (
    <div className="relative w-full min-h-[calc(100vh-12rem)] flex items-center justify-center text-center px-4">
      <div className="bg-card border border-border rounded-xl p-8 text-center space-y-4">
        <div className="text-muted-foreground space-y-2">
          <p className="text-lg font-medium text-foreground">{title}</p>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
        {status === 1 && (
          <Link href="/dashboard">
            <Button
              variant="outline"
              className="w-full sm:w-auto cursor-pointer"
            >
              وصل کردن پیج اینستاگرام
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}

export { AccessDenied };