'use client';
import { ConnectedInstagramCard } from './index';
import { useAuth } from '@/contexts';

function SuccessStep() {
  const { online_shop_instagram_username } = useAuth();

  return (
    <div className="flex h-full w-full items-start  bg-background px-6">
      <ConnectedInstagramCard
        instagramUsername={online_shop_instagram_username}
      />
    </div>
  );
}

export { SuccessStep };
