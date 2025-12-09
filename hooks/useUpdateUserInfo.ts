import { useQueryClient } from '@/app/QueryProvider';
import { API_BASE_URL } from '@/lib/fetch';
import { toast } from 'sonner';
import { useState } from 'react';

interface UseUpdateUserInfoOptions {
  onSuccess?: () => void;
  successMessage?: string;
  errorMessage?: string;
}

export function useUpdateUserInfo(options?: UseUpdateUserInfoOptions) {
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const updateUserInfo = async (data: Record<string, any>) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/users/info/`, {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(options?.errorMessage || 'Failed to update user info', {
          cause: response.statusText,
        });
      }

      toast.success(options?.successMessage || 'اطلاعات با موفقیت ویرایش شد');

      queryClient.invalidateQueries({ queryKey: ['user'] });

      if (options?.onSuccess) {
        options.onSuccess();
      }
    } catch (error: any) {
      toast.error(error.message || 'خطا در به‌روزرسانی اطلاعات');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    updateUserInfo,
    isLoading,
  };
}
