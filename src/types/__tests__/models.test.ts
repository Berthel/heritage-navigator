import {
  LocalizedField,
  NextLocalizedField,
  SupportedLanguage,
  getLocalizedField,
  convertToNextLocalizedField,
  isValidLanguage,
  getNextLocalizedField
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

  describe('isValidLanguage', () => {
    it('should validate supported languages', () => {
      expect(isValidLanguage('da')).toBe(true);
      expect(isValidLanguage('en')).toBe(true);
      expect(isValidLanguage('pt')).toBe(true);
    });

    it('should reject unsupported languages', () => {
      expect(isValidLanguage('fr')).toBe(false);
      expect(isValidLanguage('')).toBe(false);
      expect(isValidLanguage('invalid')).toBe(false);
    });

    it('should work as type guard', () => {
      const testLanguage = 'da';
      if (isValidLanguage(testLanguage)) {
        // TypeScript should recognize testLanguage as SupportedLanguage here
        const field: NextLocalizedField = {
          [testLanguage]: 'test',
          en: 'test',
          pt: 'test'
        };
        expect(field[testLanguage]).toBe('test');
      }
    });
  });

  describe('getNextLocalizedField', () => {
    const nextField: NextLocalizedField = {
      da: 'dansk',
      en: 'english',
      pt: 'português'
    };

    it('should return value for requested language', () => {
      expect(getNextLocalizedField(nextField, 'da')).toBe('dansk');
      expect(getNextLocalizedField(nextField, 'en')).toBe('english');
      expect(getNextLocalizedField(nextField, 'pt')).toBe('português');
    });

    it('should use fallback language when requested language is empty', () => {
      const fieldWithEmpty: NextLocalizedField = {
        da: '',
        en: 'english',
        pt: 'português'
      };
      expect(getNextLocalizedField(fieldWithEmpty, 'da')).toBe('english');
    });

    it('should use custom fallback language', () => {
      const fieldWithEmpty: NextLocalizedField = {
        da: '',
        en: '',
        pt: 'português'
      };
      expect(getNextLocalizedField(fieldWithEmpty, 'da', 'pt')).toBe('português');
    });

    it('should handle generic types', () => {
      const numberField: NextLocalizedField<number> = {
        da: 42,
        en: 123,
        pt: 7
      };
      expect(getNextLocalizedField(numberField, 'da')).toBe(42);
      expect(getNextLocalizedField(numberField, 'fr' as SupportedLanguage, 'en')).toBe(123);
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
