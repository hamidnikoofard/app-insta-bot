import { X } from 'lucide-react';
import Image from 'next/image';

interface ImagePreviewProps {
  imageUrl: string;
  imageName?: string;
  onRemove?: () => void;
  isExisting?: boolean;
  index: number;
}

function ImagePreview({
  imageUrl,
  imageName,
  onRemove,
  isExisting = false,
  index,
}: ImagePreviewProps) {
  // بررسی اینکه آیا URL یک blob URL است یا نه
  const isBlobUrl = imageUrl.startsWith('blob:');

  return (
    <div className="relative group aspect-square rounded-lg overflow-hidden border border-border bg-muted">
      <Image
        src={imageUrl}
        alt={isExisting ? `Existing ${index + 1}` : `Preview ${index + 1}`}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 50vw, 200px"
        loading="lazy"
        unoptimized={isBlobUrl}
      />
      {isExisting ? (
        <div className="absolute top-1 right-1 px-1.5 py-0.5 bg-primary/90 text-primary-foreground text-[10px] rounded">
          موجود
        </div>
      ) : (
        <>
          {onRemove && (
            <button
              type="button"
              onClick={onRemove}
              className="absolute top-1 right-1 w-6 h-6 flex items-center justify-center rounded-full bg-destructive/90 text-destructive-foreground opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity hover:bg-destructive active:bg-destructive"
              aria-label="حذف تصویر"
            >
              <X className="h-3 w-3" />
            </button>
          )}
          {imageName && (
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-[10px] px-1 py-0.5 truncate">
              {imageName}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export { ImagePreview };
