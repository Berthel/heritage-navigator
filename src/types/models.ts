// Basis types
export interface LocalizedField {
  da: string;
  en: string;
  pt: string;
}

// Definerer forskellige visningskontekster for billeder
export type ImageContext = 'thumbnail' | 'gallery' | 'banner' | 'description';

export interface Image {
  id: string;
  url: string;
  alt: LocalizedField;
  caption?: LocalizedField;
  credit?: string;
  year?: number;
  periodId?: string;
  order: number;
  contexts: ImageContext[];  // Hvilke kontekster billedet kan bruges i
  dimensions: {
    width: number;
    height: number;
  };
  thumbnailUrl?: string;    // Optimeret version til thumbnails
  mediumUrl?: string;       // Mellemstørrelse til gallerier
  largeUrl?: string;        // Fuld størrelse til modaler/lightbox
}

// Tilføj reference til billeder i detaljeret info
export interface DetailSection {
  type: 'text' | 'image' | 'gallery';
  content: string | string[] | LocalizedField;  // Text (kan være oversat), eller image IDs
  imageLayout?: 'left' | 'right' | 'full';  // For enkeltbilleder
}

export interface Period {
  id: string;
  name: LocalizedField;
  description: LocalizedField;
  order: number;
  color: string;
  startYear?: number;  // Optional year (negative for BC)
  endYear?: number;    // Optional year (negative for BC)
}

export interface Location {
  latitude: number;
  longitude: number;
  address?: string;
  accessibility?: LocalizedField;
}

export interface TimeSlot {
  dayOfWeek: number; // 0-6, hvor 0 er søndag
  opens: string;     // Format: "HH:mm"
  closes: string;    // Format: "HH:mm"
}

export interface OpeningHours {
  type: 'regular' | 'seasonal' | 'special';
  validFrom?: string;  // ISO date string
  validTo?: string;    // ISO date string
  slots: TimeSlot[];
}

export interface Tag {
  id: string;
  name: LocalizedField;
  type?: string;
}

export interface City {
  id: string;
  name: LocalizedField;
  description: LocalizedField;
  country: string;
  region?: string;
  location: Location;
  bounds: {
    northeast: Location;
    southwest: Location;
  };
  defaultZoom: number;
  primaryImage: string;
  images: string[];           // Array of image IDs
  historicalPeriods: string[];  // Array of period IDs
  tags: string[];                  // Array of tag IDs
  status: 'active' | 'coming_soon' | 'inactive';
  lastUpdated: string;
}

export interface HeritageSite {
  id: string;
  cityId: string;           // Reference til byen
  name: LocalizedField;
  description: LocalizedField;
  thumbnailImage: string;    // ID på hovedbilledet til kort visning
  detailedInfo: {
    sections: DetailSection[];  // Struktureret indhold med tekst og billeder
    gallery?: string[];        // IDs på billeder til gallerivisning
  };
  location: Location;
  periods: string[];  // Array of period IDs
  primaryPeriod: string;
  images: string[];           // Array of image IDs
  openingHours: OpeningHours[];
  tags: string[];
  status: 'active' | 'temporary_closed' | 'permanently_closed';
  lastUpdated: string;
  distance?: number;  // Distance in meters from user's location
}

// Hjælpefunktioner

export function getLocalizedField(field: LocalizedField | undefined, language: string): string {
  if (!field) return '';
  return field[language as keyof LocalizedField] || '';
}

// Hjælpefunktioner til billeder
export function getImageForContext(images: Image[], imageId: string, context: ImageContext): string | undefined {
  const image = images.find(img => img.id === imageId);
  if (!image) return undefined;

  // Vælg den mest passende URL baseret på kontekst
  switch (context) {
    case 'thumbnail':
      return image.thumbnailUrl || image.url;
    case 'gallery':
      return image.mediumUrl || image.url;
    case 'banner':
    case 'description':
      return image.largeUrl || image.url;
    default:
      return image.url;
  }
}

export function getGalleryImages(site: HeritageSite, images: Image[]): Image[] {
  if (!site.detailedInfo?.gallery) return [];
  return site.detailedInfo.gallery
    .map(id => images.find(img => img.id === id))
    .filter((img): img is Image => img !== undefined);
}

export function isOpenNow(openingHours: OpeningHours[]): boolean {
  if (!openingHours || openingHours.length === 0) return false;

  const now = new Date();
  const currentDay = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentTime = `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`;

  // Find applicable opening hours (considering seasonal/special periods)
  const applicableHours = openingHours.find(hours => {
    if (hours.type === 'regular') return true;
    if (!hours.validFrom || !hours.validTo) return false;

    const from = new Date(hours.validFrom);
    const to = new Date(hours.validTo);
    return now >= from && now <= to;
  });

  if (!applicableHours) return false;

  // Find today's time slot
  const todaySlot = applicableHours.slots.find(slot => slot.dayOfWeek === currentDay);
  if (!todaySlot) return false;

  // Check if current time is within opening hours
  return currentTime >= todaySlot.opens && currentTime <= todaySlot.closes;
}
