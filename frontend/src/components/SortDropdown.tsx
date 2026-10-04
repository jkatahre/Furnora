import type { SortOption } from "../types/product";
import { sortLabels } from "../utils/catalog";
import { ChevronDownIcon } from "./Icons";

interface SortDropdownProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export default function SortDropdown({ value, onChange }: SortDropdownProps) {
  return (
    <div className="flex items-center gap-3">
      <label htmlFor="sort" className="hidden text-xs font-semibold uppercase tracking-[0.16em] text-muted sm:block">
        Sort by
      </label>
      <div className="relative">
        <select
          id="sort"
          value={value}
          onChange={(e) => onChange(e.target.value as SortOption)}
          className="cursor-pointer appearance-none border border-line bg-paper py-2.5 pl-4 pr-10 text-sm text-ink transition-colors hover:border-ink/40 focus:border-ink focus:outline-none"
          aria-label="Sort products"
        >
          {(Object.keys(sortLabels) as SortOption[]).map((option) => (
            <option key={option} value={option}>
              {sortLabels[option]}
            </option>
          ))}
        </select>
        <ChevronDownIcon
          width={16}
          height={16}
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted"
        />
      </div>
    </div>
  );
}
