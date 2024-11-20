import { getCities, getHeritageSites } from '@/lib/api';
import SiteClient from '@/components/SiteClient';

// Type guard to validate language parameter
function isValidLanguage(lang: string | undefined): lang is 'da' | 'en' | 'pt' {
  return lang === 'da' || lang === 'en' || lang === 'pt';
}

interface Props {
  params: {
    id: string;
  };
  searchParams: {
    lang?: string;
  };
}

export default async function SitePage({ params, searchParams }: Props) {
  try {
    const selectedLanguage = isValidLanguage(searchParams.lang) ? searchParams.lang : 'da';

    // Hent data fra Supabase
    console.log('Fetching data for site page...');
    const cities = await getCities();
    console.log('Found cities:', cities.map(c => c.id));
    const sites = await getHeritageSites(cities[0].id);
    console.log('Found sites:', sites.map(s => ({ id: s.id, sections: s.detailedInfo?.sections?.length })));
    const site = sites.find(s => s.id === params.id);
    console.log('Selected site:', site?.id, 'with sections:', site?.detailedInfo?.sections);

    if (!site) {
      return (
        <main>
          <div className="p-4">
            <h1 className="text-2xl font-bold text-red-600">Site not found</h1>
            <p className="mt-2">Kunne ikke finde den ønskede seværdighed.</p>
          </div>
        </main>
      );
    }

    return <SiteClient site={site} city={cities[0]} initialLanguage={selectedLanguage} />;
  } catch (error) {
    console.error('Error loading site:', error);
    return (
      <main>
        <div className="p-4">
          <h1 className="text-2xl font-bold text-red-600">Error</h1>
          <p className="mt-2">Der skete en fejl ved indlæsning af seværdigheden. Prøv at genindlæse siden.</p>
          <pre className="mt-4 p-4 bg-gray-100 rounded overflow-auto">
            {JSON.stringify(error, null, 2)}
          </pre>
        </div>
      </main>
    );
  }
}
