import type { Category } from "../types/product";

/**
 * Your categories, in display order. Edit names freely; keep `category_id` in step with products.ts.
 * `rooms` uses the room slugs from `store.rooms` (src/config/store.ts).
 * A category with no available products is hidden unless `showWhenEmpty` is true.
 */
export const categories: Category[] = [
  { category_id: 2, name: "Sofas", slug: "sofas", description: "2 & 3 seater sofas", rooms: ["living-room"] },
  { category_id: 15, name: "L-Shape Sofas", slug: "l-shape-sofas", description: "Corner, L & U-shape sofas", rooms: ["living-room"] },
  { category_id: 14, name: "Sofa Sets", slug: "sofa-sets", description: "3+1+1 and 3+2+1 sets", rooms: ["living-room"] },
  { category_id: 1, name: "Beds", slug: "beds", description: "King & queen size beds, with and without storage", rooms: ["bedroom"] },
  { category_id: 7, name: "Wardrobes", slug: "wardrobes", description: "2, 3 & 4 door wardrobes", rooms: ["bedroom", "storage"] },
  { category_id: 4, name: "Dining Tables", slug: "dining-tables", description: "4, 6 & 8 seater dining sets", rooms: ["dining-room"] },
  { category_id: 16, name: "Dining Chairs", slug: "dining-chairs", description: "Dining chairs sold separately", rooms: ["dining-room"] },
  { category_id: 8, name: "TV Units", slug: "tv-units", description: "Wall-mounted and floor TV units", rooms: ["living-room", "storage"] },
  { category_id: 17, name: "Shoe Racks", slug: "shoe-racks", description: "Closed and open shoe racks", rooms: ["storage"] },
  { category_id: 5, name: "Coffee Tables", slug: "coffee-tables", description: "Centre tables and nesting sets", rooms: ["living-room"] },
  { category_id: 9, name: "Side Tables", slug: "side-tables", description: "Side tables and bedside tables", rooms: ["living-room", "bedroom"] },
  { category_id: 12, name: "Recliners", slug: "recliners", description: "Manual and motorised recliners", rooms: ["living-room"] },
  { category_id: 3, name: "Chairs", slug: "chairs", description: "Lounge, accent and swivel chairs", rooms: ["living-room"] },
  { category_id: 13, name: "Dressing Tables", slug: "dressing-tables", description: "Dressing tables with mirror", rooms: ["bedroom"] },
  { category_id: 6, name: "Office Furniture", slug: "office-furniture", description: "Study tables and work desks", rooms: ["office"] },
  { category_id: 18, name: "Mattresses", slug: "mattresses", description: "Foam, spring and orthopaedic", rooms: ["bedroom"] },
  { category_id: 10, name: "Bookshelves", slug: "bookshelves", description: "Wall and floor bookshelves", rooms: ["storage", "office"] },
  { category_id: 11, name: "Cabinets", slug: "cabinets", description: "Sideboards and storage cabinets", rooms: ["storage", "dining-room"] },
  { category_id: 19, name: "Kids Furniture", slug: "kids-furniture", description: "Kids beds, bunk beds and study units", rooms: ["kids-room"] },
  { category_id: 20, name: "Outdoor", slug: "outdoor", description: "Balcony, terrace and garden furniture", rooms: ["outdoor"] },
];
