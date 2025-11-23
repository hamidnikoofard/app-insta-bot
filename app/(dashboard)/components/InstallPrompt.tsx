'use client';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { X, Download, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const STORAGE_KEY = 'install-prompt-dismissed';
const COOLDOWN_HOURS = 0;

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const pathname = usePathname();

  // بررسی اینکه آیا کاربر در صفحه dashboard است
  const isDashboard = pathname === '/dashboard';

  useEffect(() => {
    // فقط در صفحه dashboard بررسی کن
    if (!isDashboard) {
      setShowPrompt(false);
      return;
    }

    // بررسی اینکه آیا قبلاً نصب شده
    if (window.matchMedia('(display-mode: standalone)').matches) {
      return;
    }

    // بررسی cooldown 24 ساعته
    const checkCooldown = () => {
      try {
        const dismissedData = localStorage.getItem(STORAGE_KEY);
        if (dismissedData) {
          const { timestamp } = JSON.parse(dismissedData);
          const now = Date.now();
          const hoursPassed = (now - timestamp) / (1000 * 60 * 60);

          if (hoursPassed < COOLDOWN_HOURS) {
            return false; // هنوز در cooldown است
          }
        }
        return true; // می‌تواند نمایش داده شود
      } catch {
        return true;
      }
    };

    if (!checkCooldown()) {
      return;
    }

    const handler = (e: Event) => {
      e.preventDefault();
      const installEvent = e as BeforeInstallPromptEvent;
      setDeferredPrompt(installEvent);
      setShowPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handler);

    // بررسی اگر قبلاً نصب شده باشد
    const checkInstalled = () => {
      if (window.matchMedia('(display-mode: standalone)').matches) {
        setShowPrompt(false);
      }
    };

    checkInstalled();
    window.addEventListener('appinstalled', () => {
      setShowPrompt(false);
      setDeferredPrompt(null);
      // پاک کردن localStorage بعد از نصب موفق
      localStorage.removeItem(STORAGE_KEY);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
      window.removeEventListener('appinstalled', checkInstalled);
    };
  }, [isDashboard]);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    setIsInstalling(true);

    try {
      await deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;

      if (outcome === 'accepted') {
        // کاربر نصب را قبول کرد
        setShowPrompt(false);
        setDeferredPrompt(null);
        localStorage.removeItem(STORAGE_KEY);
      } else {
        // کاربر نصب را رد کرد
        handleDismiss();
      }
    } catch (error) {
      console.error('خطا در نصب:', error);
      handleDismiss();
    } finally {
      setIsInstalling(false);
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    // ذخیره زمان dismiss برای cooldown 24 ساعته
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        timestamp: Date.now(),
      })
    );
  };

  const handleTransitionEnd = (e: React.TransitionEvent) => {
    // فقط transition مربوط به opacity را بررسی کن
    if (e.propertyName === 'opacity' && !isVisible) {
      setShowPrompt(false);
    }
  };

  // فعال کردن انیمیشن fade-in بعد از render
  useEffect(() => {
    if (showPrompt) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [showPrompt]);

  // اگر در dashboard نیست یا prompt نمایش داده نمی‌شود، چیزی render نکن
  if (!isDashboard || !showPrompt) {
    return null;
  }

  return (
    <div
      className={cn(
        'fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4 transition-all duration-300 ease-out md:hidden ',
        isVisible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 translate-y-4 pointer-events-none'
      )}
      onTransitionEnd={handleTransitionEnd}
    >
      <div className="relative bg-card border border-border rounded-2xl shadow-2xl overflow-hidden backdrop-blur-sm">
        {/* Gradient Background Effect */}
        <div className="absolute inset-0 bg-primary/5 dark:bg-primary/10 pointer-events-none" />

        {/* Content */}
        <div className="relative p-6">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex items-center gap-3 flex-1">
              <div className="flex items-center justify-center size-12 rounded-xl bg-primary/10 dark:bg-primary/20">
                <Download className="size-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground mb-1">
                  نصب اپلیکیشن
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  برای دسترسی سریع‌تر و تجربه بهتر، اپلیکیشن را نصب کنید
                </p>
              </div>
            </div>
            <button
              onClick={handleDismiss}
              className="shrink-0 size-8 rounded-lg hover:bg-muted transition-colors flex items-center justify-center text-muted-foreground hover:text-foreground"
              aria-label="بستن"
            >
              <X className="size-4" />
            </button>
          </div>

          {/* Benefits */}
          <div className="flex items-center gap-2 mb-6 text-xs text-muted-foreground">
            <Sparkles className="size-3.5 text-primary" />
            <span>دسترسی سریع‌تر • بدون نیاز به مرورگر • تجربه بهتر</span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button
              onClick={handleInstall}
              disabled={isInstalling}
              className="flex-1 h-11 font-medium shadow-lg hover:shadow-xl transition-all"
              size="lg"
            >
              {isInstalling ? (
                <>
                  <span className="inline-block size-4 border-2 border-current border-t-transparent rounded-full animate-spin ml-2" />
                  در حال نصب...
                </>
              ) : (
                <>
                  <Download className="size-4 ml-2" />
                  نصب اپلیکیشن
                </>
              )}
            </Button>
            <Button
              onClick={handleDismiss}
              variant="ghost"
              className="h-11 px-4 text-muted-foreground hover:text-foreground"
              disabled={isInstalling}
            >
              بعداً
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
