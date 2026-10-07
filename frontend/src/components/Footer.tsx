import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { store } from "../config/store";
import { categories } from "../data/categories";
import { products } from "../data/products";
import { directionsUrl, hoursTable, telUrl, whatsappLink } from "../utils/contact";
import { FacebookIcon, InstagramIcon, MailIcon, PhoneIcon, PinIcon, WhatsAppIcon, YoutubeIcon } from "./Icons";
import { Logo } from "./Header";

const liveCategories = categories.filter((c) => products.some((p) => p.category_id === c.category_id && p.status === "active"));

export default function Footer() {
  const year = new Date().getFullYear();
  const social = [
    { href: store.social.instagram, label: "Instagram", icon: <InstagramIcon /> },
    { href: store.social.facebook, label: "Facebook", icon: <FacebookIcon /> },
    { href: store.social.youtube, label: "YouTube", icon: <YoutubeIcon /> },
  ].filter((s) => s.href);

  return (
    <footer className="mt-20 bg-ink text-white/75 md:mt-28">
      <div className="container-page grid gap-10 py-14 md:grid-cols-12 md:py-16">
        <div className="md:col-span-4">
          <Logo light />
          <ul className="mt-6 space-y-3 text-sm">
            <li className="flex gap-3">
              <PinIcon width={18} height={18} className="mt-0.5 shrink-0" />
              <a href={directionsUrl()} target="_blank" rel="noopener" className="hover:text-white">
                {store.showroom.addressLines.join(", ")}
              </a>
            </li>
            <li>
              <a href={telUrl} className="flex min-h-10 items-center gap-3 hover:text-white">
                <PhoneIcon width={18} height={18} /> {store.contact.phone}
              </a>
            </li>
            <li>
              <a href={whatsappLink("general")} target="_blank" rel="noopener" className="flex min-h-10 items-center gap-3 hover:text-white">
                <WhatsAppIcon width={18} height={18} /> WhatsApp us
              </a>
            </li>
            <li>
              <a href={`mailto:${store.contact.email}`} className="flex min-h-10 items-center gap-3 hover:text-white">
                <MailIcon width={18} height={18} /> {store.contact.email}
              </a>
            </li>
          </ul>
          {social.length > 0 && (
            <div className="mt-5 flex gap-2">
              {social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener"
                  aria-label={s.label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 hover:border-white hover:text-white"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          )}
        </div>

        <FooterColumn title="Shop" className="md:col-span-3">
          <div className="grid grid-cols-2 gap-x-6 gap-y-1">
            {liveCategories.slice(0, 10).map((c) => (
              <FooterLink key={c.slug} to={`/catalog?category=${c.slug}`}>
                {c.name}
              </FooterLink>
            ))}
          </div>
        </FooterColumn>

        <FooterColumn title="Store" className="md:col-span-2">
          <FooterLink to="/custom-furniture">Custom furniture</FooterLink>
          <FooterLink to="/contact">Visit showroom</FooterLink>
          <FooterLink to="/about">About us</FooterLink>
          <FooterLink to="/contact#delivery">Delivery areas</FooterLink>
        </FooterColumn>

        <FooterColumn title="Showroom hours" className="md:col-span-3">
          <dl className="space-y-2 text-sm">
            {hoursTable().map((row) => (
              <div key={row.days} className="flex justify-between gap-4">
                <dt>{row.days}</dt>
                <dd className="text-white">{row.time}</dd>
              </div>
            ))}
          </dl>
          <p className="pt-3 text-sm">
            Delivery: {store.deliveryAreas.map((a) => a.city).join(", ")}. {store.deliveryNote}.
          </p>
        </FooterColumn>
      </div>
      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-1 py-6 text-xs text-white/50 sm:flex-row sm:justify-between">
          <p>
            © {year} {store.name}. All rights reserved.
          </p>
          <p>Prices include GST. Offers and availability may change.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, className, children }: { title: string; className?: string; children: ReactNode }) {
  return (
    <div className={className}>
      <h2 className="mb-4 font-sans text-sm font-semibold text-white">{title}</h2>
      <div className="flex flex-col">{children}</div>
    </div>
  );
}

function FooterLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link to={to} className="flex min-h-10 items-center text-sm transition-colors hover:text-white">
      {children}
    </Link>
  );
}
