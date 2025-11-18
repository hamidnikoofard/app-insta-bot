'use client';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import {
  BottomNavigationBar,
  ContentHeader,
  SidebarNavigation,
} from './components';

const SIDEBAR_STATE_KEY = 'sidebar-is-open';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // استفاده از lazy initialization برای خواندن از localStorage
  const [isOpen, setIsOpen] = useState(() => {
    if (typeof window === 'undefined') return true;
    const savedState = localStorage.getItem(SIDEBAR_STATE_KEY);
    if (savedState !== null) {
      try {
        return JSON.parse(savedState);
      } catch (error: unknown) {
        return true;
      }
    }
    return true;
  });
  const pathname = usePathname();

  useEffect(() => {
    localStorage.setItem(SIDEBAR_STATE_KEY, JSON.stringify(isOpen));
  }, [isOpen]);

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
