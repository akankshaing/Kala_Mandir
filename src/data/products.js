import { CATEGORIES } from "./categories.js";

const COLORS = ["Maroon", "Mustard", "Ivory", "Emerald", "Indigo", "Rust", "Blush"];
const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
const FABRIC_PRICE = {
  "unstitched-fabric": [650, 2200],
  sarees: [1800, 9500],
  "indo-western": [1400, 4800],
  kurtis: [799, 2600],
  "co-ord-set": [1200, 3400],
  bottoms: [499, 1400],
  "festive-specials": [3200, 12500]
};

function seededRandom(seed) {
  let t = seed + 0x6d2b79f5;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

function buildImages(seed, count = 4) {
  return Array.from({ length: count }, (_, i) => `https://picsum.photos/seed/kalamandir-${seed}-${i}/800/1000`);
}

function pick(arr, seed) {
  return arr[Math.floor(seededRandom(seed) * arr.length)];
}

function pickMany(arr, seed, min = 2, max = 4) {
  const n = min + Math.floor(seededRandom(seed) * (max - min + 1));
  const shuffled = [...arr].sort(() => seededRandom(seed++) - 0.5);
  return shuffled.slice(0, n);
}

let idCounter = 1;
export const PRODUCTS = [];

CATEGORIES.forEach((cat, ci) => {
  cat.subcategories.forEach((sub, si) => {
    const seed = ci * 97 + si * 13 + 5;
    const [lo, hi] = FABRIC_PRICE[cat.slug];
    const mrp = Math.round((lo + seededRandom(seed) * (hi - lo)) / 10) * 10;
    const discountPct = [0, 10, 15, 20, 30][Math.floor(seededRandom(seed + 1) * 5)];
    const price = Math.round((mrp * (100 - discountPct)) / 100 / 5) * 5;
    const id = `KM-${String(idCounter).padStart(4, "0")}`;
    idCounter += 1;

    PRODUCTS.push({
      id,
      name: `${sub} — ${cat.name}`,
      category: cat.slug,
      categoryName: cat.name,
      subcategory: sub,
      price,
      mrp,
      discountPct,
      colors: pickMany(COLORS, seed + 2, 2, 4),
      sizes: cat.slug === "sarees" || cat.slug === "unstitched-fabric" ? ["Free Size"] : pickMany(SIZES, seed + 3, 4, 6),
      images: buildImages(id, 5),
      description:
        `A ${sub.toLowerCase()} from our ${cat.name} collection, hand-finished with attention to drape and ` +
        `detail. Made for everyday elegance as much as special occasions, and easy to style across seasons.`,
      fabric: pick(["Cotton", "Silk blend", "Chiffon", "Rayon", "Georgette", "Linen"], seed + 4),
      countryOfOrigin: "India",
      careInstructions: "Dry clean recommended. Store folded in a cool, dry place away from direct sunlight.",
      rating: Math.round((3.6 + seededRandom(seed + 5) * 1.4) * 10) / 10,
      reviewCount: 4 + Math.floor(seededRandom(seed + 6) * 180),
      stock: 3 + Math.floor(seededRandom(seed + 7) * 40),
      warehouseLocation: pick(["Jaipur DC — Rack A3", "Jaipur DC — Rack B1", "Mumbai Hub — Rack C2", "Delhi Hub — Rack D4"], seed + 9),
      bestSeller: seededRandom(seed + 8) > 0.78,
      createdAt: new Date(2025, ci, 3 + si).toISOString()
    });
  });
});

export const getProductById = (id) => PRODUCTS.find((p) => p.id === id);

export const getSimilarProducts = (product, limit = 4) =>
  PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, limit);
