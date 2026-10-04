import type { ProductImage, ProductImageType } from "../types/product";
import { productImageUrl, type ProductImageFolder } from "../utils/images";
import { products } from "./products";

/** Gallery order. */
export const imageTypeOrder: ProductImageType[] = ["main", "front", "side", "back", "lifestyle", "detail"];

export const imageTypeLabels: Record<ProductImageType, string> = {
  main: "Main Image",
  front: "Front View",
  side: "Side View",
  back: "Back View",
  lifestyle: "Lifestyle Image",
  detail: "Detail Image",
};

/** The image files of one product, all inside `public/images/products/<folder>/`. */
type ProductImageSet = { folder: ProductImageFolder; main: string } & Partial<Record<Exclude<ProductImageType, "main">, string>>;

/**
 * Which photo belongs to which product, by product slug.
 * To add more gallery images for a product, put the files in the same folder and add
 * e.g. `side: "Sofa_11_side.webp"` or `lifestyle: "Sofa_11_room.webp"` to its entry.
 * Products without an entry show a placeholder.
 */
export const productImageFiles: Record<string, ProductImageSet> = {
  "modern-3-seater-sofa": { folder: "sofa", main: "Sofa_11.webp" },
  "lumen-curved-3-seater-sofa": { folder: "sofa", main: "Sofa_1.webp" },
  "haven-deep-seat-3-seater-sofa": { folder: "sofa", main: "Sofa_2.webp" },
  "sage-low-modular-sofa": { folder: "sofa", main: "Sofa_3.webp" },
  "fern-organic-curve-sofa": { folder: "sofa", main: "Sofa_4.webp" },
  "atlas-adjustable-headrest-sofa": { folder: "sofa", main: "Sofa_5.webp" },
  "moss-boucle-3-seater-sofa": { folder: "sofa", main: "Sofa_7.webp" },
  "weave-strap-sofa": { folder: "sofa", main: "Sofa_8.webp" },
  "vertex-console-sofa": { folder: "sofa", main: "Sofa_9.webp" },
  "duo-console-lounge-sofa": { folder: "sofa", main: "Sofa_10.webp" },
  "crescent-curved-sofa": { folder: "sofa", main: "Sofa_12.webp" },
  "riviera-velvet-sofa": { folder: "sofa", main: "Sofa_13.webp" },
  "dune-modular-sofa": { folder: "sofa", main: "Sofa_14.webp" },
  "marina-u-shaped-sectional": { folder: "l-shape-sofa", main: "22.webp" },
  "arlo-l-shape-sofa-with-storage-arm": { folder: "l-shape-sofa", main: "1.webp" },
  "graphite-corner-sectional": { folder: "l-shape-sofa", main: "2.webp" },
  "emerald-chesterfield-corner-sofa": { folder: "l-shape-sofa", main: "3.webp" },
  "ivory-channel-l-shape-sofa": { folder: "l-shape-sofa", main: "4.webp" },
  "verdant-tufted-sectional": { folder: "l-shape-sofa", main: "5.webp" },
  "ashford-l-shape-sofa": { folder: "l-shape-sofa", main: "6.webp" },
  "oatmeal-chaise-sectional": { folder: "l-shape-sofa", main: "7.webp" },
  "curve-boucle-sectional": { folder: "l-shape-sofa", main: "8.webp" },
  "jade-velvet-chaise-sofa": { folder: "l-shape-sofa", main: "9.webp" },
  "timber-frame-corner-sofa": { folder: "l-shape-sofa", main: "10.webp" },
  "lumina-sculpted-sectional": { folder: "l-shape-sofa", main: "11.webp" },
  "lumina-sculpted-sectional-low-back": { folder: "l-shape-sofa", main: "12.webp" },
  "skyline-u-shape-sectional": { folder: "l-shape-sofa", main: "13.webp" },
  "skyline-u-shape-sectional-ivory": { folder: "l-shape-sofa", main: "14.webp" },
  "loft-metal-frame-l-sofa": { folder: "l-shape-sofa", main: "15.webp" },
  "loft-metal-frame-l-sofa-open-end": { folder: "l-shape-sofa", main: "16.webp" },
  "cloud-chaise-lounge-sofa": { folder: "l-shape-sofa", main: "17.webp" },
  "olive-l-shape-sofa-with-storage-arm": { folder: "l-shape-sofa", main: "18.webp" },
  "harbor-l-shape-sofa": { folder: "l-shape-sofa", main: "19.webp" },
  "charcoal-chaise-sectional": { folder: "l-shape-sofa", main: "20.webp" },
  "metro-chaise-sectional": { folder: "l-shape-sofa", main: "21.webp" },
  "saffron-patterned-sofa-set-3-2-1": { folder: "sofa-set", main: "1.webp" },
  "rosa-floral-sofa-set-3-1-1": { folder: "sofa-set", main: "2.webp" },
  "cognac-leather-sofa-set-3-1-1": { folder: "sofa-set", main: "3.webp" },
  "azure-velvet-sofa-set-3-1-1": { folder: "sofa-set", main: "4.webp" },
  "forest-sofa-set-3-2-1": { folder: "sofa-set", main: "5.webp" },
  "kilim-pattern-sofa-set-3-2-1": { folder: "sofa-set", main: "6.webp" },
  "tan-leather-sofa-set-3-2-1": { folder: "sofa-set", main: "7.webp" },
  "olive-chesterfield-sofa-set-3-2-1": { folder: "sofa-set", main: "8.webp" },
  "wave-sofa-set-3-1-1": { folder: "sofa-set", main: "9.webp" },
  "stone-grey-sofa-set-3-1-1": { folder: "sofa-set", main: "10.webp" },
  "denim-blue-sofa-set-3-2-1": { folder: "sofa-set", main: "11.webp" },
  "charcoal-sofa-set-3-2-1": { folder: "sofa-set", main: "12.webp" },
  "ivory-lounge-sofa-set": { folder: "sofa-set", main: "13.webp" },
  "navy-classic-sofa-set-3-2-1": { folder: "sofa-set", main: "14.webp" },
  "teak-frame-sofa-set-3-1-1": { folder: "sofa-set", main: "15.webp" },
  "graphite-tufted-sofa-set-3-1-1": { folder: "sofa-set", main: "16.webp" },
  "cobalt-boucle-sofa-set-3-1-1": { folder: "sofa-set", main: "17.webp" },
  "pebble-grey-boucle-sofa-set-3-1-1": { folder: "sofa-set", main: "18.webp" },
  "midnight-velvet-sofa-set-with-ottoman": { folder: "sofa-set", main: "19.webp" },
  "walnut-frame-sofa-set-navy-3-1-1": { folder: "sofa-set", main: "20.webp" },
  "ember-sofa-set-3-1-1": { folder: "sofa-set", main: "22.webp" },
  "onyx-sofa-set-3-2": { folder: "sofa-set", main: "23.webp" },
  "urban-sofa-set-with-ottoman": { folder: "sofa-set", main: "24.webp" },
  "olive-channel-tufted-bed": { folder: "bed", main: "Bed_1.webp" },
  "mosaic-walnut-headboard-bed": { folder: "bed", main: "Bed_2.webp" },
  "slate-panel-upholstered-bed": { folder: "bed", main: "Bed_3.webp" },
  "navy-tufted-walnut-bed": { folder: "bed", main: "Bed_4.webp" },
  "emerald-wingback-bed": { folder: "bed", main: "Bed_5.webp" },
  "linea-panelled-walnut-bed": { folder: "bed", main: "Bed_6.webp" },
  "verde-tufted-velvet-bed": { folder: "bed", main: "Bed_7.webp" },
  "basket-weave-leather-bed": { folder: "bed", main: "Bed_8.webp" },
  "ridge-slatted-walnut-bed": { folder: "bed", main: "Bed_9.webp" },
  "teal-wingback-upholstered-bed": { folder: "bed", main: "Bed_10.webp" },
  "fan-shell-velvet-bed": { folder: "bed", main: "Bed_11.webp" },
  "terracotta-weave-bed": { folder: "bed", main: "Bed_12.webp" },
  "ivory-quilted-panel-bed": { folder: "bed", main: "Bed_13.webp" },
  "oak-platform-bed": { folder: "bed", main: "Bed_14.webp" },
  "iron-canopy-bed": { folder: "bed", main: "Bed_15.webp" },
  "navy-velvet-wingback-bed": { folder: "bed", main: "Bed_16.webp" },
  "natural-oak-channel-bed": { folder: "bed", main: "Bed_17.webp" },
  "canopy-bed-with-leather-headboard": { folder: "bed", main: "Bed_18.webp" },
  "wrought-iron-four-poster-bed": { folder: "bed", main: "Bed_19.webp" },
  "regal-four-poster-bed-navy": { folder: "bed", main: "Bed_20.webp" },
  "emerald-channel-upholstered-bed": { folder: "bed", main: "Bed_21.webp" },
  "nordic-oak-low-bed": { folder: "bed", main: "Bed_22.webp" },
  "rustic-log-bed": { folder: "bed", main: "Bed_23.webp" },
  "cane-tufted-bed": { folder: "bed", main: "Bed_24.webp" },
  "heritage-carved-four-poster-bed": { folder: "bed", main: "Bed_25.webp" },
  "hampton-light-wood-bed": { folder: "bed", main: "Bed_26.webp" },
  "floating-led-platform-bed": { folder: "bed", main: "Bed_27.webp" },
  "chesterfield-tall-headboard-bed": { folder: "bed", main: "Bed_28.webp" },
  "haiku-slatted-bed": { folder: "bed", main: "Bed_29.webp" },
  "navy-tufted-storage-bed": { folder: "bed", main: "Bed_30.webp" },
  "cove-slatted-walnut-bed": { folder: "bed", main: "Bed_31.webp" },
  "teal-lounge-armchair": { folder: "chair", main: "Chair_1.webp" },
  "pebble-lounge-chair-with-side-tray": { folder: "chair", main: "Chair_2.webp" },
  "cloud-barrel-swivel-chair": { folder: "chair", main: "Chair_3.webp" },
  "orbit-velvet-barrel-chair": { folder: "chair", main: "Chair_4.webp" },
  "marlow-round-marble-dining-set-6-seater": { folder: "dining", main: "04.webp" },
  "grove-live-edge-dining-set-8-seater": { folder: "dining", main: "05.webp" },
  "prism-marble-dining-set-6-seater": { folder: "dining", main: "06.webp" },
  "noir-marble-dining-set-6-seater": { folder: "dining", main: "07.webp" },
  "halo-cage-base-dining-set-6-seater": { folder: "dining", main: "08.webp" },
  "forge-geometric-dining-set-6-seater": { folder: "dining", main: "09.webp" },
  "forge-geometric-dining-set-grey-6-seater": { folder: "dining", main: "10.webp" },
  "cafe-round-dining-set-4-seater": { folder: "dining", main: "11.webp" },
  "ellipse-oval-dining-set-6-seater": { folder: "dining", main: "12.webp" },
  "slate-dining-set-4-seater": { folder: "dining", main: "13.webp" },
  "regent-walnut-dining-set-6-seater": { folder: "dining", main: "14.webp" },
  "pillar-round-dining-set-4-seater": { folder: "dining", main: "15.webp" },
  "pillar-round-dining-set-open-back-4-seater": { folder: "dining", main: "16.webp" },
  "totem-round-dining-set-6-seater": { folder: "dining", main: "17.webp" },
  "grove-round-dining-set-ivory-6-seater": { folder: "dining", main: "18.webp" },
  "atrium-dining-set-6-seater": { folder: "dining", main: "19.webp" },
  "fluted-pedestal-dining-set-4-seater": { folder: "dining", main: "20.webp" },
  "grove-round-dining-set-navy-6-seater": { folder: "dining", main: "21.webp" },
  "grove-round-dining-set-walnut-6-seater": { folder: "dining", main: "22.webp" },
  "hudson-walnut-dining-set-6-seater": { folder: "dining", main: "23.webp" },
  "hudson-walnut-dining-set-curved-chairs-6-seater": { folder: "dining", main: "24.webp" },
  "onyx-round-dining-set-6-seater": { folder: "dining", main: "25.webp" },
  "onyx-round-dining-set-tufted-chairs-6-seater": { folder: "dining", main: "26.webp" },
  "ivory-4-door-wardrobe": { folder: "wardrobe", main: "1.webp" },
  "glass-front-4-door-wardrobe": { folder: "wardrobe", main: "2.webp" },
  "organiser-2-door-wardrobe": { folder: "wardrobe", main: "3.webp" },
  "glide-2-door-sliding-wardrobe": { folder: "wardrobe", main: "4.webp" },
  "utility-3-door-wardrobe": { folder: "wardrobe", main: "5.webp" },
  "duo-tone-3-door-wardrobe": { folder: "wardrobe", main: "6.webp" },
  "ebony-walnut-3-door-wardrobe": { folder: "wardrobe", main: "7.webp" },
  "ivory-3-door-wardrobe-with-drawer": { folder: "wardrobe", main: "8.webp" },
  "arch-compact-dressing-table": { folder: "dressing", main: "04.webp" },
  "pill-mirror-dressing-chest": { folder: "dressing", main: "05.webp" },
  "pebble-led-mirror-vanity": { folder: "dressing", main: "06.webp" },
  "tower-mirror-dressing-unit-with-stool": { folder: "dressing", main: "07.webp" },
  "halo-organic-mirror-vanity-with-stool": { folder: "dressing", main: "08.webp" },
  "luxe-led-mirror-dresser-with-stool": { folder: "dressing", main: "09.webp" },
  "luna-round-mirror-dresser-with-stool": { folder: "dressing", main: "10.webp" },
  "fluted-vanity-with-round-led-mirror": { folder: "dressing", main: "11.webp" },
  "fluted-vanity-with-pebble-led-mirror": { folder: "dressing", main: "12.webp" },
  "full-length-led-mirror-dressing-unit": { folder: "dressing", main: "13.webp" },
  "studio-lit-shelf-vanity-with-stool": { folder: "dressing", main: "14.webp" },
  "walnut-6-drawer-dresser-with-round-mirror": { folder: "dressing", main: "15.webp" },
  "walnut-dresser-with-standing-mirror": { folder: "dressing", main: "16.webp" },
  "hudson-walnut-dresser": { folder: "dressing", main: "17.webp" },
  "oak-fluted-dresser-with-mirror": { folder: "dressing", main: "18.webp" },
  "slim-full-length-mirror-cabinet": { folder: "dressing", main: "19.webp" },
  "fluted-walnut-desk-vanity": { folder: "dressing", main: "20.webp" },
  "ivory-tall-mirror-dressing-unit": { folder: "dressing", main: "21.webp" },
  "burl-wood-dresser-with-round-mirror": { folder: "dressing", main: "22.webp" },
  "fluted-walnut-dressing-chest": { folder: "dressing", main: "23.webp" },
  "venetian-mirror-walnut-dresser": { folder: "dressing", main: "24.webp" },
  "marquetry-dresser-with-venetian-mirror": { folder: "dressing", main: "25.webp" },
  "walnut-mirror-shelf-dressing-unit": { folder: "dressing", main: "26.webp" },
};

/** Rows of the `product_images` table. */
export const productImages: ProductImage[] = products.flatMap((product) => {
  const set = productImageFiles[product.slug];
  if (!set) return [];
  return imageTypeOrder.flatMap((type) => {
    const file = set[type];
    return file
      ? [{ product_id: product.product_id, type, url: productImageUrl(set.folder, file), alt: `${product.name} — ${imageTypeLabels[type]}` }]
      : [];
  });
});

/** URL of a product's main image, if it has one. */
export function mainImageUrl(productSlug: string): string | undefined {
  const set = productImageFiles[productSlug];
  return set ? productImageUrl(set.folder, set.main) : undefined;
}

/** First available product photo in a category, used when a category has no image of its own. */
export function categoryCoverUrl(categoryId: number): string | undefined {
  const inCategory = products.filter((p) => p.category_id === categoryId && productImageFiles[p.slug]);
  const pick = inCategory.find((p) => p.status === "active") ?? inCategory[0];
  return pick ? mainImageUrl(pick.slug) : undefined;
}
