'use client';
import { Input, Label } from '@/components/ui';
import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { UseFormRegisterReturn, FieldError } from 'react-hook-form';

interface PasswordInputProps {
  id: string;
  label: string;
  placeholder: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
  ariaLabel?: string;
}

export function PasswordInput({
  id,
  label,
  placeholder,
  register,
  error,
  ariaLabel,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <Label
        htmlFor={id}
        className="block text-sm font-medium text-muted-foreground mb-1"
      >
        {label}
      </Label>
      <div className="relative">
        <Input
          type={showPassword ? 'text' : 'password'}
          id={id}
          placeholder={placeholder}
          className="w-full"
          aria-label={ariaLabel || label}
          {...register}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors duration-200 focus:outline-none"
          aria-label={showPassword ? `مخفی کردن ${label}` : `نمایش ${label}`}
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5" />
          ) : (
            <Eye className="h-5 w-5" />
          )}
        </button>
      </div>
      {error && (
        <p className="text-sm text-destructive mt-0.5">{error.message}</p>
      )}
    </div>
  );
}
