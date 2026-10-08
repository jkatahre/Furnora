import { Link } from "react-router-dom";
import { store } from "../../config/store";
import { categoryCoverUrl } from "../../data/productImages";
import type { Category, CategoryStats } from "../../types/product";
import { ArrowRightIcon } from "../Icons";
import SectionHeading from "../SectionHeading";
import SmartImage from "../SmartImage";

/** Rooms that have at least one available product. */
function roomsWithProducts(categories: Category[], stats: Record<number, CategoryStats>) {
  return store.rooms
    .map((room) => {
      const inRoom = categories.filter((c) => c.rooms.includes(room.slug) && (stats[c.category_id]?.available ?? 0) > 0);
      const count = inRoom.reduce((sum, c) => sum + stats[c.category_id].available, 0);
      const fallback = inRoom.map((c) => categoryCoverUrl(c.category_id)).find(Boolean);
      return { ...room, count, image: room.image || fallback };
    })
    .filter((room) => room.count > 0);
}

export default function ShopByRoom({ categories, stats }: { categories: Category[]; stats: Record<number, CategoryStats> }) {
  const rooms = roomsWithProducts(categories, stats);
  if (rooms.length === 0) return null;
  return (
    <section className="container-page mt-10 md:mt-20">
      <SectionHeading title="Shop by room" />
      <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {rooms.map((room, i) => (
          <li key={room.slug} className={i === 0 && rooms.length % 2 === 1 ? "col-span-2 lg:col-span-2 lg:row-span-2" : ""}>
            <Link to={`/catalog?room=${room.slug}`} className="group relative block h-full overflow-hidden rounded-xl">
              <SmartImage
                src={room.image}
                alt=""
                tone="dark"
                className={`h-full ${i === 0 && rooms.length % 2 === 1 ? "aspect-[16/9] lg:aspect-auto" : "aspect-[4/5] sm:aspect-[4/3]"}`}
                imgClassName="group-hover:scale-[1.04]"
              />
              <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-ink/70 via-ink/0 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-3 text-white sm:p-5">
                <div>
                  <h3 className="text-lg font-bold text-white sm:text-xl">{room.name}</h3>
                  <p className="text-[13px] text-white/85">{room.count} {room.count === 1 ? "design" : "designs"}</p>
                </div>
                <span className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-ink sm:flex">
                  <ArrowRightIcon width={18} height={18} />
                </span>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
