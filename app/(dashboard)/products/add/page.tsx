'use client';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useProductForm } from './hooks/useProductForm';
import { useProductFetch } from './hooks/useProductFetch';
import { useProductSubmit } from './hooks/useProductSubmit';
import { useImageManager } from './hooks/useImageManager';
import {
  PageHeader,
  BasicInformationSection,
  PricingSection,
  ImagesSection,
  FormActions,
} from './components';
import { Loading } from '@/components/ui';

function AddProductPageContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const isEditMode = !!id;

  // Form management
  const {
    form,
    primaryCostDisplay,
    setPrimaryCostDisplay,
    finalCostDisplay,
    setFinalCostDisplay,
  } = useProductForm();

  const { register, handleSubmit, formState, setValue, reset } = form;
  const { errors } = formState;

  // Image management
  const imageManager = useImageManager();

  // Fetch product data for editing
  const { loading } = useProductFetch({
    id,
    reset,
    setPrimaryCostDisplay,
    setFinalCostDisplay,
    setExistingImages: imageManager.setExistingImages,
  });

  // Submit handler
  const { submitProduct, pending } = useProductSubmit(id);

  if (loading) {
    return (
      <Loading isLoading={loading} message="در حال دریافت اطلاعات محصول..." />
    );
  }

  return (
    <div className="w-full min-h-[calc(100vh-12rem)] pb-8">
      <PageHeader isEditMode={isEditMode} />

      <div className="bg-card border border-border rounded-xl sm:rounded-2xl shadow-sm overflow-hidden">
        <form
          onSubmit={handleSubmit(submitProduct)}
          className="p-4 sm:p-6 lg:p-8"
        >
          <div className="space-y-6 sm:space-y-8">
            <BasicInformationSection register={register} errors={errors} />

            <PricingSection
              primaryCostDisplay={primaryCostDisplay}
              finalCostDisplay={finalCostDisplay}
              setPrimaryCostDisplay={setPrimaryCostDisplay}
              setFinalCostDisplay={setFinalCostDisplay}
              setValue={setValue}
              errors={errors}
            />

            <ImagesSection
              selectedImages={imageManager.selectedImages}
              existingImages={imageManager.existingImages}
              onImageChange={imageManager.addImages}
              onRemoveImage={imageManager.removeImage}
            />

            <FormActions isEditMode={isEditMode} pending={pending} />
          </div>
        </form>
      </div>
    </div>
  );
}

function AddProductPage() {
  return (
    <Suspense
      fallback={<Loading isLoading={true} message="در حال بارگذاری..." />}
    >
      <AddProductPageContent />
    </Suspense>
  );
}

export default AddProductPage;
