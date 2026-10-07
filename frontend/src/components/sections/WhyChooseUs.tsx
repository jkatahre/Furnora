import { store } from "../../config/store";
import { RatingBadge } from "../Rating";
import SectionHeading from "../SectionHeading";
import StoreIcon from "../StoreIcon";

/** Trust badges from the store settings. */
export default function WhyChooseUs() {
  if (store.trust.length === 0) return null;
  return (
    <section className="mt-14 bg-surface py-12 md:mt-20 md:py-16">
      <div className="container-page">
        <SectionHeading title={`Why buy from ${store.name}`} action={<div className="hidden sm:block"><RatingBadge /></div>} />
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {store.trust.map((item) => (
            <li key={item.value + item.label} className="flex flex-col gap-3 rounded-xl bg-canvas p-4 sm:p-5">
              <StoreIcon name={item.icon} width={28} height={28} className="text-brand" />
              <p>
                <span className="block text-[17px] font-bold leading-tight">{item.value}</span>
                <span className="text-sm text-muted">{item.label}</span>
              </p>
            </li>
          ))}
        </ul>
        <RatingBadge className="mt-4 sm:hidden" />
      </div>
    </section>
  );
}
