import { HeritageSite, getLocalizedField } from '@/types/models';

interface SiteListProps {
  sites: HeritageSite[];
  selectedLanguage?: 'da' | 'en' | 'pt';
}

export default function SiteList({ sites, selectedLanguage = 'da' }: SiteListProps) {
  return (
    <div className="w-full max-w-2xl">
      <div className="grid gap-6">
        {sites.map((site) => (
          <article 
            key={site.id} 
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="p-6">
              <div 
                className="w-3 h-3 rounded-full mb-2" 
                style={{ backgroundColor: site.period.color }} 
                title={site.period.name}
              />
              <h2 className="text-xl font-bold mb-2">
                {getLocalizedField(site.name, selectedLanguage)}
              </h2>
              <p className="text-gray-600 mb-4">
                {getLocalizedField(site.description, selectedLanguage)}
              </p>
              <div className="text-sm text-gray-500">
                <p>{site.location.address}</p>
                <p className="mt-2">
                  <span className="font-medium">Åbningstid i dag: </span>
                  {site.openingHours[getCurrentDay()] || 'Lukket'}
                </p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function getCurrentDay(): keyof HeritageSite['openingHours'] {
  const days: Record<number, keyof HeritageSite['openingHours']> = {
    0: 'sunday',
    1: 'monday',
    2: 'tuesday',
    3: 'wednesday',
    4: 'thursday',
    5: 'friday',
    6: 'saturday'
  };
  return days[new Date().getDay()];
}
