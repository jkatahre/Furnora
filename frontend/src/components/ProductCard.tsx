import { Link } from "react-router-dom";
import { mainImageUrl } from "../data/productImages";
import type { Product } from "../types/product";
import { discountPercent, hasDiscount, isCustomisable, isNewArrival, showsPrice, statusLabels } from "../utils/format";
import { festivalLive } from "./Festive";
import PriceTag from "./PriceTag";
import SmartImage from "./SmartImage";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
  /** Shows a "Bestseller" badge. */
  bestseller?: boolean;
}

/** Image first, then name, material, price and one selling point. */
export default function ProductCard({ product, priority, bestseller }: ProductCardProps) {
  const unavailable = product.status !== "active";
  const usp = product.usp ?? (isCustomisable(product) ? "Customisable size & finish" : product.size);
  const festive = festivalLive();

  return (
    <article className="group relative flex h-full flex-col">
      <div className="relative overflow-hidden rounded-xl bg-sand">
        <SmartImage
          src={mainImageUrl(product.slug)}
          alt={product.name}
          fallbackLabel={product.name}
          priority={priority}
          fit="auto"
          className={`aspect-square sm:aspect-[4/3.4] ${unavailable ? "opacity-75" : ""}`}
          imgClassName="group-hover:scale-[1.04]"
        />
        <div className="pointer-events-none absolute left-2 top-2 flex flex-col items-start gap-1 sm:left-3 sm:top-3">
          {showsPrice(product) && hasDiscount(product) && (
            <span className={`rounded-md px-2 py-0.5 text-[11px] font-bold sm:text-xs ${festive ? "bg-festive text-gold" : "bg-sale text-white"}`}>
              {festive && "🪔 "}
              {discountPercent(product)}% OFF
            </span>
          )}
          {bestseller && <span className="rounded-md bg-ink px-2 py-0.5 text-[11px] font-bold text-white sm:text-xs">Bestseller</span>}
          {!bestseller && product.status === "active" && isNewArrival(product) && (
            <span className="rounded-md bg-paper px-2 py-0.5 text-[11px] font-bold text-ink sm:text-xs">New</span>
          )}
          {unavailable && <span className="rounded-md bg-paper px-2 py-0.5 text-[11px] font-bold text-ink sm:text-xs">{statusLabels[product.status]}</span>}
        </div>
      </div>

      <div className="flex flex-1 flex-col pt-3">
        <h3 className="line-clamp-2 text-[13px] font-semibold leading-snug sm:text-[15px]">
          <Link to={`/products/${product.slug}`} className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none">
            {product.name}
          </Link>
        </h3>
        <p className="mt-0.5 truncate text-[12px] text-brand sm:mt-1 sm:text-[13px]">{product.material}</p>
        <div className="mt-1.5 sm:mt-2">
          <PriceTag product={product} />
        </div>
        {usp && <p className="mt-1.5 hidden truncate text-[13px] text-muted sm:block">✓ {usp}</p>}
      </div>
      {/* Keyboard focus ring for the stretched link */}
      <span className="pointer-events-none absolute -inset-1.5 hidden rounded-xl outline-2 outline-offset-2 outline-brand group-has-[h3_a:focus-visible]:block" />
    </article>
  );
}
