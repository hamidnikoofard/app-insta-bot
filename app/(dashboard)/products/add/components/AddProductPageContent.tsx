'use client';
import { useSearchParams } from 'next/navigation';
import {
  useProductForm,
  useProductFetch,
  useProductSubmit,
  useImageManager,
} from '../hooks';
import {
  PageHeader,
  BasicInformationSection,
  PricingSection,
  ImagesSection,
  FormActions,
} from './index';
import { Loading } from '@/components/ui';
import { useAuth } from '@/contexts';
import { AccessDenied } from '../../components';

function AddProductPageContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const isEditMode = !!id;
  const { online_shop } = useAuth();
  const { status } = online_shop;

  // Form management
  const {
    form,
    primaryCostDisplay,
    setPrimaryCostDisplay,
    finalCostDisplay,
    setFinalCostDisplay,
    stockDisplay,
    setStockDisplay,
    setUniqueNameDisplay,
    uniqueNameDisplay,
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
    setStockDisplay,
    setUniqueNameDisplay,
    setExistingImages: imageManager.setExistingImages,
  });

  // Submit handler
  const { submitProduct, pending } = useProductSubmit(id);

  if (loading) {
    return (
      <Loading isLoading={loading} message="در حال دریافت اطلاعات محصول..." />
    );
  }

  if (status !== 4) {
    return (
      <AccessDenied
        title="پیج اینستاگرام شما وصل نشده است"
        description="برای دسترسی به این صفحه ابتدا باید پیج اینستاگرام خود را به سیستم وصل کنید"
        status={status}
      />
    );
  }

  return (
    <div className="w-full min-h-[calc(100vh-12rem)] pb-8 px-48 pt-8">
      <PageHeader isEditMode={isEditMode} />

      <div className="bg-card border border-border rounded-xl sm:rounded-2xl shadow-sm overflow-hidden">
        <form
          onSubmit={handleSubmit(submitProduct)}
          className="p-4 sm:p-6 lg:p-8"
        >
          <div className="space-y-6 sm:space-y-8">
            <BasicInformationSection
              register={register}
              errors={errors}
              isEditMode={isEditMode}
              productId={id?.toString() || undefined}
              uniqueNameDisplay={uniqueNameDisplay}
              setUniqueNameDisplay={setUniqueNameDisplay}
              setValue={setValue}
            />

            <PricingSection
              primaryCostDisplay={primaryCostDisplay}
              finalCostDisplay={finalCostDisplay}
              stockDisplay={stockDisplay}
              setPrimaryCostDisplay={setPrimaryCostDisplay}
              setFinalCostDisplay={setFinalCostDisplay}
              setStockDisplay={setStockDisplay}
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

export { AddProductPageContent };
