export interface Attraction {
  id: string;
  name: {
    da: string;
    en: string;
    pt: string;
  };
  description: {
    da: string;
    en: string;
    pt: string;
  };
  historicalPeriod: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  address: string;
  openingHours: {
    monday?: string;
    tuesday?: string;
    wednesday?: string;
    thursday?: string;
    friday?: string;
    saturday?: string;
    sunday?: string;
  };
  images: string[];
}

export type Language = 'da' | 'en' | 'pt';
