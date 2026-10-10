/**
 * Data access for the catalog. Reads from local data today; each function is async
 * so it can be pointed at the backend API later without changing any callers.
 */
import { categories } from "../data/categories";
import { productImageFiles, productImages } from "../data/productImages";
import { featuredProductIds, products } from "../data/products";
import type { Category, CategoryStats, Product, ProductImage } from "../types/product";
import { relatedProducts, sortProducts } from "../utils/catalog";

const SIMULATED_LATENCY_MS = 250;

function respond<T>(value: T): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(structuredClone(value)), SIMULATED_LATENCY_MS));
}

export class NotFoundError extends Error {}

/** Curated picks first, then every other product that has a photo. */
const featuredOrder = [
  ...featuredProductIds,
  ...products.filter((p) => productImageFiles[p.slug] && !featuredProductIds.includes(p.product_id)).map((p) => p.product_id),
];

export const productService = {
  getProducts(): Promise<Product[]> {
    return respond(products);
  },

  getCategories(): Promise<Category[]> {
    return respond(categories);
  },

  getFeaturedIds(): Promise<number[]> {
    return respond(featuredOrder);
  },

  getFeaturedProducts(limit = 8): Promise<Product[]> {
    return respond(sortProducts(products, "featured", featuredOrder).slice(0, limit));
  },

  /** Newest products that are available and photographed. */
  getNewArrivals(limit = 4): Promise<Product[]> {
    const available = products.filter((p) => p.status === "active" && productImageFiles[p.slug]);
    return respond(sortProducts(available, "newest", featuredProductIds).slice(0, limit));
  },

  /** Available, photographed products with the biggest discounts, for the festival deals row. */
  getDeals(limit = 8): Promise<Product[]> {
    const discount = (p: Product) => (p.sale_price && p.sale_price < p.base_price ? (p.base_price - p.sale_price) / p.base_price : 0);
    const deals = products
      .filter((p) => p.status === "active" && productImageFiles[p.slug] && discount(p) > 0)
      .sort((a, b) => discount(b) - discount(a));
    return respond(deals.slice(0, limit));
  },

  async getProductBySlug(slug: string): Promise<Product> {
    const product = products.find((p) => p.slug === slug);
    if (!product) {
      await respond(null);
      throw new NotFoundError(`No product with slug "${slug}"`);
    }
    return respond(product);
  },

  getProductImages(productId: number): Promise<ProductImage[]> {
    return respond(productImages.filter((image) => image.product_id === productId));
  },

  getRelatedProducts(product: Product, limit = 4): Promise<Product[]> {
    return respond(relatedProducts(product, products, limit));
  },

  /** Per category: total products and how many are available. */
  getCategoryStats(): Promise<Record<number, CategoryStats>> {
    const stats: Record<number, CategoryStats> = {};
    for (const p of products) {
      const entry = (stats[p.category_id] ??= { total: 0, available: 0 });
      entry.total += 1;
      if (p.status === "active") entry.available += 1;
    }
    return respond(stats);
  },
};
