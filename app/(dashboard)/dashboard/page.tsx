import { Metadata } from 'next';
import { DashboardContent } from './components/DashboardContent';

export const metadata: Metadata = {
  title: 'داشبورد - Insta Bot',
  description: 'داشبورد - Insta Bot',
};

export default function Page() {
  return <DashboardContent />;
}
