import { store } from "../config/store";
import { StarIcon } from "./Icons";

export function Stars({ value, size = 16 }: { value: number; size?: number }) {
  return (
    <span className="inline-flex text-star" role="img" aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <StarIcon key={i} width={size} height={size} filled={i <= Math.round(value)} />
      ))}
    </span>
  );
}

/** "4.8 ★★★★★ 640 Google reviews", linking to the review profile. */
export function RatingBadge({ light = false, className = "" }: { light?: boolean; className?: string }) {
  const rating = store.rating;
  if (!rating) return null;
  return (
    <a
      href={rating.url}
      target="_blank"
      rel="noopener"
      className={`inline-flex min-h-11 items-center gap-2 text-sm ${light ? "text-white" : "text-ink"} ${className}`}
    >
      <span className="text-lg font-bold">{rating.value.toFixed(1)}</span>
      <Stars value={rating.value} />
      <span className={`underline-offset-2 hover:underline ${light ? "text-white/80" : "text-muted"}`}>
        {rating.count.toLocaleString("en-IN")} {rating.source} reviews
      </span>
    </a>
  );
}
