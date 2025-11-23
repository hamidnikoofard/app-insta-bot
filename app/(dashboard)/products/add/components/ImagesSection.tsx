'use client';
import { Label } from '@/components/ui';
import { Image as ImageIcon, Upload } from 'lucide-react';
import { useRef } from 'react';
import { ImagePreview } from './ImagePreview';

interface ImagesSectionProps {
  selectedImages: File[];
  existingImages: string[];
  onImageChange: (files: File[]) => void;
  onRemoveImage: (index: number) => void;
}

export function ImagesSection({
  selectedImages,
  existingImages,
  onImageChange,
  onRemoveImage,
}: ImagesSectionProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newFiles = Array.from(files);
      onImageChange(newFiles);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 pb-2 border-b border-border">
        <ImageIcon className="h-4 w-4 text-primary" />
        <h2 className="text-lg font-semibold">تصاویر محصول</h2>
      </div>

      <div className="space-y-3">
        <Label htmlFor="images" className="text-sm font-medium">
          آپلود تصاویر
        </Label>
        <div
          onClick={handleClick}
          className="relative border-2 border-dashed border-border rounded-lg p-6 sm:p-8 text-center cursor-pointer transition-colors hover:border-primary/50 hover:bg-primary/5 group"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleClick();
            }
          }}
        >
          <input
            ref={fileInputRef}
            id="images"
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            className="hidden"
            aria-label="آپلود تصاویر"
          />
          <div className="flex flex-col items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
              <Upload className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">
                برای آپلود کلیک کنید یا فایل را بکشید
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                فرمت‌های پشتیبانی شده: JPG, PNG, WEBP
              </p>
            </div>
          </div>
        </div>

        {/* Existing Images */}
        {existingImages.length > 0 && (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 sm:gap-2.5 mt-4">
            {existingImages.map((imageUrl, index) => (
              <ImagePreview
                key={`existing-${index}`}
                imageUrl={imageUrl}
                isExisting
                index={index}
              />
            ))}
          </div>
        )}

        {/* New Image Preview */}
        {selectedImages.length > 0 && (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 sm:gap-2.5 mt-4">
            {selectedImages.map((image, index) => (
              <ImagePreview
                key={`new-${index}`}
                imageUrl={URL.createObjectURL(image)}
                imageName={image.name}
                onRemove={() => onRemoveImage(index)}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
