import type { Category, Product } from "../types/product";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  categories?: Category[];
  /** Number of leading cards whose images load eagerly. */
  priorityCount?: number;
}

export default function ProductGrid({ products, categories = [], priorityCount = 0 }: ProductGridProps) {
  const categoryNames = new Map(categories.map((c) => [c.category_id, c.name]));
  return (
    <ul className="grid grid-cols-1 gap-x-5 gap-y-12 min-[440px]:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
      {products.map((product, index) => (
        <li key={product.product_id} className="flex">
          <div className="h-full w-full">
            <ProductCard
              product={product}
              categoryName={categoryNames.get(product.category_id)}
              priority={index < priorityCount}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}
