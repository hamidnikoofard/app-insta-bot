'use client';
import { Button } from '@/components/ui';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface GoogleAuthButtonProps {
  text: string;
}

export function GoogleAuthButton({ text }: GoogleAuthButtonProps) {
  return (
    <>
      <hr className="my-6" />
      <div className="flex flex-col items-center justify-center">
        <Button variant="outline" size="lg" className="w-full">
          <Image
            src="/google-icon-logo-svgrepo-com.svg"
            alt="google"
            width={20}
            height={20}
          />
          <span className="font-semibold">{text}</span>
        </Button>
        <Button variant="outline" className="w-full mt-2" size="lg">
          <Link href="/">باز گشت به صفحه اصلی</Link>
        </Button>
      </div>
    </>
  );
}
