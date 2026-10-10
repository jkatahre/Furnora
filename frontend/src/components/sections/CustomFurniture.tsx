import { store } from "../../config/store";
import { useEnquiry } from "../../context/EnquiryContext";
import { whatsappLink } from "../../utils/contact";
import { formatPrice } from "../../utils/format";
import { RulerIcon, WhatsAppIcon } from "../Icons";
import SmartImage from "../SmartImage";

/** "Can't find the right size?": the custom furniture lead section. */
export default function CustomFurniture({ heading = "h2" }: { heading?: "h1" | "h2" }) {
  const enquire = useEnquiry();
  const { custom } = store;
  const Heading = heading;
  return (
    <section className="container-page mt-10 md:mt-20">
      <div className="grid overflow-hidden rounded-2xl bg-ink text-white md:grid-cols-2">
        <div className="relative">
          <SmartImage src={custom.image} alt="A sofa made to a customer's measurements" tone="dark" className="aspect-[4/3] h-full md:aspect-auto md:min-h-[460px]" />
          <span className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-ink">
            <RulerIcon width={16} height={16} /> {custom.leadTime}
          </span>
        </div>
        <div className="flex flex-col justify-center p-5 sm:p-10 lg:p-14">
          <p className="eyebrow text-white/70">Custom furniture</p>
          <Heading className="mt-2 text-[1.5rem] leading-tight text-white sm:text-4xl">{custom.title}</Heading>
          <p className="mt-2 text-sm text-white/80 sm:mt-3 sm:text-base">{custom.subtitle}</p>
          {custom.startingPrice > 0 && (
            <p className="mt-4 text-white/80">
              Starting from <span className="text-2xl font-bold text-white">{formatPrice(custom.startingPrice)}</span>
            </p>
          )}

          <ol className="mt-5 grid grid-cols-2 gap-3 sm:mt-6">
            {custom.steps.map((step, i) => (
              <li key={step.title} className="flex gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-bold sm:h-8 sm:w-8 sm:text-sm">{i + 1}</span>
                <span>
                  <span className="block text-[13px] font-semibold leading-snug sm:text-[15px]">{step.title}</span>
                  <span className="hidden text-[13px] text-white/70 sm:block">{step.detail}</span>
                </span>
              </li>
            ))}
          </ol>

          <div className="mt-6 flex flex-col gap-2.5 sm:mt-7 sm:flex-row sm:gap-3">
            <a href={whatsappLink("custom")} target="_blank" rel="noopener" className="btn-whatsapp">
              <WhatsAppIcon /> Talk to our designer
            </a>
            <button type="button" onClick={() => enquire({ intent: "custom" })} className="btn-light">
              Request customisation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
