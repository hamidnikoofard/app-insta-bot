import { Loader2 } from 'lucide-react';

export function LoadingState() {
  return (
    <div className="w-full min-h-[calc(100vh-12rem)] flex items-center justify-center pb-8">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">در حال بارگذاری...</p>
      </div>
    </div>
  );
}
