import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { CATEGORIES } from "../data/categories.js";
import { useCart } from "../context/CartContext.jsx";
import { useWishlist } from "../context/WishlistContext.jsx";
import "./Header.css";

export default function Header() {
  const [query, setQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false); // desktop hover menu
  const [hoverCat, setHoverCat] = useState(CATEGORIES[0].slug);
  const [mobileExpanded, setMobileExpanded] = useState(false); // mobile Products accordion
  const [mobileCat, setMobileCat] = useState(null);

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
    setMobileExpanded(false);
    setMobileCat(null);
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

        {/* Brand (logo only) */}
        <Link to="/" className="brand" onClick={closeDrawer} aria-label="Kalamandir Shivam — Home">
          <img
            src="/logo-small.jpeg"
            alt="Kalamandir Shivam — Ethnic Clothing"
            className="brand-logo"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav
          className="category-nav-desktop"
          aria-label="Product categories"
        >
          <ul>
            <li>
              <NavLink to="/" end>Home</NavLink>
            </li>

            <li
              className="has-products"
              onMouseEnter={() => setProductsOpen(true)}
              onMouseLeave={() => setProductsOpen(false)}
              onFocus={() => setProductsOpen(true)}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget)) setProductsOpen(false);
              }}
              onKeyDown={(e) => e.key === "Escape" && setProductsOpen(false)}
            >
              <NavLink to="/products" end onClick={() => setProductsOpen(false)}>
                Products <span className="products-caret" aria-hidden="true">⌄</span>
              </NavLink>

              {productsOpen && (
                <div className="products-menu">
                  <ul className="products-cats">
                    {CATEGORIES.map((cat) => (
                      <li
                        key={cat.slug}
                        className={hoverCat === cat.slug ? "is-hover" : ""}
                        onMouseEnter={() => setHoverCat(cat.slug)}
                      >
                        <Link
                          to={`/products?category=${cat.slug}`}
                          onClick={() => setProductsOpen(false)}
                          onFocus={() => setHoverCat(cat.slug)}
                        >
                          {cat.name}
                          <span aria-hidden="true">›</span>
                        </Link>
                      </li>
                    ))}
                    <li
                      className={`products-plus ${hoverCat === "plus" ? "is-hover" : ""}`}
                      onMouseEnter={() => setHoverCat("plus")}
                    >
                      <Link
                        to="/products?plus=1"
                        onClick={() => setProductsOpen(false)}
                        onFocus={() => setHoverCat("plus")}
                      >
                        Plus Size
                        <span aria-hidden="true">›</span>
                      </Link>
                    </li>
                  </ul>

                  <div className="products-subs">
                    {hoverCat === "plus" ? (
                      <>
                        <p className="products-subs-title">Plus Size</p>
                        <p className="products-subs-note">
                          Comfortable, beautifully cut styles in sizes XL to 5XL.
                        </p>
                        <Link
                          className="products-view-all"
                          to="/products?plus=1"
                          onClick={() => setProductsOpen(false)}
                        >
                          View all Plus Size →
                        </Link>
                      </>
                    ) : (
                      (() => {
                        const cat = CATEGORIES.find((c) => c.slug === hoverCat) || CATEGORIES[0];
                        return (
                          <>
                            <p className="products-subs-title">{cat.name}</p>
                            <ul className={cat.subcategories.length > 7 ? "is-two-col" : ""}>
                              {cat.subcategories.map((sub) => (
                                <li key={sub}>
                                  <Link
                                    to={`/products?category=${cat.slug}&sub=${encodeURIComponent(sub)}`}
                                    onClick={() => setProductsOpen(false)}
                                  >
                                    {sub}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                            <Link
                              className="products-view-all"
                              to={`/products?category=${cat.slug}`}
                              onClick={() => setProductsOpen(false)}
                            >
                              View all {cat.name} →
                            </Link>
                          </>
                        );
                      })()
                    )}
                  </div>
                </div>
              )}
            </li>

            <li>
              <NavLink to="/shop">Shop</NavLink>
            </li>

            <li>
              <NavLink to="/about-us">About Us</NavLink>
            </li>

            <li>
              <NavLink to="/contact-us">Contact Us</NavLink>
            </li>
          </ul>
        </nav>

        {/* Search */}
        <form
          className="search-form"
          onSubmit={submitSearch}
          role="search"
        >
          <button type="submit" aria-label="Search">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="10.5" cy="10.5" r="7.5" />
              <line x1="16" y1="16" x2="22" y2="22" />
            </svg>
          </button>

          <input
            type="search"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search products"
          />
        </form>

        {/* Wishlist, Account and Cart */}
        <nav
          className="icon-nav"
          aria-label="Wishlist, account and cart"
        >
          {/* Wishlist */}
          <Link
            to="/wishlist"
            className="icon-link"
            aria-label={`Wishlist, ${wishlistIds.length} items`}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
            </svg>
            {wishlistIds.length > 0 && (
              <span className="badge">{wishlistIds.length}</span>
            )}
          </Link>

          {/* Account */}
          <Link
            to="/account"
            className="icon-link"
            aria-label="My account"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5.2 19.2C6.2 16.8 8.8 15.6 12 15.6s5.8 1.2 6.8 3.6" />
              <circle cx="12" cy="9.4" r="3.4" />
              <path d="M4 20.5h16" />
              <path d="M5 5.5a9.5 9.5 0 0 1 14 0" />
            </svg>
          </Link>

          {/* Cart */}
          <Link
            to="/cart"
            className="icon-link"
            aria-label={`Cart, ${cartCount} items`}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1.5 3.5h3l2.6 11.5h11.2L20.6 6.6H5.4" />
              <circle cx="9" cy="19.5" r="1.1" />
              <circle cx="17" cy="19.5" r="1.1" />
            </svg>
            {cartCount > 0 && (
              <span className="badge">{cartCount}</span>
            )}
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
            <Link to="/" onClick={closeDrawer}>Home</Link>
          </li>

          <li className="mobile-accordion-item">
            <button
              className="mobile-accordion-trigger"
              aria-expanded={mobileExpanded}
              onClick={() => setMobileExpanded((v) => !v)}
            >
              Products
              <span className={`chevron ${mobileExpanded ? "is-open" : ""}`}>⌄</span>
            </button>

            {mobileExpanded && (
              <div className="mobile-accordion-panel">
                <ul>
                  <li>
                    <Link className="mobile-view-all" to="/products" onClick={closeDrawer}>
                      All Products
                    </Link>
                  </li>

                  {CATEGORIES.map((cat) => (
                    <li key={cat.slug} className="mobile-sub-accordion">
                      <button
                        className="mobile-sub-trigger"
                        aria-expanded={mobileCat === cat.slug}
                        onClick={() =>
                          setMobileCat((c) => (c === cat.slug ? null : cat.slug))
                        }
                      >
                        {cat.name}
                        <span className={`chevron ${mobileCat === cat.slug ? "is-open" : ""}`}>⌄</span>
                      </button>

                      {mobileCat === cat.slug && (
                        <div className="mobile-sub-panel">
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

                  <li>
                    <Link className="mobile-plus-link" to="/products?plus=1" onClick={closeDrawer}>
                      Plus Size
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </li>

          <li>
            <Link to="/shop" onClick={closeDrawer}>Shop</Link>
          </li>

          <li>
            <Link to="/about-us" onClick={closeDrawer}>About Us</Link>
          </li>

          <li>
            <Link to="/contact-us" onClick={closeDrawer}>Contact Us</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}