import { Link } from "react-router-dom";
import { categoryCoverUrl } from "../../data/productImages";
import type { Category, CategoryStats } from "../../types/product";
import { categoryImage } from "../../utils/images";
import { ArrowRightIcon, PlusIcon } from "../Icons";
import SectionHeading from "../SectionHeading";
import SmartImage from "../SmartImage";

/** Categories that have something to show (or are set to show anyway). */
export function visibleCategories(categories: Category[], stats: Record<number, CategoryStats>) {
  return categories.filter((c) => (stats[c.category_id]?.available ?? 0) > 0 || c.showWhenEmpty);
}

export default function ShopByCategory({ categories, stats }: { categories: Category[]; stats: Record<number, CategoryStats> }) {
  const visible = visibleCategories(categories, stats);
  return (
    <section className="container-page mt-8 md:mt-16">
      <SectionHeading
        title="Shop by category"
        action={
          <Link to="/categories" className="link-arrow">
            All <ArrowRightIcon width={16} height={16} />
          </Link>
        }
      />
      <ul className="-mx-4 grid snap-x snap-mandatory scroll-px-4 auto-cols-[22%] grid-flow-col grid-rows-2 gap-x-2.5 gap-y-4 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:-mx-6 sm:scroll-px-6 sm:auto-cols-[17%] sm:gap-x-4 sm:px-6 lg:mx-0 lg:grid-flow-row lg:grid-cols-7 lg:grid-rows-none lg:overflow-visible lg:px-0 [&::-webkit-scrollbar]:hidden">
        {visible.map((category) => (
          <li key={category.slug} className="snap-start">
            <Link to={`/catalog?category=${category.slug}`} className="group block">
              <SmartImage
                src={categoryImage(category.slug)}
                fallbackSrc={categoryCoverUrl(category.category_id)}
                alt=""
                fallbackLabel={category.name}
                className="aspect-square rounded-lg sm:rounded-xl"
                imgClassName="group-hover:scale-[1.05]"
              />
              <span className="mt-1.5 block text-center text-[11px] font-semibold leading-tight sm:mt-2 sm:text-sm">{category.name}</span>
            </Link>
          </li>
        ))}
        <li className="snap-start">
          <Link to="/custom-furniture" className="group block">
            <span className="flex aspect-square flex-col items-center justify-center gap-2 rounded-lg bg-brand p-2 sm:rounded-xl text-center text-white transition-colors group-hover:bg-brand-dark">
              <PlusIcon width={24} height={24} />
              <span className="hidden text-sm font-semibold leading-tight sm:block">Made to your size</span>
            </span>
            <span className="mt-1.5 block text-center text-[11px] font-semibold leading-tight sm:mt-2 sm:text-sm">Custom Furniture</span>
          </Link>
        </li>
      </ul>
    </section>
  );
}
