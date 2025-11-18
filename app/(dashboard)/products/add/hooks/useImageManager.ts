import { useState, useCallback } from 'react';

export function useImageManager() {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);

  const addImages = useCallback((files: File[]) => {
    setSelectedImages((prev) => [...prev, ...files]);
  }, []);

  const removeImage = useCallback((index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const setExistingImagesUrls = useCallback((urls: string[]) => {
    setExistingImages(urls);
  }, []);

  return {
    selectedImages,
    existingImages,
    addImages,
    removeImage,
    setExistingImages: setExistingImagesUrls,
  };
}
