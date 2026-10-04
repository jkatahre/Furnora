import { useEffect, useMemo, useRef, useState } from "react";
import FilterPanel from "../components/FilterPanel";
import { CloseIcon, FilterIcon } from "../components/Icons";
import ProductGrid from "../components/ProductGrid";
import SearchBar from "../components/SearchBar";
import SortDropdown from "../components/SortDropdown";
import { EmptyState, ErrorState, GridSkeleton } from "../components/States";
import { useAsync } from "../hooks/useAsync";
import { useCatalogFilters, type CatalogFilterControls } from "../hooks/useCatalogFilters";
import { productService } from "../services/productService";
import type { FilterOptions, Product } from "../types/product";
import { buildFilterOptions, filterAndSortProducts } from "../utils/catalog";
import { formatPrice, statusLabels } from "../utils/format";

const PAGE_SIZE = 12;

export default function Catalog() {
  const controls = useCatalogFilters();
  const { filters, setQuery, setSort, clearAll, activeCount } = controls;
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const { data, loading, error, reload } = useAsync(
    () => Promise.all([productService.getProducts(), productService.getCategories(), productService.getFeaturedIds()]),
    [],
  );
  const [products, categories, featuredIds] = data ?? [[], [], []];

  const options = useMemo(() => buildFilterOptions(products, categories), [products, categories]);
  const results = useMemo(
    () => filterAndSortProducts(products, categories, filters, featuredIds),
    [products, categories, filters, featuredIds],
  );

  // Start from the first page whenever the result set changes.
  useEffect(() => setVisibleCount(PAGE_SIZE), [filters]);

  const singleCategory =
    filters.categories.length === 1 ? categories.find((c) => c.slug === filters.categories[0]) : undefined;
  const title = singleCategory?.name ?? "The Catalog";
  const intro =
    singleCategory?.description ??
    "Browse the complete Furnora collection. Search, filter and sort to find the piece that fits your space.";

  useEffect(() => {
    document.title = `${title} — Furnora`;
  }, [title]);

  const visible = results.slice(0, visibleCount);

  return (
    <>
      <section className="border-b border-line">
        <div className="container-page pb-10 pt-12 md:pb-14 md:pt-16">
          <p className="eyebrow">Furniture Catalog</p>
          <h1 className="mt-4 text-5xl sm:text-6xl">{title}</h1>
          <p className="mt-4 max-w-xl text-muted">{intro}</p>
          <div className="mt-8 max-w-2xl">
            <SearchBar id="catalog-search" value={filters.query} onChange={setQuery} />
          </div>
        </div>
      </section>

      <div className="container-page pt-8">
        <div className="lg:grid lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-12">
          <aside className="hidden lg:block" aria-label="Product filters">
            <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pb-10 pr-2">
              {data && <FilterPanel options={options} products={products} controls={controls} />}
            </div>
          </aside>

          <div>
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line pb-5">
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setDrawerOpen(true)}
                  className="inline-flex items-center gap-2 border border-line bg-paper px-4 py-2.5 text-sm font-medium lg:hidden"
                  aria-haspopup="dialog"
                >
                  <FilterIcon width={18} height={18} />
                  Filters
                  {activeCount > 0 && (
                    <span className="flex h-5 min-w-5 items-center justify-center bg-ink px-1 text-[11px] text-canvas">
                      {activeCount}
                    </span>
                  )}
                </button>
                <p className="text-sm text-muted" aria-live="polite">
                  {loading ? (
                    "Loading…"
                  ) : (
                    <>
                      <span className="font-semibold text-ink">{results.length}</span>{" "}
                      {results.length === 1 ? "product" : "products"}
                    </>
                  )}
                </p>
              </div>
              <SortDropdown value={filters.sort} onChange={setSort} />
            </div>

            {data && <ActiveFilters controls={controls} options={options} />}

            <div className="pt-8">
              {error ? (
                <ErrorState onRetry={reload} />
              ) : loading ? (
                <GridSkeleton count={8} />
              ) : results.length === 0 ? (
                <EmptyState
                  title="No products found"
                  message="Try changing your filters or search terms."
                  action={
                    <button type="button" className="btn-outline" onClick={clearAll}>
                      Clear all filters
                    </button>
                  }
                />
              ) : (
                <>
                  <ProductGrid products={visible} categories={categories} priorityCount={4} />
                  <div className="mt-16 flex flex-col items-center gap-5">
                    <p className="text-sm text-muted">
                      Showing {visible.length} of {results.length}
                    </p>
                    <div className="h-px w-48 bg-line">
                      <div
                        className="h-px bg-ink transition-all duration-500"
                        style={{ width: `${(visible.length / results.length) * 100}%` }}
                      />
                    </div>
                    {visible.length < results.length && (
                      <button
                        type="button"
                        className="btn-outline mt-2"
                        onClick={() => setVisibleCount((n) => n + PAGE_SIZE)}
                      >
                        Load more
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {drawerOpen && data && (
        <FilterDrawer
          onClose={() => setDrawerOpen(false)}
          options={options}
          controls={controls}
          products={products}
          resultCount={results.length}
        />
      )}
    </>
  );
}

function ActiveFilters({ controls, options }: { controls: CatalogFilterControls; options: FilterOptions }) {
  const { filters, toggleValue, setPrice, setQuery, clearAll } = controls;
  const chips: { label: string; onRemove: () => void }[] = [];

  if (filters.query) chips.push({ label: `“${filters.query}”`, onRemove: () => setQuery("") });
  for (const slug of filters.categories) {
    const name = options.categories.find((c) => c.slug === slug)?.name ?? slug;
    chips.push({ label: name, onRemove: () => toggleValue("categories", slug) });
  }
  for (const v of filters.materials) chips.push({ label: v, onRemove: () => toggleValue("materials", v) });
  for (const v of filters.styles) chips.push({ label: v, onRemove: () => toggleValue("styles", v) });
  for (const v of filters.brands) chips.push({ label: v, onRemove: () => toggleValue("brands", v) });
  for (const v of filters.statuses) chips.push({ label: statusLabels[v], onRemove: () => toggleValue("statuses", v) });
  if (filters.price) {
    const max = Math.min(filters.price.max, options.priceBounds.max);
    chips.push({
      label: `${formatPrice(filters.price.min)} – ${formatPrice(max)}`,
      onRemove: () => setPrice(null),
    });
  }

  if (chips.length === 0) return null;
  return (
    <div className="flex flex-wrap items-center gap-2 pt-5">
      {chips.map((chip) => (
        <button
          key={chip.label}
          type="button"
          onClick={chip.onRemove}
          className="inline-flex items-center gap-2 border border-line bg-paper py-1.5 pl-3 pr-2 text-xs text-ink-soft transition-colors hover:border-ink hover:text-ink"
          aria-label={`Remove filter ${chip.label}`}
        >
          {chip.label}
          <CloseIcon width={12} height={12} />
        </button>
      ))}
      <button
        type="button"
        onClick={clearAll}
        className="ml-1 text-xs text-muted underline underline-offset-4 hover:text-ink"
      >
        Clear all
      </button>
    </div>
  );
}

interface FilterDrawerProps {
  onClose: () => void;
  options: FilterOptions;
  controls: CatalogFilterControls;
  products: Product[];
  resultCount: number;
}

function FilterDrawer({ onClose, options, controls, products, resultCount }: FilterDrawerProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const previouslyFocused = document.activeElement as HTMLElement | null;
    panelRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
      previouslyFocused?.focus();
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Filters">
      <div className="absolute inset-0 animate-[fadeIn_.2s_ease] bg-ink/40" onClick={onClose} aria-hidden="true" />
      <div
        ref={panelRef}
        tabIndex={-1}
        className="absolute inset-y-0 left-0 flex w-full max-w-sm animate-[riseIn_.3s_ease] flex-col bg-canvas shadow-lift focus:outline-none"
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-line px-5">
          <p className="font-display text-2xl">Filter</p>
          <button type="button" onClick={onClose} className="-mr-2 p-2" aria-label="Close filters">
            <CloseIcon width={22} height={22} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-5">
          <FilterPanel options={options} products={products} controls={controls} />
        </div>
        <div className="shrink-0 border-t border-line p-5">
          <button type="button" onClick={onClose} className="btn-primary w-full">
            Show {resultCount} {resultCount === 1 ? "product" : "products"}
          </button>
        </div>
      </div>
    </div>
  );
}
