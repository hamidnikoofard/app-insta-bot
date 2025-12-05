import { ImageIcon, EyeIcon } from 'lucide-react';
import Image from 'next/image';

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader,
  DialogTrigger,
  DialogDescription,
} from '@/components/ui';

interface ReceiptImageProps {
  receiptImageUrl: string;
}

function ReceiptImage({ receiptImageUrl }: ReceiptImageProps) {
  return (
    <div className="border border-border rounded-lg p-3 sm:p-4">
      <div className="flex flex-col gap-2 sm:gap-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-primary/10 text-primary shrink-0 shadow-sm">
            <ImageIcon className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <h3 className="text-[10px] sm:text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            تصویر رسید پرداخت
          </h3>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <div className="relative w-full max-w-full sm:max-w-[200px] mx-auto aspect-square group cursor-pointer rounded-lg overflow-hidden border border-border/50 hover:border-primary/50 transition-all duration-300">
              <Image
                src={receiptImageUrl}
                alt="تصویر رسید پرداخت"
                width={200}
                height={200}
                className="object-cover w-full max-w-full h-full transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 100px"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                <EyeIcon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                <span className="text-white text-xs sm:text-sm">مشاهده</span>
              </div>
            </div>
          </DialogTrigger>
          <DialogContent className="max-w-[95vw] sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-right text-base sm:text-lg">
                تصویر رسید پرداخت
              </DialogTitle>
            </DialogHeader>
            <DialogDescription>
              <Image
                src={receiptImageUrl}
                alt="تصویر رسید پرداخت"
                width={500}
                height={500}
                className="w-full h-full object-contain max-h-[70vh]"
              />
            </DialogDescription>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export { ReceiptImage };
