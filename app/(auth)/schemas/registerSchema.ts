import { z } from 'zod';

const iranianPhoneRegex = /^09\d{9}$/;


export const convertPersianToEnglish = (str: string): string => {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  const englishDigits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

  return str
    .split('')
    .map((char) => {
      const index = persianDigits.indexOf(char);
      return index !== -1 ? englishDigits[index] : char;
    })
    .join('');
};

export const registerSchema = z
  .object({
    first_name: z.string().min(2, { message: 'نام باید حداقل 2 کاراکتر باشد' }),
    last_name: z
      .string()
      .min(2, { message: 'نام خانوادگی باید حداقل 2 کاراکتر باشد' }),
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
    confirmPassword: z.string(),
    // .regex(/[A-Z]/, {
    //   message: 'رمز عبور باید حداقل یک حرف بزرگ داشته باشد',
    // })
    // .regex(/[a-z]/, {
    //   message: 'رمز عبور باید حداقل یک حرف کوچک داشته باشد',
    // })
    // .regex(/[0-9]/, { message: 'رمز عبور باید حداقل یک عدد داشته باشد' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'رمز عبور و تایید رمز عبور مطابقت ندارند',
    path: ['confirmPassword'],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;
