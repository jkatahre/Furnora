import type { Product } from "../types/product";
import { discountPercent, effectivePrice, formatPrice, hasDiscount } from "../utils/format";

interface PriceTagProps {
  product: Product;
  size?: "sm" | "lg";
}

export default function PriceTag({ product, size = "sm" }: PriceTagProps) {
  const discounted = hasDiscount(product);
  const large = size === "lg";
  return (
    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
      <span className={`font-semibold text-ink ${large ? "text-3xl tracking-tight" : "text-base"}`}>
        {discounted && <span className="sr-only">Sale price </span>}
        {formatPrice(effectivePrice(product))}
      </span>
      {discounted && (
        <>
          <span className={`text-muted line-through ${large ? "text-lg" : "text-sm"}`}>
            <span className="sr-only">Original price </span>
            {formatPrice(product.base_price)}
          </span>
          <span
            className={`font-semibold uppercase tracking-wider text-accent-dark ${large ? "text-sm" : "text-[11px]"}`}
          >
            Save {discountPercent(product)}%
          </span>
        </>
      )}
    </div>
  );
}
