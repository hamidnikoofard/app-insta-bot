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
  // ابتدا یک مقدار ثابت و قابل پیش‌بینی برای SSR
  const [isOpen, setIsOpen] = useState(true);

  // فقط بعد از mount مقدار localStorage اعمال می‌شود
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedState = localStorage.getItem(SIDEBAR_STATE_KEY);
    if (savedState !== null) {
      try {
        setIsOpen(JSON.parse(savedState));
      } catch {
        setIsOpen(true);
      }
    }
  }, []);

  // ذخیره‌سازیِ تغییرات
  useEffect(() => {
    if (mounted) {
      localStorage.setItem(SIDEBAR_STATE_KEY, JSON.stringify(isOpen));
    }
  }, [isOpen, mounted]);

  const pathname = usePathname();

  // جلوگیری از hydration mismatch
  if (!mounted) {
    return (
      <div className="min-h-screen bg-background">
        {/* یک اسکلت خیلی سبک می‌تونی بذاری یا خالی بذار */}
      </div>
    );
  }

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
