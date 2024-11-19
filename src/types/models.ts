// Basis types
export interface LocalizedField {
  [key: string]: string;  // Dynamisk sprog-understøttelse
}

export interface Image {
  id: string;
  url: string;
  alt: LocalizedField;
  caption?: LocalizedField;
  credit?: string;
  year?: number;
  periodId?: string;
  order: number;
}

export interface Period {
  id: string;
  name: LocalizedField;
  description?: LocalizedField;
  startYear?: number;
  endYear?: number;
  color: string;
  order: number;
}

export interface TimeSlot {
  open: string;
  close: string;
}

export interface OpeningHours {
  weekday: number;  // 0-6
  slots: TimeSlot[];
  seasonal?: {
    startDate?: string;
    endDate?: string;
  };
}

export interface Location {
  id: string;
  latitude: number;
  longitude: number;
  address: LocalizedField;
  accessibility?: LocalizedField;
}

export interface Tag {
  id: string;
  name: LocalizedField;
}

// Hovedmodel
export interface HeritageSite {
  id: string;
  name: LocalizedField;
  description: LocalizedField;
  detailedInfo: LocalizedField;
  location: Location;
  periods: Period[];  // Site kan tilhøre flere perioder
  primaryPeriod: string;  // ID på hovedperioden
  images: Image[];
  openingHours: OpeningHours[];
  tags: Tag[];
  status: 'active' | 'temporary_closed' | 'permanently_closed';
  lastUpdated: string;
}

// Hjælpefunktioner
export type Language = string;  // Ændret fra 'da' | 'en' | 'pt' til string for dynamisk sprog

export function getLocalizedField(field: LocalizedField, language: Language, fallbackLanguage: Language = 'en'): string {
  return field[language] || field[fallbackLanguage] || '';
}

export function isOpenNow(openingHours: OpeningHours[]): boolean {
  const now = new Date();
  const currentWeekday = now.getDay();
  const currentTime = now.toLocaleTimeString('en-US', { hour12: false });

  const todayHours = openingHours.filter(hours => hours.weekday === currentWeekday);
  
  if (!todayHours.length) return false;

  return todayHours.some(hours => 
    hours.slots.some(slot => {
      // Check if current time is within any slot
      return currentTime >= slot.open && currentTime <= slot.close;
    })
  );
}
