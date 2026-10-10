import { useEffect, useState, type ReactNode } from "react";
import { store } from "../config/store";
import type { CatalogFilterControls, ListKey } from "../hooks/useCatalogFilters";
import type { Category, FilterOptions, PriceRange, Product } from "../types/product";
import { materialFamilies } from "../utils/catalog";
import { formatPrice, statusLabels } from "../utils/format";
import { CheckIcon, ChevronDownIcon } from "./Icons";

interface FilterPanelProps {
  options: FilterOptions;
  products: Product[];
  categories: Category[];
  controls: CatalogFilterControls;
}

/** Quick price ranges; the slider below allows any range. */
const priceBuckets: { label: string; range: PriceRange }[] = [
  { label: "Under ₹25,000", range: { min: 0, max: 25000 } },
  { label: "₹25,000 – ₹50,000", range: { min: 25000, max: 50000 } },
  { label: "₹50,000 – ₹1 lakh", range: { min: 50000, max: 100000 } },
  { label: "Above ₹1 lakh", range: { min: 100000, max: Number.MAX_SAFE_INTEGER } },
];

export default function FilterPanel({ options, products, categories, controls }: FilterPanelProps) {
  const { filters, toggleValue, setPrice, clearAll, activeCount } = controls;

  const countBy = (pick: (p: Product) => string[]) => {
    const counts = new Map<string, number>();
    for (const p of products) for (const v of pick(p)) counts.set(v, (counts.get(v) ?? 0) + 1);
    return counts;
  };
  const categoryById = new Map(categories.map((c) => [c.category_id, c]));
  const counts: Record<ListKey, Map<string, number>> = {
    categories: countBy((p) => [categoryById.get(p.category_id)?.slug ?? ""]),
    rooms: countBy((p) => categoryById.get(p.category_id)?.rooms ?? []),
    materials: countBy(materialFamilies),
    colors: countBy((p) => p.colors ?? []),
    sizes: countBy((p) => (p.size ? [p.size] : [])),
    styles: countBy((p) => [p.style]),
    statuses: countBy((p) => [p.status]),
  };

  const list = (key: ListKey, values: { value: string; label: string }[]) =>
    values.map(({ value, label }) => (
      <Checkbox
        key={value}
        label={label}
        count={counts[key].get(value)}
        checked={(filters[key] as string[]).includes(value)}
        onChange={() => toggleValue(key, value)}
      />
    ));

  const isBucket = (r: PriceRange) => filters.price?.min === r.min && filters.price?.max === r.max;

  return (
    <div className="divide-y divide-line">
      <div className="flex items-center justify-between pb-3">
        <p className="font-bold">Filters</p>
        {activeCount > 0 && (
          <button type="button" onClick={clearAll} className="min-h-10 text-sm text-muted underline underline-offset-4 hover:text-ink">
            Clear all ({activeCount})
          </button>
        )}
      </div>

      {options.rooms.length > 1 && (
        <FilterSection title="Room" activeCount={filters.rooms.length}>
          {list("rooms", options.rooms.map((r) => ({ value: r.slug, label: r.name })))}
        </FilterSection>
      )}

      <FilterSection title="Category" activeCount={filters.categories.length}>
        {list("categories", options.categories.map((c) => ({ value: c.slug, label: c.name })))}
      </FilterSection>

      <FilterSection title="Price" activeCount={filters.price ? 1 : 0}>
        <div className="mb-4 flex flex-wrap gap-2">
          {priceBuckets.map((b) => (
            <button
              key={b.label}
              type="button"
              aria-pressed={isBucket(b.range)}
              onClick={() => setPrice(isBucket(b.range) ? null : b.range)}
              className={`chip min-h-9 px-3 text-[13px] ${isBucket(b.range) ? "chip-active" : ""}`}
            >
              {b.label}
            </button>
          ))}
        </div>
        <PriceSlider bounds={options.priceBounds} value={filters.price} onChange={setPrice} />
      </FilterSection>

      <FilterSection title="Material" activeCount={filters.materials.length}>
        {list("materials", options.materials.map((m) => ({ value: m, label: m })))}
      </FilterSection>

      <FilterSection title="Colour" activeCount={filters.colors.length}>
        <div className="grid grid-cols-2 gap-1">
          {options.colors.map((c) => {
            const checked = filters.colors.includes(c);
            return (
              <button
                key={c}
                type="button"
                aria-pressed={checked}
                onClick={() => toggleValue("colors", c)}
                className="flex min-h-11 items-center gap-2.5 rounded-lg px-1 text-left text-sm text-ink-soft hover:text-ink"
              >
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border ${checked ? "border-ink ring-2 ring-ink ring-offset-2" : "border-ink/15"}`}
                  style={{ background: store.colours[c] }}
                >
                  {checked && <CheckIcon width={14} height={14} className="text-white mix-blend-difference" />}
                </span>
                {c}
                <span className="ml-auto text-xs text-muted">{counts.colors.get(c)}</span>
              </button>
            );
          })}
        </div>
      </FilterSection>

      {options.sizes.length > 0 && (
        <FilterSection title="Size" activeCount={filters.sizes.length}>
          {list("sizes", options.sizes.map((s) => ({ value: s, label: s })))}
        </FilterSection>
      )}

      <FilterSection title="Style" activeCount={filters.styles.length} defaultOpen={false}>
        {list("styles", options.styles.map((s) => ({ value: s, label: s })))}
      </FilterSection>

      {options.statuses.length > 1 && (
        <FilterSection title="Availability" activeCount={filters.statuses.length} defaultOpen={false}>
          {list("statuses", options.statuses.map((s) => ({ value: s, label: statusLabels[s] })))}
        </FilterSection>
      )}
    </div>
  );
}

function FilterSection({
  title,
  activeCount,
  defaultOpen = true,
  children,
}: {
  title: string;
  activeCount: number;
  defaultOpen?: boolean;
  children: ReactNode;
}) {
  return (
    <details open={defaultOpen || activeCount > 0} className="group py-2 [&_summary::-webkit-details-marker]:hidden">
      <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between text-[15px] font-semibold">
        <span>
          {title}
          {activeCount > 0 && <span className="ml-2 rounded-full bg-ink px-1.5 py-0.5 text-[11px] text-white">{activeCount}</span>}
        </span>
        <ChevronDownIcon width={18} height={18} className="text-muted transition-transform group-open:rotate-180" />
      </summary>
      <fieldset className="pb-3 pt-1">
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
    <label className="flex min-h-11 cursor-pointer items-center gap-3 text-[15px] text-ink-soft hover:text-ink">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="h-5 w-5 shrink-0 cursor-pointer appearance-none rounded border border-ink/30 bg-paper bg-center bg-no-repeat transition-colors checked:border-ink checked:bg-ink checked:bg-[url('data:image/svg+xml;utf8,<svg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%2016%2016%22><path%20d=%22M4%208.5l2.5%202.5L12%205.5%22%20fill=%22none%22%20stroke=%22white%22%20stroke-width=%221.8%22/></svg>')]"
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
    <div className="px-1 pt-1">
      <div className="relative h-7">
        <div className="absolute top-1/2 h-1 w-full -translate-y-1/2 rounded-full bg-line" />
        <div className="absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-ink" style={{ left: `${left}%`, right: `${right}%` }} />
        <input
          type="range"
          aria-label="Minimum price"
          min={bounds.min}
          max={bounds.max}
          step={PRICE_STEP}
          value={draft.min}
          onChange={(e) => update({ ...draft, min: Math.min(Number(e.target.value), draft.max - PRICE_STEP) })}
          className="range-thumb absolute inset-0 h-7 w-full"
        />
        <input
          type="range"
          aria-label="Maximum price"
          min={bounds.min}
          max={bounds.max}
          step={PRICE_STEP}
          value={draft.max}
          onChange={(e) => update({ ...draft, max: Math.max(Number(e.target.value), draft.min + PRICE_STEP) })}
          className="range-thumb absolute inset-0 h-7 w-full"
        />
      </div>
      <div className="mt-2 flex items-center justify-between text-sm font-medium" aria-live="polite">
        <span>{formatPrice(draft.min)}</span>
        <span className="text-muted">to</span>
        <span>{formatPrice(draft.max)}</span>
      </div>
    </div>
  );
}
