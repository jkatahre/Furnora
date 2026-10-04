import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { categories } from "../data/categories";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 bg-ink text-canvas/70 md:mt-32">
      <div className="container-page grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-4">
          <Link to="/" className="text-lg font-semibold tracking-[0.42em] text-canvas">
            FURNORA
          </Link>
          <p className="mt-5 max-w-xs text-sm leading-relaxed">
            A curated catalog of contemporary furniture — designed to be lived with, and made to last.
          </p>
        </div>

        <FooterColumn title="Explore" className="md:col-span-2">
          <FooterLink to="/catalog">Full catalog</FooterLink>
          <FooterLink to="/catalog?sort=newest">New arrivals</FooterLink>
          <FooterLink to="/categories">All categories</FooterLink>
        </FooterColumn>

        <FooterColumn title="Categories" className="md:col-span-3">
          <div className="grid grid-cols-2 gap-x-6 gap-y-3">
            {categories.slice(0, 8).map((c) => (
              <FooterLink key={c.slug} to={`/catalog?category=${c.slug}`}>
                {c.name}
              </FooterLink>
            ))}
          </div>
        </FooterColumn>

        <FooterColumn title="Studio" className="md:col-span-3">
          <FooterLink to="/about">About Furnora</FooterLink>
          <FooterLink to="/contact">Contact &amp; showrooms</FooterLink>
          <p className="pt-2 text-sm">Mon – Sat, 10am – 7pm</p>
        </FooterColumn>
      </div>
      <div className="border-t border-canvas/10">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-canvas/50 sm:flex-row sm:justify-between">
          <p>© {year} Furnora. All rights reserved.</p>
          <p>Prices and availability are indicative and may change.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, className, children }: { title: string; className?: string; children: ReactNode }) {
  return (
    <div className={className}>
      <h2 className="mb-5 font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-canvas">{title}</h2>
      <div className="flex flex-col gap-3">{children}</div>
    </div>
  );
}

function FooterLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link to={to} className="text-sm transition-colors hover:text-canvas">
      {children}
    </Link>
  );
}
