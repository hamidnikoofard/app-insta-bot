import { useQuery } from '@tanstack/react-query';
import { API_BASE_URL } from '@/lib/fetch';

interface UseGetDataOptions {
  url: string;
  queryKey?: (string | number)[];
}

function useGetData<T>({ url, queryKey }: UseGetDataOptions) {
  if (!API_BASE_URL) throw new Error('Base URL تعریف نشده است');
  return useQuery<{ success: boolean; message: string; data: T }>({
    queryKey: queryKey ?? [url],
    queryFn: async () => {
      const response = await fetch(`${API_BASE_URL}/${url}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to get data', { cause: response.statusText });
      }
      const data = await response.json();
      return {
        success: true,
        message: 'Data fetched successfully',
        data: data,
      };
    },
  });
}

export default useGetData;
