'use client'

import { ErrorTemplate } from '@/components/templates/ErrorTemplate'
import { useRouter } from 'next/navigation'

export default function NotFound() {
  const router = useRouter()

  return (
    <ErrorTemplate
      title="Side ikke fundet"
      description="Beklager, vi kunne ikke finde den side, du leder efter."
      actionText="Gå til forsiden"
      onAction={() => router.push('/')}
    />
  )
}