import type { ProductStatus } from "../types/product";
import { statusLabels } from "../utils/format";

const textColor: Record<ProductStatus, string> = {
  active: "text-success",
  draft: "text-warning",
  inactive: "text-danger",
};

const dotColor: Record<ProductStatus, string> = {
  active: "bg-success",
  draft: "bg-warning",
  inactive: "bg-danger",
};

export default function StatusBadge({ status, className = "" }: { status: ProductStatus; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${textColor[status]} ${className}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${dotColor[status]}`} aria-hidden="true" />
      {statusLabels[status]}
    </span>
  );
}
