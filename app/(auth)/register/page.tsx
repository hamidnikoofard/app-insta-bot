'use client';
import { Button } from '@/components/ui';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import {
  AuthHeader,
  PhoneNumberInput,
  PasswordInput,
  GoogleAuthButton,
  AuthLink,
  FirstNameInput,
  LastNameInput,
} from '../components';
import {
  registerSchema,
  type RegisterFormData,
} from '../schemas/registerSchema';
import { signupAction } from '../action';

function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });
  const router = useRouter();

  const onSubmit = async (data: RegisterFormData) => {
    const result = await signupAction(data);
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
        title="ثبت نام در سایت"
        description="لطفا برای ثبت نام در سایت اطلاعات خود را وارد کنید"
      />

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-3">
          <div className="flex items-center gap-4 w-full">
            <div className="w-1/2">
              <FirstNameInput
                id="firstName"
                label="نام"
                placeholder="نام"
                register={register('first_name')}
                error={errors.first_name}
              />
            </div>
            <div className="w-1/2">
              <LastNameInput
                id="lastName"
                label="نام خانوادگی"
                placeholder="نام خانوادگی"
                register={register('last_name')}
                error={errors.last_name}
              />
            </div>
          </div>
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
          <PasswordInput
            id="confirmPassword"
            label="تایید رمز عبور"
            placeholder="تایید رمز عبور"
            register={register('confirmPassword')}
            error={errors.confirmPassword}
            ariaLabel="تایید رمز عبور"
          />
        </div>

        <div className="space-y-3 mt-8">
          <Button type="submit" className="w-full" size="lg">
            ثبت نام
          </Button>
          <AuthLink
            href="/"
            text="قبلا ثبت نام کرده‌اید؟ ورود به حساب کاربری"
          />
        </div>
      </form>

      <GoogleAuthButton text="ثبت نام با Google" />
    </div>
  );
}

export default RegisterPage;
