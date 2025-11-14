'use client';
import { Input, Label } from '@/components/ui';
import { UseFormRegisterReturn, FieldError } from 'react-hook-form';
import { useEffect, useRef } from 'react';

interface PhoneNumberInputProps {
  id?: string;
  label?: string;
  placeholder?: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
  ariaLabel?: string;
}

export function PhoneNumberInput({
  id = 'phoneNumber',
  label = 'شماره تلفن',
  placeholder = '09123456789',
  register,
  error,
  ariaLabel = 'شماره تلفن خود را وارد کنید',
}: PhoneNumberInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { ref, onChange, onBlur, name } = register;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;

    // فقط اعداد را بپذیر
    const numericValue = inputValue.replace(/\D/g, '');

    // اگر خالی است یا با صفر شروع می‌شود
    if (numericValue === '' || numericValue.startsWith('0')) {
      // حداکثر 11 رقم
      if (numericValue.length <= 11) {
        // مقدار را به register هم بده
        const event = {
          ...e,
          target: { ...e.target, value: numericValue },
        };
        onChange(event);
      }
    }
  };

  // ترکیب ref ها
  useEffect(() => {
    if (typeof ref === 'function') {
      ref(inputRef.current);
    } else if (ref) {
      (ref as React.MutableRefObject<HTMLInputElement | null>).current =
        inputRef.current;
    }
  }, [ref]);

  return (
    <div>
      <Label
        htmlFor={id}
        className="block text-sm font-medium text-muted-foreground mb-1"
      >
        {label}
      </Label>
      <Input
        type="text"
        inputMode="numeric"
        id={id}
        placeholder={placeholder}
        className="w-full"
        aria-label={ariaLabel}
        onChange={handleInputChange}
        onBlur={onBlur}
        name={name}
        ref={inputRef}
      />
      {error && (
        <p className="text-sm text-destructive mt-0.5">{error.message}</p>
      )}
    </div>
  );
}
