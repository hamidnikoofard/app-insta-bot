'use client';
import { Label } from '@/components/ui';
import { Image as ImageIcon, Plus, Upload } from 'lucide-react';
import { useRef } from 'react';
import { ImagePreview } from './ImagePreview';
import { ProductImage } from '../../type';

interface ImagesSectionProps {
  selectedImages: File[];
  existingImages: ProductImage[];
  onImageChange: (files: File[]) => void;
  onRemoveImage: (index: number) => void;
  onRemoveExistingImage: (index: number) => void;
}

export function ImagesSection({
  selectedImages,
  existingImages,
  onImageChange,
  onRemoveImage,
  onRemoveExistingImage,
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
  console.log(existingImages);

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

        {/* All Images (Existing + New) + Upload Button */}
        {(existingImages.length > 0 || selectedImages.length > 0) && (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 sm:gap-2.5 mt-4">
            {/* Existing Images */}
            {existingImages.map((imageUrl, index) => (
              <ImagePreview
                key={`existing-${index}`}
                imageUrl={imageUrl.image_url}
                isExisting
                index={index}
                onRemove={() => onRemoveExistingImage(index)}
              />
            ))}

            {/* New Images */}
            {selectedImages.map((image, index) => (
              <ImagePreview
                key={`new-${index}`}
                imageUrl={URL.createObjectURL(image)}
                imageName={image.name}
                onRemove={() => onRemoveImage(index)}
                index={existingImages.length + index}
              />
            ))}

            {/* Upload Button */}
            <div
              onClick={handleClick}
              className="relative aspect-square border-2 border-dashed border-border rounded-lg p-6 sm:p-4 text-center justify-center cursor-pointer transition-colors hover:border-primary/50 hover:bg-primary/5 group"
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
              <div className="flex flex-col items-center justify-center h-full gap-2">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                  <Plus className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">افزودن تصویر</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Upload Button (when no images exist) */}
        {existingImages.length === 0 && selectedImages.length === 0 && (
          <div
            onClick={handleClick}
            className="relative w-full border-2 border-dashed border-border rounded-lg p-6 sm:p-8 text-center cursor-pointer transition-colors hover:border-primary/50 hover:bg-primary/5 group mt-4"
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
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                <Upload className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground mt-1">
                  فرمت‌های پشتیبانی شده: JPG, PNG, WEBP
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
