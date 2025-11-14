import {
  SidebarHeader,
  SidebarNav,
  SidebarFooter,
} from '@/app/(dashboard)/components';

interface SidebarNavigationProps {
  isOpen: boolean;
  pathname: string;
}

export function SidebarNavigation({
  isOpen,
  pathname,
}: SidebarNavigationProps) {
  return (
    <aside
      className={`hidden md:flex fixed right-0 top-0 h-screen bg-card border-l border-border/50 shadow-xl transition-all duration-300  ease-in-out z-30 flex-col ${
        isOpen ? 'w-70' : 'w-18'
      }`}
    >
      <SidebarHeader isOpen={isOpen} />
      <SidebarNav pathname={pathname} isOpen={isOpen} />
      <SidebarFooter isOpen={isOpen} />
    </aside>
  );
}
