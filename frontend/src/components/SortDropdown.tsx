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
      <label htmlFor="sort" className="hidden text-sm text-muted sm:block">
        Sort by
      </label>
      <div className="relative">
        <select
          id="sort"
          value={value}
          onChange={(e) => onChange(e.target.value as SortOption)}
          className="min-h-11 cursor-pointer appearance-none rounded-lg border border-line bg-paper pl-3 pr-9 text-sm font-medium text-ink transition-colors hover:border-ink/40 focus:border-ink focus:outline-none"
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
