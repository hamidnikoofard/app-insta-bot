'use client';
import { navItems } from './navItems';
import { NavItemComponent } from './NavItem';

interface SidebarNavProps {
  pathname: string;
  isOpen: boolean;
  onItemClick?: () => void;
}

export function SidebarNav({ pathname, isOpen, onItemClick }: SidebarNavProps) {
  const isItemActive = (itemHref: string) => {
    // اگر pathname دقیقاً برابر item.href باشد
    if (pathname === itemHref) return true;
    // اگر pathname با item.href شروع شود (برای nested routes)
    if (pathname.startsWith(itemHref + '/')) return true;
    return false;
  };

  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden py-4">
      <nav className="flex flex-col gap-1 px-2">
        {navItems.map((item) => (
          <NavItemComponent
            key={item.href}
            item={item}
            isActive={isItemActive(item.href)}
            isOpen={isOpen}
            onItemClick={onItemClick}
          />
        ))}
      </nav>
    </div>
  );
}
