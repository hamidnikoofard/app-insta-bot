'use client';
import Link from 'next/link';
import React from 'react';

interface AuthLinkProps {
  href: string;
  text: string;
}

export function AuthLink({ href, text }: AuthLinkProps) {
  return (
    <div className="text-center">
      <Link
        href={href}
        className="text-sm md:text-muted-foreground hover:text-primary transition-colors duration-200 underline-offset-4 hover:underline inline-block underline text-primary"
      >
        {text}
      </Link>
    </div>
  );
}
