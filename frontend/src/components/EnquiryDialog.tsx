import { useEffect, useRef, useState, type FormEvent } from "react";
import { store } from "../config/store";
import type { EnquiryIntent, EnquiryRequest } from "../context/EnquiryContext";
import { mainImageUrl } from "../data/productImages";
import { telUrl, whatsappUrl } from "../utils/contact";
import { priceLabel } from "../utils/format";
import { CloseIcon, PhoneIcon, WhatsAppIcon } from "./Icons";
import SmartImage from "./SmartImage";

const intents: { value: EnquiryIntent; label: string; line: string }[] = [
  { value: "price", label: "Best price", line: "Please share your best price." },
  { value: "custom", label: "Customise it", line: "I'd like it customised (size / fabric / finish)." },
  { value: "delivery", label: "Delivery details", line: "When can you deliver and what are the charges?" },
  { value: "visit", label: "Visit showroom", line: "I'd like to visit the showroom." },
  { value: "enquiry", label: "Something else", line: "" },
];

const OTHER_CITY = "Other";

/**
 * A short enquiry form that sends the message over WhatsApp: no typing needed beyond a
 * name, and no backend required. To also save leads, post `message` to your API in `send`.
 */
export default function EnquiryDialog({ request, onClose }: { request: EnquiryRequest; onClose: () => void }) {
  const { product } = request;
  const [selected, setSelected] = useState<EnquiryIntent[]>([request.intent ?? (product ? "price" : "enquiry")]);
  const [name, setName] = useState("");
  const [city, setCity] = useState(store.deliveryAreas[0]?.city ?? "");
  const [note, setNote] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const previouslyFocused = document.activeElement as HTMLElement | null;
    panelRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
      previouslyFocused?.focus();
    };
  }, [onClose]);

  const toggle = (value: EnquiryIntent) =>
    setSelected((s) => (s.includes(value) ? s.filter((v) => v !== value) : [...s, value]));

  const send = (event: FormEvent) => {
    event.preventDefault();
    const lines = [
      `Hi ${store.name}${name.trim() ? `, this is ${name.trim()}` : ""}.`,
      product ? `Product: ${product.name} (${priceLabel(product)})\n${window.location.origin}/products/${product.slug}` : "",
      ...intents.filter((i) => selected.includes(i.value)).map((i) => i.line),
      note.trim(),
      city && city !== OTHER_CITY ? `City: ${city}` : "",
    ].filter(Boolean);
    window.open(whatsappUrl(lines.join("\n")), "_blank", "noopener");
    onClose();
  };

  const title = request.intent === "custom" ? "Request customisation" : product ? "Enquire about this" : "Send us an enquiry";

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center" role="dialog" aria-modal="true" aria-label={title}>
      <div className="absolute inset-0 animate-[fadeIn_.2s_ease] bg-ink/50" onClick={onClose} aria-hidden="true" />
      <div
        ref={panelRef}
        tabIndex={-1}
        className="relative max-h-[92vh] w-full animate-[slideUp_.25s_var(--ease-gentle)] overflow-y-auto rounded-t-2xl bg-canvas p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] focus:outline-none sm:max-w-lg sm:animate-[riseIn_.25s_ease] sm:rounded-2xl sm:p-7"
      >
        <div className="flex items-start justify-between gap-4">
          <h2 className="font-display text-2xl">{title}</h2>
          <button type="button" onClick={onClose} className="-mr-2 -mt-1 flex h-11 w-11 items-center justify-center" aria-label="Close">
            <CloseIcon width={22} height={22} />
          </button>
        </div>

        {product && (
          <div className="mt-4 flex items-center gap-3 rounded-xl bg-surface p-3">
            <SmartImage src={mainImageUrl(product.slug)} alt="" className="h-14 w-16 shrink-0 rounded-lg" />
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">{product.name}</p>
              <p className="text-sm text-muted">{priceLabel(product)}</p>
            </div>
          </div>
        )}

        <form onSubmit={send} className="mt-5 space-y-5">
          <fieldset>
            <legend className="mb-2 text-sm font-semibold">I'd like</legend>
            <div className="flex flex-wrap gap-2">
              {intents
                .filter((i) => product || i.value !== "price")
                .map((i) => (
                  <button
                    key={i.value}
                    type="button"
                    aria-pressed={selected.includes(i.value)}
                    onClick={() => toggle(i.value)}
                    className={`chip ${selected.includes(i.value) ? "chip-active" : ""}`}
                  >
                    {i.label}
                  </button>
                ))}
            </div>
          </fieldset>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold">Your name</span>
              <input className="field" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" placeholder="Optional" />
            </label>
            <label className="block">
              <span className="mb-1.5 block text-sm font-semibold">City</span>
              <select className="field" value={city} onChange={(e) => setCity(e.target.value)}>
                {store.deliveryAreas.map((a) => (
                  <option key={a.city}>{a.city}</option>
                ))}
                <option>{OTHER_CITY}</option>
              </select>
            </label>
          </div>

          <label className="block">
            <span className="mb-1.5 block text-sm font-semibold">Anything else?</span>
            <textarea
              className="field resize-none"
              rows={2}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g. need it 6 ft long, in grey fabric"
            />
          </label>

          <button type="submit" className="btn-whatsapp w-full">
            <WhatsAppIcon width={22} height={22} /> Send on WhatsApp
          </button>
          <a href={telUrl} className="btn-outline w-full">
            <PhoneIcon width={18} height={18} /> Or call {store.contact.phone}
          </a>
        </form>
      </div>
    </div>
  );
}
