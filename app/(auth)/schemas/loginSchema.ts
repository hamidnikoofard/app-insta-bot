import { z } from 'zod';
import { convertPersianToEnglish } from './registerSchema';

const iranianPhoneRegex = /^09\d{9}$/;

export const loginSchema = z.object({
  phone_number: z
  .string()
  .min(1, { message: 'شماره تلفن الزامی است' })
  .transform((val) => convertPersianToEnglish(val))
  .refine((val) => iranianPhoneRegex.test(val), {
    message:
      'شماره تلفن باید با 0 شروع شود و 11 رقم باشد (مثال: 09123456789)',
  }),
  password: z
    .string()
    .min(1, { message: 'رمز عبور باید حداقل 8 کاراکتر باشد' }),
});

export type LoginFormData = z.infer<typeof loginSchema>;
