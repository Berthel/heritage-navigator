'use client'

import { useLanguage } from '@/contexts/LanguageContext'

export default function Loading() {
  const { language } = useLanguage()
  
  const texts = {
    da: 'Indlæser...',
    en: 'Loading...',
    pt: 'Carregando...'
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-muted-foreground">
          {texts[language]}
        </p>
      </div>
    </div>
  )
}