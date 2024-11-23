export default function NotFound() {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-background">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Side ikke fundet</h2>
        <p className="mb-6 text-muted-foreground">
          Beklager, vi kunne ikke finde den side, du leder efter.
        </p>
        <a
          href="/"
          className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Gå til forsiden
        </a>
      </div>
    </div>
  )
}