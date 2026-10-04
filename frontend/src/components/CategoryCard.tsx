import { Link } from "react-router-dom";
import type { Category, CategoryStats } from "../types/product";
import { categoryCoverUrl } from "../data/productImages";
import { categoryImage } from "../utils/images";
import { ArrowRightIcon } from "./Icons";
import SmartImage from "./SmartImage";

interface CategoryCardProps {
  category: Category;
  stats?: CategoryStats;
  /** CSS aspect-ratio class for the image. */
  aspect?: string;
}

export default function CategoryCard({ category, stats, aspect = "aspect-[3/4]" }: CategoryCardProps) {
  const comingSoon = !stats || stats.available === 0;
  const subtitle = comingSoon
    ? "Coming soon"
    : `${stats.available} ${stats.available === 1 ? "piece" : "pieces"}`;

  return (
    <Link
      to={`/catalog?category=${category.slug}`}
      className="group relative block overflow-hidden bg-ink-soft"
      aria-label={`${category.name}${subtitle ? `, ${subtitle}` : ""}`}
    >
      <SmartImage
        src={categoryImage(category.slug)}
        fallbackSrc={categoryCoverUrl(category.category_id)}
        alt=""
        tone="dark"
        className={`${aspect} ${comingSoon ? "grayscale-60" : ""}`}
        imgClassName="group-hover:scale-[1.05]"
      />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-ink/75 via-ink/15 to-transparent" />
      {comingSoon && (
        <span className="absolute left-4 top-4 bg-canvas px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink sm:left-5 sm:top-5">
          Coming Soon
        </span>
      )}
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-canvas sm:p-6">
        <div>
          <h3 className="font-display text-2xl text-canvas sm:text-[1.75rem]">{category.name}</h3>
          {subtitle && <p className="mt-1 text-xs uppercase tracking-[0.16em] text-canvas/75">{subtitle}</p>}
        </div>
        <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-canvas/40 transition-colors duration-300 group-hover:border-canvas group-hover:bg-canvas group-hover:text-ink">
          <ArrowRightIcon width={16} height={16} />
        </span>
      </div>
    </Link>
  );
}
