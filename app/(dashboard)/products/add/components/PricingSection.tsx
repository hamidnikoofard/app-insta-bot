import { DollarSign } from 'lucide-react';
import { FieldErrors, UseFormSetValue } from 'react-hook-form';
import { ProductFormData } from '../hooks/useProductForm';
import { PriceInput } from './PriceInput';

interface PricingSectionProps {
  primaryCostDisplay: string;
  finalCostDisplay: string;
  setPrimaryCostDisplay: (value: string) => void;
  setFinalCostDisplay: (value: string) => void;
  setValue: UseFormSetValue<ProductFormData>;
  errors: FieldErrors<ProductFormData>;
}

export function PricingSection({
  primaryCostDisplay,
  finalCostDisplay,
  setPrimaryCostDisplay,
  setFinalCostDisplay,
  setValue,
  errors,
}: PricingSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 pb-2 border-b border-border">
        <DollarSign className="h-4 w-4 text-primary" />
        <h2 className="text-lg font-semibold">قیمت‌گذاری</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <PriceInput
          id="primary_cost"
          label="قیمت اولیه"
          required
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
      </div>
    </div>
  );
}
