import { useEffect, useRef } from "react";
import type { EnquiryRequest } from "../context/EnquiryContext";
import { mainImageUrl } from "../data/productImages";
import { priceLabel } from "../utils/format";
import EnquiryForm from "./EnquiryForm";
import { CloseIcon } from "./Icons";
import SmartImage from "./SmartImage";

/** The enquiry form as a bottom sheet (phones) or dialog (desktop). */
export default function EnquiryDialog({ request, onClose }: { request: EnquiryRequest; onClose: () => void }) {
  const { product } = request;
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

  const title = request.intent === "custom" ? "Request customisation" : product ? "Enquire about this" : "Send us an enquiry";

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center" role="dialog" aria-modal="true" aria-label={title}>
      <div className="absolute inset-0 animate-[fadeIn_.2s_ease] bg-ink/50" onClick={onClose} aria-hidden="true" />
      <div
        ref={panelRef}
        tabIndex={-1}
        className="relative max-h-[92vh] w-full animate-[slideUp_.25s_var(--ease-gentle)] overflow-y-auto rounded-t-2xl bg-canvas p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] focus:outline-none sm:max-w-lg sm:animate-[riseIn_.25s_ease] sm:rounded-2xl sm:p-7"
      >
        <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-linen sm:hidden" aria-hidden="true" />
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

        <div className="mt-5">
          <EnquiryForm product={product} intent={request.intent} onSent={onClose} idPrefix="dialog" />
        </div>
      </div>
    </div>
  );
}
