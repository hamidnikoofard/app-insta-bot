'use client';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  BottomNavigationBar,
  ContentHeader,
  SidebarNavigation,
} from './components';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-background">
      <div className="flex items-start min-h-screen">
        <div
          className={`flex flex-col w-full min-h-screen transition-all duration-300 ease-in-out ${
            isOpen ? 'mr-0 md:mr-76' : 'mr-0 md:mr-22'
          }`}
        >
          <ContentHeader isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} />
          <main className="flex-1 px-4 pb-6">
            <div className="rounded-xl p-6 shadow-sm min-h-[calc(100vh-12rem)]">
              {children}
            </div>
          </main>
        </div>

        <SidebarNavigation isOpen={isOpen} pathname={pathname} />
      </div>
      <BottomNavigationBar />
    </div>
  );
}
