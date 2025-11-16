import {
  LayoutDashboard,
  Box,
  MessageCircle,
  MessageSquare,
  User,
} from 'lucide-react';
import { LucideIcon } from 'lucide-react';

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const navItems: NavItem[] = [
  { label: 'داشبورد', href: '/dashboard', icon: LayoutDashboard },
  { label: ' محصولات', href: '/products', icon: Box },
  { label: ' تنظیمات پیام', href: '/settings-message', icon: MessageCircle },
  { label: 'پیام ها', href: '/messages', icon: MessageSquare },
  { label: 'پروفایل', href: '/profile', icon: User },
];
