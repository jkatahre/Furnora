import { Link } from "react-router-dom";
import type { Product } from "../types/product";
import { discountPercent, hasDiscount, isNewArrival } from "../utils/format";
import { mainImageUrl } from "../data/productImages";
import { ArrowRightIcon } from "./Icons";
import PriceTag from "./PriceTag";
import SmartImage from "./SmartImage";
import StatusBadge from "./StatusBadge";

interface ProductCardProps {
  product: Product;
  categoryName?: string;
  priority?: boolean;
}

export default function ProductCard({ product, categoryName, priority }: ProductCardProps) {
  const unavailable = product.status === "inactive";
  return (
    <article className="group relative flex h-full flex-col">
      <div className="relative overflow-hidden bg-sand shadow-none transition-shadow duration-500 ease-gentle group-hover:shadow-lift">
        <SmartImage
          src={mainImageUrl(product.slug)}
          alt={product.name}
          fallbackLabel={product.name}
          priority={priority}
          fit="auto"
          className={`aspect-[4/3] ${unavailable ? "opacity-70" : ""}`}
          imgClassName="group-hover:scale-[1.04]"
        />
        <div className="pointer-events-none absolute left-3 top-3 flex flex-col items-start gap-1.5">
          {hasDiscount(product) && (
            <span className="bg-ink px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-canvas">
              -{discountPercent(product)}%
            </span>
          )}
          {product.status === "active" && isNewArrival(product) && (
            <span className="bg-paper px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink">
              New
            </span>
          )}
        </div>
        {product.status !== "active" && (
          <span className="absolute right-3 top-3 bg-paper/95 px-2.5 py-1">
            <StatusBadge status={product.status} />
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col pt-5">
        {categoryName && <p className="eyebrow text-[10px] text-muted">{categoryName}</p>}
        <h3 className="mt-1.5 font-display text-[1.45rem] leading-tight">
          <Link
            to={`/products/${product.slug}`}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
          >
            {product.name}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-muted">{product.description}</p>
        <p className="mt-2.5 text-[13px] text-ink-soft">
          {product.material} <span className="text-linen">•</span> {product.style}
        </p>

        <div className="mt-auto pt-4">
          <PriceTag product={product} />
          <div className="mt-4 flex items-center justify-between border-t border-line pt-4">
            <StatusBadge status={product.status} />
            <span
              aria-hidden="true"
              className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-ink transition-colors group-hover:text-accent-dark"
            >
              View Details
              <ArrowRightIcon
                width={14}
                height={14}
                className="transition-transform duration-300 ease-gentle group-hover:translate-x-1"
              />
            </span>
          </div>
        </div>
      </div>
      {/* Keyboard focus ring for the stretched link */}
      <span className="pointer-events-none absolute -inset-2 hidden outline-2 outline-offset-2 outline-accent-dark group-has-[a:focus-visible]:block" />
    </article>
  );
}
