// Central list of filter option values, shared by the storefront FilterSidebar
// and the admin product form so both stay in sync.

export const SIZES = ["XS", "S", "M", "L", "XL", "XXL", "3XL", "Free Size"];

export const FABRICS = ["Cotton", "Silk", "Rayon", "Chanderi", "Georgette", "Linen", "Chiffon"];

export const OCCASIONS = ["Casual", "Office", "Festive", "Wedding", "Party", "Daily Wear"];

export const PATTERNS = ["Solid", "Floral", "Printed", "Embroidered", "Striped", "Block Print"];

export const SLEEVES = ["Sleeveless", "Half Sleeve", "3/4 Sleeve", "Full Sleeve"];

export const NECKS = ["Round", "V-Neck", "Boat Neck", "Mandarin", "Collar"];

export const FITS = ["Regular", "Relaxed", "Straight", "A-Line", "Flared"];

export const LENGTHS = ["Short", "Knee Length", "Calf Length", "Ankle Length", "Full Length"];

export const COLLECTIONS = ["New Arrivals", "Best Sellers", "Trending", "Festive Collection"];

export const PRICE_BANDS = [
  { label: "Under ₹500", min: 0, max: 500 },
  { label: "₹500 – ₹1,000", min: 500, max: 1000 },
  { label: "₹1,000 – ₹2,000", min: 1000, max: 2000 },
  { label: "₹2,000+", min: 2000, max: Infinity }
];

export const DISCOUNT_BANDS = [
  { label: "10% and above", min: 10 },
  { label: "20% and above", min: 20 },
  { label: "30% and above", min: 30 },
  { label: "50% and above", min: 50 }
];

export const AVAILABILITY_OPTIONS = [
  { value: "all", label: "All" },
  { value: "in", label: "In Stock" },
  { value: "out", label: "Out of Stock" }
];

// Categories that plausibly have a sleeve/neckline (stitched tops).
export const SLEEVE_NECK_CATEGORIES = ["kurtis", "indo-western", "co-ord-set", "festive-specials"];
// Categories where a "fit" makes sense.
export const FIT_CATEGORIES = ["kurtis", "co-ord-set", "bottoms", "indo-western"];
// Categories where a garment "length" makes sense.
export const LENGTH_CATEGORIES = ["kurtis", "co-ord-set", "indo-western", "bottoms", "festive-specials"];

export const defaultFilters = () => ({
  categories: [],
  availability: "all",
  priceBand: null,
  sizes: [],
  colors: [],
  fabrics: [],
  occasions: [],
  patterns: [],
  sleeves: [],
  necks: [],
  fits: [],
  lengths: [],
  discount: null,
  collections: []
});
