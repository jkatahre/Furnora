import { useEffect, type ReactNode } from "react";
import EnquiryForm from "../components/EnquiryForm";
import MapEmbed from "../components/MapEmbed";
import { ChevronDownIcon, ClockIcon, DirectionsIcon, MailIcon, PhoneIcon, PinIcon, WhatsAppIcon } from "../components/Icons";
import { DeliveryAreas } from "../components/sections/Showroom";
import { store } from "../config/store";
import { directionsUrl, hoursTable, openStatus, telUrl, whatsappLink } from "../utils/contact";

/** Contact us: quick actions, address & hours, an enquiry form, the map, delivery and FAQs. */
export default function Contact() {
  useEffect(() => {
    document.title = `Contact us · ${store.name}`;
  }, []);

  const { contactPage, showroom } = store;
  const status = openStatus();

  return (
    <>
      {/* Header with the three fastest ways to reach the store */}
      <section className="bg-surface">
        <div className="container-page py-7 md:py-12">
          <h1 className="text-[2.1rem] sm:text-5xl">{contactPage.title}</h1>
          <p className="mt-2 max-w-xl text-[17px] text-ink-soft">{contactPage.subtitle}</p>
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3 lg:max-w-3xl">
            <a href={whatsappLink("general")} target="_blank" rel="noopener" className="btn-whatsapp text-base">
              <WhatsAppIcon width={22} height={22} /> WhatsApp us
            </a>
            <a href={telUrl} className="btn-dark text-base">
              <PhoneIcon width={20} height={20} /> Call {store.contact.phone}
            </a>
            <a href={directionsUrl()} target="_blank" rel="noopener" className="btn-outline text-base">
              <DirectionsIcon /> Get directions
            </a>
          </div>
        </div>
      </section>

      <section id="showroom" className="container-page mt-8 grid scroll-mt-24 gap-8 md:mt-12 lg:grid-cols-12 lg:gap-12">
        {/* Store details */}
        <div className="lg:col-span-5">
          <ul className="divide-y divide-line rounded-2xl border border-line">
            <Detail icon={<PinIcon />} title={showroom.title}>
              <address className="not-italic text-ink-soft">
                {showroom.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
              <a href={directionsUrl()} target="_blank" rel="noopener" className="link-arrow">
                Open in Google Maps
              </a>
            </Detail>
            <Detail icon={<ClockIcon />} title="Opening hours">
              <p className={`mb-2 text-sm font-semibold ${status.open ? "text-success" : "text-ink-soft"}`}>{status.label}</p>
              <dl className="space-y-1 text-sm">
                {hoursTable().map((row) => (
                  <div key={row.days} className="flex justify-between gap-4">
                    <dt className="text-muted">{row.days}</dt>
                    <dd className="font-semibold">{row.time}</dd>
                  </div>
                ))}
              </dl>
            </Detail>
            <Detail icon={<PhoneIcon />} title="Phone & WhatsApp">
              <a href={telUrl} className="flex min-h-10 items-center font-semibold">
                {store.contact.phone}
              </a>
            </Detail>
            <Detail icon={<MailIcon />} title="Email">
              <a href={`mailto:${store.contact.email}`} className="flex min-h-10 items-center font-semibold break-all">
                {store.contact.email}
              </a>
            </Detail>
          </ul>
          <DeliveryAreas className="mt-6" />
        </div>

        {/* Enquiry form */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl border border-line p-5 sm:p-8">
            <h2 className="text-2xl sm:text-3xl">Send an enquiry</h2>
            <p className="mb-5 mt-1 text-sm text-muted">Tap what you need. It opens WhatsApp with your message ready.</p>
            <EnquiryForm idPrefix="contact" />
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="container-page mt-10 md:mt-14">
        <MapEmbed />
      </section>

      {/* FAQs */}
      {contactPage.faqs.length > 0 && (
        <section className="container-page mt-10 max-w-3xl md:mt-14">
          <h2 className="section-title">Common questions</h2>
          <div className="mt-4 divide-y divide-line border-y border-line">
            {contactPage.faqs.map((faq) => (
              <details key={faq.q} className="group [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-3 text-[16px] font-semibold">
                  {faq.q}
                  <ChevronDownIcon className="shrink-0 text-muted transition-transform group-open:rotate-180" />
                </summary>
                <p className="pb-4 text-ink-soft">{faq.a}</p>
              </details>
            ))}
          </div>
        </section>
      )}
    </>
  );
}

function Detail({ icon, title, children }: { icon: ReactNode; title: string; children: ReactNode }) {
  return (
    <li className="flex gap-4 p-5">
      <span className="mt-0.5 shrink-0 text-brand">{icon}</span>
      <div className="min-w-0 flex-1">
        <h2 className="mb-1.5 font-sans text-[15px] font-bold">{title}</h2>
        {children}
      </div>
    </li>
  );
}
