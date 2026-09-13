import React, { useMemo, useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { useProducts } from "../context/ProductContext.jsx";
import { getCategoryBySlug, CATEGORIES } from "../data/categories.js";
import { defaultFilters } from "../data/filterOptions.js";
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

  const [filters, setFilters] = useState(defaultFilters());
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
  const availableCategories = useMemo(
    () =>
      CATEGORIES.filter((c) => scoped.some((p) => p.category === c.slug)),
    [scoped]
  );

  const filtered = useMemo(() => {
    return scoped.filter((p) => {
      if (filters.categories.length && !filters.categories.includes(p.category)) return false;
      if (filters.availability === "in" && p.stock <= 0) return false;
      if (filters.availability === "out" && p.stock > 0) return false;
      if (filters.priceBand && (p.price < filters.priceBand.min || p.price >= filters.priceBand.max)) return false;
      if (filters.discount && (p.discountPct || 0) < filters.discount.min) return false;
      if (filters.sizes.length && !p.sizes.some((s) => filters.sizes.includes(s))) return false;
      if (filters.colors.length && !p.colors.some((c) => filters.colors.includes(c))) return false;
      if (filters.fabrics.length && !filters.fabrics.includes(p.fabric)) return false;
      if (filters.occasions.length && !(p.occasions || []).some((o) => filters.occasions.includes(o))) return false;
      if (filters.patterns.length && !filters.patterns.includes(p.pattern)) return false;
      if (filters.sleeves.length && !filters.sleeves.includes(p.sleeve)) return false;
      if (filters.necks.length && !filters.necks.includes(p.neck)) return false;
      if (filters.fits.length && !filters.fits.includes(p.fit)) return false;
      if (filters.lengths.length && !filters.lengths.includes(p.length)) return false;
      if (filters.collections.length && !(p.collections || []).some((c) => filters.collections.includes(c))) return false;
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

  const PAGE_SIZE = 50;
  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const pageFromUrl = parseInt(params.get("page"), 10) || 1;
  const page = Math.min(Math.max(1, pageFromUrl), totalPages);

  const goToPage = (n) => {
    const next = new URLSearchParams(params);
    const clamped = Math.min(Math.max(1, n), totalPages);
    if (clamped === 1) next.delete("page"); else next.set("page", String(clamped));
    setParams(next, { replace: true });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const paged = useMemo(
    () => sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [sorted, page]
  );

  const resetKey = `${categorySlug}|${sub}|${query}|${sort}|${JSON.stringify(filters)}`;
  const prevResetKey = useRef(resetKey);
  useEffect(() => {
    if (prevResetKey.current !== resetKey) {
      prevResetKey.current = resetKey;
      if (params.get("page")) {
        const next = new URLSearchParams(params);
        next.delete("page");
        setParams(next, { replace: true });
      }
    }
  }, [resetKey]);

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
            availableCategories={availableCategories}
            showCategoryFilter={!categorySlug}
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
              <button className="btn-outline btn" onClick={() => setFilters(defaultFilters())}>
                Clear filters
              </button>
            </div>
          ) : (
            <>
              <div className="product-grid listing-grid">
                {paged.map((p) => <ProductCard key={p.id} product={p} />)}
              </div>

              {totalPages > 1 && (
                <nav className="pagination" aria-label="Product pages">
                  <button
                    type="button"
                    className="btn-outline btn pagination-jump"
                    onClick={() => goToPage(1)}
                    disabled={page === 1}
                  >
                    « Page 1
                  </button>
                  <button
                    type="button"
                    className="btn-outline btn"
                    onClick={() => goToPage(page - 1)}
                    disabled={page === 1}
                  >
                    ‹ Previous
                  </button>
                  <span className="pagination-status">Page {page} of {totalPages}</span>
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={() => goToPage(page + 1)}
                    disabled={page === totalPages}
                  >
                    Next ›
                  </button>
                </nav>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
