import {
  CheckCircle2,
  Clock,
  XCircle,
  HelpCircle,
  LucideIcon,
} from 'lucide-react';
import { VariantProps } from 'class-variance-authority';
import { badgeVariants } from '@/components/ui/badge';

export type PaymentStatusInfo = {
  text: string;
  variant: VariantProps<typeof badgeVariants>['variant'];
  icon: LucideIcon;
};

export const getPaymentStatus = (status: number): PaymentStatusInfo => {
  switch (status) {
    case 1:
      return {
        text: 'موفق',
        variant: 'default',
        icon: CheckCircle2,
      };
    case 2:
      return {
        text: 'در انتظار بررسی',
        variant: 'secondary',
        icon: Clock,
      };
    case 3:
      return {
        text: 'تایید شده',
        variant: 'default',
        icon: CheckCircle2,
      };
    case 4:
      return {
        text: 'رد شده',
        variant: 'destructive',
        icon: XCircle,
      };
    default:
      return {
        text: 'نامشخص',
        variant: 'outline',
        icon: HelpCircle,
      };
  }
};

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('fa-IR').format(price);
};

export const formatCardNumber = (cardNumber: string): string => {
  return cardNumber.replace(/(.{4})/g, '$1 ').trim();
};
