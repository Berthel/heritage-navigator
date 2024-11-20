import { getCities, getHeritageSites } from '@/lib/api';
import HomeClient from '@/components/HomeClient';

export default async function Home() {
  try {
    // Hent data fra Supabase
    const cities = await getCities();
    const sites = await getHeritageSites(cities[0].id); // Vi bruger den første by som standard

    return <HomeClient sites={sites} city={cities[0]} />;
  } catch (error) {
    console.error('Error loading data:', error);
    return (
      <main>
        <div className="p-4">
          <h1 className="text-2xl font-bold text-red-600">Error</h1>
          <p className="mt-2">Der skete en fejl ved indlæsning af data. Prøv at genindlæse siden.</p>
          <pre className="mt-4 p-4 bg-gray-100 rounded overflow-auto">
            {JSON.stringify(error, null, 2)}
          </pre>
        </div>
      </main>
    );
  }
}