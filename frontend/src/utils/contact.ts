import { store, type OpeningHours } from "../config/store";
import type { Product } from "../types/product";
import { priceLabel } from "./format";

type MessageKey = keyof typeof store.whatsappMessages;

/** Fills {store}, {product}, {price} and {link} in a WhatsApp message template. */
export function fillMessage(key: MessageKey, product?: Product): string {
  const link = product ? `${window.location.origin}/products/${product.slug}` : window.location.href;
  return store.whatsappMessages[key]
    .replaceAll("{store}", store.name)
    .replaceAll("{product}", product?.name ?? "")
    .replaceAll("{price}", product ? priceLabel(product) : "")
    .replaceAll("{link}", link);
}

export function whatsappUrl(message: string): string {
  return `https://wa.me/${store.contact.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`;
}

export function whatsappLink(key: MessageKey, product?: Product): string {
  return whatsappUrl(fillMessage(key, product));
}

export const telUrl = `tel:${store.contact.phone.replace(/[^\d+]/g, "")}`;

export function mapEmbedUrl(): string {
  return store.showroom.mapEmbedUrl || `https://www.google.com/maps?q=${encodeURIComponent(store.showroom.mapQuery)}&output=embed`;
}

export function directionsUrl(): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(store.showroom.mapQuery)}`;
}

// ── Opening hours ────────────────────────────────────────────────────────

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

/** "20:30" → "8:30 pm" */
export function formatTime(hhmm: string): string {
  const [h, m] = hhmm.split(":").map(Number);
  const suffix = h >= 12 ? "pm" : "am";
  const hour = h % 12 || 12;
  return m ? `${hour}:${String(m).padStart(2, "0")} ${suffix}` : `${hour} ${suffix}`;
}

function hoursFor(day: number): OpeningHours | undefined {
  return store.showroom.hours.find((h) => h.days.includes(day));
}

/** Current day and time at the store (India Standard Time). */
function storeNow(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(now);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  return { day: dayNames.indexOf(get("weekday")), minutes: Number(get("hour")) * 60 + Number(get("minute")) };
}

/** e.g. { open: true, label: "Open now · until 8:30 pm" } */
export function openStatus(now = new Date()): { open: boolean; label: string } {
  const { day, minutes } = storeNow(now);
  const today = hoursFor(day);
  if (today?.open && today.close && minutes >= toMinutes(today.open) && minutes < toMinutes(today.close)) {
    return { open: true, label: `Open now · until ${formatTime(today.close)}` };
  }
  if (today?.open && minutes < toMinutes(today.open)) {
    return { open: false, label: `Opens today at ${formatTime(today.open)}` };
  }
  for (let offset = 1; offset <= 7; offset++) {
    const next = hoursFor((day + offset) % 7);
    if (next?.open) {
      const when = offset === 1 ? "tomorrow" : dayNames[(day + offset) % 7];
      return { open: false, label: `Closed · opens ${when} at ${formatTime(next.open)}` };
    }
  }
  return { open: false, label: "Closed" };
}

/** Groups consecutive days: [{ days: "Mon – Sat", time: "10:30 am – 8:30 pm" }, …] */
export function hoursTable(): { days: string; time: string }[] {
  return store.showroom.hours.map((h) => {
    const sorted = [...h.days].sort((a, b) => ((a + 6) % 7) - ((b + 6) % 7)); // Monday first
    const consecutive = sorted.every((d, i) => i === 0 || (sorted[i - 1] + 1) % 7 === d);
    const days =
      sorted.length > 2 && consecutive
        ? `${dayNames[sorted[0]]} – ${dayNames[sorted[sorted.length - 1]]}`
        : sorted.map((d) => dayNames[d]).join(", ");
    return { days, time: h.open && h.close ? `${formatTime(h.open)} – ${formatTime(h.close)}` : "Closed" };
  });
}
