import { z } from 'zod';

// الگوی شماره تلفن ایرانی: باید با 0 شروع شود و 11 رقم باشد (مثل 09372221602)
const iranianPhoneRegex = /^09\d{9}$/;

export const loginSchema = z.object({
  phone_number: z
    .string()
    .min(1, { message: 'شماره تلفن الزامی است' })
    .regex(iranianPhoneRegex, {
      message:
        'شماره تلفن باید با 0 شروع شود و 11 رقم باشد (مثال: 09372221602)',
    }),
  password: z
    .string()
    .min(8, { message: 'رمز عبور باید حداقل 8 کاراکتر باشد' }),
});

export type LoginFormData = z.infer<typeof loginSchema>;
