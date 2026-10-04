import { useEffect, useState, type KeyboardEvent } from "react";
import { imageTypeLabels } from "../data/productImages";
import type { ProductImage } from "../types/product";
import { ChevronLeftIcon, ChevronRightIcon, SofaIcon } from "./Icons";

interface ProductGalleryProps {
  images: ProductImage[];
  productName: string;
}

/** Resolves to the subset of images whose files actually exist. */
function useAvailableImages(images: ProductImage[]) {
  const [available, setAvailable] = useState<ProductImage[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    setAvailable(null);
    Promise.all(
      images.map(
        (image) =>
          new Promise<boolean>((resolve) => {
            const probe = new Image();
            probe.onload = () => resolve(true);
            probe.onerror = () => resolve(false);
            probe.src = image.url;
          }),
      ),
    ).then((exists) => {
      if (!cancelled) setAvailable(images.filter((_, i) => exists[i]));
    });
    return () => {
      cancelled = true;
    };
  }, [images]);

  return available;
}

export default function ProductGallery({ images, productName }: ProductGalleryProps) {
  const available = useAvailableImages(images);
  const [index, setIndex] = useState(0);

  useEffect(() => setIndex(0), [images]);

  if (available === null) {
    return <div className="skeleton aspect-4/3 w-full" aria-label="Loading images" role="status" />;
  }

  if (available.length === 0) {
    return (
      <div
        role="img"
        aria-label={`${productName} — image coming soon`}
        className="flex aspect-4/3 w-full flex-col items-center justify-center gap-4 bg-sand text-muted/60"
      >
        <SofaIcon width={56} height={56} strokeWidth={0.9} />
        <span className="font-display text-2xl italic">{productName}</span>
        <span className="text-xs uppercase tracking-[0.2em]">Photography coming soon</span>
      </div>
    );
  }

  const current = available[Math.min(index, available.length - 1)];
  const count = available.length;
  const go = (delta: number) => setIndex((i) => (i + delta + count) % count);

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowLeft") go(-1);
    if (event.key === "ArrowRight") go(1);
  };

  return (
    <div className="flex flex-col gap-4" aria-roledescription="image gallery">
      <div
        className="group relative overflow-hidden bg-sand"
        tabIndex={count > 1 ? 0 : undefined}
        onKeyDown={onKeyDown}
        aria-label={count > 1 ? "Use left and right arrow keys to browse images" : undefined}
      >
        <div className="relative aspect-4/3 w-full">
          {/* Blurred copy behind the whole-product view fills the frame. */}
          <img
            key={`bg-${current.url}`}
            src={current.url}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full scale-110 object-cover opacity-45 blur-2xl"
          />
          <img
            key={current.url}
            src={current.url}
            alt={current.alt}
            className="relative h-full w-full animate-[fadeIn_.5s_ease] object-contain"
          />
        </div>
        <span className="absolute bottom-4 left-4 bg-paper/90 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em]">
          {imageTypeLabels[current.type]}
        </span>
        {count > 1 && (
          <>
            <span className="absolute bottom-4 right-4 bg-paper/90 px-3 py-1.5 text-xs tabular-nums" aria-live="polite">
              {index + 1} / {count}
            </span>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center bg-paper/90 opacity-100 transition-opacity hover:bg-paper md:opacity-0 md:group-hover:opacity-100 md:focus-visible:opacity-100"
            >
              <ChevronLeftIcon />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next image"
              className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center bg-paper/90 opacity-100 transition-opacity hover:bg-paper md:opacity-0 md:group-hover:opacity-100 md:focus-visible:opacity-100"
            >
              <ChevronRightIcon />
            </button>
          </>
        )}
      </div>

      {count > 1 && (
        <ul className="grid grid-cols-4 gap-3 sm:grid-cols-6" aria-label="Product images">
          {available.map((image, i) => (
            <li key={image.url}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show ${imageTypeLabels[image.type]}`}
                aria-current={i === index}
                className={`block w-full overflow-hidden bg-sand transition-opacity ${
                  i === index ? "ring-1 ring-ink ring-offset-2 ring-offset-canvas" : "opacity-65 hover:opacity-100"
                }`}
              >
                <img src={image.url} alt="" className="aspect-square w-full object-cover" loading="lazy" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
