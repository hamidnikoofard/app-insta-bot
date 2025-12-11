'use client';
import { Button } from '@/components/ui';
import { useGetData } from '@/hooks';
import { API_BASE_URL } from '@/lib/fetch';
import { Loader2, MapPin, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface AddressInfoCardHeaderProps {
  orderId: number;
}

interface CustomerUsernameResponse {
  customer_username: string;
}
export function AddressInfoCardHeader({ orderId }: AddressInfoCardHeaderProps) {
  const [isLoading, setIsLoading] = useState(false);
  const handleDirectCustomer = async () => {
    setIsLoading(true);
    const response = await fetch(
      `${API_BASE_URL}/bot/customer-username/${orderId}/`,
      {
        credentials: 'include',
      }
    );
    if (!response.ok) {
      toast.error('خطا در دریافت نام کاربری مشتری');
      return;
    }
    const data: CustomerUsernameResponse = await response.json();

    const directUrl = `https://ig.me/m/${data.customer_username}`;
    const profileUrl = `https://instagram.com/${data.customer_username}`;

    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (isMobile) {
      window.open(directUrl, '_blank');
    } else {
      window.open(profileUrl, '_blank');
    }
    setIsLoading(false);
  };

  return (
    <div className="relative p-4 sm:p-6 border-b border-border bg-muted/20 flex items-center justify-between">
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-primary/10 text-primary shrink-0">
          <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
        </div>
        <h2 className="text-base sm:text-xl font-bold text-foreground">
          آدرس تحویل گیرنده
        </h2>
      </div>
      <Button
        variant="outline"
        onClick={handleDirectCustomer}
        disabled={isLoading}
        className="text-sm sm:text-base flex items-center justify-center"
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <MessageCircle className="w-4 h-4" />
        )}{' '}
        دایرکت مشتری
      </Button>
    </div>
  );
}
