export const CATEGORIES = [
  {
    slug: "kurtis",
    name: "Kurtis",
    subcategories: [
      "A line kurti", "Anarkali", "Coloured block", "Straight kurti",
      "Angrakha", "Flared kurti", "Short kurti", "Chikankari kurti",
      "Sleeveless", "Kaftan kurti", "Madhubani"
    ]
  },
  {
    slug: "unstitched-fabric",
    name: "Unstitched Fabric",
    subcategories: [
      "Cotton", "Chiffon", "Rayon", "Silk", "Georgette",
      "Chinnon", "Muslin", "Linen", "Crepe"
    ]
  },
  {
    slug: "indo-western",
    name: "Indo Western",
    subcategories: [
      "Readymade sarees", "Gowns", "Dhoti kurta",
      "Crop top with Lehenga", "Shrug set"
    ]
  },
  {
    slug: "sarees",
    name: "Sarees",
    subcategories: [
      "Banarasi", "Chanderi", "Kanjeevaram", "Chikankari", "Kota doria",
      "Silk saree", "Pathani saree", "Patola saree", "Maheshwari saree",
      "Sambalpuri", "Tant saree", "Jamdani saree", "Bomkai saree", "Kasavu saree"
    ]
  },
  {
    slug: "co-ord-set",
    name: "Co-ord Set",
    subcategories: [
      "Casual", "Office/formal", "Partywear", "Resort wear",
      "Festive", "Lounge/comfort"
    ]
  },
  {
    slug: "bottoms",
    name: "Bottoms",
    subcategories: [
      "Straight leg pant", "Leggings", "Jegging", "Pleated skirt",
      "Palazzo", "Wide leg pants", "Dhoti skirt", "Salwar"
    ]
  },
  {
    slug: "festive-specials",
    name: "Festive Specials",
    subcategories: ["Chaniya choli"]
  }
];

export const getCategoryBySlug = (slug) =>
  CATEGORIES.find((c) => c.slug === slug);
