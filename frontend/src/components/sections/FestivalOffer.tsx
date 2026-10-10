import { useState } from "react";
import { Link } from "react-router-dom";
import { store } from "../../config/store";
import type { Product } from "../../types/product";
import { festivalLive, Toran, useCountdown } from "../Festive";
import { ArrowRightIcon, CheckIcon } from "../Icons";
import { ProductRow } from "../ProductGrid";
import { GridSkeleton } from "../States";

/** "Sale ends in 3d 04h 12m" with the coupon code, on the festival colours. */
export function FestivalStrip() {
  const { festival } = store;
  const left = useCountdown(festival.endsAt);
  const [copied, setCopied] = useState(false);
  if (!festivalLive() || left.ended) return null;

  const copy = async () => {
    if (!festival.coupon) return;
    try {
      await navigator.clipboard.writeText(festival.coupon.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard can be blocked; the code is visible anyway.
    }
  };

  return (
    <section aria-label={`${festival.name} sale`} className="bg-festive text-white">
      <div className="container-page flex flex-col gap-2.5 py-3 sm:flex-row sm:items-center sm:justify-between sm:py-3.5">
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] sm:text-sm">
          <span className="font-bold">🪔 {festival.name} Sale ends in</span>
          <span className="flex gap-1.5 font-mono text-[13px] font-bold tabular-nums sm:text-sm" aria-live="off">
            <TimeBox value={left.days} unit="d" />
            <TimeBox value={left.hours} unit="h" />
            <TimeBox value={left.minutes} unit="m" />
          </span>
        </p>
        {festival.coupon && (
          <button
            type="button"
            onClick={copy}
            className="flex min-h-10 items-center justify-between gap-3 rounded-lg border border-dashed border-gold/70 bg-festive-dark/40 px-3 text-left text-[12px] sm:text-[13px]"
          >
            <span className="text-white/85">{festival.coupon.text}</span>
            <span className="flex shrink-0 items-center gap-1 rounded bg-gold px-2 py-0.5 font-bold text-festive-dark">
              {copied ? (
                <>
                  <CheckIcon width={14} height={14} /> Copied
                </>
              ) : (
                festival.coupon.code
              )}
            </span>
          </button>
        )}
      </div>
    </section>
  );
}

function TimeBox({ value, unit }: { value: number; unit: string }) {
  return (
    <span className="rounded bg-white/15 px-1.5 py-0.5">
      {String(value).padStart(2, "0")}
      <span className="text-white/70">{unit}</span>
    </span>
  );
}

/** The products with the biggest discounts, on a festive background. */
export function FestivalDeals({ products, loading }: { products: Product[]; loading: boolean }) {
  const { festival } = store;
  if (!festivalLive() || (!loading && products.length === 0)) return null;
  return (
    <section className="relative mt-8 overflow-hidden bg-festive-soft pb-8 pt-12 md:mt-16 md:pb-12 md:pt-16">
      <Toran className="absolute inset-x-0 top-0" />
      <div className="container-page">
        <div className="mb-4 flex items-end justify-between gap-4 md:mb-8">
          <h2 className="section-title">🪔 {festival.dealsTitle}</h2>
          <Link to="/catalog?sort=price-asc" className="link-arrow">
            View all <ArrowRightIcon width={16} height={16} />
          </Link>
        </div>
        {loading ? <GridSkeleton count={4} /> : <ProductRow products={products} />}
      </div>
    </section>
  );
}
