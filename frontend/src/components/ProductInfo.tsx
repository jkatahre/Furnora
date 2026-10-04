import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import type { Category, Product } from "../types/product";
import { formatDimensions, formatWeight } from "../utils/format";
import { ArrowRightIcon, RulerIcon, ShieldIcon, WeightIcon } from "./Icons";
import PriceTag from "./PriceTag";
import StatusBadge from "./StatusBadge";

interface ProductInfoProps {
  product: Product;
  category?: Category;
}

const availabilityNote: Record<Product["status"], string> = {
  active: "This piece is available. Enquire for delivery details or to see it in person.",
  draft: "This piece is launching soon. Enquire to be notified when it arrives.",
  inactive: "This piece is currently unavailable. Explore similar designs below.",
};

export default function ProductInfo({ product, category }: ProductInfoProps) {
  return (
    <div className="flex flex-col">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        <p className="eyebrow">{product.brand}</p>
        {category && (
          <>
            <span className="h-3 w-px bg-line" aria-hidden="true" />
            <Link
              to={`/catalog?category=${category.slug}`}
              className="text-xs uppercase tracking-[0.16em] text-muted hover:text-ink"
            >
              {category.name}
            </Link>
          </>
        )}
      </div>

      <h1 className="mt-4 text-4xl sm:text-5xl lg:text-[3.4rem]">{product.name}</h1>
      <p className="mt-3 text-xs uppercase tracking-[0.16em] text-muted">
        SKU <span className="text-ink-soft">{product.sku}</span>
      </p>

      <div className="mt-8">
        <PriceTag product={product} size="lg" />
        <p className="mt-2 text-xs text-muted">Inclusive of all taxes</p>
      </div>

      <p className="mt-8 max-w-prose text-[15px] leading-relaxed text-ink-soft">{product.description}</p>

      <dl className="mt-10 grid grid-cols-1 border-y border-line sm:grid-cols-3 sm:divide-x sm:divide-line">
        <QuickFact icon={<RulerIcon />} label="W × D × H" value={formatDimensions(product)} />
        <QuickFact icon={<WeightIcon />} label="Weight" value={formatWeight(product)} />
        <QuickFact icon={<ShieldIcon />} label="Warranty" value={product.warranty} />
      </dl>

      <div className="mt-8 bg-surface p-5">
        <StatusBadge status={product.status} className="text-sm" />
        <p className="mt-2 text-sm text-muted">{availabilityNote[product.status]}</p>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link to={`/contact?product=${product.slug}`} className="btn-primary flex-1">
          Make an enquiry
        </Link>
        <a href="#specifications" className="btn-outline flex-1">
          Full specifications
        </a>
      </div>

      <Link to="/catalog" className="link-underline mt-8 self-start text-muted hover:text-ink">
        Continue exploring <ArrowRightIcon width={14} height={14} />
      </Link>
    </div>
  );
}

function QuickFact({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 border-b border-line py-4 last:border-b-0 sm:flex-col sm:items-start sm:gap-2 sm:border-b-0 sm:px-5 sm:first:pl-0">
      <span className="text-accent-dark">{icon}</span>
      <div>
        <dt className="text-[11px] uppercase tracking-[0.16em] text-muted">{label}</dt>
        <dd className="mt-0.5 text-sm font-semibold text-ink">{value}</dd>
      </div>
    </div>
  );
}
