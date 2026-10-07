import { store } from "../config/store";
import type { PriceMode, Product, ProductStatus } from "../types/product";

const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export function formatPrice(value: number): string {
  return inr.format(value);
}

/** The price a visitor actually pays: the sale price when there is a valid one. */
export function effectivePrice(product: Product): number {
  return hasDiscount(product) ? product.sale_price! : product.base_price;
}

export function hasDiscount(product: Product): boolean {
  return product.sale_price !== undefined && product.sale_price < product.base_price;
}

export function discountPercent(product: Product): number {
  if (!hasDiscount(product)) return 0;
  return Math.round(((product.base_price - product.sale_price!) / product.base_price) * 100);
}

export function priceMode(product: Product): PriceMode {
  return product.price_mode ?? store.pricing.defaultMode;
}

/** Whether a number price is shown at all. */
export function showsPrice(product: Product): boolean {
  const mode = priceMode(product);
  return mode === "fixed" || mode === "starting_from";
}

/** Plain-text price, for messages: "₹31,999", "from ₹31,999" or "price on request". */
export function priceLabel(product: Product): string {
  switch (priceMode(product)) {
    case "fixed":
      return formatPrice(effectivePrice(product));
    case "starting_from":
      return `from ${formatPrice(effectivePrice(product))}`;
    default:
      return "price on request";
  }
}

/** Monthly EMI shown under prices, or null when EMI is off or the price is too low. */
export function emiPerMonth(product: Product): number | null {
  const { emi } = store.pricing;
  const price = effectivePrice(product);
  if (!emi.enabled || !showsPrice(product) || price < emi.minPrice) return null;
  return Math.ceil(price / emi.months);
}

// ── Sizes ────────────────────────────────────────────────────────────────

const CM_PER_INCH = 2.54;

/** Converts a length in the product's unit to whole inches. */
export function toInches(value: number, unit: string): number {
  return Math.round(unit === "cm" ? value / CM_PER_INCH : unit === "mm" ? value / 25.4 : value);
}

/** 82" → 6' 10" */
export function feetAndInches(inches: number): string {
  const feet = Math.floor(inches / 12);
  const rest = inches % 12;
  return feet ? `${feet}' ${rest}"` : `${rest}"`;
}

/** e.g. "210 × 85 × 80 cm" (Width × Depth × Height). */
export function formatDimensions(product: Product): string {
  return `${product.width} × ${product.depth} × ${product.height} ${product.dimension_unit}`;
}

/** e.g. 83" × 33" × 31" */
export function formatDimensionsInches(product: Product): string {
  const u = product.dimension_unit;
  return `${toInches(product.width, u)}" × ${toInches(product.depth, u)}" × ${toInches(product.height, u)}"`;
}

export function formatWeight(product: Product): string {
  return `${product.weight} ${product.weight_unit}`;
}

export const statusLabels: Record<ProductStatus, string> = {
  active: "In stock",
  draft: "Coming soon",
  inactive: "Out of stock",
};

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}

/** Products created within this many days count as new arrivals. */
const NEW_ARRIVAL_DAYS = 30;

export function isNewArrival(product: Product, now = new Date()): boolean {
  const ageMs = now.getTime() - new Date(product.created_at).getTime();
  return ageMs >= 0 && ageMs <= NEW_ARRIVAL_DAYS * 24 * 60 * 60 * 1000;
}

// ── Store defaults a product can override ───────────────────────────────

export function isCustomisable(product: Product): boolean {
  return product.customisable ?? store.policies.customisable;
}

export function leadTime(product: Product): string {
  return product.lead_time ?? store.policies.leadTime;
}

export function inShowroom(product: Product): boolean {
  return product.in_showroom ?? store.policies.inShowroom;
}
