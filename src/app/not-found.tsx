'use client'

import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Side ikke fundet</h2>
        <p className="mb-4">Siden du leder efter findes ikke.</p>
        <Link 
          href="/" 
          className="text-primary-600 hover:text-primary-700 underline"
        >
          Gå til forsiden
        </Link>
      </div>
    </div>
  )
}