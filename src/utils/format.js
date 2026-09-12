export function readFilesAsDataURLs(fileList) {
  const files = Array.from(fileList || []);
  return Promise.all(
    files.map(
      (file) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        })
    )
  );
}

export const formatINR = (amount) =>
  `₹${Math.round(amount).toLocaleString("en-IN")}`;

export const formatDate = (iso) =>
  new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

const REVIEW_BODIES = [
  "Fits true to size and the fabric feels much better than expected for the price.",
  "Colour is slightly richer in person than the photos, in a good way. Would buy again.",
  "Good stitching quality. Delivery took a couple of days longer than the estimate.",
  "Loved the print, but I'd size up if you're between two sizes.",
  "Exactly as described. The grievance officer contact on the site gave me confidence before I ordered.",
  "Comfortable for a full day of wear. Packaging was neat and plastic-free.",
  "Great value. The breakup of delivery charges at checkout was clear, no surprises.",
  "Second purchase from this collection - consistent quality both times."
];
const REVIEW_NAMES = ["Ananya", "Priya", "Sneha", "Kavya", "Ritu", "Meera", "Isha", "Neha", "Divya", "Pooja"];

export function getMockReviews(productId, rating, count) {
  const seedBase = productId.split("-").pop().length + productId.length;
  const shown = Math.min(count, 6);
  return Array.from({ length: shown }, (_, i) => {
    const seed = (seedBase + i * 17) % 1000;
    return {
      id: `${productId}-rev-${i}`,
      name: REVIEW_NAMES[seed % REVIEW_NAMES.length],
      rating: Math.max(3, Math.min(5, Math.round(rating) + ((seed % 3) - 1))),
      body: REVIEW_BODIES[seed % REVIEW_BODIES.length],
      date: new Date(2025, (seed % 12), 1 + (seed % 27)).toISOString()
    };
  });
}
