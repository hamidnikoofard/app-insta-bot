import { MapPin } from 'lucide-react';

export function AddressInfoCardHeader() {
  return (
    <div className="relative p-4 sm:p-6 border-b border-border bg-muted/20">
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-primary/10 text-primary shrink-0">
          <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
        </div>
        <h2 className="text-base sm:text-xl font-bold text-foreground">آدرس تحویل گیرنده</h2>
      </div>
    </div>
  );
}
