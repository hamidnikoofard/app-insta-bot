import { DollarSign } from 'lucide-react';
import { FieldErrors, UseFormSetValue } from 'react-hook-form';
import { ProductFormData } from '../hooks/useProductForm';
import { PriceInput } from './PriceInput';
import { Input, Label } from '@/components/ui';
import { cn } from '@/lib/utils';
import { formatNumberWithCommas, removeCommas } from '../utils/formatNumber';

interface PricingSectionProps {
  primaryCostDisplay: string;
  finalCostDisplay: string;
  stockDisplay: string;
  setPrimaryCostDisplay: (value: string) => void;
  setFinalCostDisplay: (value: string) => void;
  setStockDisplay: (value: string) => void;
  setValue: UseFormSetValue<ProductFormData>;
  errors: FieldErrors<ProductFormData>;
}

function PricingSection({
  primaryCostDisplay,
  finalCostDisplay,
  stockDisplay,
  setPrimaryCostDisplay,
  setFinalCostDisplay,
  setStockDisplay,
  setValue,
  errors,
}: PricingSectionProps) {
  const handleStockChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    // حذف کاراکترهای غیر عددی و کاما
    const numbers = inputValue.replace(/,/g, '').replace(/[^\d]/g, '');
    // جلوگیری از مقدار منفی - فقط اعداد مثبت
    const formatted = formatNumberWithCommas(numbers);
    setStockDisplay(formatted);
    setValue('stock', removeCommas(formatted), { shouldValidate: true });
  };
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 pb-2 border-b border-border">
        <DollarSign className="h-4 w-4 text-primary" />
        <h2 className="text-lg font-semibold">قیمت‌گذاری</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <PriceInput
          id="primary_cost"
          label="قیمت اولیه"
          value={primaryCostDisplay}
          onChange={setPrimaryCostDisplay}
          setValue={setValue}
          error={errors.primary_cost}
        />
        <PriceInput
          id="final_cost"
          label="قیمت نهایی (بعد از تخفیف)"
          value={finalCostDisplay}
          onChange={setFinalCostDisplay}
          setValue={setValue}
          error={errors.final_cost}
        />
        <div className="space-y-2">
          <Label htmlFor="stock" className="text-sm font-medium">
            موجودی <span className="text-destructive">*</span>
          </Label>
          <Input
            id="stock"
            type="text"
            inputMode="numeric"
            placeholder="0"
            value={stockDisplay}
            onChange={handleStockChange}
            className={cn(
              'h-11',
              errors.stock &&
                'border-destructive focus-visible:ring-destructive/20'
            )}
            aria-invalid={errors.stock ? 'true' : 'false'}
          />
          {errors.stock && (
            <p className="text-sm text-destructive flex items-center gap-1 mt-1">
              <span className="text-xs">⚠</span>
              {errors.stock.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export { PricingSection };
