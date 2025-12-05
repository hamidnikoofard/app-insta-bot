import { z } from 'zod';

const productSchema = z.object({
  name: z.string().min(1, { message: 'نام محصول الزامی است' }),
  description: z.string().min(1, { message: 'توضیحات الزامی است' }),
  primary_cost: z.string().min(1, { message: 'قیمت اولیه الزامی است' }),
  final_cost: z.string().optional(),
  //   images: z.array(z.string()).min(1, { message: 'تصاویر الزامی است' }),
  setProductId: z.string().optional(),
  stock: z.string().min(1, { message: 'موجودی الزامی است' }),
  unique_name: z.string().optional(),
  existing_images: z.array(z.number()).optional(),
  new_images: z.array(z.instanceof(File)).optional(),
});

export default productSchema;
