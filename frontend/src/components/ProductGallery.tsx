import { useEffect, useState, type KeyboardEvent } from "react";
import { imageTypeLabels } from "../data/productImages";
import type { Product, ProductImage } from "../types/product";
import { DimensionOverlay, UnitToggle, type Unit } from "./Dimensions";
import { ChevronLeftIcon, ChevronRightIcon, RulerIcon, SofaIcon } from "./Icons";

interface ProductGalleryProps {
  images: ProductImage[];
  product: Product;
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

export default function ProductGallery({ images, product }: ProductGalleryProps) {
  const available = useAvailableImages(images);
  const [index, setIndex] = useState(0);
  const [showSize, setShowSize] = useState(false);
  const [unit, setUnit] = useState<Unit>("in");

  useEffect(() => setIndex(0), [images]);

  if (available === null) {
    return <div className="skeleton aspect-square w-full sm:aspect-4/3" aria-label="Loading images" role="status" />;
  }

  const sizeButton = (
    <button
      type="button"
      onClick={() => setShowSize((s) => !s)}
      aria-pressed={showSize}
      className={`absolute right-3 top-3 z-10 flex min-h-10 items-center gap-1.5 rounded-full px-3.5 text-[13px] font-semibold shadow-soft ${
        showSize ? "bg-ink text-white" : "bg-white text-ink"
      }`}
    >
      <RulerIcon width={16} height={16} /> {showSize ? "Hide size" : "Show size"}
    </button>
  );

  if (available.length === 0) {
    return (
      <div className="relative flex aspect-square w-full flex-col items-center justify-center gap-4 overflow-hidden rounded-xl bg-sand text-muted/60 sm:aspect-4/3">
        <SofaIcon width={56} height={56} strokeWidth={0.9} />
        <span className="font-display text-2xl italic">{product.name}</span>
        <span className="text-xs uppercase tracking-[0.2em]">Photos coming soon</span>
        {sizeButton}
        {showSize && <DimensionOverlay product={product} unit={unit} />}
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
    <div className="flex flex-col gap-3" aria-roledescription="image gallery">
      <div
        className="group relative -mx-4 overflow-hidden bg-sand sm:mx-0 sm:rounded-xl"
        tabIndex={count > 1 ? 0 : undefined}
        onKeyDown={onKeyDown}
        aria-label={count > 1 ? "Use left and right arrow keys to browse images" : undefined}
      >
        <div className="relative aspect-square w-full sm:aspect-4/3">
          {/* Blurred copy behind the whole-product view fills the frame. */}
          <img
            key={`bg-${current.url}`}
            src={current.url}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full scale-110 object-cover opacity-45 blur-2xl"
          />
          <img key={current.url} src={current.url} alt={current.alt} className="relative h-full w-full animate-[fadeIn_.5s_ease] object-cover sm:object-contain" />
          {showSize && <DimensionOverlay product={product} unit={unit} />}
        </div>
        {sizeButton}
        {showSize && (
          <div className="absolute bottom-3 right-3 z-10">
            <UnitToggle unit={unit} onChange={setUnit} light />
          </div>
        )}
        {count > 1 && !showSize && (
          <>
            <span className="absolute bottom-3 left-3 rounded-full bg-paper/90 px-3 py-1 text-xs tabular-nums" aria-live="polite">
              {index + 1} / {count}
            </span>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-paper/90 hover:bg-paper"
            >
              <ChevronLeftIcon />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next image"
              className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-paper/90 hover:bg-paper"
            >
              <ChevronRightIcon />
            </button>
          </>
        )}
      </div>

      {count > 1 && (
        <ul className="grid grid-cols-5 gap-2 sm:grid-cols-6" aria-label="Product images">
          {available.map((image, i) => (
            <li key={image.url}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show ${imageTypeLabels[image.type]}`}
                aria-current={i === index}
                className={`block w-full overflow-hidden rounded-lg bg-sand transition-opacity ${
                  i === index ? "ring-2 ring-ink ring-offset-2 ring-offset-canvas" : "opacity-65 hover:opacity-100"
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
