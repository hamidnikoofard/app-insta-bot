'use client';

import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import {
  BottomNavigationBar,
  ContentHeader,
  SidebarNavigation,
} from './components';
import { AuthProvider } from '@/contexts/AuthProvider';

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
    // در موبایل، منو باید بسته باشد
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      setIsOpen(false);
    } else {
      // در دسکتاپ، از localStorage استفاده می‌کنیم
      const savedState = localStorage.getItem(SIDEBAR_STATE_KEY);
      if (savedState !== null) {
        try {
          setIsOpen(JSON.parse(savedState));
        } catch {
          setIsOpen(true);
        }
      }
    }
  }, []);

  // ذخیره‌سازیِ تغییرات
  useEffect(() => {
    if (mounted) {
      // فقط در دسکتاپ ذخیره می‌کنیم
      const isMobile = window.innerWidth < 768;
      if (!isMobile) {
        localStorage.setItem(SIDEBAR_STATE_KEY, JSON.stringify(isOpen));
      }
    }
  }, [isOpen, mounted]);

  // بستن منو هنگام تغییر اندازه صفحه از دسکتاپ به موبایل
  useEffect(() => {
    if (!mounted) return;

    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      if (isMobile && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mounted, isOpen]);

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
    <AuthProvider>
      <div className="min-h-screen bg-background">
        <div className="flex items-start min-h-screen">
          <div
            className={`flex flex-col w-full min-h-screen transition-all duration-300 ease-in-out ${
              isOpen ? 'mr-0 md:mr-[304px]' : 'mr-0 md:mr-[88px]'
            }`}
          >
            <ContentHeader
              isOpen={isOpen}
              onToggle={() => setIsOpen(!isOpen)}
            />
            <main className="flex-1 pb-20 md:pb-0">
              <div className="rounded-xl shadow-sm min-h-[calc(100vh-12rem)]">
                {children}
              </div>
            </main>
          </div>

          <SidebarNavigation
            isOpen={isOpen}
            pathname={pathname}
            onToggle={() => setIsOpen(!isOpen)}
          />
        </div>
        <BottomNavigationBar />
      </div>
    </AuthProvider>
  );
}
