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
| `Sofa_2.webp` | Haven Deep-Seat 3 Seater Sofa |
| `Sofa_3.webp` | Sage Low Modular Sofa |
| `Sofa_4.webp` | Fern Organic Curve Sofa |
| `Sofa_5.webp` | Atlas Adjustable Headrest Sofa |
| `Sofa_7.webp` | Moss Bouclé 3 Seater Sofa |
| `Sofa_8.webp` | Weave Strap Sofa |
| `Sofa_9.webp` | Vertex Console Sofa |
| `Sofa_10.webp` | Duo Console Lounge Sofa |
| `Sofa_11.webp` | Modern 3 Seater Sofa |
| `Sofa_12.webp` | Crescent Curved Sofa |
| `Sofa_13.webp` | Riviera Velvet Sofa |
| `Sofa_14.webp` | Dune Modular Sofa |

**L-Shape Sofas** (`products/l-shape-sofa/`)

| File | Product |
| --- | --- |
| `1.webp` | Arlo L-Shape Sofa with Storage Arm |
| `2.webp` | Graphite Corner Sectional |
| `3.webp` | Emerald Chesterfield Corner Sofa |
| `4.webp` | Ivory Channel L-Shape Sofa |
| `5.webp` | Verdant Tufted Sectional |
| `6.webp` | Ashford L-Shape Sofa |
| `7.webp` | Oatmeal Chaise Sectional |
| `8.webp` | Curve Bouclé Sectional |
| `9.webp` | Jade Velvet Chaise Sofa |
| `10.webp` | Timber Frame Corner Sofa |
| `11.webp` | Lumina Sculpted Sectional |
| `12.webp` | Lumina Sculpted Sectional, Low Back |
| `13.webp` | Skyline U-Shape Sectional |
| `14.webp` | Skyline U-Shape Sectional, Ivory |
| `15.webp` | Loft Metal-Frame L Sofa |
| `16.webp` | Loft Metal-Frame L Sofa, Open End |
| `17.webp` | Cloud Chaise Lounge Sofa |
| `18.webp` | Olive L-Shape Sofa with Storage Arm |
| `19.webp` | Harbor L-Shape Sofa |
| `20.webp` | Charcoal Chaise Sectional |
| `21.webp` | Metro Chaise Sectional |
| `22.webp` | Marina U-Shaped Sectional |

**Sofa Sets** (`products/sofa-set/`)

| File | Product |
| --- | --- |
| `1.webp` | Saffron Patterned Sofa Set (3+2+1) |
| `2.webp` | Rosa Floral Sofa Set (3+1+1) |
| `3.webp` | Cognac Leather Sofa Set (3+1+1) |
| `4.webp` | Azure Velvet Sofa Set (3+1+1) |
| `5.webp` | Forest Sofa Set (3+2+1) |
| `6.webp` | Kilim Pattern Sofa Set (3+2+1) |
| `7.webp` | Tan Leather Sofa Set (3+2+1) |
| `8.webp` | Olive Chesterfield Sofa Set (3+2+1) |
| `9.webp` | Wave Sofa Set (3+1+1) |
| `10.webp` | Stone Grey Sofa Set (3+1+1) |
| `11.webp` | Denim Blue Sofa Set (3+2+1) |
| `12.webp` | Charcoal Sofa Set (3+2+1) |
| `13.webp` | Ivory Lounge Sofa Set |
| `14.webp` | Navy Classic Sofa Set (3+2+1) |
| `15.webp` | Teak Frame Sofa Set (3+1+1) |
| `16.webp` | Graphite Tufted Sofa Set (3+1+1) |
| `17.webp` | Cobalt Bouclé Sofa Set (3+1+1) |
| `18.webp` | Pebble Grey Bouclé Sofa Set (3+1+1) |
| `19.webp` | Midnight Velvet Sofa Set with Ottoman |
| `20.webp` | Walnut Frame Sofa Set, Navy (3+1+1) |
| `22.webp` | Ember Sofa Set (3+1+1) |
| `23.webp` | Onyx Sofa Set (3+2) |
| `24.webp` | Urban Sofa Set with Ottoman |

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
| `Bed_11.webp` | Fan Shell Velvet Bed |
| `Bed_12.webp` | Terracotta Weave Bed |
| `Bed_13.webp` | Ivory Quilted Panel Bed |
| `Bed_14.webp` | Oak Platform Bed |
| `Bed_15.webp` | Iron Canopy Bed |
| `Bed_16.webp` | Navy Velvet Wingback Bed |
| `Bed_17.webp` | Natural Oak Channel Bed |
| `Bed_18.webp` | Canopy Bed with Leather Headboard |
| `Bed_19.webp` | Wrought Iron Four-Poster Bed |
| `Bed_20.webp` | Regal Four-Poster Bed, Navy |
| `Bed_21.webp` | Emerald Channel Upholstered Bed |
| `Bed_22.webp` | Nordic Oak Low Bed |
| `Bed_23.webp` | Rustic Log Bed |
| `Bed_24.webp` | Cane Tufted Bed |
| `Bed_25.webp` | Heritage Carved Four-Poster Bed |
| `Bed_26.webp` | Hampton Light Wood Bed |
| `Bed_27.webp` | Floating LED Platform Bed |
| `Bed_28.webp` | Chesterfield Tall Headboard Bed |
| `Bed_29.webp` | Haiku Slatted Bed |
| `Bed_30.webp` | Navy Tufted Storage Bed |
| `Bed_31.webp` | Cove Slatted Walnut Bed |

**Chairs** (`products/chair/`)

| File | Product |
| --- | --- |
| `Chair_1.webp` | Teal Lounge Armchair |
| `Chair_2.webp` | Pebble Lounge Chair with Side Tray |
| `Chair_3.webp` | Cloud Barrel Swivel Chair |
| `Chair_4.webp` | Orbit Velvet Barrel Chair |

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
| `16.webp` | Pillar Round Dining Set, Open Back (4 Seater) |
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
