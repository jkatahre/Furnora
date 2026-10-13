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
  "mint-curved-sofa-with-side-tables": { folder: "sofa", main: "Sofa_11.webp" },
  "lumen-curved-3-seater-sofa": { folder: "sofa", main: "Sofa_1.webp" },
  "forest-green-wave-back-3-seater-sofa": { folder: "sofa", main: "Sofa_2.webp" },
  "charcoal-deep-seat-3-seater-sofa": { folder: "sofa", main: "Sofa_3.webp" },
  "olive-3-seater-sofa-with-laptop-tray": { folder: "sofa", main: "Sofa_4.webp" },
  "charcoal-adjustable-headrest-sofa-with-charging-port": { folder: "sofa", main: "Sofa_5.webp" },
  "woven-strap-3-seater-sofa": { folder: "sofa", main: "Sofa_7.webp" },
  "graphite-modular-sofa-with-centre-console": { folder: "sofa", main: "Sofa_8.webp" },
  "taupe-boucle-2-seater-sofa-with-console": { folder: "sofa", main: "Sofa_9.webp" },
  "charcoal-3-seater-sofa-with-fold-down-console": { folder: "sofa", main: "Sofa_10.webp" },
  "navy-velvet-4-seater-sofa-with-adjustable-backs": { folder: "sofa", main: "Sofa_12.webp" },
  "ivory-3-seater-sofa-with-side-shelf": { folder: "sofa", main: "Sofa_13.webp" },
  "olive-low-plinth-3-seater-sofa": { folder: "sofa", main: "Sofa_6.webp" },
  "charcoal-modular-corner-sofa": { folder: "l-shape-sofa", main: "1.webp" },
  "emerald-tufted-corner-sofa": { folder: "l-shape-sofa", main: "2.webp" },
  "grey-l-shape-sofa-with-wooden-legs": { folder: "l-shape-sofa", main: "3.webp" },
  "ivory-boucle-curved-sectional": { folder: "l-shape-sofa", main: "4.webp" },
  "emerald-chesterfield-chaise-sofa": { folder: "l-shape-sofa", main: "5.webp" },
  "sheesham-frame-l-shape-sofa": { folder: "l-shape-sofa", main: "6.webp" },
  "oatmeal-chaise-sectional": { folder: "l-shape-sofa", main: "7.webp" },
  "sculpted-cream-corner-sofa-with-console": { folder: "l-shape-sofa", main: "8.webp" },
  "ivory-u-shape-lounge-sectional": { folder: "l-shape-sofa", main: "9.webp" },
  "navy-and-ivory-curved-u-shape-sectional": { folder: "l-shape-sofa", main: "10.webp" },
  "linen-metal-frame-chaise-sofa": { folder: "l-shape-sofa", main: "11.webp" },
  "denim-blue-modular-u-shape-sofa": { folder: "l-shape-sofa", main: "12.webp" },
  "sand-metal-frame-l-shape-sofa": { folder: "l-shape-sofa", main: "13.webp" },
  "graphite-tufted-chaise-sofa": { folder: "l-shape-sofa", main: "14.webp" },
  "charcoal-velvet-chaise-sofa": { folder: "l-shape-sofa", main: "15.webp" },
  "olive-velvet-l-shape-sofa-with-storage-arm": { folder: "l-shape-sofa", main: "16.webp" },
  "ivory-boucle-chaise-sofa": { folder: "l-shape-sofa", main: "17.webp" },
  "grey-low-profile-chaise-sectional": { folder: "l-shape-sofa", main: "18.webp" },
  "ivory-channel-tufted-l-shape-sofa": { folder: "l-shape-sofa", main: "19.webp" },
  "forest-green-chesterfield-corner-sofa": { folder: "l-shape-sofa", main: "20.webp" },
  "grey-l-shape-sofa-with-storage-arm": { folder: "l-shape-sofa", main: "21.webp" },
  "mustard-patterned-sofa-set-3-2-1": { folder: "sofa-set", main: "1.webp" },
  "floral-velvet-sofa-set-3-1-1": { folder: "sofa-set", main: "2.webp" },
  "cognac-leather-sofa-set-3-2-1": { folder: "sofa-set", main: "3.webp" },
  "royal-blue-velvet-sofa-set-3-1-1": { folder: "sofa-set", main: "4.webp" },
  "olive-velvet-sofa-set-3-2-1": { folder: "sofa-set", main: "5.webp" },
  "kilim-pattern-sofa-set-3-2-1": { folder: "sofa-set", main: "6.webp" },
  "tan-leather-sofa-set-3-2-1": { folder: "sofa-set", main: "7.webp" },
  "olive-chesterfield-sofa-set-3-2-1": { folder: "sofa-set", main: "8.webp" },
  "navy-and-white-sculpted-sofa-set-3-1-1": { folder: "sofa-set", main: "9.webp" },
  "stone-grey-sofa-set-3-2-1": { folder: "sofa-set", main: "10.webp" },
  "denim-blue-sofa-set-3-2-1": { folder: "sofa-set", main: "11.webp" },
  "ivory-lounge-sofa-set-with-ottoman": { folder: "sofa-set", main: "12.webp" },
  "teak-frame-sofa-set-3-1-1": { folder: "sofa-set", main: "13.webp" },
  "charcoal-tufted-sofa-set-3-1-1": { folder: "sofa-set", main: "14.webp" },
  "indigo-boucle-sofa-set-2-1-1": { folder: "sofa-set", main: "15.webp" },
  "grey-quilted-sofa-set-2-1-1": { folder: "sofa-set", main: "16.webp" },
  "navy-velvet-sofa-set-with-ottoman": { folder: "sofa-set", main: "17.webp" },
  "sheesham-wood-sofa-set-navy-3-1-1": { folder: "sofa-set", main: "18.webp" },
  "grey-sofa-with-accent-chairs-3-1-1": { folder: "sofa-set", main: "19.webp" },
  "charcoal-sofa-set-2-1-1": { folder: "sofa-set", main: "20.webp" },
  "grey-velvet-sofa-and-chaise-set-3-2": { folder: "sofa-set", main: "21.webp" },
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
  "charcoal-fan-panel-upholstered-bed": { folder: "bed", main: "Bed_11.webp" },
  "woven-leather-headboard-bed": { folder: "bed", main: "Bed_12.webp" },
  "ivory-pebble-panel-upholstered-bed": { folder: "bed", main: "Bed_13.webp" },
  "oak-platform-bed": { folder: "bed", main: "Bed_14.webp" },
  "carved-four-poster-canopy-bed": { folder: "bed", main: "Bed_15.webp" },
  "natural-teak-low-platform-bed": { folder: "bed", main: "Bed_16.webp" },
  "walnut-floating-platform-bed-with-led": { folder: "bed", main: "Bed_17.webp" },
  "chocolate-tufted-wingback-bed": { folder: "bed", main: "Bed_18.webp" },
  "iron-canopy-bed": { folder: "bed", main: "Bed_19.webp" },
  "royal-blue-wingback-bed": { folder: "bed", main: "Bed_20.webp" },
  "oak-panel-headboard-bed": { folder: "bed", main: "Bed_21.webp" },
  "leather-weave-canopy-bed": { folder: "bed", main: "Bed_22.webp" },
  "wrought-iron-four-poster-bed-with-storage": { folder: "bed", main: "Bed_23.webp" },
  "navy-velvet-four-poster-bed": { folder: "bed", main: "Bed_24.webp" },
  "emerald-channel-wingback-bed": { folder: "bed", main: "Bed_25.webp" },
  "hampton-light-wood-bed": { folder: "bed", main: "Bed_26.webp" },
  "rustic-log-bed": { folder: "bed", main: "Bed_27.webp" },
  "cane-and-rattan-tufted-bed": { folder: "bed", main: "Bed_28.webp" },
  "haiku-slatted-bed": { folder: "bed", main: "Bed_29.webp" },
  "navy-tufted-storage-bed": { folder: "bed", main: "Bed_30.webp" },
  "cove-slatted-walnut-bed": { folder: "bed", main: "Bed_31.webp" },
  "teal-boucle-accent-chairs-set-of-2": { folder: "chair", main: "1.webp" },
  "ivory-lounge-chair-with-walnut-side-tray": { folder: "chair", main: "2.webp" },
  "sherpa-barrel-swivel-chair": { folder: "chair", main: "3.webp" },
  "two-tone-velvet-barrel-chair": { folder: "chair", main: "4.webp" },
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
  "oak-duo-tone-3-door-wardrobe": { folder: "wardrobe", main: "Wordrobe_1.webp" },
  "fluted-oak-4-door-wardrobe": { folder: "wardrobe", main: "Wordrobe_2.webp" },
  "oak-charcoal-4-door-wardrobe-with-mirror": { folder: "wardrobe", main: "Wordrobe_3.webp" },
  "walnut-fluted-2-door-wardrobe-with-mirror": { folder: "wardrobe", main: "Wordrobe_4.webp" },
  "walnut-6-door-wardrobe-with-mirror-drawer": { folder: "wardrobe", main: "Wordrobe_5.webp" },
  "charcoal-2-door-wardrobe-with-drawer": { folder: "wardrobe", main: "Wordrobe_6.webp" },
  "charcoal-oak-4-door-wardrobe-with-drawer": { folder: "wardrobe", main: "Wordrobe_7.webp" },
  "walnut-fluted-4-door-wardrobe": { folder: "wardrobe", main: "Wordrobe_8.webp" },
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
  "duo-nesting-coffee-tables": { folder: "Coffee Tables", main: "Coffee_Tables_1.webp" },
  "prism-solid-oak-coffee-table": { folder: "Coffee Tables", main: "Coffee_Tables_2.webp" },
  "bone-inlay-nesting-coffee-tables": { folder: "Coffee Tables", main: "Coffee_Tables_3.webp" },
  "rattan-outdoor-lounge-set": { folder: "Coffee Tables", main: "Coffee_Tables_4.webp" },
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
