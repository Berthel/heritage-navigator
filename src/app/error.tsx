'use client'
 
import { ErrorTemplate } from '@/components/templates/ErrorTemplate'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <ErrorTemplate
      title="Der opstod en fejl"
      description="Beklager, noget gik galt."
      actionText="Prøv igen"
      onAction={reset}
    />
  )
}