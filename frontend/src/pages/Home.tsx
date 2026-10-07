import { Link } from "react-router-dom";
import { ArrowRightIcon, CheckIcon, PinIcon, WhatsAppIcon } from "../components/Icons";
import { ProductRow } from "../components/ProductGrid";
import { RatingBadge } from "../components/Rating";
import SectionHeading from "../components/SectionHeading";
import CustomFurniture from "../components/sections/CustomFurniture";
import Offers from "../components/sections/Offers";
import RecentWork from "../components/sections/RecentWork";
import Reviews from "../components/sections/Reviews";
import ShopByCategory from "../components/sections/ShopByCategory";
import ShopByRoom from "../components/sections/ShopByRoom";
import Showroom from "../components/sections/Showroom";
import WhyChooseUs from "../components/sections/WhyChooseUs";
import { ErrorState, GridSkeleton } from "../components/States";
import { store } from "../config/store";
import { useAsync } from "../hooks/useAsync";
import { productService } from "../services/productService";
import type { CategoryStats } from "../types/product";
import { whatsappLink } from "../utils/contact";

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

      <section className="container-page mt-14 md:mt-20">
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
      <Reviews />
      <RecentWork />
    </>
  );
}

function Hero() {
  const { hero } = store;
  return (
    <section className="relative">
      <div className="relative h-[68svh] max-h-[760px] min-h-[460px] w-full overflow-hidden bg-ink-soft">
        <img
          src={hero.image}
          alt={hero.alt}
          fetchPriority="high"
          style={{ objectPosition: hero.focus }}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-ink/85 via-ink/35 to-ink/5 md:bg-linear-to-r md:from-ink/75 md:via-ink/30 md:to-transparent" />
        <div className="container-page relative flex h-full flex-col justify-end pb-8 sm:pb-14 md:justify-center md:pb-0">
          <div className="max-w-xl animate-[riseIn_.7s_var(--ease-gentle)_both] text-white">
            <p className="flex items-center gap-1.5 text-sm font-semibold text-white/90">
              <PinIcon width={16} height={16} /> {hero.eyebrow}
            </p>
            <h1 className="mt-3 text-[2.4rem] leading-[1.05] text-white sm:text-6xl">{hero.title}</h1>
            <p className="mt-3 text-lg text-white/90">{hero.subtitle}</p>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
              <Link to="/catalog" className="btn-light">
                Shop furniture
              </Link>
              <a href={whatsappLink("general")} target="_blank" rel="noopener" className="btn-whatsapp">
                <WhatsAppIcon /> WhatsApp us
              </a>
              <Link to="/contact" className="btn col-span-2 border border-white/40 text-white hover:bg-white/10 sm:col-span-1">
                Visit showroom
              </Link>
            </div>
            <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-1 text-sm text-white/90">
              {hero.highlights.map((h) => (
                <li key={h} className="flex items-center gap-1.5">
                  <CheckIcon width={16} height={16} /> {h}
                </li>
              ))}
            </ul>
            <RatingBadge light className="mt-2" />
          </div>
        </div>
      </div>
    </section>
  );
}
