import { useState, useCallback } from 'react';
import { ProductImage } from '../../type';

export function useImageManager() {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<ProductImage[]>([]);
  const [existingImagesIds, setExistingImagesIds] = useState<number[]>([]);

  const addImages = useCallback((files: File[]) => {
    setSelectedImages((prev) => [...prev, ...files]);
  }, []);

  const removeImage = useCallback((index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const removeExistingImage = useCallback(
    (index: number) => {
      setExistingImages((prev) => prev.filter((_, i) => i !== index));
      setExistingImagesIds((prev) =>
        prev.filter((id) => id !== existingImagesIds[index])
      );
    },
    [existingImagesIds]
  );

  const setExistingImagesUrls = useCallback((urls: ProductImage[]) => {
    setExistingImages(urls);
    setExistingImagesIds(urls.map((img) => img.id));
  }, []);

  return {
    selectedImages,
    existingImages,
    existingImagesIds,
    addImages,
    removeImage,
    removeExistingImage,
    setExistingImages: setExistingImagesUrls,
    setExistingImagesIds,
  };
}
