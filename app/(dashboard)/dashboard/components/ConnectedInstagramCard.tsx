'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  Button,
} from '@/components/ui';
import { Instagram, Trash } from 'lucide-react';

type ConnectedInstagramCardProps = {
  instagramUsername?: string;
};

function ConnectedInstagramCard({
  instagramUsername,
}: ConnectedInstagramCardProps) {
  const formattedUsername = instagramUsername ? `${instagramUsername}@` : '@';

  return (
    <div className="w-full max-w-sm rounded-2xl border border-border/70 bg-card p-5 shadow-lg shadow-black/5">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Instagram className="h-5 w-5" />
        </div>
        <div>
          <p className="text-xs text-muted-foreground">پیج متصل شده</p>
          <p className="text-lg font-semibold text-card-foreground">
            {formattedUsername}
          </p>
        </div>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
        این پیج در حال حاضر به فروشگاه شما متصل است. برای تغییر یا حذف، از گزینه
        زیر استفاده کنید.
      </p>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            size="sm"
            variant="destructive"
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl text-sm font-semibold"
          >
            حذف پیج
            <Trash className="h-4 w-4" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-right">
              آیا از حذف پیج {formattedUsername} مطمئن هستید؟
            </AlertDialogTitle>
            <AlertDialogDescription className="text-right">
              با تایید این مرحله، پیج {formattedUsername} متصل شده از فروشگاه
              شما جدا می‌شود. این عمل قابل بازگشت نیست.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="text-right">انصراف</AlertDialogCancel>
            <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              تایید حذف
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export { ConnectedInstagramCard };
