/** Mirrors the `products` table. */
export type ProductStatus = "active" | "inactive" | "draft";

/**
 * How the price is shown:
 * - `fixed`: the price (and MRP when there is a sale price)
 * - `starting_from`: "Starting from ₹…", for products whose price depends on size or fabric
 * - `best_price`: no price, a "Get Best Price" button instead
 * - `on_request`: "Price on request"
 */
export type PriceMode = "fixed" | "starting_from" | "best_price" | "on_request";

export interface Product {
  product_id: number;
  category_id: number;

  name: string;
  slug: string;
  sku: string;
  description: string;

  /** MRP. */
  base_price: number;
  /** Selling price, when lower than the MRP. */
  sale_price?: number;
  /** Defaults to the store's `pricing.defaultMode`. */
  price_mode?: PriceMode;

  brand: string;
  material: string;
  style: string;
  /** Colour names from `store.colours`, e.g. ["Brown", "Beige"]. */
  colors?: string[];
  /** Short size label shown on cards and used by the Size filter, e.g. "3 Seater", "King Size". */
  size?: string;
  /** One short selling point for the product card, e.g. "Hydraulic storage". */
  usp?: string;

  width: number;
  depth: number;
  height: number;
  weight: number;

  dimension_unit: string;
  weight_unit: string;

  warranty: string;
  status: ProductStatus;

  /** Overrides the store default. */
  customisable?: boolean;
  /** Overrides the store default delivery time, e.g. "Made to order in 15 days". */
  lead_time?: string;
  /** On display at the showroom. Defaults to the store setting. */
  in_showroom?: boolean;
  /** A payment or checkout link (e.g. a Razorpay payment link). Shows a "Buy Now" button. */
  buy_url?: string;

  created_at: string;
  updated_at: string;
}

/** Mirrors the `categories` table. */
export interface Category {
  category_id: number;
  name: string;
  slug: string;
  description: string;
  /** Room slugs from `store.rooms` this category belongs to. */
  rooms: string[];
  /** Show the category even when it has no products yet (it links to an enquiry instead). */
  showWhenEmpty?: boolean;
}

export interface CategoryStats {
  total: number;
  available: number;
}

export type ProductImageType = "main" | "front" | "side" | "back" | "lifestyle" | "detail";

/** Mirrors a `product_images` table: one row per image of a product. */
export interface ProductImage {
  product_id: number;
  type: ProductImageType;
  url: string;
  alt: string;
}

export type SortOption = "featured" | "newest" | "price-asc" | "price-desc" | "name-asc";

export interface PriceRange {
  min: number;
  max: number;
}

export interface CatalogFilters {
  query: string;
  categories: string[];
  rooms: string[];
  materials: string[];
  colors: string[];
  sizes: string[];
  styles: string[];
  statuses: ProductStatus[];
  price: PriceRange | null;
  sort: SortOption;
}

export interface FilterOptions {
  categories: Category[];
  rooms: { slug: string; name: string }[];
  materials: string[];
  colors: string[];
  sizes: string[];
  styles: string[];
  statuses: ProductStatus[];
  priceBounds: PriceRange;
}
