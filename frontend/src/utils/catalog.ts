import { store } from "../config/store";
import type { CatalogFilters, Category, FilterOptions, Product, ProductStatus, SortOption } from "../types/product";
import { effectivePrice } from "./format";

export const sortLabels: Record<SortOption, string> = {
  featured: "Best sellers",
  newest: "Newest",
  "price-asc": "Price: Low to High",
  "price-desc": "Price: High to Low",
  "name-asc": "Name: A to Z",
};

export const statusOrder: ProductStatus[] = ["active", "draft", "inactive"];

export const emptyFilters: CatalogFilters = {
  query: "",
  categories: [],
  rooms: [],
  materials: [],
  colors: [],
  sizes: [],
  styles: [],
  statuses: [],
  price: null,
  sort: "featured",
};

/** Material families (from the store settings) that a product belongs to. */
export function materialFamilies(product: Product): string[] {
  const material = product.material.toLowerCase();
  return store.materialFamilies
    .filter(
      (family) =>
        family.match.some((word) => material.includes(word)) &&
        !("exclude" in family && family.exclude?.some((word) => material.includes(word))),
    )
    .map((family) => family.label);
}

/** Rooms of a product, via its category. */
export function productRooms(product: Product, categories: Category[]): string[] {
  return categories.find((c) => c.category_id === product.category_id)?.rooms ?? [];
}

const uniqueSorted = (values: string[]) => [...new Set(values)].sort((a, b) => a.localeCompare(b));

/** Sizes in a sensible order: numbers first ("2 Seater" before "6 Seater"), then words. */
const sizeOrder = (a: string, b: string) => {
  const na = parseInt(a, 10);
  const nb = parseInt(b, 10);
  if (!Number.isNaN(na) && !Number.isNaN(nb) && na !== nb) return na - nb;
  return a.localeCompare(b);
};

export function buildFilterOptions(products: Product[], categories: Category[]): FilterOptions {
  const prices = products.map(effectivePrice);
  const usedCategoryIds = new Set(products.map((p) => p.category_id));
  const usedStatuses = new Set(products.map((p) => p.status));
  const usedRooms = new Set(products.flatMap((p) => productRooms(p, categories)));
  const usedMaterials = new Set(products.flatMap(materialFamilies));
  const usedColors = new Set(products.flatMap((p) => p.colors ?? []));
  return {
    categories: categories.filter((c) => usedCategoryIds.has(c.category_id)),
    rooms: store.rooms.filter((r) => usedRooms.has(r.slug)).map(({ slug, name }) => ({ slug, name })),
    materials: store.materialFamilies.map((f) => f.label).filter((m) => usedMaterials.has(m)),
    colors: Object.keys(store.colours).filter((c) => usedColors.has(c)),
    sizes: [...new Set(products.flatMap((p) => (p.size ? [p.size] : [])))].sort(sizeOrder),
    styles: uniqueSorted(products.map((p) => p.style)),
    statuses: statusOrder.filter((s) => usedStatuses.has(s)),
    priceBounds: {
      min: prices.length ? Math.floor(Math.min(...prices) / 1000) * 1000 : 0,
      max: prices.length ? Math.ceil(Math.max(...prices) / 1000) * 1000 : 0,
    },
  };
}

/** Search covers name, material, style, colour, size, SKU and category name. */
function matchesQuery(product: Product, query: string, categoryName: string | undefined): boolean {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (terms.length === 0) return true;
  const haystack = [
    product.name,
    product.material,
    ...materialFamilies(product),
    product.style,
    product.sku,
    product.size ?? "",
    ...(product.colors ?? []),
    categoryName ?? "",
  ]
    .join(" ")
    .toLowerCase();
  // "sofa" should also find "sofas": compare against singular forms too.
  return terms.every((term) => haystack.includes(term) || (term.endsWith("s") && haystack.includes(term.slice(0, -1))));
}

const anyOf = (wanted: string[], have: string[]) => wanted.length === 0 || wanted.some((w) => have.includes(w));

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
    if (!anyOf(filters.rooms, category?.rooms ?? [])) return false;
    if (!anyOf(filters.materials, materialFamilies(product))) return false;
    if (!anyOf(filters.colors, product.colors ?? [])) return false;
    if (!anyOf(filters.sizes, product.size ? [product.size] : [])) return false;
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
