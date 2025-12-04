type ProductImage = {
  image_url: string;
};

export type Product = {
  id: number;
  name: string;
  primary_cost: number;
  final_cost?: number | null;
  images?: ProductImage[] | null;
  description: string;
  unique_name: string;
  stock: number;
  main_image_url: string | null;
};

export type ProductsResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Product[];
};
