'use client'

import { useLanguage } from '@/contexts/LanguageContext'
import Link from 'next/link'

export default function NotFound() {
  const { language } = useLanguage()
  
  const texts = {
    da: {
      title: 'Side ikke fundet',
      description: 'Den side, du leder efter, findes ikke.',
      link: 'Gå til forsiden'
    },
    en: {
      title: 'Page not found',
      description: 'The page you are looking for does not exist.',
      link: 'Go to homepage'
    },
    pt: {
      title: 'Página não encontrada',
      description: 'A página que procura não existe.',
      link: 'Ir para página inicial'
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">{texts[language].title}</h2>
        <p className="mb-6 text-muted-foreground">
          {texts[language].description}
        </p>
        <Link 
          href="/" 
          className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          {texts[language].link}
        </Link>
      </div>
    </div>
  )
}