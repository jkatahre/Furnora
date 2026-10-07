/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  STORE SETTINGS: everything about your shop lives in this one file.
 *
 *  Change the values below and save. You don't need to touch any other file
 *  to rebrand the site. Products are in `src/data/products.ts`, categories in
 *  `src/data/categories.ts`, and images in `public/images/`.
 *
 *  ⚠ Values marked SAMPLE are placeholders. Replace them with your real
 *    details before going live. Never publish claims, ratings or reviews
 *    that are not true for your business.
 * ─────────────────────────────────────────────────────────────────────────────
 */
import type { PriceMode } from "../types/product";

export type IconName =
  | "calendar"
  | "users"
  | "flag"
  | "shield"
  | "tools"
  | "truck"
  | "star"
  | "rupee"
  | "ruler"
  | "sofa"
  | "exchange"
  | "store";

export interface OpeningHours {
  /** 0 = Sunday … 6 = Saturday */
  days: number[];
  /** 24-hour "HH:MM". Leave out both to mark the days as closed. */
  open?: string;
  close?: string;
}

export const store = {
  // ── Identity ───────────────────────────────────────────────────────────
  name: "Furnora",
  /** Shown under the name in the header and footer. */
  tagline: "Furniture Showroom · Bhopal",
  /** Optional logo image in /public. Leave empty to use the name as a text logo. */
  logoImage: "",

  /** Brand colours. Any CSS colour works. */
  theme: {
    brand: "#7a4a26", // buttons, links, highlights
    brandDark: "#5b3519", // hover states
    brandSoft: "#f5ece2", // tinted backgrounds
  },

  /** Category slugs shown as links in the header (desktop) and first in the menu. */
  headerCategories: ["sofas", "beds", "dining-tables", "wardrobes"],
  /** Words suggested in the search box. */
  popularSearches: ["L-shape sofa", "King size bed", "Sheesham", "6 seater dining", "3 door wardrobe", "Recliner"],

  // ── Contact ────────────────────────────────────────────────────────────
  contact: {
    /** SAMPLE: shown on the site and used for "Call" buttons. */
    phone: "+91 00000 00000",
    /** SAMPLE: WhatsApp number with country code, digits only (91 for India). */
    whatsapp: "910000000000",
    /** SAMPLE */
    email: "hello@yourstore.in",
  },

  /**
   * Pre-filled WhatsApp messages. {store}, {product}, {price} and {link} are filled in automatically.
   */
  whatsappMessages: {
    general: "Hi {store}, I'd like to know more about your furniture.",
    product: "Hi {store}, I'm interested in the {product} ({price}).\n{link}\nPlease share the best price and delivery time.",
    price: "Hi {store}, please share the best price for the {product}.\n{link}",
    custom: "Hi {store}, I'd like to get furniture made to my size. Can your designer help?",
    visit: "Hi {store}, I'd like to visit your showroom. Please share the location.",
  },

  // ── Showroom ───────────────────────────────────────────────────────────
  showroom: {
    /** SAMPLE */
    title: "Visit our showroom in Bhopal",
    /** SAMPLE */
    addressLines: ["Plot 00, Zone-I, MP Nagar", "Near Jyoti Talkies", "Bhopal, Madhya Pradesh 462011"],
    /** What Google Maps should search for. Usually your business name and city. SAMPLE */
    mapQuery: "MP Nagar Zone 1, Bhopal",
    /** Optional: paste the "Embed a map" src from Google Maps for an exact pin. */
    mapEmbedUrl: "",
    /** SAMPLE */
    hours: [
      { days: [1, 2, 3, 4, 5, 6], open: "10:30", close: "20:30" },
      { days: [0], open: "11:00", close: "19:00" },
    ] as OpeningHours[],
    /** Short facts shown with the address. SAMPLE */
    highlights: ["8,000 sq ft display", "Free parking", "300+ pieces on display"],
    /** Showroom photos in /public. Replace with photos of your own store. */
    photos: [
      { src: "/images/banners/banner_2.webp", alt: "Living room display at the showroom" },
      { src: "/images/banners/banner_1.webp", alt: "Bedroom display at the showroom" },
      { src: "/images/banners/banner_3.webp", alt: "Dining display at the showroom" },
    ],
  },

  // ── Delivery ───────────────────────────────────────────────────────────
  /** SAMPLE: the cities you deliver to. `fee: 0` shows as "Free delivery". */
  deliveryAreas: [
    { city: "Bhopal", fee: 0, time: "2–4 days" },
    { city: "Indore", fee: 1500, time: "4–6 days" },
    { city: "Sehore", fee: 500, time: "3–5 days" },
    { city: "Vidisha", fee: 800, time: "3–5 days" },
    { city: "Raisen", fee: 800, time: "3–5 days" },
    { city: "Jabalpur", fee: 2500, time: "6–8 days" },
  ],
  /** Shown under the city list. */
  deliveryNote: "Other cities in India on request",

  // ── Policies (defaults for every product; products can override some) ──
  policies: {
    /** Delivery time for in-stock products. */
    leadTime: "Delivered in 7–10 days",
    /** Default for every product unless the product sets `customisable`. */
    customisable: true,
    customisationOptions: ["Size", "Fabric & colour", "Wood finish", "Storage options"],
    installation: "Free installation by our own carpenters",
    returns: "Inspect at delivery. Damaged pieces are replaced free of cost.",
    care: "Wipe with a dry cloth. Keep wood away from direct sunlight and moisture.",
    /** Default for every product unless the product sets `in_showroom`. */
    inShowroom: true,
  },

  // ── Pricing ────────────────────────────────────────────────────────────
  pricing: {
    /** How prices are shown unless a product sets `price_mode`. See src/types/product.ts. */
    defaultMode: "fixed" as PriceMode,
    /** Show a "Get Best Price" WhatsApp button next to fixed prices. */
    bestPriceButton: true,
    taxNote: "Inclusive of GST",
    /** Shows "EMI from ₹x/month" under prices above `minPrice`. Set `enabled: false` to hide. */
    emi: { enabled: true, months: 12, minPrice: 15000, note: "No-cost EMI on major credit cards" },
  },

  // ── Announcement bar (top of every page). Leave empty to hide. ─────────
  /** SAMPLE */
  announcements: ["Festive Sale: up to 30% off sofas & beds", "Free delivery & installation in Bhopal", "No-cost EMI available"],

  // ── Home page hero ─────────────────────────────────────────────────────
  hero: {
    image: "/images/banners/banner_2.webp",
    /** CSS object-position, keeps the subject in frame on phones. */
    focus: "50% 60%",
    alt: "Living room with a grey corner sofa and an oak coffee table",
    /** SAMPLE */
    eyebrow: "Furniture showroom in MP Nagar, Bhopal",
    title: "Sofas, beds & dining sets in solid wood",
    subtitle: "Made to your size. Free delivery in Bhopal.",
    /** Small facts under the buttons. */
    highlights: ["Since 2012", "Made in India", "Free installation"],
  },

  // ── Offers (home page offer cards). Leave empty to hide. ───────────────
  /** SAMPLE */
  offers: [
    { title: "Festive Sale", detail: "Up to 30% off sofas & beds", link: "/catalog?category=sofas,beds", highlight: true },
    { title: "Free Delivery", detail: "Anywhere in Bhopal", link: "/contact#delivery" },
    { title: "No-cost EMI", detail: "3, 6 & 12 months on cards", link: "/contact" },
    { title: "Exchange Offer", detail: "Bring your old sofa, get up to ₹5,000 off", link: "/contact" },
    { title: "Custom Furniture", detail: "Made to your size from ₹14,999", link: "/custom-furniture" },
  ] as { title: string; detail: string; link: string; highlight?: boolean }[],

  // ── Trust badges ("Why choose us"). Only list what is true. ────────────
  /** SAMPLE */
  trust: [
    { icon: "calendar", value: "12+ years", label: "in business" },
    { icon: "users", value: "5,000+", label: "happy homes" },
    { icon: "flag", value: "Made in India", label: "in our own workshop" },
    { icon: "shield", value: "Up to 5 years", label: "warranty" },
    { icon: "tools", value: "Free", label: "installation" },
    { icon: "truck", value: "Free delivery", label: "within Bhopal" },
  ] as { icon: IconName; value: string; label: string }[],

  /** Your overall rating. Set to null to hide. SAMPLE */
  rating: { value: 4.8, count: 640, source: "Google", url: "https://www.google.com/maps" } as {
    value: number;
    count: number;
    source: string;
    url: string;
  } | null,

  /**
   * Customer reviews. SAMPLE: replace with real reviews (e.g. copied from your Google profile).
   * `productSlug` shows the review on that product's page too.
   */
  reviews: [
    {
      name: "Ritika S.",
      city: "Bhopal",
      rating: 5,
      text: "Got our 6 seater dining set in sheesham. Finish is exactly like the showroom piece and they installed it the same day.",
      product: "Regent Walnut Dining Set",
      productSlug: "regent-walnut-dining-set-6-seater",
      date: "2026-08",
    },
    {
      name: "Amit P.",
      city: "Indore",
      rating: 5,
      text: "Wanted an L-shape sofa 6 inches shorter than the standard one. They made it to size in 15 days with the fabric I picked.",
      product: "Custom L-Shape Sofa",
      date: "2026-07",
    },
    {
      name: "Neha & Rahul",
      city: "Bhopal",
      rating: 4,
      text: "Good range of beds. Delivery was a day late but the team kept us updated on WhatsApp throughout.",
      product: "King Size Bed",
      date: "2026-06",
    },
    {
      name: "Mohd. Faisal",
      city: "Sehore",
      rating: 5,
      text: "Visited the showroom twice before buying. No pressure, clear prices, and the wardrobe quality is solid.",
      product: "3 Door Wardrobe",
      date: "2026-05",
    },
  ] as { name: string; city: string; rating: number; text: string; product?: string; productSlug?: string; date: string }[],

  // ── Rooms (Shop by Room). Rooms with no products are hidden. ───────────
  rooms: [
    { slug: "living-room", name: "Living Room", image: "/images/banners/banner_2.webp" },
    { slug: "bedroom", name: "Bedroom", image: "/images/banners/banner_1.webp" },
    { slug: "dining-room", name: "Dining Room", image: "/images/banners/banner_3.webp" },
    { slug: "office", name: "Office", image: "" },
    { slug: "outdoor", name: "Outdoor", image: "/images/products/Coffee%20Tables/Coffee_Tables_4.webp" },
    { slug: "kids-room", name: "Kids Room", image: "" },
    { slug: "storage", name: "Storage", image: "/images/products/wardrobe/2.webp" },
  ],

  // ── Custom furniture section ───────────────────────────────────────────
  custom: {
    title: "Can't find the right size?",
    subtitle: "Custom furniture made to your dimensions, material & finish.",
    image: "/images/products/l-shape-sofa/1.webp",
    /** SAMPLE */
    startingPrice: 14999,
    /** SAMPLE */
    leadTime: "Ready in 15–21 days",
    steps: [
      { title: "Share your size", detail: "Send a photo or room measurements on WhatsApp" },
      { title: "Pick material & finish", detail: "Sheesham, teak, plywood · 200+ fabrics" },
      { title: "We make it", detail: "In our own workshop, with photo updates" },
      { title: "Delivered & installed", detail: "By our own team, free in Bhopal" },
    ],
    /** What you make to order. */
    examples: ["Sofas", "Beds", "Wardrobes", "TV units", "Dining sets", "Modular kitchens"],
  },

  // ── Recent work / Instagram ────────────────────────────────────────────
  recentWork: {
    /** SAMPLE */
    handle: "@yourstore",
    url: "https://www.instagram.com/",
    /** Photos of delivered orders work best. */
    images: [
      { src: "/images/products/Coffee%20Tables/Coffee_Tables_1.webp", caption: "Nesting tables · Arera Colony" },
      { src: "/images/products/sofa-set/3.webp", caption: "Leather sofa set · Kolar Road" },
      { src: "/images/products/bed/Bed_25.webp", caption: "Carved four-poster bed · Indore" },
      { src: "/images/products/dining/14.webp", caption: "6 seater dining · Shahpura" },
      { src: "/images/products/Coffee%20Tables/Coffee_Tables_3.webp", caption: "Bone inlay tables · Bawadia Kalan" },
      { src: "/images/products/wardrobe/7.webp", caption: "3 door wardrobe · Awadhpuri" },
    ],
  },

  // ── About page. SAMPLE ─────────────────────────────────────────────────
  about: {
    title: "A family furniture business in Bhopal since 2012",
    points: ["Our own workshop and carpenters", "Showroom open 7 days a week", "Delivered to 5,000+ homes across MP"],
    image: "/images/banners/banner_3.webp",
  },

  // ── Social links. Leave a value empty to hide it. SAMPLE ───────────────
  social: {
    instagram: "https://www.instagram.com/",
    facebook: "https://www.facebook.com/",
    youtube: "",
    google: "https://www.google.com/maps",
  },

  // ── Colours used by the colour filter (name → swatch) ──────────────────
  colours: {
    Beige: "#d9c7a7",
    Brown: "#6b4226",
    "Natural Wood": "#c49a6c",
    Grey: "#8a8a8a",
    Black: "#1f1f1f",
    White: "#f4f2ee",
    Blue: "#2f4a7a",
    Teal: "#2c7a7b",
    Green: "#4f6b3a",
    Yellow: "#d4a017",
    Red: "#a23b2a",
  } as Record<string, string>,

  /**
   * Material families for the Material filter. A product matches a family when its
   * material contains any of the words. The product's own material text is shown on cards.
   */
  materialFamilies: [
    { label: "Sheesham", match: ["sheesham"] },
    { label: "Teak", match: ["teak"] },
    { label: "Solid Wood", match: ["solid", "sheesham", "teak", "mango", "log"] },
    { label: "Engineered Wood", match: ["engineered"] },
    { label: "Plywood", match: ["plywood"] },
    { label: "MDF", match: ["mdf"] },
    { label: "Marble & Stone", match: ["marble", "stone"] },
    { label: "Metal", match: ["metal", "iron", "brass"] },
    { label: "Fabric", match: ["fabric", "linen", "jacquard"] },
    { label: "Velvet", match: ["velvet"] },
    { label: "Leather", match: ["leather"], exclude: ["leatherette"] },
    { label: "Leatherette", match: ["leatherette"] },
    { label: "Cane & Rattan", match: ["cane", "rattan"] },
    { label: "Bone Inlay", match: ["bone inlay"] },
  ],
};

export type Store = typeof store;

// Reminds you in the browser console (development only) while sample details are still in place.
if (import.meta.env.DEV && store.contact.whatsapp.includes("0000000000")) {
  console.warn("[store] Sample phone/WhatsApp number in src/config/store.ts. Replace it, along with the other SAMPLE values, before launch.");
}
