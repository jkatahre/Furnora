import type { CatalogFilters, Category, FilterOptions, Product, ProductStatus, SortOption } from "../types/product";
import { effectivePrice } from "./format";

export const sortLabels: Record<SortOption, string> = {
  featured: "Featured",
  newest: "Newest",
  "price-asc": "Price: Low to High",
  "price-desc": "Price: High to Low",
  "name-asc": "Name: A to Z",
};

export const statusOrder: ProductStatus[] = ["active", "draft", "inactive"];

export const emptyFilters: CatalogFilters = {
  query: "",
  categories: [],
  brands: [],
  materials: [],
  styles: [],
  statuses: [],
  price: null,
  sort: "featured",
};

const uniqueSorted = (values: string[]) => [...new Set(values)].sort((a, b) => a.localeCompare(b));

export function buildFilterOptions(products: Product[], categories: Category[]): FilterOptions {
  const prices = products.map(effectivePrice);
  const usedCategoryIds = new Set(products.map((p) => p.category_id));
  const usedStatuses = new Set(products.map((p) => p.status));
  return {
    categories: categories.filter((c) => usedCategoryIds.has(c.category_id)),
    brands: uniqueSorted(products.map((p) => p.brand)),
    materials: uniqueSorted(products.map((p) => p.material)),
    styles: uniqueSorted(products.map((p) => p.style)),
    statuses: statusOrder.filter((s) => usedStatuses.has(s)),
    priceBounds: {
      min: prices.length ? Math.floor(Math.min(...prices) / 1000) * 1000 : 0,
      max: prices.length ? Math.ceil(Math.max(...prices) / 1000) * 1000 : 0,
    },
  };
}

/** Search covers name, brand, material, style, SKU and category name. */
function matchesQuery(product: Product, query: string, categoryName: string | undefined): boolean {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (terms.length === 0) return true;
  const haystack = [product.name, product.brand, product.material, product.style, product.sku, categoryName ?? ""]
    .join(" ")
    .toLowerCase();
  return terms.every((term) => haystack.includes(term));
}

export function filterAndSortProducts(
  products: Product[],
  categories: Category[],
  filters: CatalogFilters,
  featuredIds: number[],
): Product[] {
  const categoryById = new Map(categories.map((c) => [c.category_id, c]));

  const filtered = products.filter((product) => {
    const category = categoryById.get(product.category_id);
    if (!matchesQuery(product, filters.query, category?.name)) return false;
    if (filters.categories.length && (!category || !filters.categories.includes(category.slug))) return false;
    if (filters.brands.length && !filters.brands.includes(product.brand)) return false;
    if (filters.materials.length && !filters.materials.includes(product.material)) return false;
    if (filters.styles.length && !filters.styles.includes(product.style)) return false;
    if (filters.statuses.length && !filters.statuses.includes(product.status)) return false;
    if (filters.price) {
      const price = effectivePrice(product);
      if (price < filters.price.min || price > filters.price.max) return false;
    }
    return true;
  });

  return sortProducts(filtered, filters.sort, featuredIds);
}

export function sortProducts(products: Product[], sort: SortOption, featuredIds: number[]): Product[] {
  const sorted = [...products];
  switch (sort) {
    case "newest":
      return sorted.sort((a, b) => b.created_at.localeCompare(a.created_at));
    case "price-asc":
      return sorted.sort((a, b) => effectivePrice(a) - effectivePrice(b));
    case "price-desc":
      return sorted.sort((a, b) => effectivePrice(b) - effectivePrice(a));
    case "name-asc":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case "featured": {
      // Featured picks first (in curated order), then available before coming soon / unavailable.
      const rank = (p: Product) => {
        const featuredIndex = featuredIds.indexOf(p.product_id);
        return featuredIndex >= 0 ? featuredIndex : featuredIds.length + statusOrder.indexOf(p.status) * 1000;
      };
      return sorted.sort((a, b) => rank(a) - rank(b) || a.product_id - b.product_id);
    }
  }
}

/**
 * Products sharing the category, style or material with `product`, best matches first.
 * Products with nothing in common are never returned.
 */
export function relatedProducts(product: Product, all: Product[], limit = 4): Product[] {
  const score = (p: Product) =>
    (p.category_id === product.category_id ? 4 : 0) +
    (p.style === product.style ? 2 : 0) +
    (p.material === product.material ? 1 : 0);

  return all
    .filter((p) => p.product_id !== product.product_id)
    .map((p) => ({ p, s: score(p) }))
    .filter(({ s }) => s > 0)
    .sort((a, b) => b.s - a.s || statusOrder.indexOf(a.p.status) - statusOrder.indexOf(b.p.status))
    .slice(0, limit)
    .map(({ p }) => p);
}
