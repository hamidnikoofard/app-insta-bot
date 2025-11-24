import {
  LayoutDashboard,
  Box,
  MessageCircle,
  MessageSquare,
  User,
  ShoppingCart,
  Plus,
  List,
} from 'lucide-react';
import { LucideIcon } from 'lucide-react';

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  children?: NavItem[];
}

export const navItems: NavItem[] = [
  { label: 'داشبورد', href: '/dashboard', icon: LayoutDashboard },
  {
    label: ' محصولات',
    href: '/products',
    icon: Box,
    children: [
      { label: 'لیست محصولات', href: '/products', icon: List },
      { label: 'افزودن محصول', href: '/products/add', icon: Plus },
    ],
  },
  { label: 'سفارشات', href: '/orders', icon: ShoppingCart },
  { label: ' تنظیمات پیام', href: '/settings-message', icon: MessageCircle },
  { label: 'پیام ها', href: '/messages', icon: MessageSquare },
  { label: 'پروفایل', href: '/profile', icon: User },
];
