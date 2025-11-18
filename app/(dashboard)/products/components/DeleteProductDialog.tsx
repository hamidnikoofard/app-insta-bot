'use client';
import { useState } from 'react';
import { Button } from '@/components/ui';
import { Trash2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';

interface DeleteProductDialogProps {
  productId: number;
  productName: string;
  onDelete: (id: number) => void;
  trigger?: React.ReactNode;
}

export function DeleteProductDialog({
  productId,
  productName,
  onDelete,
  trigger,
}: DeleteProductDialogProps) {
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    onDelete(productId);
    setOpen(false);
  };

  const defaultTrigger = (
    <Button
      variant="ghost"
      size="icon"
      className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger || defaultTrigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] max-w-[90vw]">
        <DialogHeader className="space-y-2">
          <DialogTitle className="text-right text-lg sm:text-xl">
            تایید حذف محصول
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-right text-sm sm:text-base leading-relaxed">
          آیا از حذف محصول{' '}
          <span className="font-semibold text-foreground">{productName}</span>{' '}
          اطمینان دارید؟ این عمل قابل بازگشت نیست.
        </DialogDescription>
        <DialogFooter className="flex-col-reverse sm:flex-row gap-3 sm:gap-2 pt-4 sm:pt-0">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            className="w-full sm:w-auto"
          >
            انصراف
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            className="w-full sm:w-auto"
          >
            حذف محصول
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
