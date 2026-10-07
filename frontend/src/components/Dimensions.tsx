import { useId, useState } from "react";
import type { Product } from "../types/product";
import { feetAndInches, toInches } from "../utils/format";

export type Unit = "in" | "cm";

/** Formats a length (in the product's unit) as inches or cm. */
export function lengthLabel(value: number, product: Product, unit: Unit): string {
  if (unit === "cm") return `${product.dimension_unit === "cm" ? value : Math.round(value * 2.54)} cm`;
  return `${toInches(value, product.dimension_unit)}"`;
}

export function UnitToggle({ unit, onChange, light = false }: { unit: Unit; onChange: (u: Unit) => void; light?: boolean }) {
  return (
    <div className={`inline-flex rounded-full p-1 text-[13px] font-semibold ${light ? "bg-white/90" : "bg-sand"}`} role="group" aria-label="Units">
      {(["in", "cm"] as Unit[]).map((u) => (
        <button
          key={u}
          type="button"
          aria-pressed={unit === u}
          onClick={() => onChange(u)}
          className={`min-h-8 rounded-full px-3 ${unit === u ? "bg-ink text-white" : "text-ink-soft"}`}
        >
          {u === "in" ? "Inches" : "cm"}
        </button>
      ))}
    </div>
  );
}

/**
 * Width and height drawn over the product photo, like a tape measure.
 * The lines frame the photo, so they read as "this wide, this tall" rather than exact edges.
 */
export function DimensionOverlay({ product, unit }: { product: Product; unit: Unit }) {
  return (
    <div className="pointer-events-none absolute inset-0 animate-[fadeIn_.3s_ease] text-white" aria-hidden="true">
      <div className="absolute inset-0 bg-ink/25" />
      {/* Width */}
      <div className="absolute left-[8%] right-[8%] top-[19%] flex items-center">
        <span className="h-4 w-0.5 bg-white" />
        <span className="h-0.5 flex-1 bg-white" />
        <span className="mx-2 rounded-md bg-ink/85 px-2.5 py-1 text-sm font-bold sm:text-base">W {lengthLabel(product.width, product, unit)}</span>
        <span className="h-0.5 flex-1 bg-white" />
        <span className="h-4 w-0.5 bg-white" />
      </div>
      {/* Height */}
      <div className="absolute bottom-[18%] right-[5%] top-[28%] flex flex-col items-center">
        <span className="h-0.5 w-4 bg-white" />
        <span className="w-0.5 flex-1 bg-white" />
        <span className="my-2 rounded-md bg-ink/85 px-2.5 py-1 text-sm font-bold sm:text-base">H {lengthLabel(product.height, product, unit)}</span>
        <span className="w-0.5 flex-1 bg-white" />
        <span className="h-0.5 w-4 bg-white" />
      </div>
      {/* Depth */}
      <span className="absolute bottom-[6%] left-[8%] rounded-md bg-ink/85 px-2.5 py-1 text-sm font-bold sm:text-base">
        D {lengthLabel(product.depth, product, unit)}
      </span>
    </div>
  );
}

/** Front and top views drawn to scale, plus a "will it fit?" check against the customer's space. */
export function DimensionPlan({ product, label }: { product: Product; label: string }) {
  const [unit, setUnit] = useState<Unit>("in");
  const [space, setSpace] = useState("");
  const inputId = useId();
  const { width, depth, height } = product;

  // Shared scale so both views keep their true proportions.
  const max = Math.max(width, depth, height);
  const scale = 150 / max;
  const w = width * scale;
  const h = height * scale;
  const d = depth * scale;

  const widthIn = toInches(width, product.dimension_unit);
  const spaceFeet = parseFloat(space);
  const spaceIn = Number.isFinite(spaceFeet) && spaceFeet > 0 ? Math.round(spaceFeet * 12) : null;
  const spare = spaceIn !== null ? spaceIn - widthIn : null;

  return (
    <div className="rounded-xl border border-line p-4 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-lg font-bold">Will it fit?</h3>
        <UnitToggle unit={unit} onChange={setUnit} />
      </div>

      <div className="mt-5 grid gap-6 sm:grid-cols-2">
        <Figure title="Front view">
          <svg viewBox={`0 0 ${w + 90} ${h + 50}`} className="h-auto w-full max-w-[260px]" role="img" aria-label={`Front view: ${lengthLabel(width, product, unit)} wide, ${lengthLabel(height, product, unit)} high`}>
            <rect x="10" y="30" width={w} height={h} rx="4" className="fill-brand-soft stroke-brand" strokeWidth="1.5" />
            <text x={10 + w / 2} y={30 + h / 2} textAnchor="middle" dominantBaseline="middle" className="fill-brand" fontSize="11" fontWeight="600">
              {label.toUpperCase()}
            </text>
            <Measure x1={10} y1={18} x2={10 + w} y2={18} text={lengthLabel(width, product, unit)} />
            <Measure x1={w + 26} y1={30} x2={w + 26} y2={30 + h} text={lengthLabel(height, product, unit)} vertical />
          </svg>
        </Figure>
        <Figure title="Top view">
          <svg viewBox={`0 0 ${w + 90} ${d + 50}`} className="h-auto w-full max-w-[260px]" role="img" aria-label={`Top view: ${lengthLabel(width, product, unit)} wide, ${lengthLabel(depth, product, unit)} deep`}>
            <rect x="10" y="30" width={w} height={d} rx="4" className="fill-sand stroke-ink-soft" strokeWidth="1.5" />
            <Measure x1={10} y1={18} x2={10 + w} y2={18} text={lengthLabel(width, product, unit)} />
            <Measure x1={w + 26} y1={30} x2={w + 26} y2={30 + d} text={lengthLabel(depth, product, unit)} vertical />
          </svg>
        </Figure>
      </div>

      <p className="mt-4 text-sm text-muted">
        W × D × H: {lengthLabel(width, product, unit)} × {lengthLabel(depth, product, unit)} × {lengthLabel(height, product, unit)}
        {unit === "in" && <> · {feetAndInches(widthIn)} wide</>}
      </p>

      <div className="mt-5 rounded-lg bg-surface p-4">
        <label htmlFor={inputId} className="text-sm font-semibold">
          Space available on your wall (in feet)
        </label>
        <div className="mt-2 flex items-center gap-3">
          <input
            id={inputId}
            type="number"
            inputMode="decimal"
            min="1"
            step="0.5"
            placeholder="e.g. 9"
            value={space}
            onChange={(e) => setSpace(e.target.value)}
            className="field w-28"
          />
          <p className="text-sm" aria-live="polite">
            {spare === null ? (
              <span className="text-muted">We'll tell you if it fits.</span>
            ) : spare >= 6 ? (
              <span className="font-semibold text-success">Fits, with {feetAndInches(spare)} to spare.</span>
            ) : spare >= 0 ? (
              <span className="font-semibold text-warning">Just fits ({spare}" spare). Ask us about a smaller size.</span>
            ) : (
              <span className="font-semibold text-danger">{feetAndInches(-spare)} too wide. We can make it to your size.</span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

function Figure({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <figure>
      <figcaption className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted">{title}</figcaption>
      {children}
    </figure>
  );
}

function Measure({ x1, y1, x2, y2, text, vertical }: { x1: number; y1: number; x2: number; y2: number; text: string; vertical?: boolean }) {
  const cx = (x1 + x2) / 2;
  const cy = (y1 + y2) / 2;
  return (
    <g className="text-ink">
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="1" />
      {vertical ? (
        <>
          <line x1={x1 - 4} y1={y1} x2={x1 + 4} y2={y1} stroke="currentColor" />
          <line x1={x2 - 4} y1={y2} x2={x2 + 4} y2={y2} stroke="currentColor" />
          <text x={x1 + 8} y={cy} dominantBaseline="middle" fontSize="12" fontWeight="700" fill="currentColor">
            {text}
          </text>
        </>
      ) : (
        <>
          <line x1={x1} y1={y1 - 4} x2={x1} y2={y1 + 4} stroke="currentColor" />
          <line x1={x2} y1={y2 - 4} x2={x2} y2={y2 + 4} stroke="currentColor" />
          <text x={cx} y={y1 - 6} textAnchor="middle" fontSize="12" fontWeight="700" fill="currentColor">
            {text}
          </text>
        </>
      )}
    </g>
  );
}
