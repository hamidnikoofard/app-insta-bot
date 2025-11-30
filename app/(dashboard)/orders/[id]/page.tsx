'use client';
import useGetData from '@/hooks/useGetData';
import { Orders } from '../type';

function page() {
  const { data, isLoading, isError, error } = useGetData<Orders>({
    url: `bot/orders/${10}/`,
    queryKey: ['order', 10],
  });
  console.log(data);

  return <div>page</div>;
}

export default page;
