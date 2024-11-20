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
  return field[language as keyof LocalizedField] || field.en || field.da || '';
}

// Hjælpefunktioner til billeder
export function getImageForContext(images: Image[], imageId: string, context: ImageContext): string {
  const image = images.find(img => img.id === imageId);
  if (!image || !image.contexts.includes(context)) {
    return ''; // eller default image url
  }
  
  switch(context) {
    case 'thumbnail':
      return image.thumbnailUrl || image.url;
    case 'gallery':
      return image.mediumUrl || image.url;
    case 'banner':
    case 'description':
      return image.largeUrl || image.url;
  }
}

export function getGalleryImages(site: HeritageSite): Image[] {
  return site.detailedInfo.gallery
    ? site.detailedInfo.gallery
        .map(id => site.images.find(img => img.id === id))
        .filter((img): img is Image => img !== undefined)
    : [];
}

export function isOpenNow(openingHours: OpeningHours[]): boolean {
  const now = new Date();
  const currentDay = now.getDay();
  const currentTime = now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });

  // Find gældende åbningstider
  const applicableHours = openingHours.find(hours => {
    if (hours.type === 'regular') return true;
    if (!hours.validFrom || !hours.validTo) return false;

    const fromDate = new Date(hours.validFrom);
    const toDate = new Date(hours.validTo);
    return now >= fromDate && now <= toDate;
  });

  if (!applicableHours) return false;

  // Check om stedet er åbent i det aktuelle tidsrum
  return applicableHours.slots.some(slot => {
    return slot.dayOfWeek === currentDay &&
           currentTime >= slot.opens &&
           currentTime <= slot.closes;
  });
}
