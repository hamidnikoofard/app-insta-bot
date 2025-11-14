import { navItems } from './navItems';
import { NavItemComponent } from './NavItem';

interface SidebarNavProps {
  pathname: string;
  isOpen: boolean;
}

export function SidebarNav({ pathname, isOpen }: SidebarNavProps) {
  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden py-4">
      <nav className="flex flex-col gap-1 px-2">
        {navItems.map((item) => (
          <NavItemComponent
            key={item.href}
            item={item}
            isActive={pathname === item.href}
            isOpen={isOpen}
          />
        ))}
      </nav>
    </div>
  );
}
