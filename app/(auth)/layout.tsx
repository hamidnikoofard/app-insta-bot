import { Container } from '@/components/ui';
import React from 'react';
import { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'ورود به سایت',
  description: 'لطفا برای ورود به سایت اطلاعات خود را وارد کنید',
};

function AuthLayout({ children }: { children: React.ReactNode}) {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex flex-col items-center justify-center h-screen px-4">
        {children}
      </main>
      <footer className="mt-8 mx-auto">
        <Container size="lg">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Insta Bot. All rights reserved.
          </p>
        </Container>
      </footer>
    </div>
  );
}

export default AuthLayout;
