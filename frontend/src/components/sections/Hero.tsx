import { Link } from "react-router-dom";
import { store } from "../../config/store";
import { openStatus, whatsappLink } from "../../utils/contact";
import { ArrowRightIcon, CheckIcon, PinIcon, WhatsAppIcon } from "../Icons";
import { RatingBadge } from "../Rating";

/**
 * Who we are, where we are, what we sell, and the next step. On phones the photo comes first
 * and the text sits below it, so nothing is hidden behind the image.
 */
export default function Hero() {
  const { hero } = store;
  const status = openStatus();

  return (
    <section className="bg-surface">
      <div className="lg:container-page lg:grid lg:grid-cols-12 lg:items-center lg:gap-12 lg:py-12">
        {/* Photo */}
        <div className="relative lg:order-2 lg:col-span-7">
          <div className="relative aspect-[4/3.3] overflow-hidden bg-sand lg:aspect-[4/3.2] lg:rounded-2xl">
            <img
              src={hero.image}
              alt={hero.alt}
              fetchPriority="high"
              style={{ objectPosition: hero.focus }}
              className="h-full w-full animate-[fadeIn_.6s_ease] object-cover"
            />
            <span
              className={`absolute left-3 top-3 flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 text-[13px] font-semibold shadow-soft sm:left-4 sm:top-4 ${
                status.open ? "text-success" : "text-ink-soft"
              }`}
            >
              <span className={`h-2 w-2 rounded-full ${status.open ? "bg-success" : "bg-muted"}`} aria-hidden="true" />
              {status.label}
            </span>
            {hero.tag && (
              <Link
                to={hero.tag.link}
                className="group absolute bottom-3 right-3 flex items-center gap-3 rounded-xl bg-white/95 py-2 pl-3.5 pr-2.5 shadow-lift backdrop-blur sm:bottom-5 sm:right-5"
              >
                <span>
                  <span className="block text-[12px] text-muted">{hero.tag.label}</span>
                  <span className="block text-[15px] font-bold leading-tight">{hero.tag.price}</span>
                </span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-white transition-transform group-hover:translate-x-0.5">
                  <ArrowRightIcon width={16} height={16} />
                </span>
              </Link>
            )}
          </div>
        </div>

        {/* Text */}
        <div className="px-4 pb-7 pt-5 sm:px-6 lg:order-1 lg:col-span-5 lg:px-0 lg:py-0">
          <p className="flex items-center gap-1.5 text-[13px] font-semibold text-brand sm:text-sm">
            <PinIcon width={16} height={16} /> {hero.eyebrow}
          </p>
          <h1 className="mt-2 text-[2.1rem] leading-[1.08] sm:text-5xl lg:text-[3.4rem]">{hero.title}</h1>
          <p className="mt-3 text-[17px] text-ink-soft lg:text-lg">{hero.subtitle}</p>

          <div className="mt-5 grid grid-cols-2 gap-3 lg:mt-7 lg:flex">
            <Link to="/catalog" className="btn-primary lg:px-7">
              Shop furniture
            </Link>
            <a href={whatsappLink("general")} target="_blank" rel="noopener" className="btn-whatsapp lg:px-6">
              <WhatsAppIcon width={22} height={22} /> WhatsApp us
            </a>
          </div>
          <Link to="/contact" className="link-arrow mt-2">
            Visit our showroom <ArrowRightIcon width={16} height={16} />
          </Link>

          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-sm text-ink-soft">
            {hero.highlights.map((h) => (
              <li key={h} className="flex items-center gap-1.5">
                <CheckIcon width={16} height={16} className="text-success" /> {h}
              </li>
            ))}
          </ul>
          <RatingBadge className="mt-2" />
        </div>
      </div>

      {/* Category shortcuts */}
      {hero.quickLinks.length > 0 && (
        <nav aria-label="Popular categories" className="border-t border-line bg-canvas">
          <div className="container-page">
          <ul className="scroll-row py-3 lg:mx-0 lg:flex-wrap lg:justify-center lg:overflow-visible lg:px-0">
            {hero.quickLinks.map((q) => (
              <li key={q.label}>
                <Link to={q.link} className="chip">
                  {q.label}
                </Link>
              </li>
            ))}
          </ul>
          </div>
        </nav>
      )}
    </section>
  );
}
