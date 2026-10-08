import { useState, type FormEvent } from "react";
import { store } from "../config/store";
import type { EnquiryIntent } from "../context/EnquiryContext";
import type { Product } from "../types/product";
import { telUrl, whatsappUrl } from "../utils/contact";
import { priceLabel } from "../utils/format";
import { PhoneIcon, WhatsAppIcon } from "./Icons";

const intents: { value: EnquiryIntent; label: string; line: string }[] = [
  { value: "price", label: "Best price", line: "Please share your best price." },
  { value: "custom", label: "Customise it", line: "I'd like it customised (size / fabric / finish)." },
  { value: "delivery", label: "Delivery details", line: "When can you deliver and what are the charges?" },
  { value: "visit", label: "Visit showroom", line: "I'd like to visit the showroom." },
  { value: "enquiry", label: "Something else", line: "" },
];

const OTHER_CITY = "Other";

interface EnquiryFormProps {
  product?: Product;
  intent?: EnquiryIntent;
  /** Called after the message is handed to WhatsApp. */
  onSent?: () => void;
  idPrefix?: string;
}

/**
 * A short enquiry form that sends the message over WhatsApp: no typing needed beyond a
 * name, and no backend required. To also save leads, post the message to your API in `send`.
 */
export default function EnquiryForm({ product, intent, onSent, idPrefix = "enquiry" }: EnquiryFormProps) {
  const [selected, setSelected] = useState<EnquiryIntent[]>([intent ?? (product ? "price" : "enquiry")]);
  const [name, setName] = useState("");
  const [city, setCity] = useState(store.deliveryAreas[0]?.city ?? "");
  const [note, setNote] = useState("");

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
    onSent?.();
  };

  return (
    <form onSubmit={send} className="space-y-5">
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
        <label className="block" htmlFor={`${idPrefix}-name`}>
          <span className="mb-1.5 block text-sm font-semibold">Your name</span>
          <input id={`${idPrefix}-name`} className="field" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" placeholder="Optional" />
        </label>
        <label className="block" htmlFor={`${idPrefix}-city`}>
          <span className="mb-1.5 block text-sm font-semibold">City</span>
          <select id={`${idPrefix}-city`} className="field" value={city} onChange={(e) => setCity(e.target.value)}>
            {store.deliveryAreas.map((a) => (
              <option key={a.city}>{a.city}</option>
            ))}
            <option>{OTHER_CITY}</option>
          </select>
        </label>
      </div>

      <label className="block" htmlFor={`${idPrefix}-note`}>
        <span className="mb-1.5 block text-sm font-semibold">Anything else?</span>
        <textarea
          id={`${idPrefix}-note`}
          className="field resize-none"
          rows={2}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="e.g. need a 6 ft sofa in grey fabric"
        />
      </label>

      <button type="submit" className="btn-whatsapp w-full text-base">
        <WhatsAppIcon width={22} height={22} /> Send on WhatsApp
      </button>
      <a href={telUrl} className="btn-outline w-full">
        <PhoneIcon width={18} height={18} /> Or call {store.contact.phone}
      </a>
    </form>
  );
}
