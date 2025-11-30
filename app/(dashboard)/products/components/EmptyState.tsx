'use client';
import Link from 'next/link';
import { Button } from '@/components/ui';
import { Plus } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  buttonText?: string;
  buttonLink?: string;
}
function EmptyState({
  title,
  description,
  buttonText,
  buttonLink,
}: EmptyStateProps) {
  return (
    <div className="bg-card border border-border rounded-xl p-8 text-center space-y-4">
      <div className="text-muted-foreground space-y-2">
        <p className="text-lg font-medium">{title}</p>
        <p className="text-sm">{description}</p>
      </div>
      {buttonLink && (
        <Link href={buttonLink}>
          <Button className="w-full sm:w-auto cursor-pointer">
            <Plus className="h-4 w-4" />
            {buttonText}
          </Button>
        </Link>
      )}
    </div>
  );
}

export { EmptyState };
