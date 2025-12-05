import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState, useCallback } from 'react';
import productSchema from '../schemas/productSchema';
import { ProductImage } from '../../type';

export type ProductFormData = z.infer<typeof productSchema>;

export function useProductForm() {
  const [primaryCostDisplay, setPrimaryCostDisplay] = useState('');
  const [finalCostDisplay, setFinalCostDisplay] = useState('');
  const [stockDisplay, setStockDisplay] = useState('');
  const [uniqueNameDisplay, setUniqueNameDisplay] = useState('');
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<ProductImage[]>([]);
  const [existingImagesIds, setExistingImagesIds] = useState<number[]>([]);

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
  });

  const addImages = useCallback((files: File[]) => {
    setSelectedImages((prev) => [...prev, ...files]);
  }, []);

  const removeImage = useCallback((index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const removeExistingImage = useCallback((index: number) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
    setExistingImagesIds((prev) => prev.filter((id) => id !== prev[index]));
  }, []);

  const setExistingImagesUrls = useCallback((urls: ProductImage[]) => {
    setExistingImages(urls);
    setExistingImagesIds(urls.map((img) => img.id));
  }, []);

  // Wrapper for handleSubmit that automatically adds images
  const handleSubmitWithImages = useCallback(
    (onSubmit: (data: ProductFormData) => void | Promise<void>) => {
      return form.handleSubmit((data) => {
        const formData = {
          ...data,
          existing_images: existingImagesIds,
          new_images: selectedImages,
        };
        return onSubmit(formData);
      });
    },
    [form, existingImagesIds, selectedImages]
  );

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
    selectedImages,
    existingImages,
    existingImagesIds,
    addImages,
    removeImage,
    removeExistingImage,
    setExistingImages: setExistingImagesUrls,
    handleSubmitWithImages,
    setSelectedImages,
  };
}
