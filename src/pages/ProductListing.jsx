import React, { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useProducts } from "../context/ProductContext.jsx";
import { getCategoryBySlug, CATEGORIES } from "../data/categories.js";
import ProductCard from "../components/ProductCard.jsx";
import FilterSidebar from "../components/FilterSidebar.jsx";
import SortDropdown from "../components/SortDropdown.jsx";
import "./ProductListing.css";

export default function ProductListing() {
  const [params, setParams] = useSearchParams();
  const { products } = useProducts();

  const categorySlug = params.get("category");
  const sub = params.get("sub");
  const query = (params.get("q") || "").toLowerCase();
  const sort = params.get("sort") || "featured";

  const [filters, setFilters] = useState({ inStockOnly: false, priceBand: null, sizes: [], colors: [] });
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const category = categorySlug ? getCategoryBySlug(categorySlug) : null;

  const scoped = useMemo(() => {
    let list = products;
    if (categorySlug) list = list.filter((p) => p.category === categorySlug);
    if (sub) list = list.filter((p) => p.subcategory === sub);
    if (query) {
      list = list.filter((p) =>
        `${p.name} ${p.categoryName} ${p.subcategory} ${p.fabric}`.toLowerCase().includes(query)
      );
    }
    return list;
  }, [products, categorySlug, sub, query]);

  const availableSizes = useMemo(
    () => Array.from(new Set(scoped.flatMap((p) => p.sizes))).sort(),
    [scoped]
  );
  const availableColors = useMemo(
    () => Array.from(new Set(scoped.flatMap((p) => p.colors))).sort(),
    [scoped]
  );

  const filtered = useMemo(() => {
    return scoped.filter((p) => {
      if (filters.inStockOnly && p.stock <= 0) return false;
      if (filters.priceBand && (p.price < filters.priceBand.min || p.price >= filters.priceBand.max)) return false;
      if (filters.sizes.length && !p.sizes.some((s) => filters.sizes.includes(s))) return false;
      if (filters.colors.length && !p.colors.some((c) => filters.colors.includes(c))) return false;
      return true;
    });
  }, [scoped, filters]);

  const sorted = useMemo(() => {
    const list = [...filtered];
    switch (sort) {
      case "az": return list.sort((a, b) => a.name.localeCompare(b.name));
      case "za": return list.sort((a, b) => b.name.localeCompare(a.name));
      case "price-low": return list.sort((a, b) => a.price - b.price);
      case "price-high": return list.sort((a, b) => b.price - a.price);
      case "date-old": return list.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      case "date-new": return list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      case "best-selling": return list.sort((a, b) => (b.bestSeller ? 1 : 0) - (a.bestSeller ? 1 : 0) || b.reviewCount - a.reviewCount);
      case "relevant": return list.sort((a, b) => b.rating - a.rating);
      default: return list;
    }
  }, [filtered, sort]);

  const title = sub || category?.name || (query ? `Results for "${params.get("q")}"` : "All Products");

  const setSort = (value) => {
    const next = new URLSearchParams(params);
    if (value === "featured") next.delete("sort"); else next.set("sort", value);
    setParams(next, { replace: true });
  };

  return (
    <div className="listing-page container">
      <nav className="crumb" aria-label="Breadcrumb">
        <a href="#/">Home</a> / {category ? <a href={`#/products?category=${category.slug}`}>{category.name}</a> : "All Products"}
        {sub && <> / <span>{sub}</span></>}
      </nav>

      <div className="listing-head">
        <h1>{title}</h1>
        <div className="listing-controls">
          <button className="mobile-filter-btn" onClick={() => setMobileFiltersOpen(true)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="4" y1="6" x2="20" y2="6" /><line x1="7" y1="12" x2="17" y2="12" /><line x1="10" y1="18" x2="14" y2="18" /></svg>
            Filters
          </button>
          <SortDropdown value={sort} onChange={setSort} />
        </div>
      </div>

      {category && (
        <div className="sub-pills">
          {category.subcategories.map((s) => (
            <a
              key={s}
              href={`#/products?category=${category.slug}&sub=${encodeURIComponent(s)}`}
              className={sub === s ? "is-active" : ""}
            >
              {s}
            </a>
          ))}
        </div>
      )}

      <div className="listing-body">
        <div className={`mobile-filter-backdrop ${mobileFiltersOpen ? "is-open" : ""}`} onClick={() => setMobileFiltersOpen(false)} />
        <div className={`mobile-filter-drawer ${mobileFiltersOpen ? "is-open" : ""}`}>
          <div className="mobile-filter-head">
            <h3>Filters</h3>
            <button aria-label="Close filters" onClick={() => setMobileFiltersOpen(false)}>×</button>
          </div>
          <FilterSidebar
            filters={filters}
            setFilters={setFilters}
            availableSizes={availableSizes}
            availableColors={availableColors}
            resultCount={sorted.length}
          />
          <div className="mobile-filter-footer">
            <button className="btn btn-block" onClick={() => setMobileFiltersOpen(false)}>Show {sorted.length} results</button>
          </div>
        </div>
        <div className="listing-grid-wrap">
          {sorted.length === 0 ? (
            <div className="empty-state">
              <p>No products match these filters yet.</p>
              <button className="btn-outline btn" onClick={() => setFilters({ inStockOnly: false, priceBand: null, sizes: [], colors: [] })}>
                Clear filters
              </button>
            </div>
          ) : (
            <div className="product-grid listing-grid">
              {sorted.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
