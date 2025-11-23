import { Input, Label } from '@/components/ui';
import { FieldErrors, UseFormSetValue } from 'react-hook-form';
import { cn } from '@/lib/utils';
import { ProductFormData } from '../hooks/useProductForm';
import { formatNumberWithCommas, removeCommas } from '../utils/formatNumber';

interface PriceInputProps {
  id: 'primary_cost' | 'final_cost';
  label: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  setValue: UseFormSetValue<ProductFormData>;
  error?:
    | FieldErrors<ProductFormData>['primary_cost']
    | FieldErrors<ProductFormData>['final_cost'];
}

function PriceInput({
  id,
  label,
  required = false,
  value,
  onChange,
  setValue,
  error,
}: PriceInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatNumberWithCommas(e.target.value);
    onChange(formatted);
    setValue(id, removeCommas(formatted), { shouldValidate: true });
  };

  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-medium">
        {label}
        {required && <span className="text-destructive"> *</span>}
      </Label>
      <Input
        id={id}
        type="text"
        inputMode="numeric"
        placeholder="0"
        value={value}
        onChange={handleChange}
        className={cn(
          'h-11',
          error && 'border-destructive focus-visible:ring-destructive/20'
        )}
        aria-invalid={error ? 'true' : 'false'}
      />
      {error && (
        <p className="text-sm text-destructive flex items-center gap-1 mt-1">
          <span className="text-xs">⚠</span>
          {error.message}
        </p>
      )}
    </div>
  );
}

export { PriceInput };
