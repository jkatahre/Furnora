import { store } from "../config/store";
import type { Product } from "../types/product";
import { discountPercent, effectivePrice, emiPerMonth, formatPrice, hasDiscount, priceMode } from "../utils/format";

interface PriceTagProps {
  product: Product;
  size?: "sm" | "lg";
  /** Show the tax note and EMI line (product page). */
  details?: boolean;
}

export default function PriceTag({ product, size = "sm", details = false }: PriceTagProps) {
  const mode = priceMode(product);
  const large = size === "lg";

  if (mode === "best_price" || mode === "on_request") {
    return (
      <p className={`font-semibold text-ink ${large ? "text-2xl" : "text-[15px]"}`}>
        {mode === "best_price" ? "Ask for best price" : "Price on request"}
      </p>
    );
  }

  const discounted = hasDiscount(product);
  const emi = details ? emiPerMonth(product) : null;
  return (
    <div>
      {mode === "starting_from" && <p className={`text-muted ${large ? "text-sm" : "text-xs"}`}>Starting from</p>}
      <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
        <span className={`font-bold tracking-tight text-ink ${large ? "text-[2rem] leading-none" : "text-lg leading-tight"}`}>
          {discounted && <span className="sr-only">Price </span>}
          {formatPrice(effectivePrice(product))}
        </span>
        {discounted && (
          <>
            <span className={`text-muted ${large ? "text-base" : "text-[13px]"}`}>
              MRP <span className="line-through">{formatPrice(product.base_price)}</span>
            </span>
            <span className={`font-bold text-sale ${large ? "text-base" : "hidden text-[13px] sm:inline"}`}>{discountPercent(product)}% off</span>
          </>
        )}
      </div>
      {details && (
        <p className="mt-2 text-sm text-muted">
          {store.pricing.taxNote}
          {emi && (
            <>
              {" · "}
              <span className="font-semibold text-ink">EMI from {formatPrice(emi)}/month</span>
            </>
          )}
        </p>
      )}
    </div>
  );
}
