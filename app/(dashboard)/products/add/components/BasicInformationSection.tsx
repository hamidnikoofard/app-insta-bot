import { Input, Label, Textarea } from '@/components/ui';
import { FileText } from 'lucide-react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { ProductFormData } from '../hooks/useProductForm';

interface BasicInformationSectionProps {
  register: UseFormRegister<ProductFormData>;
  errors: FieldErrors<ProductFormData>;
}

export function BasicInformationSection({
  register,
  errors,
}: BasicInformationSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 pb-2 border-b border-border">
        <FileText className="h-4 w-4 text-primary" />
        <h2 className="text-lg font-semibold">اطلاعات پایه</h2>
      </div>

      {/* Product Name */}
      <div className="space-y-2">
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

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description" className="text-sm font-medium">
          توضیحات <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="description"
          placeholder="توضیحات کامل محصول را وارد کنید..."
          rows={8}
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
