/** Mirrors the `products` table. */
export type ProductStatus = "active" | "inactive" | "draft";

export interface Product {
  product_id: number;
  category_id: number;

  name: string;
  slug: string;
  sku: string;
  description: string;

  base_price: number;
  sale_price?: number;

  brand: string;
  material: string;
  style: string;

  width: number;
  depth: number;
  height: number;
  weight: number;

  dimension_unit: string;
  weight_unit: string;

  warranty: string;
  status: ProductStatus;

  created_at: string;
  updated_at: string;
}

/** Mirrors the `categories` table. */
export interface Category {
  category_id: number;
  name: string;
  slug: string;
  description: string;
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
  brands: string[];
  materials: string[];
  styles: string[];
  statuses: ProductStatus[];
  price: PriceRange | null;
  sort: SortOption;
}

export interface FilterOptions {
  categories: Category[];
  brands: string[];
  materials: string[];
  styles: string[];
  statuses: ProductStatus[];
  priceBounds: PriceRange;
}
