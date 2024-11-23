'use client'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Der opstod en fejl</h2>
        <p className="mb-4">Beklager, noget gik galt.</p>
        <button
          onClick={() => reset()}
          className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
        >
          Prøv igen
        </button>
      </div>
    </div>
  )
}