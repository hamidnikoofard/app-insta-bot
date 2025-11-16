'use client';
import { ReactNode, useState, createContext, useContext } from 'react';
import {
  QueryClient,
  QueryClientProvider,
  DehydratedState,
  HydrationBoundary,
} from '@tanstack/react-query';

interface QueryProviderProps {
  children: ReactNode;
  dehydratedState?: DehydratedState;
}

// Context برای دسترسی به QueryClient
const QueryClientContext = createContext<QueryClient | undefined>(undefined);

export const useQueryClient = () => {
  const context = useContext(QueryClientContext);
  if (context === undefined) {
    throw new Error('useQueryClient must be used within QueryProvider');
  }
  return context;
};

export default function QueryProvider({
  children,
  dehydratedState,
}: QueryProviderProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 1000 * 60 * 5,
            gcTime: 1000 * 60 * 10,
            refetchOnWindowFocus: false,
            refetchOnReconnect: true,
            retry: 2,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <QueryClientContext.Provider value={queryClient}>
        <HydrationBoundary state={dehydratedState}>
          {children}
        </HydrationBoundary>
      </QueryClientContext.Provider>
    </QueryClientProvider>
  );
}
