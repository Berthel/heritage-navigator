import { motion } from 'framer-motion'

interface LanguageButtonProps {
  lang: 'da' | 'en' | 'pt'
  isActive: boolean
  onClick: () => void
  label?: string
}

const languageLabels: Record<'da' | 'en' | 'pt', string> = {
  da: 'Dansk',
  en: 'English',
  pt: 'Português'
}

export const LanguageButton = ({ 
  lang, 
  isActive, 
  onClick,
  label = languageLabels[lang]
}: LanguageButtonProps) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    className={`
      rounded-full px-3 py-1 
      ${isActive 
        ? 'bg-white bg-opacity-20 text-white' 
        : 'bg-transparent text-white/70 hover:text-white'
      }
      transition-colors duration-200
    `}
    onClick={onClick}
  >
    {label}
  </motion.button>
)
