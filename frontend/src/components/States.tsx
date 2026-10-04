import type { ReactNode } from "react";
import { Link } from "react-router-dom";

interface MessageProps {
  title: string;
  message: string;
  action?: ReactNode;
}

export function EmptyState({ title, message, action }: MessageProps) {
  return (
    <div className="flex flex-col items-center justify-center border border-dashed border-line bg-surface px-6 py-20 text-center">
      <h2 className="text-3xl">{title}</h2>
      <p className="mt-3 max-w-md text-muted">{message}</p>
      {action && <div className="mt-8">{action}</div>}
    </div>
  );
}

export function ErrorState({
  message = "We couldn't load this content. Please check your connection and try again.",
  onRetry,
}: {
  message?: string;
  onRetry?: () => void;
}) {
  return (
    <div role="alert">
      <EmptyState
        title="Something went wrong"
        message={message}
        action={
          onRetry ? (
            <button type="button" className="btn-outline" onClick={onRetry}>
              Try again
            </button>
          ) : (
            <Link to="/" className="btn-outline">
              Back to home
            </Link>
          )
        }
      />
    </div>
  );
}

export function ProductCardSkeleton() {
  return (
    <div aria-hidden="true">
      <div className="skeleton aspect-[4/3]" />
      <div className="mt-5 space-y-2.5">
        <div className="skeleton h-3 w-1/3" />
        <div className="skeleton h-5 w-3/4" />
        <div className="skeleton h-3 w-1/2" />
        <div className="skeleton mt-4 h-4 w-1/3" />
      </div>
    </div>
  );
}

export function GridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-x-5 gap-y-12 min-[440px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-4" role="status">
      <span className="sr-only">Loading products…</span>
      {Array.from({ length: count }, (_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
