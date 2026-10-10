import { FestivalDeals, FestivalStrip } from "../components/sections/FestivalOffer";
import Hero from "../components/sections/Hero";
import CustomFurniture from "../components/sections/CustomFurniture";
import RecentWork from "../components/sections/RecentWork";
import Testimonials from "../components/sections/Testimonials";
import ShopByCategory from "../components/sections/ShopByCategory";
import ShopByRoom from "../components/sections/ShopByRoom";
import Showroom from "../components/sections/Showroom";
import WhyChooseUs from "../components/sections/WhyChooseUs";
import { ErrorState } from "../components/States";
import { useAsync } from "../hooks/useAsync";
import { productService } from "../services/productService";
import type { CategoryStats } from "../types/product";

/**
 * The home page answers, in order: what do you sell, what should I look at, what does it
 * cost, can I trust you, how do I buy, and where is your store.
 */
export default function Home() {
  const { data, loading, error, reload } = useAsync(
    () => Promise.all([productService.getCategories(), productService.getCategoryStats(), productService.getDeals(8)]),
    [],
  );
  const [categories, stats, deals] = data ?? [[], {} as Record<number, CategoryStats>, []];

  return (
    <>
      <Hero />
      <FestivalStrip />

      {error ? (
        <div className="container-page mt-8">
          <ErrorState onRetry={reload} />
        </div>
      ) : data ? (
        <ShopByCategory categories={categories} stats={stats} />
      ) : (
        <div className="container-page mt-8 grid grid-cols-4 gap-2.5 md:mt-16 lg:grid-cols-7" aria-hidden="true">
          {Array.from({ length: 8 }, (_, i) => (
            <div key={i} className="skeleton aspect-square" />
          ))}
        </div>
      )}

      {!error && <FestivalDeals products={deals} loading={loading} />}

      {data && <ShopByRoom categories={categories} stats={stats} />}
      <WhyChooseUs />
      <CustomFurniture />
      <Showroom />
      <Testimonials />
      <RecentWork />
    </>
  );
}
