'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { colors } from '@/styles/theme';
import { createPortal } from 'react-dom';

type Language = 'da' | 'en' | 'pt';

interface LanguageSelectorProps {
  selectedLanguage: Language;
  onLanguageChange: (language: Language) => void;
}

const languageNames: Record<Language, string> = {
  da: 'Dansk',
  en: 'English',
  pt: 'Português'
};

export function LanguageSelector({ selectedLanguage, onLanguageChange }: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [buttonRect, setButtonRect] = useState<DOMRect | null>(null);
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    // Create portal container on mount
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.pointerEvents = 'none';
    container.style.zIndex = '9999';
    document.body.appendChild(container);
    setPortalContainer(container);

    // Cleanup on unmount
    return () => {
      document.body.removeChild(container);
    };
  }, []);

  const updateButtonRect = (button: HTMLButtonElement | null) => {
    if (button) {
      setButtonRect(button.getBoundingClientRect());
    }
  };

  return (
    <div className="relative">
      <motion.button
        ref={updateButtonRect}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-full px-3 py-1.5 flex items-center gap-1 transition-colors duration-200 hover:bg-white/20"
        style={{ 
          color: colors.text.light,
          background: 'rgba(255, 255, 255, 0.1)'
        }}
      >
        {languageNames[selectedLanguage]}
        <ChevronDown 
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </motion.button>
      
      {portalContainer && buttonRect && createPortal(
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="rounded-lg shadow-lg overflow-hidden py-1 min-w-[120px]"
              style={{ 
                position: 'absolute',
                top: buttonRect.bottom + 4,
                left: buttonRect.right - 120,
                background: colors.primary,
                border: `1px solid ${colors.secondary}33`,
                pointerEvents: 'auto'
              }}
            >
              {(Object.keys(languageNames) as Language[]).map(lang => (
                <button
                  key={lang}
                  onClick={() => {
                    onLanguageChange(lang);
                    setIsOpen(false);
                  }}
                  className="w-full text-left px-4 py-2 transition-colors duration-200 hover:bg-white/10"
                  style={{ 
                    color: selectedLanguage === lang ? colors.secondary : colors.text.light,
                    fontWeight: selectedLanguage === lang ? 500 : 400
                  }}
                >
                  {languageNames[lang]}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>,
        portalContainer
      )}
    </div>
  );
}
