import {
  LayoutDashboard,
  User,
  Settings,
  BarChart3,
  FolderOpen,
} from 'lucide-react';
import { LucideIcon } from 'lucide-react';

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const navItems: NavItem[] = [
  { label: 'داشبورد', href: '/dashboard', icon: LayoutDashboard },
  { label: 'پروفایل', href: '/profile', icon: User },
  { label: 'پروژه‌ها', href: '/projects', icon: FolderOpen },
  { label: 'آمار و گزارش', href: '/analytics', icon: BarChart3 },
  { label: 'تنظیمات', href: '/settings', icon: Settings },
];
