import { useEffect, useRef, useState } from "react";
import { SofaIcon } from "./Icons";

type Fit = "cover" | "contain" | "auto";

interface SmartImageProps {
  /** Image URL. Without one, the placeholder is shown. */
  src?: string;
  /** Tried when `src` fails to load. */
  fallbackSrc?: string;
  alt: string;
  className?: string;
  /** Short caption shown on the placeholder when the image file is missing. */
  fallbackLabel?: string;
  /** Load immediately (above-the-fold images). */
  priority?: boolean;
  onMissing?: () => void;
  /** Visual tone of the placeholder. */
  tone?: "light" | "dark";
  /** Extra classes for the <img> itself, e.g. hover zoom. */
  imgClassName?: string;
  /** Hide the icon on the missing-image placeholder (e.g. behind text). */
  hideIcon?: boolean;
  /**
   * `cover` fills and crops, `contain` shows the whole image.
   * `auto` covers unless the photo's shape differs a lot from the frame (e.g. a wide
   * sofa in a square frame), in which case the whole photo is shown.
   */
  fit?: Fit;
}

type LoadStatus = "loading" | "loaded" | "missing";

/** How different the image and frame shapes may be before `auto` switches to contain. */
const AUTO_CONTAIN_RATIO = 1.35;

function resolveFit(img: HTMLImageElement, fit: Fit): "cover" | "contain" {
  if (fit !== "auto") return fit;
  if (!img.naturalWidth || !img.clientWidth || !img.clientHeight) return "cover";
  const imageRatio = img.naturalWidth / img.naturalHeight;
  const frameRatio = img.clientWidth / img.clientHeight;
  const mismatch = Math.max(imageRatio / frameRatio, frameRatio / imageRatio);
  return mismatch > AUTO_CONTAIN_RATIO ? "contain" : "cover";
}

/**
 * An image that fades in once loaded and shows an on-brand placeholder when the
 * file has not been added to `public/images` yet.
 */
export default function SmartImage({
  src,
  fallbackSrc,
  alt,
  className = "",
  fallbackLabel,
  priority = false,
  onMissing,
  tone = "light",
  imgClassName = "",
  hideIcon = false,
  fit = "cover",
}: SmartImageProps) {
  const key = `${src ?? ""}|${fallbackSrc ?? ""}`;
  const initial = () => ({
    key,
    current: src ?? fallbackSrc,
    status: (src ?? fallbackSrc ? "loading" : "missing") as LoadStatus,
    fit: (fit === "contain" ? "contain" : "cover") as "cover" | "contain",
  });
  const [state, setState] = useState(initial);
  // Reset when the sources change.
  const current = state.key === key ? state : initial();
  if (state.key !== key) setState(current);

  const imgRef = useRef<HTMLImageElement>(null);

  const markLoaded = (img: HTMLImageElement) =>
    setState((s) => ({ ...s, status: "loaded", fit: resolveFit(img, fit) }));

  const handleError = () => {
    if (fallbackSrc && current.current !== fallbackSrc) {
      setState((s) => ({ ...s, current: fallbackSrc, status: "loading" }));
      return;
    }
    setState((s) => ({ ...s, status: "missing" }));
    onMissing?.();
  };

  // A cached image can finish loading before React attaches onLoad, in which
  // case it never fires. (Missing files still fail later via onError.)
  useEffect(() => {
    const img = imgRef.current;
    if (current.status === "loading" && img?.complete && img.naturalWidth > 0) markLoaded(img);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current.current, current.status]);

  if (current.status === "missing" || !current.current) {
    const dark = tone === "dark";
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center gap-3 ${
          dark ? "bg-ink-soft text-canvas/45" : "bg-sand text-muted/55"
        } ${className}`}
        style={{
          backgroundImage: dark
            ? "radial-gradient(circle at 30% 20%, rgb(255 255 255 / 0.06), transparent 60%)"
            : "radial-gradient(circle at 30% 20%, rgb(255 255 255 / 0.55), transparent 60%)",
        }}
      >
        {!hideIcon && <SofaIcon width={36} height={36} strokeWidth={1} />}
        {fallbackLabel && (
          <span className="px-4 text-center font-display text-lg italic leading-tight">{fallbackLabel}</span>
        )}
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-sand ${className}`}>
      {/* When the whole photo is shown, a blurred copy fills the rest of the frame. */}
      {current.fit === "contain" && current.status === "loaded" && (
        <img
          src={current.current}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full scale-110 object-cover opacity-50 blur-2xl"
        />
      )}
      <img
        ref={imgRef}
        src={current.current}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        onLoad={(e) => markLoaded(e.currentTarget)}
        onError={handleError}
        className={`relative h-full w-full transition-[opacity,transform] duration-700 ease-gentle ${
          current.fit === "contain" ? "object-contain" : "object-cover"
        } ${current.status === "loaded" ? "opacity-100" : "opacity-0"} ${imgClassName}`}
      />
    </div>
  );
}
