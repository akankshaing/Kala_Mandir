import React from "react";

export const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "relevant", label: "Most relevant" },
  { value: "best-selling", label: "Best selling" },
  { value: "az", label: "Alphabetically, A-Z" },
  { value: "za", label: "Alphabetically, Z-A" },
  { value: "price-low", label: "Price, low to high" },
  { value: "price-high", label: "Price, high to low" },
  { value: "date-old", label: "Date, old to new" },
  { value: "date-new", label: "Date, new to old" }
];

export default function SortDropdown({ value, onChange }) {
  return (
    <label className="sort-dropdown">
      <span>Sort by</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} aria-label="Sort products">
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </label>
  );
}
