import { useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import type { CatalogFilters, ProductStatus, SortOption } from "../types/product";
import { emptyFilters, sortLabels, statusOrder } from "../utils/catalog";

type ListKey = "categories" | "brands" | "materials" | "styles" | "statuses";

const listParams: Record<ListKey, string> = {
  categories: "category",
  brands: "brand",
  materials: "material",
  styles: "style",
  statuses: "status",
};

const readList = (params: URLSearchParams, name: string) =>
  params.get(name)?.split(",").filter(Boolean) ?? [];

const readNumber = (params: URLSearchParams, name: string) => {
  const value = Number(params.get(name));
  return params.has(name) && Number.isFinite(value) ? value : undefined;
};

/** Catalog filter state, stored in the URL so filtered views can be linked and shared. */
export function useCatalogFilters() {
  const [params, setParams] = useSearchParams();

  const filters = useMemo<CatalogFilters>(() => {
    const sort = params.get("sort");
    const min = readNumber(params, "min");
    const max = readNumber(params, "max");
    return {
      query: params.get("q") ?? "",
      categories: readList(params, listParams.categories),
      brands: readList(params, listParams.brands),
      materials: readList(params, listParams.materials),
      styles: readList(params, listParams.styles),
      statuses: readList(params, listParams.statuses).filter((s): s is ProductStatus =>
        statusOrder.includes(s as ProductStatus),
      ),
      price: min !== undefined || max !== undefined ? { min: min ?? 0, max: max ?? Number.MAX_SAFE_INTEGER } : null,
      sort: sort && sort in sortLabels ? (sort as SortOption) : emptyFilters.sort,
    };
  }, [params]);

  const update = useCallback(
    (mutate: (next: URLSearchParams) => void) => {
      setParams(
        (prev) => {
          const next = new URLSearchParams(prev);
          mutate(next);
          return next;
        },
        { replace: true, preventScrollReset: true },
      );
    },
    [setParams],
  );

  const setQuery = useCallback(
    (query: string) => update((next) => (query.trim() ? next.set("q", query) : next.delete("q"))),
    [update],
  );

  const toggleValue = useCallback(
    (key: ListKey, value: string) =>
      update((next) => {
        const name = listParams[key];
        const current = readList(next, name);
        const updated = current.includes(value) ? current.filter((v) => v !== value) : [...current, value];
        if (updated.length) next.set(name, updated.join(","));
        else next.delete(name);
      }),
    [update],
  );

  const setPrice = useCallback(
    (range: { min: number; max: number } | null) =>
      update((next) => {
        if (range) {
          next.set("min", String(range.min));
          next.set("max", String(range.max));
        } else {
          next.delete("min");
          next.delete("max");
        }
      }),
    [update],
  );

  const setSort = useCallback(
    (sort: SortOption) => update((next) => (sort === emptyFilters.sort ? next.delete("sort") : next.set("sort", sort))),
    [update],
  );

  /** Clears every filter but keeps the chosen sort order. */
  const clearAll = useCallback(
    () =>
      update((next) => {
        for (const name of [...Object.values(listParams), "q", "min", "max"]) next.delete(name);
      }),
    [update],
  );

  const activeCount =
    filters.categories.length +
    filters.brands.length +
    filters.materials.length +
    filters.styles.length +
    filters.statuses.length +
    (filters.price ? 1 : 0);

  return { filters, setQuery, toggleValue, setPrice, setSort, clearAll, activeCount };
}

export type CatalogFilterControls = ReturnType<typeof useCatalogFilters>;
