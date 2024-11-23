'use client'
 
import { useLanguage } from '@/contexts/LanguageContext'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  let language: 'da' | 'en' | 'pt' = 'da';
  
  try {
    const context = useLanguage();
    language = context.language;
  } catch (e) {
    // Fallback til dansk hvis konteksten ikke er tilgængelig
    language = 'da';
  }
  
  const texts = {
    da: {
      title: 'Der opstod en fejl',
      description: 'Beklager, noget gik galt.',
      retry: 'Prøv igen'
    },
    en: {
      title: 'Something went wrong',
      description: 'Sorry, an error occurred.',
      retry: 'Try again'
    },
    pt: {
      title: 'Algo deu errado',
      description: 'Desculpe, ocorreu um erro.',
      retry: 'Tente novamente'
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">{texts[language].title}</h2>
        <p className="mb-6 text-muted-foreground">
          {texts[language].description}
        </p>
        <button
          onClick={() => reset()}
          className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          {texts[language].retry}
        </button>
      </div>
    </div>
  )
}