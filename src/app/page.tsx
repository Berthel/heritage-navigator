import { mockSites } from '@/lib/mockData';
import MobileLayout from '@/components/MobileLayout';

export default function Home() {
  return <MobileLayout sites={mockSites} />;
}