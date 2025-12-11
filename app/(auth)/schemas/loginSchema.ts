import { z } from 'zod';
import { convertPersianToEnglish } from './registerSchema';

const iranianPhoneRegex = /^(?:09\d{9}|\+989\d{9})$/;

export const loginSchema = z.object({
  phone_number: z
    .string()
    .min(1, { message: 'شماره تلفن الزامی است' })
    .transform((val) => convertPersianToEnglish(val))
    .refine((val) => iranianPhoneRegex.test(val), {
      message: 'شماره تلفن معتبر نیست',
    }),
  password: z
    .string()
    .min(1, { message: 'رمز عبور باید حداقل 8 کاراکتر باشد' }),
});

export type LoginFormData = z.infer<typeof loginSchema>;
