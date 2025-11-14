'use client';
import { Input, Label } from '@/components/ui';
import React from 'react';
import { UseFormRegisterReturn, FieldError } from 'react-hook-form';

interface LastNameInputProps {
  id: string;
  label: string;
  placeholder: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
  ariaLabel?: string;
}

export function LastNameInput({
  id,
  label,
  placeholder,
  register,
  error,
  ariaLabel,
}: LastNameInputProps) {
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
        id={id}
        placeholder={placeholder}
        className="w-full"
        aria-label={ariaLabel || label}
        {...register}
      />
      {error && (
        <p className="text-sm text-destructive mt-0.5">{error.message}</p>
      )}
    </div>
  );
}
