import { useEffect, useState, type CSSProperties, type ReactNode } from "react";
import { Link } from "react-router-dom";
import CategoryCard from "../components/CategoryCard";
import { ArrowRightIcon, LeafIcon, RulerIcon, ShieldIcon } from "../components/Icons";
import ProductGrid from "../components/ProductGrid";
import SectionHeading from "../components/SectionHeading";
import SmartImage from "../components/SmartImage";
import { ErrorState, GridSkeleton } from "../components/States";
import { useAsync } from "../hooks/useAsync";
import { productService } from "../services/productService";
import type { CategoryStats } from "../types/product";
import { heroSlides, siteImages } from "../utils/images";

/**
 * Rows of three equal tiles when the count divides evenly; otherwise two large tiles
 * first, then smaller ones (the first spanning full width on phones).
 */
function categoryTileLayout(index: number, count: number) {
  if (count % 3 === 0) return { cell: "md:col-span-2", aspect: "aspect-[3/4]" };
  if (index === 0) return { cell: "col-span-2 md:col-span-3", aspect: "aspect-[16/10] md:aspect-[4/3]" };
  if (index === 1) return { cell: "md:col-span-3", aspect: "aspect-[3/4] md:aspect-[4/3]" };
  return { cell: "md:col-span-2", aspect: "aspect-[3/4]" };
}

export default function Home() {
  const { data, loading, error, reload } = useAsync(
    () =>
      Promise.all([
        productService.getFeaturedProducts(8),
        productService.getNewArrivals(4),
        productService.getCategories(),
        productService.getCategoryStats(),
      ]),
    [],
  );
  const [featured, newArrivals, categories, stats] = data ?? [[], [], [], {} as Record<number, CategoryStats>];
  const availableCategories = categories.filter((c) => (stats[c.category_id]?.available ?? 0) > 0);

  return (
    <>
      <Hero />

      {/* Brand introduction */}
      <section className="container-page py-24 md:py-32">
        <div className="grid gap-12 md:grid-cols-12 md:gap-10">
          <p className="eyebrow md:col-span-3 md:pt-3">The Furnora Studio</p>
          <div className="md:col-span-9">
            <p className="font-display text-3xl  text-ink sm:text-4xl lg:text-[2.9rem]">
              We design furniture for the way people actually live — honest materials, quiet forms and proportions
              that feel at home in contemporary spaces.
            </p>
            <dl className="mt-14 grid grid-cols-3 gap-6 border-t border-line pt-8">
              <Stat value="15" label="Furniture categories" />
              <Stat value="140+" label="Curated pieces" />
              <Stat value="5 yr" label="Warranty on select designs" />
            </dl>
          </div>
        </div>
      </section>

      {/* Featured */}
      <section className="container-page">
        <SectionHeading
          eyebrow="Curated Selection"
          title="Featured Furniture"
          description="Signature pieces chosen by our design team for their craft, comfort and character."
          action={
            <Link to="/catalog" className="link-underline">
              View all <ArrowRightIcon width={14} height={14} />
            </Link>
          }
        />
        {error ? (
          <ErrorState onRetry={reload} />
        ) : loading ? (
          <GridSkeleton count={8} />
        ) : (
          <ProductGrid products={featured} categories={categories} priorityCount={4} />
        )}
      </section>

      {/* Popular categories */}
      <section className="mt-28 bg-surface py-24 md:mt-36 md:py-28">
        <div className="container-page">
          <SectionHeading
            eyebrow="Browse by Room"
            title="Shop by Category"
            action={
              <Link to="/categories" className="link-underline">
                All categories <ArrowRightIcon width={14} height={14} />
              </Link>
            }
          />
          {loading && !data ? (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-6 lg:gap-6">
              {Array.from({ length: 6 }, (_, i) => (
                <div key={i} className={`skeleton ${categoryTileLayout(i, 6).cell} ${categoryTileLayout(i, 6).aspect}`} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-6 lg:gap-6">
              {availableCategories.map((category, i) => (
                <div key={category.slug} className={categoryTileLayout(i, availableCategories.length).cell}>
                  <CategoryCard
                    category={category}
                    stats={stats[category.category_id]}
                    aspect={categoryTileLayout(i, availableCategories.length).aspect}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <PromoBanner />

      {/* New arrivals */}
      <section className="container-page mt-28 md:mt-36">
        <SectionHeading
          eyebrow="Just Arrived"
          title="New Arrivals"
          description="The latest additions to the Furnora collection."
          action={
            <Link to="/catalog?sort=newest" className="link-underline">
              Shop newest <ArrowRightIcon width={14} height={14} />
            </Link>
          }
        />
        {error ? null : loading ? (
          <GridSkeleton count={4} />
        ) : (
          <ProductGrid products={newArrivals} categories={categories} />
        )}
      </section>

      {/* Editorial pillars */}
      <section className="container-page mt-28 md:mt-36">
        <div className="grid gap-px border border-line bg-line md:grid-cols-3">
          <Pillar
            icon={<LeafIcon width={26} height={26} />}
            title="Honest Materials"
            text="Solid hardwoods, natural fibres and top-grain leathers, selected for how beautifully they age."
          />
          <Pillar
            icon={<RulerIcon width={26} height={26} />}
            title="Considered Proportions"
            text="Every piece is drawn to scale for real homes, with full dimensions listed to help you plan."
          />
          <Pillar
            icon={<ShieldIcon width={26} height={26} />}
            title="Built to Last"
            text="Traditional joinery and tested construction, backed by warranties of up to five years."
          />
        </div>
      </section>

      {/* Explore CTA */}
      <section className="container-page mt-28 text-center md:mt-36">
        <p className="eyebrow">The Collection</p>
        <h2 className="mx-auto mt-5 max-w-3xl text-4xl sm:text-6xl">Find the piece your space has been waiting for</h2>
        <Link to="/catalog" className="btn-primary mt-10">
          Explore Collection <ArrowRightIcon width={16} height={16} />
        </Link>
      </section>
    </>
  );
}

const HERO_INTERVAL_MS = 5000;

function Hero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const count = heroSlides.length;
  const slide = heroSlides[active];

  useEffect(() => {
    if (paused || hovered || count < 2) return;
    const timer = setTimeout(() => setActive((i) => (i + 1) % count), HERO_INTERVAL_MS);
    return () => clearTimeout(timer);
  }, [active, paused, hovered, count]);

  return (
    <section
      className="relative"
      aria-roledescription="carousel"
      aria-label="Featured rooms"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative h-[78vh] min-h-520px max-h-880px w-full overflow-hidden bg-ink-soft">
        {heroSlides.map((s, i) => (
          <img
            key={s.image}
            src={s.image}
            alt={i === active ? s.alt : ""}
            aria-hidden={i !== active}
            loading={i === 0 ? "eager" : "lazy"}
            fetchPriority={i === 0 ? "high" : "auto"}
            style={{ objectPosition: s.focus }}
            className={`absolute inset-0 h-full w-full object-cover transition-[opacity,transform] ease-gentle ${
              i === active ? "scale-100 opacity-100 duration-[1200ms,7000ms]" : "scale-[1.04] opacity-0 duration-[1200ms,0ms]"
            }`}
          />
        ))}
        <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-ink/70 via-ink/30 to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-ink/50 via-transparent to-transparent" />
        <div className="container-page relative flex h-full flex-col justify-end pb-14 sm:pb-20">
          <div className="max-w-2xl animate-[riseIn_.9s_var(--ease-gentle)_both] text-canvas">
            <p key={slide.eyebrow} className="eyebrow animate-[fadeIn_.8s_ease] text-canvas/85" aria-live="polite">
              {slide.eyebrow}
            </p>
            <h1 className="mt-5 text-5xl leading-[1.02] text-canvas sm:text-7xl lg:text-[5.5rem]">
              Furniture Designed
              <br />
              <em className="font-medium">For Modern Living</em>
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-canvas/85 sm:text-lg">
              Discover timeless furniture designed for contemporary spaces.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-6">
              <Link to="/catalog" className="btn-light">
                Explore Collection <ArrowRightIcon width={16} height={16} />
              </Link>
              <Link key={slide.link.to} to={slide.link.to} className="link-underline animate-[fadeIn_.8s_ease] text-canvas">
                {slide.link.label}
              </Link>
            </div>
          </div>

          {count > 1 && (
            <div className="mt-12 flex items-center gap-5 sm:absolute sm:bottom-20 sm:right-6 sm:mt-0 lg:right-10">
              <ul className="flex items-center gap-3">
                {heroSlides.map((s, i) => (
                  <li key={s.image}>
                    <button
                      type="button"
                      onClick={() => setActive(i)}
                      aria-label={`Show slide ${i + 1}: ${s.eyebrow}`}
                      aria-current={i === active}
                      className="group flex flex-col items-start gap-2 py-2 text-canvas focus-visible:outline-white"
                    >
                      <span className="relative block h-0.5 w-10 overflow-hidden bg-canvas/35 sm:w-14">
                        <span
                          key={i === active ? `${active}-${paused || hovered}` : "idle"}
                          className={`absolute inset-y-0 left-0 bg-canvas ${
                            i === active
                              ? paused || hovered
                                ? "w-full"
                                : "w-full origin-left animate-[heroProgress_var(--hero-ms)_linear]"
                              : "w-0 group-hover:w-full group-hover:bg-canvas/60"
                          }`}
                          style={{ "--hero-ms": `${HERO_INTERVAL_MS}ms` } as CSSProperties}
                        />
                      </span>
                      <span
                        className={`hidden text-[10px] font-semibold uppercase tracking-[0.18em] transition-opacity sm:block ${
                          i === active ? "opacity-100" : "opacity-55 group-hover:opacity-90"
                        }`}
                      >
                        0{i + 1}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => setPaused((p) => !p)}
                aria-label={paused ? "Play slideshow" : "Pause slideshow"}
                className="flex h-8 w-8 items-center justify-center border border-canvas/40 text-canvas transition-colors hover:border-canvas focus-visible:outline-white sm:-mt-5"
              >
                {paused ? (
                  <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor" aria-hidden="true">
                    <path d="M7 4.5v15l13-7.5z" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor" aria-hidden="true">
                    <path d="M6 4h4v16H6zM14 4h4v16h-4z" />
                  </svg>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function PromoBanner() {
  return (
    <section className="container-page mt-28 md:mt-36">
      <div className="grid overflow-hidden bg-ink md:grid-cols-2">
        <SmartImage
          src={siteImages.promo}
          alt="A bright living room with a grey corner sofa and an oak coffee table"
          tone="dark"
          className="aspect-4/3 md:aspect-auto md:min-h-480px"
        />
        <div className="flex flex-col justify-center px-8 py-14 text-canvas sm:px-14 lg:px-20">
          <p className="eyebrow text-accent">The Autumn Edit</p>
          <h2 className="mt-5 text-4xl text-canvas sm:text-5xl">Seasonal savings on selected living room pieces</h2>
          <p className="mt-5 max-w-md text-canvas/70">
            Sofas and accent chairs in warm textures and deep tones — curated for slower evenings at
            home.
          </p>
          <Link to="/catalog?category=sofas,chairs&sort=price-desc" className="btn-light mt-10 self-start">
            View the edit <ArrowRightIcon width={16} height={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <dt className="sr-only">{label}</dt>
      <dd>
        <span className="block font-display text-4xl text-ink sm:text-5xl">{value}</span>
        <span className="mt-2 block text-xs leading-snug text-muted sm:text-sm">{label}</span>
      </dd>
    </div>
  );
}

function Pillar({ icon, title, text }: { icon: ReactNode; title: string; text: string }) {
  return (
    <div className="bg-canvas p-8 sm:p-10">
      <span className="text-accent-dark">{icon}</span>
      <h3 className="mt-6 text-2xl">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted">{text}</p>
    </div>
  );
}
