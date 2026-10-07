import { useEffect } from "react";
import { Link } from "react-router-dom";
import { PlusIcon } from "../components/Icons";
import SmartImage from "../components/SmartImage";
import { visibleCategories } from "../components/sections/ShopByCategory";
import { ErrorState } from "../components/States";
import { store } from "../config/store";
import { categoryCoverUrl } from "../data/productImages";
import { useAsync } from "../hooks/useAsync";
import { productService } from "../services/productService";
import type { CategoryStats } from "../types/product";
import { categoryImage } from "../utils/images";

export default function Categories() {
  const { data, loading, error, reload } = useAsync(
    () => Promise.all([productService.getCategories(), productService.getCategoryStats()]),
    [],
  );

  useEffect(() => {
    document.title = `All categories · ${store.name}`;
  }, []);

  const [categories, stats] = data ?? [[], {} as Record<number, CategoryStats>];
  const visible = visibleCategories(categories, stats);

  return (
    <div className="container-page pt-6 md:pt-10">
      <h1 className="text-3xl sm:text-4xl">All categories</h1>

      {error ? (
        <div className="mt-6">
          <ErrorState onRetry={reload} />
        </div>
      ) : loading || !data ? (
        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4" role="status">
          <span className="sr-only">Loading categories…</span>
          {Array.from({ length: 8 }, (_, i) => (
            <div key={i} className="skeleton aspect-4/3" />
          ))}
        </div>
      ) : (
        <ul className="mt-6 grid grid-cols-2 gap-x-3 gap-y-6 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-5">
          {visible.map((category) => {
            const count = stats[category.category_id]?.available ?? 0;
            return (
              <li key={category.slug}>
                <Link to={`/catalog?category=${category.slug}`} className="group block">
                  <SmartImage
                    src={categoryImage(category.slug)}
                    fallbackSrc={categoryCoverUrl(category.category_id)}
                    alt=""
                    fallbackLabel={category.name}
                    className="aspect-4/3 rounded-xl"
                    imgClassName="group-hover:scale-[1.04]"
                  />
                  <span className="mt-2 block font-bold">{category.name}</span>
                  <span className="block text-sm text-muted">{count > 0 ? `${count} designs` : "Made to order"}</span>
                </Link>
              </li>
            );
          })}
          <li>
            <Link to="/custom-furniture" className="group block">
              <span className="flex aspect-4/3 flex-col items-center justify-center gap-2 rounded-xl bg-brand text-white group-hover:bg-brand-dark">
                <PlusIcon width={32} height={32} />
                <span className="font-semibold">Made to your size</span>
              </span>
              <span className="mt-2 block font-bold">Custom Furniture</span>
              <span className="block text-sm text-muted">{store.custom.leadTime}</span>
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
}
