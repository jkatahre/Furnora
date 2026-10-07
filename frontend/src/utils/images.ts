/**
 * All imagery is served from `public/images` as WebP.
 * See `public/images/README.md` for the expected file names.
 */
const IMAGE_ROOT = "/images";

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
  "Coffee Tables",
] as const;

export type ProductImageFolder = (typeof productImageFolders)[number];

export function productImageUrl(folder: ProductImageFolder, file: string): string {
  return `${IMAGE_ROOT}/products/${encodeURIComponent(folder)}/${encodeURIComponent(file)}`;
}
