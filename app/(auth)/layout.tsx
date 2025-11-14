import { Container } from '@/components/ui';
import React from 'react';

function AuthLayout({ children }: { children: React.ReactNode }) {
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
