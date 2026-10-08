import { Link } from "react-router-dom";
import { ArrowRightIcon } from "../components/Icons";
import { ProductRow } from "../components/ProductGrid";
import SectionHeading from "../components/SectionHeading";
import Hero from "../components/sections/Hero";
import CustomFurniture from "../components/sections/CustomFurniture";
import Offers from "../components/sections/Offers";
import RecentWork from "../components/sections/RecentWork";
import Testimonials from "../components/sections/Testimonials";
import ShopByCategory from "../components/sections/ShopByCategory";
import ShopByRoom from "../components/sections/ShopByRoom";
import Showroom from "../components/sections/Showroom";
import WhyChooseUs from "../components/sections/WhyChooseUs";
import { ErrorState, GridSkeleton } from "../components/States";
import { useAsync } from "../hooks/useAsync";
import { productService } from "../services/productService";
import type { CategoryStats } from "../types/product";

/**
 * The home page answers, in order: what do you sell, what should I look at, what does it
 * cost, can I trust you, how do I buy, and where is your store.
 */
export default function Home() {
  const { data, loading, error, reload } = useAsync(
    () => Promise.all([productService.getFeaturedProducts(8), productService.getCategories(), productService.getCategoryStats()]),
    [],
  );
  const [bestSellers, categories, stats] = data ?? [[], [], {} as Record<number, CategoryStats>];

  return (
    <>
      <Hero />
      <Offers />

      {data ? (
        <ShopByCategory categories={categories} stats={stats} />
      ) : (
        <div className="container-page mt-12 flex gap-3 overflow-hidden md:mt-16" aria-hidden="true">
          {Array.from({ length: 7 }, (_, i) => (
            <div key={i} className="skeleton aspect-square w-[30%] shrink-0 md:w-auto md:flex-1" />
          ))}
        </div>
      )}

      <section className="container-page mt-10 md:mt-20">
        <SectionHeading
          title="Best sellers"
          action={
            <Link to="/catalog" className="link-arrow">
              View all <ArrowRightIcon width={16} height={16} />
            </Link>
          }
        />
        {error ? <ErrorState onRetry={reload} /> : loading ? <GridSkeleton count={4} /> : <ProductRow products={bestSellers} />}
      </section>

      {data && <ShopByRoom categories={categories} stats={stats} />}
      <WhyChooseUs />
      <CustomFurniture />
      <Showroom />
      <Testimonials />
      <RecentWork />
    </>
  );
}

