import React from "react";
import { useColors } from "../context/ColorContext.jsx";
import "./FilterSidebar.css";

const PRICE_BANDS = [
  { label: "Under ₹1,000", min: 0, max: 1000 },
  { label: "₹1,000 – ₹2,000", min: 1000, max: 2000 },
  { label: "₹2,000 – ₹4,000", min: 2000, max: 4000 },
  { label: "₹4,000 – ₹8,000", min: 4000, max: 8000 },
  { label: "Above ₹8,000", min: 8000, max: Infinity }
];

export default function FilterSidebar({ filters, setFilters, availableSizes, availableColors, resultCount }) {
  const { getHex } = useColors();
  const toggleInSet = (key, value) => {
    setFilters((prev) => {
      const set = new Set(prev[key]);
      set.has(value) ? set.delete(value) : set.add(value);
      return { ...prev, [key]: Array.from(set) };
    });
  };

  const togglePriceBand = (band) => {
    setFilters((prev) => ({
      ...prev,
      priceBand: prev.priceBand?.label === band.label ? null : band
    }));
  };

  const clearAll = () =>
    setFilters({ inStockOnly: false, priceBand: null, sizes: [], colors: [] });

  return (
    <aside className="filter-sidebar" aria-label="Filter products">
      <div className="filter-head">
        <h3>Filters</h3>
        <button className="filter-clear" onClick={clearAll}>Clear all</button>
      </div>
      <p className="filter-count">{resultCount} result{resultCount === 1 ? "" : "s"}</p>

      <div className="filter-group">
        <h4>Availability</h4>
        <label className="filter-check">
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={() => setFilters((p) => ({ ...p, inStockOnly: !p.inStockOnly }))}
          />
          In stock only
        </label>
      </div>

      <div className="filter-group">
        <h4>Price</h4>
        {PRICE_BANDS.map((band) => (
          <label className="filter-check" key={band.label}>
            <input
              type="radio"
              name="price-band"
              checked={filters.priceBand?.label === band.label}
              onChange={() => togglePriceBand(band)}
            />
            {band.label}
          </label>
        ))}
      </div>

      <div className="filter-group">
        <h4>Size</h4>
        <div className="chip-row">
          {availableSizes.map((size) => (
            <button
              key={size}
              className={`chip ${filters.sizes.includes(size) ? "is-active" : ""}`}
              onClick={() => toggleInSet("sizes", size)}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <h4>Colour</h4>
        <div className="chip-row">
          {availableColors.map((color) => (
            <button
              key={color}
              className={`chip chip-swatch ${filters.colors.includes(color) ? "is-active" : ""}`}
              onClick={() => toggleInSet("colors", color)}
            >
              <span className="swatch-dot" style={{ background: getHex(color) }} />
              {color}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}

export { PRICE_BANDS };
