import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { store } from "../config/store";
import { categories } from "../data/categories";
import { useEnquiry } from "../context/EnquiryContext";
import { openStatus, telUrl, whatsappLink } from "../utils/contact";
import { ChevronRightIcon, ClockIcon, CloseIcon, MenuIcon, PhoneIcon, PinIcon, SearchIcon, WhatsAppIcon } from "./Icons";
import { festivalLive } from "./Festive";
import SearchBar from "./SearchBar";

const headerCategories = store.headerCategories
  .map((slug) => categories.find((c) => c.slug === slug))
  .filter((c) => c !== undefined);

export const navLinks = [
  { to: "/catalog", label: "All Furniture" },
  { to: "/custom-furniture", label: "Custom Furniture" },
  { to: "/contact", label: "Visit Showroom" },
];

export function Logo({ light = false, className = "" }: { light?: boolean; className?: string }) {
  return (
    <Link to="/" className={`flex min-h-11 flex-col justify-center leading-none ${className}`} aria-label={`${store.name} home`}>
      {store.logoImage ? (
        <img src={store.logoImage} alt={store.name} className="h-9 w-auto" />
      ) : (
        <span className={`font-display text-[1.6rem] font-semibold tracking-tight ${light ? "text-white" : "text-ink"}`}>{store.name}</span>
      )}
      <span className={`mt-1 text-[11px] font-medium ${light ? "text-white/70" : "text-muted"}`}>{store.tagline}</span>
    </Link>
  );
}

/** "Template designed by …" strip with its call-to-action. */
export function CreditBar() {
  const credit = store.credit;
  if (!credit) return null;
  return (
    <div className="sticky top-0 z-50 bg-black text-white">
      <div className="container-page flex h-9 items-center justify-center gap-3 text-[11px] sm:text-xs">
        <p className="truncate text-white/80">
          {credit.text.split(credit.linkText).map((part, i) => (
            <span key={i}>
              {i > 0 && (
                <a href={credit.url} target="_blank" rel="noopener" className="font-semibold text-white underline underline-offset-2 hover:text-orange-400">
                  {credit.linkText}
                </a>
              )}
              {part}
            </span>
          ))}
        </p>
        <a
          href={credit.url}
          target="_blank"
          rel="noopener"
          className="shrink-0 rounded-full bg-orange-500 px-3 py-1 font-bold text-black transition-colors hover:bg-orange-400"
        >
          {credit.cta}
        </a>
      </div>
    </div>
  );
}

export function AnnouncementBar() {
  const items = store.announcements;
  const [index, setIndex] = useState(0);
  const status = openStatus();

  useEffect(() => {
    if (items.length < 2) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % items.length), 4000);
    return () => clearInterval(timer);
  }, [items.length]);

  if (items.length === 0) return null;
  return (
    <div className={`${festivalLive() ? "bg-festive-dark" : "bg-brand-dark"} text-white`}>
      <div className="container-page flex h-9 items-center justify-center gap-6 text-[13px] font-medium lg:justify-between">
        <p key={index} className="animate-[fadeIn_.5s_ease] truncate lg:hidden" aria-live="polite">
          {items[index]}
        </p>
        <ul className="hidden items-center gap-5 lg:flex">
          {items.map((item, i) => (
            <li key={item} className="flex items-center gap-5">
              {i > 0 && <span className="h-1 w-1 rounded-full bg-white/50" aria-hidden="true" />}
              {item}
            </li>
          ))}
        </ul>
        <div className="hidden items-center gap-5 text-white/90 lg:flex">
          <span className="flex items-center gap-1.5">
            <ClockIcon width={15} height={15} /> {status.label}
          </span>
          <a href={telUrl} className="flex items-center gap-1.5 hover:text-white">
            <PhoneIcon width={15} height={15} /> {store.contact.phone}
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Close overlays on navigation.
  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [location.pathname, location.search]);

  // Lock page scroll and support Escape while an overlay is open.
  useEffect(() => {
    if (!menuOpen && !searchOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setSearchOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen, searchOpen]);

  const search = (query: string) => {
    const q = query.trim();
    navigate(q ? `/catalog?q=${encodeURIComponent(q)}` : "/catalog");
  };

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `flex min-h-11 items-center text-[14px] font-semibold transition-colors ${isActive ? "text-brand" : "text-ink-soft hover:text-brand"}`;

  return (
    <>
      <CreditBar />
      <AnnouncementBar />
      <header className="sticky top-(--credit-h) z-40 border-b border-line bg-canvas/95 backdrop-blur-md">
        <div className="container-page flex h-16 items-center justify-between gap-4 lg:h-[72px]">
          <Logo />

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-7">
              {headerCategories.map((c) => (
                <li key={c.slug}>
                  <Link to={`/catalog?category=${c.slug}`} className={navLinkClass({ isActive: location.search.includes(`category=${c.slug}`) })}>
                    {c.name}
                  </Link>
                </li>
              ))}
              {navLinks.map((link) => (
                <li key={link.to}>
                  <NavLink to={link.to} className={navLinkClass}>
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="flex h-11 w-11 items-center justify-center rounded-lg text-ink-soft hover:bg-sand hover:text-ink"
              aria-label="Search furniture"
            >
              <SearchIcon width={22} height={22} />
            </button>
            <a
              href={telUrl}
              className="flex h-11 w-11 items-center justify-center rounded-lg text-ink-soft hover:bg-sand hover:text-ink lg:hidden"
              aria-label={`Call ${store.contact.phone}`}
            >
              <PhoneIcon width={22} height={22} />
            </a>
            <a href={whatsappLink("general")} target="_blank" rel="noopener" className="btn-whatsapp hidden min-h-11 px-4 lg:inline-flex">
              <WhatsAppIcon /> WhatsApp Us
            </a>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="-mr-2 flex h-11 w-11 items-center justify-center lg:hidden"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
            >
              <MenuIcon width={26} height={26} />
            </button>
          </div>
        </div>
      </header>

      {searchOpen && (
        <div className="fixed inset-0 z-50 animate-[fadeIn_.2s_ease] overflow-y-auto bg-canvas" role="dialog" aria-modal="true" aria-label="Search">
          <div className="container-page flex h-16 items-center justify-between lg:h-[72px]">
            <Logo />
            <button type="button" onClick={() => setSearchOpen(false)} className="-mr-2 flex h-11 w-11 items-center justify-center" aria-label="Close search">
              <CloseIcon width={24} height={24} />
            </button>
          </div>
          <div className="container-page max-w-3xl pt-6 sm:pt-[10vh]">
            <SearchBar id="header-search" value="" size="lg" autoFocus onSubmit={search} placeholder="Sofa, bed, sheesham…" />
            <p className="mt-8 text-sm font-semibold text-muted">Popular searches</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {store.popularSearches.map((term) => (
                <button key={term} type="button" onClick={() => search(term)} className="chip">
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} />}
    </>
  );
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  const enquire = useEnquiry();
  const status = openStatus();
  return (
    <div id="mobile-menu" className="fixed inset-0 z-50 flex animate-[fadeIn_.2s_ease] flex-col bg-canvas lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
      <div className="container-page flex h-16 shrink-0 items-center justify-between border-b border-line">
        <Logo />
        <button type="button" onClick={onClose} className="-mr-2 flex h-11 w-11 items-center justify-center" aria-label="Close menu">
          <CloseIcon width={26} height={26} />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto pb-10">
        <nav aria-label="Mobile" className="container-page pt-4">
          <p className="py-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted">Shop</p>
          <ul className="divide-y divide-line border-y border-line">
            {[...headerCategories.map((c) => ({ to: `/catalog?category=${c.slug}`, label: c.name })), { to: "/categories", label: "All categories" }].map(
              (link) => (
                <li key={link.to}>
                  <Link to={link.to} className="flex min-h-13 items-center justify-between text-[17px] font-semibold">
                    {link.label} <ChevronRightIcon className="text-muted" />
                  </Link>
                </li>
              ),
            )}
          </ul>
          <ul className="mt-4 divide-y divide-line border-y border-line">
            {navLinks.slice(1).map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="flex min-h-13 items-center justify-between text-[17px] font-semibold">
                  {link.label} <ChevronRightIcon className="text-muted" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="container-page mt-6">
          <div className="rounded-xl bg-surface p-4">
            <p className="flex items-start gap-2 text-sm">
              <PinIcon width={18} height={18} className="mt-0.5 shrink-0 text-brand" />
              {store.showroom.addressLines.join(", ")}
            </p>
            <p className={`mt-2 flex items-center gap-2 text-sm font-semibold ${status.open ? "text-success" : "text-muted"}`}>
              <ClockIcon width={18} height={18} /> {status.label}
            </p>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <a href={whatsappLink("general")} target="_blank" rel="noopener" className="btn-whatsapp">
              <WhatsAppIcon /> WhatsApp
            </a>
            <a href={telUrl} className="btn-outline">
              <PhoneIcon width={18} height={18} /> Call
            </a>
          </div>
          <button type="button" onClick={() => enquire()} className="btn-dark mt-3 w-full">
            Send an enquiry
          </button>
        </div>
      </div>
    </div>
  );
}
