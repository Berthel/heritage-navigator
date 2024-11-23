'use client';

interface ErrorTemplateProps {
  title: string;
  description: string;
  actionText: string;
  onAction?: () => void;
}

export function ErrorTemplate({ title, description, actionText, onAction }: ErrorTemplateProps) {
  return (
    <div className="flex min-h-[100dvh] items-center justify-center bg-background">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="mb-6 text-muted-foreground">
          {description}
        </p>
        {onAction ? (
          <button
            onClick={onAction}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            {actionText}
          </button>
        ) : (
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            {actionText}
          </a>
        )}
      </div>
    </div>
  )
}
