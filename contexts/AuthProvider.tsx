'use client';
import { createContext, useContext } from 'react';
import useGetData from '@/hooks/useGetData';
import { ErrorDisplay, Loading } from '@/components/ui';

type onlineShopUser = {
  id: number;
  instagram_username: string;
  status: number;
};

interface AuthContextType {
  id: number;
  first_name: string;
  last_name: string;
  online_shop: onlineShopUser;
  phone_number: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data, isLoading, error, isSuccess } = useGetData<AuthContextType>({
    url: 'users/info/',
    queryKey: ['user'],
  });

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
