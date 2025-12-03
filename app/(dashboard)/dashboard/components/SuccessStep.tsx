'use client';
import { ErrorDisplay, Loading } from '@/components/ui';
import useGetData from '@/hooks/useGetData';
import { ConnectedInstagramCard } from './index';

type OnlineShop = {
  id: number;
  instagram_username: string;
  status: number;
};

function SuccessStep() {
  const {
    data: onlineShopData,
    isLoading,
    error,
  } = useGetData<OnlineShop>({
    url: 'users/online-shop/',
    queryKey: ['online-shop'],
  });
  if (isLoading) {
    return <Loading isLoading={isLoading} message="در حال دریافت اطلاعات..." />;
  }
  if (error) {
    return <ErrorDisplay error={error} title="خطا در دریافت اطلاعات..." />;
  }

  return (
    <div className="flex h-full w-full items-start  bg-background px-6">
      <ConnectedInstagramCard
        instagramUsername={onlineShopData?.data?.instagram_username}
      />
    </div>
  );
}

export { SuccessStep };
