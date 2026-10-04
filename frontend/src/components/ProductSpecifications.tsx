import type { ReactNode } from "react";
import type { Category, Product } from "../types/product";
import { discountPercent, formatDate, formatDimensions, formatPrice, formatWeight, hasDiscount } from "../utils/format";
import StatusBadge from "./StatusBadge";

interface ProductSpecificationsProps {
  product: Product;
  category?: Category;
}

export default function ProductSpecifications({ product, category }: ProductSpecificationsProps) {
  const discounted = hasDiscount(product);
  return (
    <div className="grid gap-x-16 gap-y-12 md:grid-cols-2">
      <SpecGroup title="Overview">
        <Spec label="Product Name" value={product.name} />
        <Spec label="Brand" value={product.brand} />
        <Spec label="SKU" value={product.sku} />
        <Spec label="Category" value={category?.name ?? "—"} />
        <Spec label="Description" value={product.description} wide />
      </SpecGroup>

      <SpecGroup title="Pricing">
        <Spec label="Base Price" value={formatPrice(product.base_price)} />
        <Spec label="Sale Price" value={discounted ? formatPrice(product.sale_price!) : "—"} />
        <Spec
          label="Discount"
          value={
            discounted
              ? `${discountPercent(product)}% (save ${formatPrice(product.base_price - product.sale_price!)})`
              : "—"
          }
        />
      </SpecGroup>

      <SpecGroup title="Material & Style">
        <Spec label="Material" value={product.material} />
        <Spec label="Style" value={product.style} />
        <Spec label="Brand" value={product.brand} />
      </SpecGroup>

      <SpecGroup title="Dimensions">
        <div className="mb-6 flex flex-col items-start gap-6 bg-surface p-6 sm:flex-row sm:items-center">
          <DimensionDiagram />
          <div>
            <p className="text-[11px] uppercase tracking-[0.16em] text-muted">Width × Depth × Height</p>
            <p className="mt-1 font-display text-3xl">{formatDimensions(product)}</p>
            <p className="mt-2 text-sm text-ink-soft">
              Weight: <span className="font-semibold">{formatWeight(product)}</span>
            </p>
          </div>
        </div>
        <Spec label="Width" value={String(product.width)} />
        <Spec label="Depth" value={String(product.depth)} />
        <Spec label="Height" value={String(product.height)} />
        <Spec label="Dimension Unit" value={product.dimension_unit} />
        <Spec label="Weight" value={String(product.weight)} />
        <Spec label="Weight Unit" value={product.weight_unit} />
      </SpecGroup>

      <SpecGroup title="Warranty">
        <Spec label="Warranty" value={product.warranty} />
      </SpecGroup>

      <SpecGroup title="Availability">
        <Spec label="Status" value={<StatusBadge status={product.status} className="text-sm" />} />
        <Spec label="Added" value={formatDate(product.created_at)} />
        <Spec label="Last Updated" value={formatDate(product.updated_at)} />
      </SpecGroup>
    </div>
  );
}

function SpecGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={`spec-${title}`}>
      <h3 id={`spec-${title}`} className="mb-4 border-b border-ink pb-3 font-sans text-xs font-semibold uppercase tracking-[0.2em]">
        {title}
      </h3>
      <dl>{children}</dl>
    </section>
  );
}

function Spec({ label, value, wide }: { label: string; value: ReactNode; wide?: boolean }) {
  return (
    <div
      className={`grid gap-1 border-b border-line py-3.5 text-sm ${wide ? "" : "grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-4"}`}
    >
      <dt className="text-muted">{label}</dt>
      <dd className={`text-ink ${wide ? "leading-relaxed text-ink-soft" : "font-medium"}`}>{value}</dd>
    </div>
  );
}

/** A schematic box labelled W / D / H. */
function DimensionDiagram() {
  return (
    <svg viewBox="0 0 120 90" className="h-20 w-28 shrink-0 text-ink" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.2">
        <path d="M20 35 L70 35 L70 75 L20 75 Z" />
        <path d="M20 35 L45 18 L95 18 L70 35" />
        <path d="M70 75 L95 58 L95 18" />
      </g>
      <g stroke="var(--color-accent)" strokeWidth="1" fill="none">
        <path d="M20 82 L70 82" />
        <path d="M75 82 L100 65" />
        <path d="M104 18 L104 58" />
      </g>
      <g fill="var(--color-accent-dark)" fontSize="9" fontFamily="Manrope, sans-serif" fontWeight="600">
        <text x="42" y="90">W</text>
        <text x="91" y="80">D</text>
        <text x="108" y="41">H</text>
      </g>
    </svg>
  );
}
