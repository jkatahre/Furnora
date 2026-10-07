import type { ReactNode } from "react";
import { store } from "../config/store";
import type { Category, Product } from "../types/product";
import { formatDimensions, formatDimensionsInches, formatWeight, isCustomisable, leadTime, statusLabels } from "../utils/format";
import { ChevronDownIcon } from "./Icons";

interface ProductSpecificationsProps {
  product: Product;
  category?: Category;
}

/** Specifications and policies as short tables in accordions, not paragraphs. */
export default function ProductSpecifications({ product, category }: ProductSpecificationsProps) {
  const { policies } = store;
  return (
    <div className="divide-y divide-line border-y border-line">
      <Accordion title="Specifications" open>
        <Table
          rows={[
            ["Category", category?.name ?? "—"],
            ["Material", product.material],
            ["Colour", product.colors?.join(", ") ?? "—"],
            ["Size", product.size ?? "—"],
            ["Dimensions (W × D × H)", `${formatDimensionsInches(product)} · ${formatDimensions(product)}`],
            ["Weight", formatWeight(product)],
            ["Style", product.style],
            ["Warranty", product.warranty],
            ["Availability", statusLabels[product.status]],
            ["Product code", product.sku],
          ]}
        />
        <p className="mt-4 text-[15px] leading-relaxed text-ink-soft">{product.description}</p>
      </Accordion>
      <Accordion title="Delivery & installation">
        <Table
          rows={[
            ["Delivery time", leadTime(product)],
            ...store.deliveryAreas.map((a): [string, string] => [a.city, `${a.fee === 0 ? "Free" : `₹${a.fee.toLocaleString("en-IN")}`} · ${a.time}`]),
            ["Installation", policies.installation],
          ]}
        />
      </Accordion>
      {isCustomisable(product) && (
        <Accordion title="Customisation">
          <ul className="flex flex-wrap gap-2">
            {policies.customisationOptions.map((o) => (
              <li key={o} className="rounded-full bg-brand-soft px-3 py-1.5 text-sm font-medium text-brand-dark">
                {o}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-sm text-muted">{store.custom.leadTime}. Share your size on WhatsApp for a quote.</p>
        </Accordion>
      )}
      <Accordion title="Warranty, returns & care">
        <Table
          rows={[
            ["Warranty", product.warranty],
            ["Returns", policies.returns],
            ["Care", policies.care],
          ]}
        />
      </Accordion>
    </div>
  );
}

function Accordion({ title, open, children }: { title: string; open?: boolean; children: ReactNode }) {
  return (
    <details open={open} className="group [&_summary::-webkit-details-marker]:hidden">
      <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 text-[17px] font-bold">
        {title}
        <ChevronDownIcon className="shrink-0 text-muted transition-transform group-open:rotate-180" />
      </summary>
      <div className="pb-6">{children}</div>
    </details>
  );
}

function Table({ rows }: { rows: [string, string][] }) {
  return (
    <table className="w-full text-sm">
      <tbody>
        {rows.filter(([, value]) => value !== "—").map(([label, value]) => (
          <tr key={label} className="border-b border-line last:border-0">
            <th scope="row" className="w-2/5 py-2.5 pr-4 text-left align-top font-normal text-muted">
              {label}
            </th>
            <td className="py-2.5 align-top font-medium">{value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
