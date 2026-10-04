import type { Product, ProductStatus } from "../types/product";

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

/** e.g. "210 × 85 × 80 cm" (Width × Depth × Height). */
export function formatDimensions(product: Product): string {
  return `${product.width} × ${product.depth} × ${product.height} ${product.dimension_unit}`;
}

export function formatWeight(product: Product): string {
  return `${product.weight} ${product.weight_unit}`;
}

export const statusLabels: Record<ProductStatus, string> = {
  active: "Available",
  draft: "Coming Soon",
  inactive: "Unavailable",
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
