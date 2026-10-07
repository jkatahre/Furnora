import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import FilterPanel from "../components/FilterPanel";
import { CloseIcon, FilterIcon, RulerIcon, WhatsAppIcon } from "../components/Icons";
import ProductGrid from "../components/ProductGrid";
import SearchBar from "../components/SearchBar";
import SortDropdown from "../components/SortDropdown";
import { EmptyState, ErrorState, GridSkeleton } from "../components/States";
import { store } from "../config/store";
import { useAsync } from "../hooks/useAsync";
import { useCatalogFilters, type CatalogFilterControls } from "../hooks/useCatalogFilters";
import { productService } from "../services/productService";
import type { Category, FilterOptions, Product } from "../types/product";
import { buildFilterOptions, filterAndSortProducts } from "../utils/catalog";
import { whatsappLink } from "../utils/contact";
import { formatPrice, statusLabels } from "../utils/format";

const PAGE_SIZE = 12;

export default function Catalog() {
  const controls = useCatalogFilters();
  const { filters, setQuery, setSort, setOnly, clearAll, activeCount } = controls;
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

  const singleCategory = filters.categories.length === 1 ? categories.find((c) => c.slug === filters.categories[0]) : undefined;
  const singleRoom = filters.rooms.length === 1 ? store.rooms.find((r) => r.slug === filters.rooms[0]) : undefined;
  const title = singleCategory?.name ?? (singleRoom ? `${singleRoom.name} furniture` : filters.query ? `Results for “${filters.query}”` : "All furniture");

  useEffect(() => {
    document.title = `${title} · ${store.name}`;
  }, [title]);

  const visible = results.slice(0, visibleCount);

  // Quick chips: categories in the chosen room, or rooms when nothing is chosen.
  const quickCategories = singleRoom
    ? options.categories.filter((c) => c.rooms.includes(singleRoom.slug))
    : options.categories.filter((c) => products.some((p) => p.category_id === c.category_id && p.status === "active"));

  return (
    <>
      <section className="border-b border-line bg-surface">
        <div className="container-page pb-5 pt-6 md:pb-6 md:pt-8">
          <h1 className="text-3xl sm:text-4xl">{title}</h1>
          {singleCategory?.description && <p className="mt-1 text-muted">{singleCategory.description}</p>}
          <div className="mt-4 max-w-2xl">
            <SearchBar id="catalog-search" value={filters.query} onChange={setQuery} placeholder="Search sofa, bed, sheesham, king size…" />
          </div>
          <div className="scroll-row mt-4">
            <button type="button" onClick={() => setOnly("categories", null)} className={`chip ${filters.categories.length === 0 ? "chip-active" : ""}`}>
              All
            </button>
            {quickCategories.map((c) => (
              <button
                key={c.slug}
                type="button"
                onClick={() => setOnly("categories", filters.categories.length === 1 && filters.categories[0] === c.slug ? null : c.slug)}
                className={`chip ${filters.categories.length === 1 && filters.categories[0] === c.slug ? "chip-active" : ""}`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="container-page pt-4 lg:pt-8">
        <div className="lg:grid lg:grid-cols-[260px_minmax(0,1fr)] lg:gap-10">
          <aside className="hidden lg:block" aria-label="Product filters">
            <div className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pb-10 pr-2">
              {data && <FilterPanel options={options} products={products} categories={categories} controls={controls} />}
            </div>
          </aside>

          <div>
            <div className="sticky top-16 z-20 -mx-4 flex items-center justify-between gap-3 border-b border-line bg-canvas/95 px-4 py-2 backdrop-blur-md sm:-mx-6 sm:px-6 lg:static lg:mx-0 lg:bg-transparent lg:px-0 lg:pb-4 lg:pt-0">
              <button
                type="button"
                onClick={() => setDrawerOpen(true)}
                className="btn-outline min-h-11 px-4 text-sm lg:hidden"
                aria-haspopup="dialog"
              >
                <FilterIcon width={18} height={18} />
                Filters
                {activeCount > 0 && <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-ink px-1 text-[11px] text-white">{activeCount}</span>}
              </button>
              <p className="hidden text-sm text-muted lg:block" aria-live="polite">
                {loading ? "Loading…" : <><span className="font-semibold text-ink">{results.length}</span> designs</>}
              </p>
              <SortDropdown value={filters.sort} onChange={setSort} />
            </div>

            {data && <ActiveFilters controls={controls} options={options} />}
            <p className="pt-3 text-sm text-muted lg:hidden" aria-live="polite">
              {!loading && `${results.length} designs`}
            </p>

            <div className="pt-4">
              {error ? (
                <ErrorState onRetry={reload} />
              ) : loading ? (
                <GridSkeleton count={6} />
              ) : results.length === 0 ? (
                <EmptyState
                  title="Nothing matches yet"
                  message="Try fewer filters, or tell us what you're looking for. We can also make it to order."
                  action={
                    <div className="flex flex-col gap-3 sm:flex-row">
                      <a href={whatsappLink("general")} target="_blank" rel="noopener" className="btn-whatsapp">
                        <WhatsAppIcon /> Ask on WhatsApp
                      </a>
                      <button type="button" className="btn-outline" onClick={clearAll}>
                        Clear filters
                      </button>
                    </div>
                  }
                />
              ) : (
                <>
                  <ProductGrid products={visible} priorityCount={4} compact />
                  {visible.length < results.length && (
                    <div className="mt-10 flex flex-col items-center gap-3">
                      <p className="text-sm text-muted">
                        Showing {visible.length} of {results.length}
                      </p>
                      <button type="button" className="btn-outline w-full sm:w-auto" onClick={() => setVisibleCount((n) => n + PAGE_SIZE)}>
                        Show more
                      </button>
                    </div>
                  )}
                  <CustomPrompt />
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
          categories={categories}
          resultCount={results.length}
        />
      )}
    </>
  );
}

/** Shown under the results: the custom furniture fallback. */
function CustomPrompt() {
  return (
    <div className="mt-12 flex flex-col items-start gap-4 rounded-xl bg-brand-soft p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
      <div className="flex gap-3">
        <RulerIcon className="mt-0.5 shrink-0 text-brand" width={24} height={24} />
        <div>
          <p className="font-bold">{store.custom.title}</p>
          <p className="text-sm text-ink-soft">{store.custom.subtitle}</p>
        </div>
      </div>
      <Link to="/custom-furniture" className="btn-primary w-full shrink-0 sm:w-auto">
        Custom furniture
      </Link>
    </div>
  );
}

function ActiveFilters({ controls, options }: { controls: CatalogFilterControls; options: FilterOptions }) {
  const { filters, toggleValue, setPrice, setQuery, clearAll } = controls;
  const chips: { label: string; onRemove: () => void }[] = [];

  if (filters.query) chips.push({ label: `“${filters.query}”`, onRemove: () => setQuery("") });
  for (const slug of filters.rooms) {
    chips.push({ label: options.rooms.find((r) => r.slug === slug)?.name ?? slug, onRemove: () => toggleValue("rooms", slug) });
  }
  for (const slug of filters.categories) {
    chips.push({ label: options.categories.find((c) => c.slug === slug)?.name ?? slug, onRemove: () => toggleValue("categories", slug) });
  }
  for (const key of ["materials", "colors", "sizes", "styles"] as const) {
    for (const v of filters[key]) chips.push({ label: v, onRemove: () => toggleValue(key, v) });
  }
  for (const v of filters.statuses) chips.push({ label: statusLabels[v], onRemove: () => toggleValue("statuses", v) });
  if (filters.price) {
    const max = filters.price.max >= Number.MAX_SAFE_INTEGER ? null : filters.price.max;
    chips.push({
      label: max === null ? `Above ${formatPrice(filters.price.min)}` : `${formatPrice(filters.price.min)} – ${formatPrice(max)}`,
      onRemove: () => setPrice(null),
    });
  }

  if (chips.length === 0) return null;
  return (
    <div className="flex flex-wrap items-center gap-2 pt-3">
      {chips.map((chip) => (
        <button key={chip.label} type="button" onClick={chip.onRemove} className="chip min-h-9 gap-1.5 pr-3 text-[13px]" aria-label={`Remove filter ${chip.label}`}>
          {chip.label}
          <CloseIcon width={14} height={14} />
        </button>
      ))}
      <button type="button" onClick={clearAll} className="min-h-9 px-2 text-[13px] text-muted underline underline-offset-4 hover:text-ink">
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
  categories: Category[];
  resultCount: number;
}

function FilterDrawer({ onClose, options, controls, products, categories, resultCount }: FilterDrawerProps) {
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
        className="absolute inset-x-0 bottom-0 flex max-h-[90vh] animate-[slideUp_.25s_var(--ease-gentle)] flex-col rounded-t-2xl bg-canvas focus:outline-none"
      >
        <div className="flex h-14 shrink-0 items-center justify-between border-b border-line px-4">
          <p className="text-lg font-bold">Filter</p>
          <button type="button" onClick={onClose} className="-mr-2 flex h-11 w-11 items-center justify-center" aria-label="Close filters">
            <CloseIcon width={22} height={22} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-4 py-2">
          <FilterPanel options={options} products={products} categories={categories} controls={controls} />
        </div>
        <div className="shrink-0 border-t border-line p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
          <button type="button" onClick={onClose} className="btn-dark w-full">
            Show {resultCount} {resultCount === 1 ? "design" : "designs"}
          </button>
        </div>
      </div>
    </div>
  );
}
