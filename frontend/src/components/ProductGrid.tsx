import { featuredProductIds } from "../data/products";
import type { Product } from "../types/product";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  /** Number of leading cards whose images load eagerly. */
  priorityCount?: number;
  /** Fewer columns, for use beside a filter sidebar. */
  compact?: boolean;
}

/** Two columns on phones, like the shopping apps people already use. */
export default function ProductGrid({ products, priorityCount = 0, compact = false }: ProductGridProps) {
  return (
    <ul className={`grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 md:grid-cols-3 ${compact ? "" : "xl:grid-cols-4"}`}>
      {products.map((product, index) => (
        <li key={product.product_id} className="flex">
          <div className="h-full w-full">
            <ProductCard product={product} priority={index < priorityCount} bestseller={featuredProductIds.includes(product.product_id)} />
          </div>
        </li>
      ))}
    </ul>
  );
}

/** A horizontally scrolling row of cards on phones, a grid on larger screens. */
export function ProductRow({ products }: { products: Product[] }) {
  return (
    <ul className="scroll-row md:mx-0 md:grid md:grid-cols-3 md:gap-x-5 md:gap-y-8 md:overflow-visible md:px-0 xl:grid-cols-4">
      {products.map((product, index) => (
        <li key={product.product_id} className="flex w-[46%] shrink-0 sm:w-[38%] md:w-auto">
          <div className="h-full w-full">
            <ProductCard product={product} priority={index < 2} bestseller={featuredProductIds.includes(product.product_id)} />
          </div>
        </li>
      ))}
    </ul>
  );
}
