import { useEffect, useRef, useState, type FormEvent } from "react";
import { CloseIcon, SearchIcon } from "./Icons";

interface SearchBarProps {
  value: string;
  onChange?: (value: string) => void;
  /** Called on submit (Enter). */
  onSubmit?: (value: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
  /** Delay before `onChange` fires while typing. */
  debounceMs?: number;
  size?: "md" | "lg";
  id?: string;
}

export default function SearchBar({
  value,
  onChange,
  onSubmit,
  placeholder = "Search by name, brand, material, style or SKU",
  autoFocus,
  debounceMs = 250,
  size = "md",
  id = "search",
}: SearchBarProps) {
  const [draft, setDraft] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);
  const lastSent = useRef(value);

  // Follow external changes (e.g. "Clear all").
  useEffect(() => {
    if (value !== lastSent.current) {
      lastSent.current = value;
      setDraft(value);
    }
  }, [value]);

  useEffect(() => {
    if (!onChange || draft === lastSent.current) return;
    const timer = setTimeout(() => {
      lastSent.current = draft;
      onChange(draft);
    }, debounceMs);
    return () => clearTimeout(timer);
  }, [draft, debounceMs, onChange]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    lastSent.current = draft;
    onChange?.(draft);
    onSubmit?.(draft);
  };

  const clear = () => {
    setDraft("");
    lastSent.current = "";
    onChange?.("");
    inputRef.current?.focus();
  };

  const large = size === "lg";
  return (
    <form role="search" onSubmit={handleSubmit} className="relative w-full">
      <label htmlFor={id} className="sr-only">
        Search furniture
      </label>
      <SearchIcon
        className={`pointer-events-none absolute top-1/2 -translate-y-1/2 text-muted ${large ? "left-0" : "left-4"}`}
        width={large ? 24 : 18}
        height={large ? 24 : 18}
      />
      <input
        ref={inputRef}
        id={id}
        type="search"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        autoComplete="off"
        className={
          large
            ? "w-full border-0 border-b border-line bg-transparent py-4 pl-10 pr-10 font-display text-2xl text-ink placeholder:text-muted/60 focus:border-ink focus:outline-none sm:text-4xl [&::-webkit-search-cancel-button]:hidden"
            : "field pl-11 pr-10 [&::-webkit-search-cancel-button]:hidden"
        }
      />
      {draft && (
        <button
          type="button"
          onClick={clear}
          className={`absolute top-1/2 -translate-y-1/2 p-1 text-muted hover:text-ink ${large ? "right-0" : "right-3"}`}
          aria-label="Clear search"
        >
          <CloseIcon width={large ? 22 : 16} height={large ? 22 : 16} />
        </button>
      )}
    </form>
  );
}
