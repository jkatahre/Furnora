import { store } from "../../config/store";
import { RatingBadge, Stars } from "../Rating";
import SectionHeading from "../SectionHeading";

type Review = (typeof store.reviews)[number];

function reviewDate(yyyymm: string) {
  const [y, m] = yyyymm.split("-").map(Number);
  return new Date(y, (m || 1) - 1).toLocaleDateString("en-IN", { month: "short", year: "numeric" });
}

export function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className="flex h-full flex-col rounded-xl border border-line bg-canvas p-5">
      <Stars value={review.rating} />
      <blockquote className="mt-3 flex-1 text-[15px] leading-relaxed text-ink-soft">“{review.text}”</blockquote>
      <figcaption className="mt-4 border-t border-line pt-3 text-sm">
        <span className="font-semibold">{review.name}</span>
        <span className="text-muted">
          {" "}
          · {review.city} · {reviewDate(review.date)}
        </span>
        {review.product && <span className="mt-0.5 block text-[13px] text-brand">Bought: {review.product}</span>}
      </figcaption>
    </figure>
  );
}

/** Customer reviews; pass `productSlug` to put that product's reviews first. */
export default function Reviews({ productSlug, title = "What our customers say" }: { productSlug?: string; title?: string }) {
  const reviews = [...store.reviews].sort(
    (a, b) => Number(b.productSlug === productSlug && !!productSlug) - Number(a.productSlug === productSlug && !!productSlug),
  );
  if (reviews.length === 0) return null;
  return (
    <section className="container-page mt-14 md:mt-20">
      <SectionHeading title={title} action={<div className="hidden sm:block"><RatingBadge /></div>} />
      <RatingBadge className="-mt-3 mb-4 sm:hidden" />
      <ul className="scroll-row md:mx-0 md:grid md:grid-cols-2 md:gap-4 md:overflow-visible md:px-0 lg:grid-cols-4">
        {reviews.map((review) => (
          <li key={review.name + review.date} className="w-[82%] shrink-0 sm:w-[48%] md:w-auto">
            <ReviewCard review={review} />
          </li>
        ))}
      </ul>
    </section>
  );
}
