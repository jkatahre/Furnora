import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { store } from "../../config/store";
import { categories } from "../../data/categories";
import { products } from "../../data/products";
import { openStatus, whatsappLink } from "../../utils/contact";
import { effectivePrice, formatPrice } from "../../utils/format";
import { Diya, festivalLive, Sparkles, Toran } from "../Festive";
import { ArrowRightIcon, CheckIcon, ChevronLeftIcon, ChevronRightIcon, PinIcon, WhatsAppIcon } from "../Icons";
import { RatingBadge } from "../Rating";

/** Festival banners while a sale is on, otherwise the regular store hero. */
export default function Hero() {
  return (
    <>
      {festivalLive() ? <FestivalBanners /> : <StoreHero />}
      <StoreStrip />
      <QuickLinks />
    </>
  );
}

/** Lowest current price in the given categories, e.g. "from ₹24,499". */
function priceFrom(slugs: string[]): string | null {
  const ids = new Set(categories.filter((c) => slugs.includes(c.slug)).map((c) => c.category_id));
  const prices = products.filter((p) => ids.has(p.category_id) && p.status === "active").map(effectivePrice);
  return prices.length ? `from ${formatPrice(Math.min(...prices))}` : null;
}

const SLIDE_MS = 5000;

function FestivalBanners() {
  const { festival } = store;
  const slides = festival.slides;
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  // Follow the slide in view while the visitor swipes.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => setActive(Math.round(track.scrollLeft / track.clientWidth));
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  const go = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({ left: ((index + slides.length) % slides.length) * track.clientWidth, behavior: "smooth" });
  };

  // Auto-advance, unless the visitor is interacting or prefers less motion.
  useEffect(() => {
    if (paused || slides.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setTimeout(() => go(active + 1), SLIDE_MS);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, paused, slides.length]);

  return (
    <section
      className="relative bg-festive-dark"
      aria-roledescription="carousel"
      aria-label={`${festival.name} offers`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
    >
      <h1 className="sr-only">
        {store.name}: {store.hero.title}
      </h1>
      <div ref={trackRef} className="flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {slides.map((slide, i) => {
          const from = priceFrom(slide.priceFrom);
          return (
            <div
              key={slide.title}
              className="relative aspect-[4/4.4] w-full shrink-0 snap-start overflow-hidden sm:aspect-[16/8] lg:aspect-auto lg:h-[560px]"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${slides.length}`}
              aria-hidden={i !== active}
            >
              <img
                src={slide.image}
                alt={slide.alt}
                loading={i === 0 ? "eager" : "lazy"}
                fetchPriority={i === 0 ? "high" : "auto"}
                style={{ objectPosition: slide.focus }}
                className="absolute inset-0 h-full w-full object-cover"
              />
              {/* Festive colour wash: from the bottom on phones, from the left on wider screens */}
              <div className="absolute inset-0 bg-linear-to-t from-festive-dark from-5% via-festive-dark/55 via-40% to-transparent to-75% sm:bg-linear-to-r sm:from-festive-dark/90 sm:from-0% sm:via-festive-dark/45 sm:via-40% sm:to-transparent sm:to-70%" />
              <Sparkles />
              <Toran className="absolute inset-x-0 top-0" />

              <div className="container-page relative flex h-full flex-col justify-end pb-12 sm:justify-center sm:pb-0">
                <div className="max-w-md text-white">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-gold px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-festive-dark sm:text-xs">
                    🪔 {festival.name} Sale
                  </span>
                  <p className="mt-2 font-display text-[2.1rem] leading-none text-gold sm:mt-3 sm:text-6xl">{slide.offer}</p>
                  <h2 className="mt-1.5 text-xl leading-tight text-white sm:mt-2 sm:text-4xl">{slide.title}</h2>
                  {from && <p className="mt-1 text-sm font-semibold text-white/90 sm:text-lg">{from}</p>}
                  <Link
                    to={slide.cta.link}
                    tabIndex={i === active ? 0 : -1}
                    className="btn mt-4 bg-gold px-5 text-festive-dark hover:bg-white sm:mt-6"
                  >
                    {slide.cta.label} <ArrowRightIcon width={16} height={16} />
                  </Link>
                </div>
              </div>

              <div className="absolute bottom-3 right-3 flex items-end gap-1 sm:bottom-8 sm:right-10 sm:gap-3">
                <Diya size={34} delay={0.3} />
                <span className="sm:hidden">
                  <Diya size={44} />
                </span>
                <span className="hidden sm:block">
                  <Diya size={72} />
                </span>
                <Diya size={34} delay={0.7} />
              </div>
            </div>
          );
        })}
      </div>

      {slides.length > 1 && (
        <>
          <div className="absolute inset-x-0 bottom-3 flex justify-center gap-2 sm:bottom-5">
            {slides.map((slide, i) => (
              <button key={slide.title} type="button" onClick={() => go(i)} aria-label={`Show offer ${i + 1}`} aria-current={i === active} className="flex h-6 items-center">
                <span className={`block h-1.5 rounded-full transition-all ${i === active ? "w-6 bg-gold" : "w-1.5 bg-white/60"}`} />
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={() => go(active - 1)}
            aria-label="Previous offer"
            className="absolute left-4 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink hover:bg-white lg:flex"
          >
            <ChevronLeftIcon />
          </button>
          <button
            type="button"
            onClick={() => go(active + 1)}
            aria-label="Next offer"
            className="absolute right-4 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-ink hover:bg-white lg:flex"
          >
            <ChevronRightIcon />
          </button>
        </>
      )}
    </section>
  );
}

/** The everyday hero: one photo with the store's headline. */
function StoreHero() {
  const { hero } = store;
  return (
    <section className="bg-surface">
      <div className="lg:container-page lg:grid lg:grid-cols-12 lg:items-center lg:gap-12 lg:py-12">
        <div className="relative lg:order-2 lg:col-span-7">
          <div className="relative aspect-[4/3.6] overflow-hidden bg-sand lg:aspect-[4/3.2] lg:rounded-2xl">
            <img src={hero.image} alt={hero.alt} fetchPriority="high" style={{ objectPosition: hero.focus }} className="h-full w-full object-cover" />
            {hero.tag && (
              <Link
                to={hero.tag.link}
                className="group absolute bottom-3 right-3 flex items-center gap-3 rounded-xl bg-white/95 py-2 pl-3.5 pr-2.5 shadow-lift sm:bottom-5 sm:right-5"
              >
                <span>
                  <span className="block text-[11px] text-muted sm:text-xs">{hero.tag.label}</span>
                  <span className="block text-sm font-bold leading-tight sm:text-[15px]">{hero.tag.price}</span>
                </span>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-white">
                  <ArrowRightIcon width={16} height={16} />
                </span>
              </Link>
            )}
          </div>
        </div>
        <div className="px-4 pb-5 pt-4 sm:px-6 lg:order-1 lg:col-span-5 lg:px-0 lg:py-0">
          <h1 className="text-[1.65rem] leading-[1.1] sm:text-5xl lg:text-[3.2rem]">{hero.title}</h1>
          <p className="mt-2 hidden text-lg text-ink-soft sm:block">{hero.subtitle}</p>
          <ul className="mt-4 hidden flex-wrap gap-x-4 gap-y-1.5 text-sm text-ink-soft sm:flex">
            {hero.highlights.map((h) => (
              <li key={h} className="flex items-center gap-1.5">
                <CheckIcon width={16} height={16} className="text-success" /> {h}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/** Who and where: location, open status, rating and the two main actions. */
function StoreStrip() {
  const { hero } = store;
  const status = openStatus();
  return (
    <div className="border-b border-line bg-surface">
      <div className="container-page flex flex-col gap-3 py-3 sm:flex-row sm:items-center sm:justify-between sm:py-4">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] sm:text-sm">
          <span className="flex items-center gap-1.5 font-semibold">
            <PinIcon width={16} height={16} className="text-brand" /> {hero.eyebrow}
          </span>
          <span className={`flex items-center gap-1.5 ${status.open ? "text-success" : "text-muted"}`}>
            <span className={`h-2 w-2 rounded-full ${status.open ? "bg-success" : "bg-muted"}`} aria-hidden="true" />
            {status.label}
          </span>
          <RatingBadge className="hidden min-h-0 lg:inline-flex" />
        </div>
        <div className="grid grid-cols-2 gap-2 sm:flex sm:gap-3">
          <Link to="/catalog" className="btn-primary">
            Shop furniture
          </Link>
          <a href={whatsappLink("general")} target="_blank" rel="noopener" className="btn-whatsapp">
            <WhatsAppIcon /> WhatsApp us
          </a>
        </div>
      </div>
    </div>
  );
}

function QuickLinks() {
  const links = store.hero.quickLinks;
  if (links.length === 0) return null;
  return (
    <nav aria-label="Popular categories" className="bg-canvas">
      <div className="container-page">
        <ul className="scroll-row py-3 lg:mx-0 lg:flex-wrap lg:justify-center lg:overflow-visible lg:px-0">
          {links.map((q) => (
            <li key={q.label}>
              <Link to={q.link} className="chip">
                {q.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
