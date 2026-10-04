import { useEffect } from "react";
import CategoryCard from "../components/CategoryCard";
import SectionHeading from "../components/SectionHeading";
import { ErrorState } from "../components/States";
import { useAsync } from "../hooks/useAsync";
import { productService } from "../services/productService";
import type { Category, CategoryStats } from "../types/product";

export default function Categories() {
  const { data, loading, error, reload } = useAsync(
    () => Promise.all([productService.getCategories(), productService.getCategoryStats()]),
    [],
  );

  useEffect(() => {
    document.title = "Categories — Furnora";
  }, []);

  const [categories, stats] = data ?? [[], {} as Record<number, CategoryStats>];
  const isAvailable = (c: Category) => (stats[c.category_id]?.available ?? 0) > 0;
  const available = categories.filter(isAvailable);
  const comingSoon = categories.filter((c) => !isAvailable(c));

  return (
    <div className="container-page pt-12 md:pt-16">
      <SectionHeading
        as="h1"
        eyebrow="Shop by Category"
        title="Every Room, Considered"
        description="Explore our furniture by category. New categories are being added to the collection soon."
      />

      {error ? (
        <ErrorState onRetry={reload} />
      ) : loading || !data ? (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6" role="status">
          <span className="sr-only">Loading categories…</span>
          {Array.from({ length: 8 }, (_, i) => (
            <div key={i} className="skeleton aspect-3/4" />
          ))}
        </div>
      ) : (
        <>
          <CategoryGroup title="Available Now" categories={available} stats={stats} />
          {comingSoon.length > 0 && (
            <div className="mt-20 md:mt-24">
              <CategoryGroup
                title="Coming Soon"
                description="These categories are on their way. Preview the pieces we're preparing."
                categories={comingSoon}
                stats={stats}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}

interface CategoryGroupProps {
  title: string;
  description?: string;
  categories: Category[];
  stats: Record<number, CategoryStats>;
}

function CategoryGroup({ title, description, categories, stats }: CategoryGroupProps) {
  return (
    <section aria-labelledby={`group-${title}`}>
      <div className="mb-8 flex flex-col gap-2 border-b border-line pb-4 sm:flex-row sm:items-end sm:justify-between">
        <h2 id={`group-${title}`} className="text-3xl">
          {title}
        </h2>
        {description && <p className="text-sm text-muted">{description}</p>}
      </div>
      <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
        {categories.map((category) => (
          <li key={category.slug}>
            <CategoryCard category={category} stats={stats[category.category_id]} />
            <p className="mt-3 text-sm leading-relaxed text-muted">{category.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
