import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { CloseIcon, MenuIcon, SearchIcon } from "./Icons";
import SearchBar from "./SearchBar";

export const navLinks = [
  { to: "/", label: "Home" },
  { to: "/catalog", label: "Catalog" },
  { to: "/categories", label: "Categories" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`font-sans text-lg font-semibold tracking-[0.42em] text-ink ${className}`} aria-label="Furnora home">
      FURNORA
    </Link>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Close overlays on navigation.
  useEffect(() => {
    setMenuOpen(false);
    setSearchOpen(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
    `relative py-2 text-[13px] font-medium tracking-wide transition-colors after:absolute after:-bottom-0.5 after:left-0 after:h-px after:bg-ink after:transition-all after:duration-300 ${
      isActive ? "text-ink after:w-full" : "text-muted hover:text-ink after:w-0 hover:after:w-full"
    }`;

  return (
    <header
      className={`sticky top-0 z-40 border-b transition-colors duration-300 ${
        scrolled ? "border-line bg-canvas/95 backdrop-blur-md" : "border-transparent bg-canvas"
      }`}
    >
      <div className="container-page flex h-[72px] items-center justify-between gap-6">
        <Logo />

        <nav aria-label="Main" className="hidden md:block">
          <ul className="flex items-center gap-9">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to} end={link.to === "/"} className={navLinkClass}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            className="hidden items-center gap-2 px-2 py-2 text-[13px] font-medium text-muted transition-colors hover:text-ink md:flex"
            aria-label="Search the catalog"
          >
            <SearchIcon width={18} height={18} />
            <span>Search</span>
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="-mr-2 p-2 text-ink md:hidden"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <MenuIcon width={24} height={24} />
          </button>
        </div>
      </div>

      {/* Search overlay */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-50 animate-[fadeIn_.25s_ease] bg-canvas"
          role="dialog"
          aria-modal="true"
          aria-label="Search"
        >
          <div className="container-page flex h-[72px] items-center justify-between">
            <Logo />
            <button type="button" onClick={() => setSearchOpen(false)} className="-mr-2 p-2" aria-label="Close search">
              <CloseIcon width={24} height={24} />
            </button>
          </div>
          <div className="container-page pt-[12vh]">
            <p className="eyebrow mb-6">Search the collection</p>
            <SearchBar id="header-search" value="" size="lg" autoFocus onSubmit={search} placeholder="Sofas, oak, Scandinavian…" />
            <div className="mt-8 flex flex-wrap gap-2">
              {["Sofa", "Bed", "Wardrobe", "Dining Table", "Solid Oak", "Velvet"].map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => search(term)}
                  className="border border-line px-4 py-2 text-sm text-ink-soft transition-colors hover:border-ink hover:text-ink"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile menu */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-50 flex animate-[fadeIn_.2s_ease] flex-col bg-canvas md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
        >
          <div className="container-page flex h-[72px] shrink-0 items-center justify-between">
            <Logo />
            <button type="button" onClick={() => setMenuOpen(false)} className="-mr-2 p-2" aria-label="Close menu">
              <CloseIcon width={24} height={24} />
            </button>
          </div>
          <div className="container-page flex flex-1 flex-col overflow-y-auto pb-10 pt-6">
            <SearchBar id="mobile-search" value="" onSubmit={search} placeholder="Search furniture" />
            <nav aria-label="Mobile" className="mt-8">
              <ul className="divide-y divide-line border-y border-line">
                {navLinks.map((link) => (
                  <li key={link.to}>
                    <NavLink
                      to={link.to}
                      end={link.to === "/"}
                      className={({ isActive }) =>
                        `block py-4 font-display text-3xl ${isActive ? "text-ink" : "text-ink-soft"}`
                      }
                    >
                      {link.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
            <p className="mt-auto pt-10 text-sm text-muted">Furniture designed for modern living.</p>
          </div>
        </div>
      )}
    </header>
  );
}
