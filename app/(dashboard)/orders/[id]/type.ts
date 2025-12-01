export type Item = {
  id: number;
  product: Product;
  quantity: number;
  final_price: number;
  primary_price: number;
};

export type Product = {
  id: number;
  name: string;
  primary_cost: number;
  final_cost: number;
};
export type payment = {
  id: number;
  amount: number;
  card_number: string;
  receipt_image_url: string;
  status: number;
};

export type customer_address = {
  id: number;
  address: string;
  city: string;
  phone_number: string;
  postal_code: string;
  province: string;
};
export type Order = {
  created_at: string;
  id: number;
  items_final_amount: number;
  items_primary_amount: number;
  total_amount: number;
  shipping_amount: number;
  status: number;
  items: Item[];
  payment: payment;
  customer_address: customer_address;
};
