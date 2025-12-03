import { MapPin } from 'lucide-react';

export function AddressInfoCardHeader() {
  return (
    <div className="relative p-6 border-b border-border bg-muted/20">
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary">
          <MapPin className="w-5 h-5" />
        </div>
        <h2 className="text-xl font-bold text-foreground">آدرس تحویل گیرنده</h2>
      </div>
    </div>
  );
}
