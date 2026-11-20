import { AlertCircle, Home } from 'lucide-react';
import { useLocation } from 'wouter';

export default function NotFound() {
  const [, setLocation] = useLocation();

  return (
    <div className="flex min-h-[70vh] w-full items-center justify-center bg-background px-4 py-16">
      <div className="surface-card w-full max-w-lg p-8 text-center">
        <div className="mb-6 flex justify-center">
          <div className="flex size-16 items-center justify-center rounded-full bg-destructive/10 text-destructive">
            <AlertCircle className="size-8" />
          </div>
        </div>

        <p className="mono-label text-primary">Error 404</p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-foreground">Page not found</h1>
        <p className="mt-3 text-sm leading-relaxed text-foreground/50">
          Sorry, the page you are looking for doesn&apos;t exist. It may have been moved or deleted.
        </p>

        <button
          onClick={() => setLocation('/')}
          className="mt-7 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <Home className="size-4" />
          Go home
        </button>
      </div>
    </div>
  );
}
