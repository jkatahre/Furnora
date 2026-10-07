import { Link } from "react-router-dom";
import { store } from "../../config/store";
import { ArrowRightIcon } from "../Icons";

/** Offer cards from the store settings. Hidden when there are none. */
export default function Offers() {
  if (store.offers.length === 0) return null;
  return (
    <section aria-label="Offers" className="container-page mt-6 md:mt-8">
      <ul className="scroll-row lg:mx-0 lg:grid lg:grid-cols-5 lg:overflow-visible lg:px-0">
        {store.offers.map((offer) => (
          <li key={offer.title} className="w-[70%] shrink-0 sm:w-[40%] lg:w-auto">
            <Link
              to={offer.link}
              className={`group flex h-full min-h-[88px] flex-col justify-between rounded-xl border p-4 transition-colors ${
                offer.highlight
                  ? "border-sale bg-sale text-white hover:bg-sale/90"
                  : "border-line bg-brand-soft text-ink hover:border-brand/40"
              }`}
            >
              <span className="text-[15px] font-bold">{offer.title}</span>
              <span className={`mt-1 flex items-end justify-between gap-2 text-[13px] leading-snug ${offer.highlight ? "text-white/90" : "text-ink-soft"}`}>
                {offer.detail}
                <ArrowRightIcon width={16} height={16} className="shrink-0 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
