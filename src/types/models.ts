export interface LocalizedField {
  da: string | undefined;
  en: string | undefined;
  pt: string | undefined;
}

export interface Period {
  id: string;
  name: string;
  color: string;
}

export interface Location {
  latitude: number;
  longitude: number;
  address: string;
}

export interface OpeningHours {
  monday?: string;
  tuesday?: string;
  wednesday?: string;
  thursday?: string;
  friday?: string;
  saturday?: string;
  sunday?: string;
}

export interface HeritageSite {
  id: string;
  name: LocalizedField;
  description: LocalizedField;
  detailedInfo: LocalizedField;
  period: Period;
  location: Location;
  openingHours: OpeningHours;
  images: string[];
}

export type Language = 'da' | 'en' | 'pt';

export function getLocalizedField(field: LocalizedField, language: Language): string {
  return field[language] || '';
}
