import { useEffect } from "react";
import { MailIcon, PhoneIcon, WhatsAppIcon } from "../components/Icons";
import Showroom from "../components/sections/Showroom";
import { store } from "../config/store";
import { useEnquiry } from "../context/EnquiryContext";
import { telUrl, whatsappLink } from "../utils/contact";

/** Visit us & contact: showroom first, then every way to reach the store. */
export default function Contact() {
  const enquire = useEnquiry();

  useEffect(() => {
    document.title = `Visit our showroom · ${store.name}`;
  }, []);

  return (
    <>
      <div className="-mt-8 md:-mt-12">
        <Showroom heading="h1" />
      </div>

      <section className="container-page mt-14 md:mt-20">
        <h2 className="section-title">Talk to us</h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <ContactCard href={whatsappLink("general")} external icon={<WhatsAppIcon width={26} height={26} />} title="WhatsApp" detail="Fastest reply" tone="whatsapp" />
          <ContactCard href={telUrl} icon={<PhoneIcon width={26} height={26} />} title="Call" detail={store.contact.phone} />
          <ContactCard href={`mailto:${store.contact.email}`} icon={<MailIcon width={26} height={26} />} title="Email" detail={store.contact.email} />
          <li>
            <button
              type="button"
              onClick={() => enquire()}
              className="flex h-full min-h-24 w-full flex-col justify-center rounded-xl bg-ink p-5 text-left text-white hover:bg-ink-soft"
            >
              <span className="text-lg font-bold">Send an enquiry</span>
              <span className="text-sm text-white/75">Takes 10 seconds</span>
            </button>
          </li>
        </ul>
      </section>
    </>
  );
}

function ContactCard({
  href,
  icon,
  title,
  detail,
  external,
  tone,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  detail: string;
  external?: boolean;
  tone?: "whatsapp";
}) {
  return (
    <li>
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener" } : {})}
        className={`flex h-full min-h-24 items-center gap-4 rounded-xl border p-5 transition-colors ${
          tone === "whatsapp" ? "border-whatsapp/30 bg-whatsapp/5 text-whatsapp hover:bg-whatsapp/10" : "border-line hover:border-ink/30"
        }`}
      >
        {icon}
        <span className="min-w-0">
          <span className="block text-lg font-bold text-ink">{title}</span>
          <span className="block truncate text-sm text-muted">{detail}</span>
        </span>
      </a>
    </li>
  );
}
