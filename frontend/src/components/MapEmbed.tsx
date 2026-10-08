import { store } from "../config/store";
import { directionsUrl, mapEmbedUrl } from "../utils/contact";
import { DirectionsIcon, PinIcon } from "./Icons";

/** Google Map of the showroom. The address and a directions link sit behind it in case the map can't load. */
export default function MapEmbed({ className = "" }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-2xl border border-line bg-sand ${className}`}>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
        <PinIcon width={32} height={32} className="text-brand" />
        <p className="max-w-xs text-sm text-ink-soft">{store.showroom.addressLines.join(", ")}</p>
        <a href={directionsUrl()} target="_blank" rel="noopener" className="btn-primary min-h-11 text-sm">
          <DirectionsIcon width={18} height={18} /> Open in Google Maps
        </a>
      </div>
      <iframe
        title={`Map to ${store.name}`}
        src={mapEmbedUrl()}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="relative block h-[300px] w-full md:h-[420px]"
      />
    </div>
  );
}
