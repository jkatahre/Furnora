# Furnora images

All images are **.webp** files. A missing image shows a neutral placeholder, so you can add images gradually. Refresh the browser after adding files.

## Banners (`banners/`)

The hero image, showroom photos, room images and recent-work photos are all set in `src/config/store.ts`. Point them at any file in `public/images/`.

## Products (`products/`)

Product photos are grouped into 9 folders by furniture type:

| Folder | Category |
| --- | --- |
| `products/sofa/` | Sofas |
| `products/l-shape-sofa/` | L-Shape Sofas |
| `products/sofa-set/` | Sofa Sets |
| `products/bed/` | Beds |
| `products/chair/` | Chairs |
| `products/dining/` | Dining Tables |
| `products/wardrobe/` | Wardrobes |
| `products/dressing/` | Dressing Tables |
| `products/Coffee Tables/` | Coffee Tables and Outdoor |

Which photo belongs to which product is listed in `src/data/productImages.ts`.

**To add a new product photo:**
1. Put the `.webp` file in the right folder, e.g. `products/bed/Bed_1.webp`.
2. Add the product in `src/data/products.ts` (or reuse an existing one).
3. Add a line to `productImageFiles` in `src/data/productImages.ts`:
   `"product-slug": { folder: "bed", main: "Bed_1.webp" },`

**To show more angles of one product** (they appear as gallery thumbnails), add them to the same entry:
`"product-slug": { folder: "bed", main: "Bed_1.webp", side: "Bed_1_side.webp", lifestyle: "Bed_1_room.webp" },`
Available keys: `main`, `front`, `side`, `back`, `lifestyle`, `detail`.

### Current photos

**Sofas** (`products/sofa/`)

| File | Product |
| --- | --- |
| `Sofa_1.webp` | Lumen Curved 3 Seater Sofa |
| `Sofa_2.webp` | Forest Green Wave-Back 3 Seater Sofa |
| `Sofa_3.webp` | Charcoal Deep-Seat 3 Seater Sofa |
| `Sofa_4.webp` | Olive 3 Seater Sofa with Laptop Tray |
| `Sofa_5.webp` | Charcoal Adjustable-Headrest Sofa with Charging Port |
| `Sofa_6.webp` | Olive Low-Plinth 3 Seater Sofa |
| `Sofa_7.webp` | Woven Strap 3 Seater Sofa |
| `Sofa_8.webp` | Graphite Modular Sofa with Centre Console |
| `Sofa_9.webp` | Taupe Bouclé 2 Seater Sofa with Console |
| `Sofa_10.webp` | Charcoal 3 Seater Sofa with Fold-Down Console |
| `Sofa_11.webp` | Mint Curved Sofa with Side Tables |
| `Sofa_12.webp` | Navy Velvet 4 Seater Sofa with Adjustable Backs |
| `Sofa_13.webp` | Ivory 3 Seater Sofa with Side Shelf |

**L-Shape Sofas** (`products/l-shape-sofa/`)

| File | Product |
| --- | --- |
| `1.webp` | Charcoal Modular Corner Sofa |
| `2.webp` | Emerald Tufted Corner Sofa |
| `3.webp` | Grey L-Shape Sofa with Wooden Legs |
| `4.webp` | Ivory Bouclé Curved Sectional |
| `5.webp` | Emerald Chesterfield Chaise Sofa |
| `6.webp` | Sheesham Frame L-Shape Sofa |
| `7.webp` | Oatmeal Chaise Sectional |
| `8.webp` | Sculpted Cream Corner Sofa with Console |
| `9.webp` | Ivory U-Shape Lounge Sectional |
| `10.webp` | Navy & Ivory Curved U-Shape Sectional |
| `11.webp` | Linen Metal-Frame Chaise Sofa |
| `12.webp` | Denim Blue Modular U-Shape Sofa |
| `13.webp` | Sand Metal-Frame L-Shape Sofa |
| `14.webp` | Graphite Tufted Chaise Sofa |
| `15.webp` | Charcoal Velvet Chaise Sofa |
| `16.webp` | Olive Velvet L-Shape Sofa with Storage Arm |
| `17.webp` | Ivory Bouclé Chaise Sofa |
| `18.webp` | Grey Low-Profile Chaise Sectional |
| `19.webp` | Ivory Channel-Tufted L-Shape Sofa |
| `20.webp` | Forest Green Chesterfield Corner Sofa |
| `21.webp` | Grey L-Shape Sofa with Storage Arm |

**Sofa Sets** (`products/sofa-set/`)

| File | Product |
| --- | --- |
| `1.webp` | Mustard Patterned Sofa Set (3+2+1) |
| `2.webp` | Floral Velvet Sofa Set (3+1+1) |
| `3.webp` | Cognac Leather Sofa Set (3+2+1) |
| `4.webp` | Royal Blue Velvet Sofa Set (3+1+1) |
| `5.webp` | Olive Velvet Sofa Set (3+2+1) |
| `6.webp` | Kilim Pattern Sofa Set (3+2+1) |
| `7.webp` | Tan Leather Sofa Set (3+2+1) |
| `8.webp` | Olive Chesterfield Sofa Set (3+2+1) |
| `9.webp` | Navy & White Sculpted Sofa Set (3+1+1) |
| `10.webp` | Stone Grey Sofa Set (3+2+1) |
| `11.webp` | Denim Blue Sofa Set (3+2+1) |
| `12.webp` | Ivory Lounge Sofa Set with Ottoman |
| `13.webp` | Teak Frame Sofa Set (3+1+1) |
| `14.webp` | Charcoal Tufted Sofa Set (3+1+1) |
| `15.webp` | Indigo Bouclé Sofa Set (2+1+1) |
| `16.webp` | Grey Quilted Sofa Set (2+1+1) |
| `17.webp` | Navy Velvet Sofa Set with Ottoman |
| `18.webp` | Sheesham Wood Sofa Set, Navy (3+1+1) |
| `19.webp` | Grey Sofa with Accent Chairs (3+1+1) |
| `20.webp` | Charcoal Sofa Set (2+1+1) |
| `21.webp` | Grey Velvet Sofa & Chaise Set (3+2) |

**Beds** (`products/bed/`)

| File | Product |
| --- | --- |
| `Bed_1.webp` | Olive Channel-Tufted Bed |
| `Bed_2.webp` | Mosaic Walnut Headboard Bed |
| `Bed_3.webp` | Slate Panel Upholstered Bed |
| `Bed_4.webp` | Navy Tufted Walnut Bed |
| `Bed_5.webp` | Emerald Wingback Bed |
| `Bed_6.webp` | Linea Panelled Walnut Bed |
| `Bed_7.webp` | Verde Tufted Velvet Bed |
| `Bed_8.webp` | Basket-Weave Leather Bed |
| `Bed_9.webp` | Ridge Slatted Walnut Bed |
| `Bed_10.webp` | Teal Wingback Upholstered Bed |
| `Bed_11.webp` | Charcoal Fan-Panel Upholstered Bed |
| `Bed_12.webp` | Woven Leather Headboard Bed |
| `Bed_13.webp` | Ivory Pebble-Panel Upholstered Bed |
| `Bed_14.webp` | Oak Platform Bed |
| `Bed_15.webp` | Carved Four-Poster Canopy Bed |
| `Bed_16.webp` | Natural Teak Low Platform Bed |
| `Bed_17.webp` | Walnut Floating Platform Bed with LED |
| `Bed_18.webp` | Chocolate Tufted Wingback Bed |
| `Bed_19.webp` | Iron Canopy Bed |
| `Bed_20.webp` | Royal Blue Wingback Bed |
| `Bed_21.webp` | Oak Panel Headboard Bed |
| `Bed_22.webp` | Leather Weave Canopy Bed |
| `Bed_23.webp` | Wrought Iron Four-Poster Bed with Storage |
| `Bed_24.webp` | Navy Velvet Four-Poster Bed |
| `Bed_25.webp` | Emerald Channel Wingback Bed |
| `Bed_26.webp` | Hampton Light Wood Bed |
| `Bed_27.webp` | Rustic Log Bed |
| `Bed_28.webp` | Cane & Rattan Tufted Bed |
| `Bed_29.webp` | Haiku Slatted Bed |
| `Bed_30.webp` | Navy Tufted Storage Bed |
| `Bed_31.webp` | Cove Slatted Walnut Bed |

**Chairs** (`products/chair/`)

| File | Product |
| --- | --- |
| `1.webp` | Teal Bouclé Accent Chairs (Set of 2) |
| `2.webp` | Ivory Lounge Chair with Walnut Side Tray |
| `3.webp` | Sherpa Barrel Swivel Chair |
| `4.webp` | Two-Tone Velvet Barrel Chair |

**Dining Tables** (`products/dining/`)

| File | Product |
| --- | --- |
| `04.webp` | Marlow Round Marble Dining Set (6 Seater) |
| `05.webp` | Grove Live-Edge Dining Set (8 Seater) |
| `06.webp` | Prism Marble Dining Set (6 Seater) |
| `07.webp` | Noir Marble Dining Set (6 Seater) |
| `08.webp` | Halo Cage-Base Dining Set (6 Seater) |
| `09.webp` | Forge Geometric Dining Set (6 Seater) |
| `10.webp` | Forge Geometric Dining Set, Grey (6 Seater) |
| `11.webp` | Café Round Dining Set (4 Seater) |
| `12.webp` | Ellipse Oval Dining Set (6 Seater) |
| `13.webp` | Slate Dining Set (4 Seater) |
| `14.webp` | Regent Walnut Dining Set (6 Seater) |
| `15.webp` | Pillar Round Dining Set (4 Seater) |
| `17.webp` | Totem Round Dining Set (6 Seater) |
| `18.webp` | Grove Round Dining Set, Ivory (6 Seater) |
| `19.webp` | Atrium Dining Set (6 Seater) |
| `20.webp` | Fluted Pedestal Dining Set (4 Seater) |
| `21.webp` | Grove Round Dining Set, Navy (6 Seater) |
| `22.webp` | Grove Round Dining Set, Walnut (6 Seater) |
| `23.webp` | Hudson Walnut Dining Set (6 Seater) |
| `24.webp` | Hudson Walnut Dining Set, Curved Chairs (6 Seater) |
| `25.webp` | Onyx Round Dining Set (6 Seater) |
| `26.webp` | Onyx Round Dining Set, Tufted Chairs (6 Seater) |

**Wardrobes** (`products/wardrobe/`)

| File | Product |
| --- | --- |
| `Wordrobe_1.webp` | Oak Duo-Tone 3 Door Wardrobe |
| `Wordrobe_2.webp` | Fluted Oak 4 Door Wardrobe |
| `Wordrobe_3.webp` | Oak & Charcoal 4 Door Wardrobe with Mirror |
| `Wordrobe_4.webp` | Walnut Fluted 2 Door Wardrobe with Mirror |
| `Wordrobe_5.webp` | Walnut 6 Door Wardrobe with Mirror & Drawer |
| `Wordrobe_6.webp` | Charcoal 2 Door Wardrobe with Drawer |
| `Wordrobe_7.webp` | Charcoal & Oak 4 Door Wardrobe with Drawer |
| `Wordrobe_8.webp` | Walnut Fluted 4 Door Wardrobe |

**Dressing Tables** (`products/dressing/`)

| File | Product |
| --- | --- |
| `04.webp` | Arch Compact Dressing Table |
| `05.webp` | Pill Mirror Dressing Chest |
| `06.webp` | Pebble LED Mirror Vanity |
| `07.webp` | Tower Mirror Dressing Unit with Stool |
| `08.webp` | Halo Organic Mirror Vanity with Stool |
| `09.webp` | Luxe LED Mirror Dresser with Stool |
| `10.webp` | Luna Round Mirror Dresser with Stool |
| `11.webp` | Fluted Vanity with Round LED Mirror |
| `12.webp` | Fluted Vanity with Pebble LED Mirror |
| `13.webp` | Full-Length LED Mirror Dressing Unit |
| `14.webp` | Studio Lit-Shelf Vanity with Stool |
| `15.webp` | Walnut 6 Drawer Dresser with Round Mirror |
| `16.webp` | Walnut Dresser with Standing Mirror |
| `17.webp` | Hudson Walnut Dresser |
| `18.webp` | Oak Fluted Dresser with Mirror |
| `19.webp` | Slim Full-Length Mirror Cabinet |
| `20.webp` | Fluted Walnut Desk Vanity |
| `21.webp` | Ivory Tall Mirror Dressing Unit |
| `22.webp` | Burl Wood Dresser with Round Mirror |
| `23.webp` | Fluted Walnut Dressing Chest |
| `24.webp` | Venetian Mirror Walnut Dresser |
| `25.webp` | Marquetry Dresser with Venetian Mirror |
| `26.webp` | Walnut Mirror Shelf Dressing Unit |

## Categories (`categories/`, optional)

A category card uses `categories/<category-slug>.webp` if it exists. Otherwise it uses the first product photo in that category, and a placeholder if there is none.

Category slugs are listed in `src/data/categories.ts`, e.g. `sofas`, `beds`, `wardrobes`, `dining-tables`, `coffee-tables`, `outdoor`.
