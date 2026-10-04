import { useEffect, useState, type ReactNode } from "react";
import type { CatalogFilterControls } from "../hooks/useCatalogFilters";
import type { FilterOptions, PriceRange, Product } from "../types/product";
import { formatPrice, statusLabels } from "../utils/format";
import { ChevronDownIcon } from "./Icons";

interface FilterPanelProps {
  options: FilterOptions;
  products: Product[];
  controls: CatalogFilterControls;
}

export default function FilterPanel({ options, products, controls }: FilterPanelProps) {
  const { filters, toggleValue, setPrice, clearAll, activeCount } = controls;

  const countBy = (pick: (p: Product) => string) => {
    const counts = new Map<string, number>();
    for (const p of products) counts.set(pick(p), (counts.get(pick(p)) ?? 0) + 1);
    return counts;
  };
  const categorySlugById = new Map(options.categories.map((c) => [c.category_id, c.slug]));
  const categoryCounts = countBy((p) => categorySlugById.get(p.category_id) ?? "");
  const brandCounts = countBy((p) => p.brand);
  const materialCounts = countBy((p) => p.material);
  const styleCounts = countBy((p) => p.style);
  const statusCounts = countBy((p) => p.status);

  return (
    <div className="divide-y divide-line">
      <div className="flex items-center justify-between pb-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em]">Filters</p>
        {activeCount > 0 && (
          <button
            type="button"
            onClick={clearAll}
            className="text-xs text-muted underline underline-offset-4 hover:text-ink"
          >
            Clear all ({activeCount})
          </button>
        )}
      </div>

      <FilterSection title="Category" activeCount={filters.categories.length}>
        {options.categories.map((category) => (
          <Checkbox
            key={category.slug}
            label={category.name}
            count={categoryCounts.get(category.slug)}
            checked={filters.categories.includes(category.slug)}
            onChange={() => toggleValue("categories", category.slug)}
          />
        ))}
      </FilterSection>

      <FilterSection title="Price" activeCount={filters.price ? 1 : 0}>
        <PriceSlider bounds={options.priceBounds} value={filters.price} onChange={setPrice} />
      </FilterSection>

      <FilterSection title="Material" activeCount={filters.materials.length}>
        {options.materials.map((material) => (
          <Checkbox
            key={material}
            label={material}
            count={materialCounts.get(material)}
            checked={filters.materials.includes(material)}
            onChange={() => toggleValue("materials", material)}
          />
        ))}
      </FilterSection>

      <FilterSection title="Style" activeCount={filters.styles.length}>
        {options.styles.map((style) => (
          <Checkbox
            key={style}
            label={style}
            count={styleCounts.get(style)}
            checked={filters.styles.includes(style)}
            onChange={() => toggleValue("styles", style)}
          />
        ))}
      </FilterSection>

      <FilterSection title="Brand" activeCount={filters.brands.length}>
        {options.brands.map((brand) => (
          <Checkbox
            key={brand}
            label={brand}
            count={brandCounts.get(brand)}
            checked={filters.brands.includes(brand)}
            onChange={() => toggleValue("brands", brand)}
          />
        ))}
      </FilterSection>

      <FilterSection title="Availability" activeCount={filters.statuses.length}>
        {options.statuses.map((status) => (
          <Checkbox
            key={status}
            label={statusLabels[status]}
            count={statusCounts.get(status)}
            checked={filters.statuses.includes(status)}
            onChange={() => toggleValue("statuses", status)}
          />
        ))}
      </FilterSection>
    </div>
  );
}

function FilterSection({ title, activeCount, children }: { title: string; activeCount: number; children: ReactNode }) {
  return (
    <details open className="group py-4 [&_summary::-webkit-details-marker]:hidden">
      <summary className="flex cursor-pointer list-none items-center justify-between py-1 text-sm font-semibold">
        <span>
          {title}
          {activeCount > 0 && <span className="ml-2 text-xs font-normal text-accent-dark">({activeCount})</span>}
        </span>
        <ChevronDownIcon width={16} height={16} className="text-muted transition-transform group-open:rotate-180" />
      </summary>
      <fieldset className="mt-3 space-y-1">
        <legend className="sr-only">{title}</legend>
        {children}
      </fieldset>
    </details>
  );
}

interface CheckboxProps {
  label: string;
  count?: number;
  checked: boolean;
  onChange: () => void;
}

function Checkbox({ label, count, checked, onChange }: CheckboxProps) {
  return (
    <label className="flex cursor-pointer items-center gap-3 py-1 text-sm text-ink-soft hover:text-ink">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-4 w-4 shrink-0 cursor-pointer appearance-none border border-ink/30 bg-paper bg-center bg-no-repeat transition-colors checked:border-ink checked:bg-ink checked:bg-[url('data:image/svg+xml;utf8,<svg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%2016%2016%22><path%20d=%22M4%208.5l2.5%202.5L12%205.5%22%20fill=%22none%22%20stroke=%22white%22%20stroke-width=%221.8%22/></svg>')]"
      />
      <span className="flex-1">{label}</span>
      {count !== undefined && <span className="text-xs text-muted">{count}</span>}
    </label>
  );
}

const PRICE_STEP = 500;

function PriceSlider({
  bounds,
  value,
  onChange,
}: {
  bounds: PriceRange;
  value: PriceRange | null;
  onChange: (range: PriceRange | null) => void;
}) {
  const current = {
    min: Math.max(bounds.min, value?.min ?? bounds.min),
    max: Math.min(bounds.max, value?.max ?? bounds.max),
  };
  const [draft, setDraft] = useState(current);
  const [dirty, setDirty] = useState(false);

  // Follow external changes (e.g. "Clear all") unless the user is mid-drag.
  useEffect(() => {
    if (!dirty) setDraft(current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current.min, current.max]);

  // Commit after the user pauses.
  useEffect(() => {
    if (!dirty) return;
    const timer = setTimeout(() => {
      setDirty(false);
      const isFullRange = draft.min <= bounds.min && draft.max >= bounds.max;
      onChange(isFullRange ? null : draft);
    }, 350);
    return () => clearTimeout(timer);
  }, [draft, dirty, bounds, onChange]);

  const span = bounds.max - bounds.min || 1;
  const left = ((draft.min - bounds.min) / span) * 100;
  const right = 100 - ((draft.max - bounds.min) / span) * 100;

  const update = (next: PriceRange) => {
    setDirty(true);
    setDraft(next);
  };

  return (
    <div className="pt-1">
      <div className="relative h-5">
        <div className="absolute top-1/2 h-px w-full -translate-y-1/2 bg-line" />
        <div
          className="absolute top-1/2 h-0.5 -translate-y-1/2 bg-ink"
          style={{ left: `${left}%`, right: `${right}%` }}
        />
        <input
          type="range"
          aria-label="Minimum price"
          min={bounds.min}
          max={bounds.max}
          step={PRICE_STEP}
          value={draft.min}
          onChange={(e) => update({ ...draft, min: Math.min(Number(e.target.value), draft.max - PRICE_STEP) })}
          className="range-thumb absolute inset-0 h-5 w-full"
        />
        <input
          type="range"
          aria-label="Maximum price"
          min={bounds.min}
          max={bounds.max}
          step={PRICE_STEP}
          value={draft.max}
          onChange={(e) => update({ ...draft, max: Math.max(Number(e.target.value), draft.min + PRICE_STEP) })}
          className="range-thumb absolute inset-0 h-5 w-full"
        />
      </div>
      <div className="mt-3 flex items-center justify-between text-sm text-ink-soft" aria-live="polite">
        <span>{formatPrice(draft.min)}</span>
        <span className="text-muted">to</span>
        <span>{formatPrice(draft.max)}</span>
      </div>
    </div>
  );
}
