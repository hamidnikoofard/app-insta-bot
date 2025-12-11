'use client';
import { createContext, useContext } from 'react';
import useGetData from '@/hooks/useGetData';
import { ErrorDisplay, Loading } from '@/components/ui';

interface AuthContextType {
  id: number;
  first_name: string;
  last_name: string;
  phone_number: string;
  online_shop_auto_reply_enabled: boolean;
  online_shop_card_number: string;
  online_shop_instagram_username: string;
  online_shop_shop_name: string;
  online_shop_status: number;
  online_shop_is_added_to_meta: boolean;
  online_shop_is_tester_accepted: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data, isLoading, error, isSuccess } = useGetData<AuthContextType>({
    url: 'users/info/',
    queryKey: ['user'],
  });
  console.log(data);
  if (isLoading)
    return (
      <Loading isLoading={isLoading} message="در حال دریافت اطلاعات کاربر..." />
    );
  if (error)
    return (
      <ErrorDisplay
        error={error}
        title="خطا در دریافت اطلاعات کاربر..."
        onRetry={() => window.location.reload()}
      />
    );
  if (isSuccess)
    return (
      <AuthContext.Provider value={{ ...(data?.data as AuthContextType) }}>
        {children}
      </AuthContext.Provider>
    );
  return (
    <AuthContext.Provider value={undefined}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
