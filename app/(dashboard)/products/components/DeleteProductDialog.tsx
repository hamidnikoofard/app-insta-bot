'use client';
import { useState } from 'react';
import {
  Button,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui';
import { Trash2 } from 'lucide-react';

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
    <AlertDialog open={open} onOpenChange={setOpen}>
      {trigger ? (
        <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>
      ) : (
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <AlertDialogTrigger asChild>{defaultTrigger}</AlertDialogTrigger>
          </TooltipTrigger>
          <TooltipContent side="top">حذف محصول</TooltipContent>
        </Tooltip>
      )}
      <AlertDialogContent className="sm:max-w-[425px] max-w-[90vw]">
        <AlertDialogHeader className="space-y-2">
          <AlertDialogTitle className="text-lg sm:text-xl text-right">
            تایید حذف محصول
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm sm:text-base leading-relaxed text-right">
            آیا از حذف محصول{' '}
            <span className="font-semibold text-foreground">{productName}</span>{' '}
            اطمینان دارید؟ این عمل قابل بازگشت نیست.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-col-reverse sm:flex-row gap-3 sm:gap-2 pt-4 sm:pt-0">
          <AlertDialogCancel className="w-full sm:w-auto">
            انصراف
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="w-full sm:w-auto bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            حذف محصول
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
