/**
 * All imagery is served from `public/images` as WebP.
 * See `public/images/README.md` for the expected file names.
 */
const IMAGE_ROOT = "/images";

export const bannerImages = {
  bedroom: `${IMAGE_ROOT}/banners/banner_1.webp`,
  livingRoom: `${IMAGE_ROOT}/banners/banner_2.webp`,
  diningRoom: `${IMAGE_ROOT}/banners/banner_3.webp`,
} as const;

export const siteImages = {
  promo: bannerImages.livingRoom,
  about: bannerImages.diningRoom,
} as const;

export interface HeroSlide {
  image: string;
  alt: string;
  eyebrow: string;
  /** Secondary link shown next to "Explore Collection". */
  link: { to: string; label: string };
  /** CSS object-position, to keep the subject in frame on narrow screens. */
  focus: string;
}

export const heroSlides: HeroSlide[] = [
  {
    image: bannerImages.livingRoom,
    alt: "A bright living room with a grey corner sofa and a round oak coffee table",
    eyebrow: "The Living Room",
    link: { to: "/catalog?category=sofas", label: "Browse sofas" },
    focus: "50% 60%",
  },
  {
    image: bannerImages.bedroom,
    alt: "A calm bedroom with an upholstered bed, oak nightstand and bouclé armchair",
    eyebrow: "The Bedroom",
    link: { to: "/catalog?category=beds,wardrobes", label: "Browse bedroom" },
    focus: "55% 60%",
  },
  {
    image: bannerImages.diningRoom,
    alt: "A dining room with a solid wood trestle table and upholstered dining chairs",
    eyebrow: "The Dining Room",
    link: { to: "/catalog?category=dining-tables,chairs", label: "Browse dining" },
    focus: "60% 55%",
  },
];

export function categoryImage(categorySlug: string): string {
  return `${IMAGE_ROOT}/categories/${categorySlug}.webp`;
}

/** Product photos are grouped by furniture type inside `public/images/products/`. */
export const productImageFolders = [
  "sofa",
  "l-shape-sofa",
  "sofa-set",
  "bed",
  "chair",
  "dining",
  "wardrobe",
  "dressing",
] as const;

export type ProductImageFolder = (typeof productImageFolders)[number];

export function productImageUrl(folder: ProductImageFolder, file: string): string {
  return `${IMAGE_ROOT}/products/${folder}/${encodeURIComponent(file)}`;
}
