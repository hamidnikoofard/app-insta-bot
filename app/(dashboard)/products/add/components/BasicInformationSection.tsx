import { Input, Label, Textarea, TooltipWrapper } from '@/components/ui';
import { FileText, Hash, Info } from 'lucide-react';
import { UseFormRegister, FieldErrors, UseFormSetValue } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { ProductFormData } from '../hooks/useProductForm';

interface BasicInformationSectionProps {
  register: UseFormRegister<ProductFormData>;
  errors: FieldErrors<ProductFormData>;
  isEditMode: boolean;
  productId?: string | undefined;
  uniqueNameDisplay: string;
  setUniqueNameDisplay: (value: string) => void;
  setValue: UseFormSetValue<ProductFormData>;
}

function BasicInformationSection({
  register,
  errors,
  isEditMode,
  productId,
  uniqueNameDisplay,
  setUniqueNameDisplay,
  setValue,
}: BasicInformationSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4 pb-2 border-b border-border">
        <div className="flex items-center gap-2 ">
          <FileText className="h-4 w-4 text-primary" />
          <h2 className="text-lg font-semibold">اطلاعات پایه</h2>
        </div>
        {isEditMode && (
          <div className="flex items-center gap-2 text-foreground">
            <Hash className="h-4 w-4 text-primary" />
            <Label
              htmlFor="productId"
              className="text-sm md:text-lg font-semibold text-destructive"
            >
              شناسه محصول :{' '}
              {uniqueNameDisplay ? uniqueNameDisplay : productId?.toString()}
            </Label>
          </div>
        )}
      </div>

      {/* Product Name */}
      <div className="flex items-center justify-between gap-4">
        <div className="space-y-2 w-full flex-1">
          <Label htmlFor="name" className="text-sm font-medium">
            نام محصول <span className="text-destructive">*</span>
          </Label>
          <Input
            id="name"
            type="text"
            placeholder="مثال: گوشی موبایل سامسونگ"
            {...register('name')}
            className={cn(
              'h-11',
              errors.name &&
                'border-destructive focus-visible:ring-destructive/20'
            )}
            aria-invalid={errors.name ? 'true' : 'false'}
          />
          {errors.name && (
            <p className="text-sm text-destructive flex items-center gap-1 mt-1">
              <span className="text-xs">⚠</span>
              {errors.name.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <TooltipWrapper
            content="این قسمت اختیاری است و در صورتی که خالی بماند، شناسه به صورت خودکار تولید می‌شود."
            contentProps={{ side: 'top' }}
            delayDuration={0}
          >
            <Label
              htmlFor="setProductId"
              className="text-sm font-medium flex items-center gap-2 cursor-pointer"
            >
              <Info className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">تنظیم شناسه محصول</span>
            </Label>
          </TooltipWrapper>
          <Input
            id="setProductId"
            type="text"
            placeholder="مثال: 90"
            className="h-11"
            value={uniqueNameDisplay}
            onChange={(e) => {
              const value = e.target.value;
              setUniqueNameDisplay(value);
              setValue('unique_name', value);
            }}
          />
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description" className="text-sm font-medium">
          توضیحات <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="description"
          placeholder="توضیحات کامل محصول را وارد کنید..."
          rows={10}
          {...register('description')}
          className={cn(
            'resize-none',
            errors.description &&
              'border-destructive focus-visible:ring-destructive/20'
          )}
          aria-invalid={errors.description ? 'true' : 'false'}
        />
        {errors.description && (
          <p className="text-sm text-destructive flex items-center gap-1 mt-1">
            <span className="text-xs">⚠</span>
            {errors.description.message}
          </p>
        )}
      </div>
    </div>
  );
}

export { BasicInformationSection };
