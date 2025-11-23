import { Instagram, Clock, ExternalLink, PartyPopper } from 'lucide-react';

export interface Step {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
}

export const steps: Step[] = [
  {
    id: 1,
    title: 'ثبت پیج اینستاگرام',
    description: 'نام کاربری پیج خود را وارد کنید',
    icon: Instagram,
  },
  {
    id: 2,
    title: 'در انتظار تأیید',
    description: 'تیم ما در حال بررسی پیج شماست',
    icon: Clock,
  },
  {
    id: 3,
    title: 'تأیید دسترسی',
    description: 'دسترسی Meta را تأیید کنید',
    icon: ExternalLink,
  },
  {
    id: 4,
    title: 'اتصال موفق',
    description: 'پیج شما با موفقیت ثبت شد',
    icon: PartyPopper,
  },
];

export interface StepNavigatorProps {
  currentStatus: number;
}
