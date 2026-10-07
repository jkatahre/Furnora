import { store } from "../../config/store";
import { directionsUrl, hoursTable, mapEmbedUrl, openStatus, telUrl, whatsappLink } from "../../utils/contact";
import { formatPrice } from "../../utils/format";
import { CheckIcon, ClockIcon, DirectionsIcon, PhoneIcon, PinIcon, TruckIcon, WhatsAppIcon } from "../Icons";
import SmartImage from "../SmartImage";

/** The full "Visit our showroom" block: photos, address, hours, map and contact buttons. */
export default function Showroom({ heading = "h2", showMap = true }: { heading?: "h1" | "h2"; showMap?: boolean }) {
  const { showroom } = store;
  const status = openStatus();
  const [main, ...more] = showroom.photos;
  const Heading = heading;

  return (
    <section id="showroom" className="container-page mt-14 scroll-mt-24 md:mt-20">
      <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
        {/* Photos */}
        <div className="space-y-2 sm:space-y-3 lg:col-span-6">
          {main && <SmartImage src={main.src} alt={main.alt} className="aspect-[16/10] rounded-xl" />}
          {more.length > 0 && (
            <div className="grid gap-2 sm:gap-3" style={{ gridTemplateColumns: `repeat(${Math.min(more.length, 3)}, minmax(0, 1fr))` }}>
              {more.slice(0, 3).map((photo) => (
                <SmartImage key={photo.src} src={photo.src} alt={photo.alt} className="aspect-[4/3] rounded-xl" />
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="lg:col-span-6">
          <p className="eyebrow">Visit us</p>
          <Heading className="section-title mt-2">{showroom.title}</Heading>
          <p
            className={`mt-3 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold ${
              status.open ? "bg-success/10 text-success" : "bg-sand text-ink-soft"
            }`}
          >
            <span className={`h-2 w-2 rounded-full ${status.open ? "bg-success" : "bg-muted"}`} aria-hidden="true" />
            {status.label}
          </p>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div className="flex gap-3">
              <PinIcon className="mt-0.5 shrink-0 text-brand" />
              <address className="not-italic">
                {showroom.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
            </div>
            <div className="flex gap-3">
              <ClockIcon className="mt-0.5 shrink-0 text-brand" />
              <dl className="flex-1 space-y-1">
                {hoursTable().map((row) => (
                  <div key={row.days} className="flex justify-between gap-3 text-sm">
                    <dt className="text-muted">{row.days}</dt>
                    <dd className="font-semibold">{row.time}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {showroom.highlights.length > 0 && (
            <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm">
              {showroom.highlights.map((h) => (
                <li key={h} className="flex items-center gap-1.5">
                  <CheckIcon width={16} height={16} className="text-success" /> {h}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <a href={directionsUrl()} target="_blank" rel="noopener" className="btn-primary">
              <DirectionsIcon /> Get directions
            </a>
            <a href={whatsappLink("visit")} target="_blank" rel="noopener" className="btn-whatsapp">
              <WhatsAppIcon /> WhatsApp
            </a>
            <a href={telUrl} className="btn-outline">
              <PhoneIcon width={18} height={18} /> {store.contact.phone}
            </a>
          </div>

          <DeliveryAreas className="mt-6" />
        </div>
      </div>

      {showMap && (
        <div className="mt-6 overflow-hidden rounded-xl border border-line">
          <iframe
            title={`Map to ${store.name}`}
            src={mapEmbedUrl()}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="block h-[280px] w-full md:h-[360px]"
          />
        </div>
      )}
    </section>
  );
}

/** Cities, delivery charges and times from the store settings. */
export function DeliveryAreas({ className = "" }: { className?: string }) {
  return (
    <div id="delivery" className={`scroll-mt-24 rounded-xl bg-surface p-4 ${className}`}>
      <p className="flex items-center gap-2 text-sm font-semibold">
        <TruckIcon width={18} height={18} className="text-brand" /> We deliver to
      </p>
      <ul className="mt-3 flex flex-wrap gap-2">
        {store.deliveryAreas.map((area) => (
          <li key={area.city} className="rounded-full border border-line bg-canvas px-3 py-1.5 text-[13px]">
            <span className="font-semibold">{area.city}</span>{" "}
            <span className={area.fee === 0 ? "font-semibold text-success" : "text-muted"}>· {area.fee === 0 ? "Free" : formatPrice(area.fee)}</span>
          </li>
        ))}
      </ul>
      {store.deliveryNote && <p className="mt-2 text-[13px] text-muted">{store.deliveryNote}</p>}
    </div>
  );
}
