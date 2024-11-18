import dynamic from 'next/dynamic';
import { mockSites } from '@/lib/mockData';
import SiteList from '@/components/SiteList';

// Dynamically import Map component to avoid SSR issues
const Map = dynamic(() => import('@/components/Map'), {
  ssr: false,
  loading: () => (
    <div className="h-[60vh] w-full rounded-lg bg-gray-100 animate-pulse" />
  ),
});

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-8">
      <h1 className="text-4xl font-bold mb-8">Historiske Steder i Tavira</h1>
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="w-full">
          <Map sites={mockSites} />
        </div>
        <div className="w-full">
          <SiteList sites={mockSites} />
        </div>
      </div>
    </main>
  );
}