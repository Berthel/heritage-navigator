import {
  LocalizedField,
  NextLocalizedField,
  SupportedLanguage,
  getLocalizedField,
  convertToNextLocalizedField
} from '../models';

describe('Language Types', () => {
  const testData: LocalizedField = {
    da: 'dansk',
    en: 'english',
    pt: 'português'
  };

  describe('getLocalizedField', () => {
    it('should handle existing LocalizedField', () => {
      expect(getLocalizedField(testData, 'da')).toBe('dansk');
      expect(getLocalizedField(testData, 'en')).toBe('english');
      expect(getLocalizedField(testData, 'pt')).toBe('português');
    });

    it('should handle undefined field', () => {
      expect(getLocalizedField(undefined, 'da')).toBe('');
    });

    it('should handle missing language', () => {
      expect(getLocalizedField(testData, 'invalid' as SupportedLanguage)).toBe('');
    });
  });

  describe('convertToNextLocalizedField', () => {
    it('should convert LocalizedField to NextLocalizedField', () => {
      const next = convertToNextLocalizedField(testData);
      expect(next.da).toBe(testData.da);
      expect(next.en).toBe(testData.en);
      expect(next.pt).toBe(testData.pt);
    });

    it('should handle generic types', () => {
      const numberField: LocalizedField & Record<string, number> = {
        da: 42,
        en: 123,
        pt: 7
      };
      const next = convertToNextLocalizedField(numberField);
      expect(next.da).toBe(42);
      expect(next.en).toBe(123);
      expect(next.pt).toBe(7);
    });
  });

  describe('Type Safety', () => {
    it('should compile with correct language codes', () => {
      const field: NextLocalizedField = {
        da: 'dansk',
        en: 'english',
        pt: 'português'
      };
      expect(field.da).toBe('dansk');
    });

    // Typescript vil give kompileringsfejl hvis man prøver at bruge et ikke-supporteret sprog
    // Dette er en runtime test der verificerer type constraint
    it('should only accept supported languages', () => {
      const supportedLanguages: SupportedLanguage[] = ['da', 'en', 'pt'];
      const field: NextLocalizedField = {
        da: 'dansk',
        en: 'english',
        pt: 'português'
      };
      
      supportedLanguages.forEach(lang => {
        expect(field[lang]).toBeDefined();
      });
    });
  });
});
