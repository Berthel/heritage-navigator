// Basis types
// Language types
export type SupportedLanguage = 'da' | 'en' | 'pt';

// Bevar den eksisterende LocalizedField (for backward compatibility)
export interface LocalizedField {
  da: string;
  en: string;
  pt: string;
}

// Ny type for fremtidig brug
export type NextLocalizedField<T = string> = {
  [key in SupportedLanguage]: T;
};

// Hjælpefunktion til at konvertere mellem de to typer
export function convertToNextLocalizedField<T>(field: LocalizedField & Record<string, T>): NextLocalizedField<T> {
  return {
    da: field.da,
    en: field.en,
    pt: field.pt
  } as NextLocalizedField<T>;
}

// Type guard til validering af sprog koder
export function isValidLanguage(code: string): code is SupportedLanguage {
  return ['da', 'en', 'pt'].includes(code);
}

// Ny hjælpefunktion til at hente værdier fra NextLocalizedField med fallback
export function getNextLocalizedField<T>(
  field: NextLocalizedField<T>,
  language: SupportedLanguage,
  fallbackLanguage: SupportedLanguage = 'en'
): T {
  return field[language] || field[fallbackLanguage];
}

// Definerer forskellige visningskontekster for billeder
export type ImageContext = 'thumbnail' | 'gallery' | 'banner' | 'description' | string;

export interface Image {
  id: string;
  url: string;
  alt: LocalizedField;
  caption?: LocalizedField;
  credit: string | null;
  year: number | null;
  periodId: string | null;
  order: number;
  contexts: ImageContext[];  // Hvilke kontekster billedet kan bruges i
  dimensions: {
    width: number;
    height: number;
  };
  thumbnailUrl: string | null;    // Optimeret version til thumbnails
  mediumUrl: string | null;       // Mellemstørrelse til gallerier
  largeUrl: string | null;        // Fuld størrelse til modaler/lightbox
}

// Tilføj reference til billeder i detaljeret info
export interface DetailSection {
  id: string;
  type: 'text' | 'image' | 'gallery';
  title: LocalizedField;
  content: LocalizedField;
  order: number;
  imageLayout?: 'left' | 'right' | 'full';  // For enkeltbilleder
}

export interface Period {
  id: string;
  name: LocalizedField;
  description: LocalizedField;
  order: number;
  color: string;
  startYear: number | null;  // Changed from optional to nullable
  endYear: number | null;    // Changed from optional to nullable
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
  type: string | null;
}
export interface City {
  id: string;
  name: LocalizedField;
  description: LocalizedField;
  country: string;
  region: string | null;  // Changed from optional to nullable
  location: Location;
  bounds: {
    northeast: Location;
    southwest: Location;
  };
  defaultZoom: number;
  primaryImage: string;
  images: string[];
  historicalPeriods: string[];
  tags: string[];
  status: 'active' | 'coming_soon' | 'inactive';
  lastUpdated: string | null;  // Changed from string to string | null
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
  sections: DetailSection[];
  gallery?: string[];
  location: Location;
  periods: string[];  // Array of period IDs
  primaryPeriod: string;
  images: string[];           // Array of image IDs
  openingHours: OpeningHours[];
  tags: string[];
  status: 'active' | 'temporary_closed' | 'permanently_closed';
  lastUpdated: string | null;
  distance?: number;  // Distance in meters from user's location
}

// Hjælpefunktioner

// Opdateret hjælpefunktion til at håndtere begge field typer
export function getLocalizedField(
  field: LocalizedField | NextLocalizedField<string> | undefined, 
  language: SupportedLanguage | string
): string {
  if (!field) return '';
  return field[language as SupportedLanguage] || '';
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
