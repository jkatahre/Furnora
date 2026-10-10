import { Link } from "react-router-dom";
import { ArrowRightIcon } from "../components/Icons";
import { ProductRow } from "../components/ProductGrid";
import SectionHeading from "../components/SectionHeading";
import { FestivalDeals, FestivalStrip } from "../components/sections/FestivalOffer";
import Hero from "../components/sections/Hero";
import CustomFurniture from "../components/sections/CustomFurniture";
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
    () => Promise.all([productService.getFeaturedProducts(16), productService.getCategories(), productService.getCategoryStats(), productService.getDeals(8)]),
    [],
  );
  const [bestSellers, categories, stats, deals] = data ?? [[], [], {} as Record<number, CategoryStats>, []];

  return (
    <>
      <Hero />
      <FestivalStrip />

      {data ? (
        <ShopByCategory categories={categories} stats={stats} />
      ) : (
        <div className="container-page mt-8 flex gap-3 overflow-hidden md:mt-16" aria-hidden="true">
          {Array.from({ length: 7 }, (_, i) => (
            <div key={i} className="skeleton aspect-square w-[30%] shrink-0 md:w-auto md:flex-1" />
          ))}
        </div>
      )}

      {!error && <FestivalDeals products={deals} loading={loading} />}

      <section className="container-page mt-10 md:mt-20">
        <SectionHeading
          title="Best sellers"
          action={
            <Link to="/catalog" className="link-arrow">
              View all <ArrowRightIcon width={16} height={16} />
            </Link>
          }
        />
        {error ? <ErrorState onRetry={reload} /> : loading ? <GridSkeleton count={4} /> : <ProductRow products={bestSellers.filter((p) => !deals.some((d) => d.product_id === p.product_id)).slice(0, 8)} />}
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

