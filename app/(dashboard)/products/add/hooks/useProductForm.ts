import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import productSchema from '../schemas/productSchema';

export type ProductFormData = z.infer<typeof productSchema>;

export function useProductForm() {
  const [primaryCostDisplay, setPrimaryCostDisplay] = useState('');
  const [finalCostDisplay, setFinalCostDisplay] = useState('');
  const [stockDisplay, setStockDisplay] = useState('');
  const [uniqueNameDisplay, setUniqueNameDisplay] = useState('');
  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  });

  return {
    form,
    primaryCostDisplay,
    setPrimaryCostDisplay,
    finalCostDisplay,
    setFinalCostDisplay,
    stockDisplay,
    setStockDisplay,
    uniqueNameDisplay,
    setUniqueNameDisplay,
  };
}
