import React from "react";
import { useColors } from "../context/ColorContext.jsx";
import { useFilterOptions } from "../context/FilterOptionsContext.jsx";
import {
  PRICE_BANDS,
  DISCOUNT_BANDS,
  AVAILABILITY_OPTIONS,
  defaultFilters
} from "../data/filterOptions.js";
import "./FilterSidebar.css";

export default function FilterSidebar({
  filters,
  setFilters,
  availableSizes,
  availableColors,
  availableCategories,
  showCategoryFilter,
  resultCount
}) {
  const { getHex } = useColors();
  const { options } = useFilterOptions();
  const { fabrics: FABRICS, occasions: OCCASIONS, patterns: PATTERNS, sleeves: SLEEVES, necks: NECKS, fits: FITS, lengths: LENGTHS, collections: COLLECTIONS } = options;

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

  const toggleDiscountBand = (band) => {
    setFilters((prev) => ({
      ...prev,
      discount: prev.discount?.label === band.label ? null : band
    }));
  };

  const setAvailability = (value) =>
    setFilters((prev) => ({ ...prev, availability: value }));

  const clearAll = () => setFilters(defaultFilters());

  return (
    <aside className="filter-sidebar" aria-label="Filter products">
      <div className="filter-head">
        <h3>Filters</h3>
        <button className="filter-clear" onClick={clearAll}>Clear all</button>
      </div>
      <p className="filter-count">{resultCount} result{resultCount === 1 ? "" : "s"}</p>

      {showCategoryFilter && availableCategories?.length > 0 && (
        <div className="filter-group">
          <h4>Category</h4>
          <div className="chip-row">
            {availableCategories.map((cat) => (
              <button
                key={cat.slug}
                className={`chip ${filters.categories.includes(cat.slug) ? "is-active" : ""}`}
                onClick={() => toggleInSet("categories", cat.slug)}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="filter-group">
        <h4>Availability</h4>
        {AVAILABILITY_OPTIONS.map((opt) => (
          <label className="filter-check" key={opt.value}>
            <input
              type="radio"
              name="availability"
              checked={filters.availability === opt.value}
              onChange={() => setAvailability(opt.value)}
            />
            {opt.label}
          </label>
        ))}
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
        <h4>Discount</h4>
        {DISCOUNT_BANDS.map((band) => (
          <label className="filter-check" key={band.label}>
            <input
              type="radio"
              name="discount-band"
              checked={filters.discount?.label === band.label}
              onChange={() => toggleDiscountBand(band)}
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

      <div className="filter-group">
        <h4>Fabric</h4>
        <div className="chip-row">
          {FABRICS.map((fabric) => (
            <button
              key={fabric}
              className={`chip ${filters.fabrics.includes(fabric) ? "is-active" : ""}`}
              onClick={() => toggleInSet("fabrics", fabric)}
            >
              {fabric}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <h4>Occasion</h4>
        <div className="chip-row">
          {OCCASIONS.map((occasion) => (
            <button
              key={occasion}
              className={`chip ${filters.occasions.includes(occasion) ? "is-active" : ""}`}
              onClick={() => toggleInSet("occasions", occasion)}
            >
              {occasion}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <h4>Pattern</h4>
        <div className="chip-row">
          {PATTERNS.map((pattern) => (
            <button
              key={pattern}
              className={`chip ${filters.patterns.includes(pattern) ? "is-active" : ""}`}
              onClick={() => toggleInSet("patterns", pattern)}
            >
              {pattern}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <h4>Sleeve</h4>
        <div className="chip-row">
          {SLEEVES.map((sleeve) => (
            <button
              key={sleeve}
              className={`chip ${filters.sleeves.includes(sleeve) ? "is-active" : ""}`}
              onClick={() => toggleInSet("sleeves", sleeve)}
            >
              {sleeve}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <h4>Neck</h4>
        <div className="chip-row">
          {NECKS.map((neck) => (
            <button
              key={neck}
              className={`chip ${filters.necks.includes(neck) ? "is-active" : ""}`}
              onClick={() => toggleInSet("necks", neck)}
            >
              {neck}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <h4>Fit</h4>
        <div className="chip-row">
          {FITS.map((fit) => (
            <button
              key={fit}
              className={`chip ${filters.fits.includes(fit) ? "is-active" : ""}`}
              onClick={() => toggleInSet("fits", fit)}
            >
              {fit}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <h4>Length</h4>
        <div className="chip-row">
          {LENGTHS.map((length) => (
            <button
              key={length}
              className={`chip ${filters.lengths.includes(length) ? "is-active" : ""}`}
              onClick={() => toggleInSet("lengths", length)}
            >
              {length}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <h4>Collection</h4>
        <div className="chip-row">
          {COLLECTIONS.map((collection) => (
            <button
              key={collection}
              className={`chip ${filters.collections.includes(collection) ? "is-active" : ""}`}
              onClick={() => toggleInSet("collections", collection)}
            >
              {collection}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}

export { PRICE_BANDS };
