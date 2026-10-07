import { store } from "../../config/store";
import { InstagramIcon } from "../Icons";
import SectionHeading from "../SectionHeading";
import SmartImage from "../SmartImage";

/** Photos of delivered orders, linking to Instagram. */
export default function RecentWork() {
  const { recentWork } = store;
  if (recentWork.images.length === 0) return null;
  return (
    <section className="container-page mt-14 md:mt-20">
      <SectionHeading
        title="Recently delivered"
        action={
          recentWork.url && (
            <a href={recentWork.url} target="_blank" rel="noopener" className="link-arrow">
              <InstagramIcon width={18} height={18} /> {recentWork.handle}
            </a>
          )
        }
      />
      <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-6">
        {recentWork.images.map((image) => (
          <li key={image.src} className="group relative overflow-hidden rounded-xl">
            <SmartImage src={image.src} alt={image.caption} className="aspect-square" imgClassName="group-hover:scale-[1.05]" />
            <p className="pointer-events-none absolute inset-x-0 bottom-0 bg-linear-to-t from-ink/75 to-transparent px-3 pb-2 pt-6 text-[12px] font-medium text-white">
              {image.caption}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
