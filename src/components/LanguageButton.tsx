import { colors } from '@/styles/theme';

interface LanguageButtonProps {
  language: 'da' | 'en' | 'pt';
  isSelected: boolean;
  onClick: () => void;
}

const languageNames = {
  da: 'Dansk',
  en: 'English',
  pt: 'Português'
};

export const LanguageButton = ({ language, isSelected, onClick }: LanguageButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="w-full text-left px-4 py-2 transition-colors duration-200 hover:bg-white/10"
      style={{ 
        color: isSelected ? colors.secondary : colors.text.light,
        fontWeight: isSelected ? 500 : 400
      }}
    >
      {languageNames[language]}
    </button>
  );
};
