import dynamic from 'next/dynamic';
import { HeritageSite } from '@/types/models';

// Dynamically import Map component to avoid SSR issues
const Map = dynamic(() => import('@/components/Map'), {
  ssr: false,
  loading: () => (
    <div className="h-[60vh] w-full rounded-lg bg-gray-100 animate-pulse" />
  ),
});

// Eksempel på seværdigheder (dette skal senere komme fra Supabase)
const mockSites: HeritageSite[] = [
  {
    id: '1',
    name: {
      da: 'Tavira Slot',
      en: 'Tavira Castle',
      pt: 'Castelo de Tavira'
    },
    description: {
      da: 'Historisk slot fra det 8. århundrede',
      en: 'Historic castle from the 8th century',
      pt: 'Castelo histórico do século VIII'
    },
    detailedInfo: {
      da: undefined,
      en: undefined,
      pt: undefined
    },
    period: {
      id: '1',
      name: 'Medieval',
      color: '#724B34'
    },
    location: {
      latitude: 37.1275,
      longitude: -7.6506,
      address: 'Calçada D. Paio Peres Correia, Tavira'
    },
    openingHours: {
      monday: '09:00-17:00',
      tuesday: '09:00-17:00',
      wednesday: '09:00-17:00',
      thursday: '09:00-17:00',
      friday: '09:00-17:00',
      saturday: '09:00-17:00',
      sunday: '09:00-17:00'
    },
    images: []
  }
];

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Heritage Navigator - Tavira</h1>
      <div className="rounded-lg overflow-hidden shadow-lg">
        <Map sites={mockSites} />
      </div>
    </div>
  );
}
