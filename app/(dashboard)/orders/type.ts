export type Orders = {
  created_at: string;
  id: number;
  status: number;
  items_primary_amount: number;
  items_final_amount: number;
  total_amount: number;
};
export type OrdersResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Orders[];
};
