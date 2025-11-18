'use client';
import { AlertCircle, RefreshCw, ArrowRight } from 'lucide-react';
import { Button } from './button';

interface ErrorDisplayProps {
  error: Error | { message: string };
  title?: string;
  onRetry?: () => void;
  onGoBack?: () => void;
  className?: string;
}

export function ErrorDisplay({
  error,
  title = 'خطا در دریافت اطلاعات',
  onRetry,
  onGoBack,
  className = '',
}: ErrorDisplayProps) {
  const errorMessage = error instanceof Error ? error.message : error.message;

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-[calc(100vh-12rem)] p-6 ${className}`}
    >
      <div className="bg-card border border-destructive/20 rounded-xl p-8 max-w-md w-full text-center space-y-6 shadow-lg">
        {/* آیکون خطا */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-destructive/20 rounded-full blur-xl"></div>
            <div className="relative bg-destructive/10 p-4 rounded-full">
              <AlertCircle className="h-12 w-12 text-destructive" />
            </div>
          </div>
        </div>

        {/* عنوان و پیام */}
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-foreground">{title}</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {errorMessage ||
              'متأسفانه خطایی رخ داده است. لطفاً دوباره تلاش کنید.'}
          </p>
        </div>

        {/* دکمه‌های عملیات */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {onRetry && (
            <Button
              onClick={onRetry}
              variant="default"
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              تلاش مجدد
            </Button>
          )}
          {onGoBack && (
            <Button
              onClick={onGoBack}
              variant="outline"
              className="flex items-center gap-2"
            >
              <ArrowRight className="h-4 w-4 ml-2 rotate-180" />
              بازگشت
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
