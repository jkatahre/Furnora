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
      <ul className="scroll-row md:mx-0 md:grid md:grid-cols-5 md:gap-4 md:overflow-visible md:px-0 lg:grid-cols-7">
        {visible.map((category) => (
          <li key={category.slug} className="w-[30%] shrink-0 sm:w-[22%] md:w-auto">
            <Link to={`/catalog?category=${category.slug}`} className="group block">
              <SmartImage
                src={categoryImage(category.slug)}
                fallbackSrc={categoryCoverUrl(category.category_id)}
                alt=""
                fallbackLabel={category.name}
                className="aspect-square rounded-xl"
                imgClassName="group-hover:scale-[1.05]"
              />
              <span className="mt-2 block text-center text-[13px] font-semibold leading-tight sm:text-sm">{category.name}</span>
            </Link>
          </li>
        ))}
        <li className="w-[30%] shrink-0 sm:w-[22%] md:w-auto">
          <Link to="/custom-furniture" className="group block">
            <span className="flex aspect-square flex-col items-center justify-center gap-2 rounded-xl bg-brand p-2 text-center text-white transition-colors group-hover:bg-brand-dark">
              <PlusIcon width={28} height={28} />
              <span className="text-[12px] font-semibold leading-tight sm:text-sm">Made to your size</span>
            </span>
            <span className="mt-2 block text-center text-[13px] font-semibold leading-tight sm:text-sm">Custom Furniture</span>
          </Link>
        </li>
      </ul>
    </section>
  );
}
