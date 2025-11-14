import Image from 'next/image';
import React from 'react';

interface AuthHeaderProps {
  title: string;
  description: string;
}

export function AuthHeader({ title, description }: AuthHeaderProps) {
  return (
    <div className="flex flex-col items-center justify-center space-y-2 mb-6">
      <div className="mb-1">
        <Image
          src="/Logo.png"
          alt="logo"
          width={64}
          height={64}
          className="object-contain"
          priority
        />
      </div>
      <div className="space-y-0.5 text-center">
        <h1 className="text-xl font-bold text-foreground leading-tight">
          {title}
        </h1>
        <p className="text-sm text-muted-foreground leading-normal max-w-sm mx-auto">
          {description}
        </p>
      </div>
    </div>
  );
}
