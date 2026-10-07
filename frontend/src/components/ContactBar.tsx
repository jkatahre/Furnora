import { useEnquiry } from "../context/EnquiryContext";
import { telUrl, whatsappLink } from "../utils/contact";
import { PhoneIcon, WhatsAppIcon } from "./Icons";

/** Sticky WhatsApp / Call / Enquire bar on phones. */
export function MobileContactBar() {
  const enquire = useEnquiry();
  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-canvas/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden">
      <div className="grid grid-cols-3 gap-2 px-3 py-2">
        <a href={whatsappLink("general")} target="_blank" rel="noopener" className="btn-whatsapp px-2 text-sm">
          <WhatsAppIcon /> WhatsApp
        </a>
        <a href={telUrl} className="btn-outline px-2 text-sm">
          <PhoneIcon width={18} height={18} /> Call
        </a>
        <button type="button" onClick={() => enquire()} className="btn-dark px-2 text-sm">
          Enquire
        </button>
      </div>
    </div>
  );
}

/** Floating WhatsApp button on larger screens. */
export function FloatingWhatsApp() {
  return (
    <a
      href={whatsappLink("general")}
      target="_blank"
      rel="noopener"
      aria-label="Chat with us on WhatsApp"
      className="group fixed bottom-6 right-6 z-30 hidden h-14 items-center gap-2 rounded-full bg-whatsapp pl-4 pr-5 text-white shadow-lift transition-colors hover:bg-whatsapp-dark lg:flex"
    >
      <WhatsAppIcon width={28} height={28} />
      <span className="text-sm font-semibold">Chat with us</span>
    </a>
  );
}
