type Language = 'da' | 'en' | 'pt';

const distanceUnits: Record<Language, { unit: string, decimal: string }> = {
  da: { unit: 'km', decimal: ',' },
  en: { unit: 'km', decimal: '.' },
  pt: { unit: 'km', decimal: ',' }
};

export function formatDistance(meters: number | null | undefined, language: Language): string {
  if (meters == null) return '';
  
  const kilometers = meters / 1000;
  const { unit, decimal } = distanceUnits[language];
  
  if (kilometers < 1) {
    // Under 1 km vises i meter
    const roundedMeters = Math.round(meters / 10) * 10;
    return `${roundedMeters} m`;
  }
  
  // Over 1 km vises med én decimal
  const formatted = kilometers.toFixed(1).replace('.', decimal);
  return `${formatted} ${unit}`;
}
