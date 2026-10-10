import { useEffect, useRef, useState } from "react";
import { store } from "../../config/store";
import { ChevronLeftIcon, ChevronRightIcon } from "../Icons";
import { RatingBadge, Stars } from "../Rating";
import SmartImage from "../SmartImage";
import { ReviewCard } from "./Reviews";

/** Photo-led customer stories (swipe on phones, arrows on desktop), then short reviews. */
export default function Testimonials({ showReviews = true }: { showReviews?: boolean }) {
  const stories = store.testimonials;
  const trackRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);

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
    const next = (index + stories.length) % stories.length;
    track.scrollTo({ left: next * track.clientWidth, behavior: "smooth" });
  };

  if (stories.length === 0 && store.reviews.length === 0) return null;

  return (
    <section className="mt-12 bg-brand-soft py-10 md:mt-20 md:py-16" aria-roledescription="carousel" aria-label="Customer stories">
      <div className="container-page">
        <div className="mb-6 flex items-end justify-between gap-4 md:mb-8">
          <div>
            <p className="eyebrow mb-2">Testimonials</p>
            <h2 className="section-title">Homes we've furnished</h2>
          </div>
          {stories.length > 1 && (
            <div className="hidden gap-2 sm:flex">
              <button type="button" onClick={() => go(active - 1)} aria-label="Previous story" className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/20 bg-canvas hover:border-ink">
                <ChevronLeftIcon />
              </button>
              <button type="button" onClick={() => go(active + 1)} aria-label="Next story" className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/20 bg-canvas hover:border-ink">
                <ChevronRightIcon />
              </button>
            </div>
          )}
        </div>

        {stories.length > 0 && (
          <>
            <ul ref={trackRef} className="flex snap-x snap-mandatory overflow-x-auto rounded-2xl [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {stories.map((story, i) => (
                <li
                  key={story.name}
                  className="w-full shrink-0 snap-start"
                  aria-roledescription="slide"
                  aria-label={`${i + 1} of ${stories.length}`}
                >
                  <figure className="grid h-full overflow-hidden rounded-2xl bg-canvas md:grid-cols-2">
                    <SmartImage src={story.photo} alt={`${story.product} at ${story.name}'s home`} className="aspect-[4/3] md:aspect-auto md:min-h-[380px]" />
                    <div className="flex flex-col justify-center p-4 sm:p-8 lg:p-12">
                      <span className="hidden font-display text-6xl leading-none text-brand/30 sm:block" aria-hidden="true">
                        “
                      </span>
                      <Stars value={story.rating} size={18} />
                      <blockquote className="mt-2 line-clamp-4 text-[14px] leading-relaxed text-ink sm:mt-3 sm:line-clamp-none sm:text-xl">{story.quote}</blockquote>
                      <figcaption className="mt-5 flex items-center gap-3">
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand text-base font-bold text-white" aria-hidden="true">
                          {story.name.charAt(0)}
                        </span>
                        <span>
                          <span className="block font-bold">{story.name}</span>
                          <span className="block text-sm text-muted">
                            {story.city} · {story.product}
                          </span>
                        </span>
                      </figcaption>
                    </div>
                  </figure>
                </li>
              ))}
            </ul>
            {stories.length > 1 && (
              <div className="mt-4 flex justify-center gap-2">
                {stories.map((story, i) => (
                  <button
                    key={story.name}
                    type="button"
                    onClick={() => go(i)}
                    aria-label={`Show story ${i + 1}`}
                    aria-current={i === active}
                    className="flex h-6 items-center"
                  >
                    <span className={`block h-2 rounded-full transition-all ${i === active ? "w-6 bg-ink" : "w-2 bg-ink/25"}`} />
                  </button>
                ))}
              </div>
            )}
          </>
        )}

        {showReviews && store.reviews.length > 0 && (
          <div className="mt-4 sm:mt-8">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <h3 className="hidden text-lg font-bold sm:block">Recent reviews</h3>
              <RatingBadge />
            </div>
            <ul className="scroll-row hidden sm:flex md:mx-0 md:grid md:grid-cols-2 md:gap-4 md:overflow-visible md:px-0 lg:grid-cols-4">
              {store.reviews.map((review) => (
                <li key={review.name + review.date} className="w-[82%] shrink-0 sm:w-[48%] md:w-auto">
                  <ReviewCard review={review} />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
