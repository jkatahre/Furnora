import { store } from "../../config/store";
import { RatingBadge } from "../Rating";
import SectionHeading from "../SectionHeading";
import StoreIcon from "../StoreIcon";

/** Trust badges from the store settings. */
export default function WhyChooseUs() {
  if (store.trust.length === 0) return null;
  return (
    <section className="mt-10 bg-surface py-10 md:mt-20 md:py-16">
      <div className="container-page">
        <SectionHeading title={`Why buy from ${store.name}`} action={<div className="hidden sm:block"><RatingBadge /></div>} />
        <ul className="scroll-row sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-3 sm:overflow-visible sm:px-0 lg:grid-cols-6">
          {store.trust.map((item) => (
            <li key={item.value + item.label} className="flex w-[40%] shrink-0 flex-col gap-2 rounded-xl bg-canvas p-3 sm:w-auto sm:gap-3 sm:p-5">
              <StoreIcon name={item.icon} width={24} height={24} className="text-brand sm:h-7 sm:w-7" />
              <p>
                <span className="block text-[14px] font-bold leading-tight sm:text-[17px]">{item.value}</span>
                <span className="text-xs text-muted sm:text-sm">{item.label}</span>
              </p>
            </li>
          ))}
        </ul>
        <RatingBadge className="mt-4 sm:hidden" />
      </div>
    </section>
  );
}
