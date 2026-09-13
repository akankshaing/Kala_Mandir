import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CATEGORIES } from "../data/categories.js";
import { useCart } from "../context/CartContext.jsx";
import { useWishlist } from "../context/WishlistContext.jsx";
import "./Header.css";

export default function Header() {
  const [query, setQuery] = useState("");
  const [openCategory, setOpenCategory] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(null);

  const navigate = useNavigate();
  const { cartCount } = useCart();
  const { ids: wishlistIds } = useWishlist();

  const submitSearch = (e) => {
    e.preventDefault();

    navigate(
      query.trim()
        ? `/products?q=${encodeURIComponent(query.trim())}`
        : "/products"
    );

    setMobileOpen(false);
  };

  const closeDrawer = () => {
    setMobileOpen(false);
    setMobileExpanded(null);
  };

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="site-header">
      <div className="container header-row">

        {/* Mobile Menu Button */}
        <button
          className="mobile-toggle"
          aria-label="Open menu"
          onClick={() => setMobileOpen(true)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Brand */}
        <Link to="/" className="brand" onClick={closeDrawer}>
          <img
            src="/logo-small.jpeg"
            alt="Kalamandir Shivam — Ethnic Clothing"
            className="brand-logo"
          />

          <span className="brand-name">Kalamandir <br /> Shivam</span>
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="category-nav-desktop"
          aria-label="Product categories"
        >
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>

            <li>
              <Link to="/products">All Products</Link>
            </li>

            {CATEGORIES.map((cat) => (
              <li
                key={cat.slug}
                className="has-mega"
                onMouseEnter={() => setOpenCategory(cat.slug)}
                onMouseLeave={() => setOpenCategory(null)}
              >
                <Link
                  to={`/products?category=${cat.slug}`}
                  className="cat-trigger"
                  aria-expanded={openCategory === cat.slug}
                >
                  {cat.name}
                </Link>

                {openCategory === cat.slug && (
                  <div className="mega-menu">
                    <ul>
                      {cat.subcategories.map((sub) => (
                        <li key={sub}>
                          <Link
                            to={`/products?category=${cat.slug}&sub=${encodeURIComponent(sub)}`}
                            onClick={() => setOpenCategory(null)}
                          >
                            {sub}
                          </Link>
                        </li>
                      ))}
                    </ul>

                    <Link
                      className="mega-view-all"
                      to={`/products?category=${cat.slug}`}
                      onClick={() => setOpenCategory(null)}
                    >
                      View all {cat.name} →
                    </Link>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Search */}
        <form
          className="search-form"
          onSubmit={submitSearch}
          role="search"
        >
          <input
            type="search"
            placeholder="Search..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search products"
          />

          <button type="submit" aria-label="Search">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="7" />
              <line x1="16.65" y1="16.65" x2="21" y2="21" />
            </svg>
          </button>
        </form>

        {/* Wishlist, Cart and Account */}
        <nav
          className="icon-nav"
          aria-label="Wishlist, cart and account"
        >
          {/* Wishlist */}
          <Link
            to="/wishlist"
            className="icon-link"
            aria-label={`Wishlist, ${wishlistIds.length} items`}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.65"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
            </svg>

            {wishlistIds.length > 0 && (
              <span className="badge">{wishlistIds.length}</span>
            )}
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            className="icon-link"
            aria-label={`Cart, ${cartCount} items`}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.65"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 4h2l2.4 12.4a2 2 0 0 0 2 1.6h7.2a2 2 0 0 0 2-1.6L20 8H6" />
              <circle cx="9" cy="21" r="1.3" />
              <circle cx="18" cy="21" r="1.3" />
            </svg>

            {cartCount > 0 && (
              <span className="badge">{cartCount}</span>
            )}
          </Link>

          {/* Account */}
          <Link
            to="/account"
            className="icon-link"
            aria-label="My account"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.65"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 3.6-6 8-6s8 2 8 6" />
            </svg>
          </Link>
        </nav>
      </div>

      {/* Mobile Drawer Backdrop */}
      <div
        className={`mobile-drawer-backdrop ${
          mobileOpen ? "is-open" : ""
        }`}
        onClick={closeDrawer}
      />

      {/* Mobile Drawer */}
      <nav
        className={`mobile-drawer ${
          mobileOpen ? "is-open" : ""
        }`}
        aria-label="Product categories"
        aria-hidden={!mobileOpen}
      >
        <div className="mobile-drawer-head">
          <Link to="/" className="brand" onClick={closeDrawer}>
            <img
              src="/logo-small.jpeg"
              alt="Kalamandir Shivam"
              className="brand-logo"
            />

            <span className="brand-name">Kalamandir Shivam</span>
          </Link>

          <button
            className="mobile-drawer-close"
            aria-label="Close menu"
            onClick={closeDrawer}
          >
            ×
          </button>
        </div>

        <ul className="mobile-drawer-list">
          <li>
            <Link to="/" onClick={closeDrawer}>
              Home
            </Link>
          </li>

          <li>
            <Link to="/products" onClick={closeDrawer}>
              All Products
            </Link>
          </li>

          {CATEGORIES.map((cat) => (
            <li
              key={cat.slug}
              className="mobile-accordion-item"
            >
              <button
                className="mobile-accordion-trigger"
                aria-expanded={mobileExpanded === cat.slug}
                onClick={() =>
                  setMobileExpanded((current) =>
                    current === cat.slug ? null : cat.slug
                  )
                }
              >
                {cat.name}

                <span
                  className={`chevron ${
                    mobileExpanded === cat.slug ? "is-open" : ""
                  }`}
                >
                  ⌄
                </span>
              </button>

              {mobileExpanded === cat.slug && (
                <div className="mobile-accordion-panel">
                  <ul>
                    {cat.subcategories.map((sub) => (
                      <li key={sub}>
                        <Link
                          to={`/products?category=${cat.slug}&sub=${encodeURIComponent(sub)}`}
                          onClick={closeDrawer}
                        >
                          {sub}
                        </Link>
                      </li>
                    ))}
                  </ul>

                  <Link
                    className="mobile-view-all"
                    to={`/products?category=${cat.slug}`}
                    onClick={closeDrawer}
                  >
                    View all {cat.name} →
                  </Link>
                </div>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}