'use client';
import { Button } from '@/components/ui';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import {
  AuthHeader,
  PhoneNumberInput,
  PasswordInput,
  GoogleAuthButton,
  AuthLink,
} from '@/app/(auth)/components';
import {
  loginSchema,
  type LoginFormData,
} from '@/app/(auth)/schemas/loginSchema';
import { loginAction } from './action';
import { useRouter } from 'next/navigation';

function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });
  const router = useRouter();

  const onSubmit = async (data: LoginFormData) => {
    const result = await loginAction(data);
    if (result.success) {
      reset();
      toast.success(result.message);
      router.push('/dashboard');
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto px-6 py-8 bg-card rounded-lg shadow-lg border border-border/40">
      <AuthHeader
        title="ورود به سایت"
        description="لطفا برای ورود به سایت اطلاعات خود را وارد کنید"
      />

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-3">
          <PhoneNumberInput
            register={register('phone_number')}
            error={errors.phone_number}
          />
          <PasswordInput
            id="password"
            label="رمز عبور"
            placeholder="رمز عبور"
            register={register('password')}
            error={errors.password}
          />
        </div>

        <div className="space-y-3 mt-8">
          <Button type="submit" className="w-full" size="lg">
            ورود
          </Button>
          <AuthLink href="/register" text="حساب کاربری ندارید؟ ثبت نام کنید" />
        </div>
      </form>

      <GoogleAuthButton text="ورود با Google" />
    </div>
  );
}

export default Page;
