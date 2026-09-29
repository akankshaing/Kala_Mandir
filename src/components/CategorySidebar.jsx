import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CATEGORIES } from "../data/categories.js";
import "./CategorySidebar.css";

// Left-hand category tree: every category with its sub-categories.
// One category is expanded at a time so the list stays short and tidy.
export default function CategorySidebar({
  activeCategory,
  activeSub,
  plusActive = false,
  onNavigate
}) {
  const href = (cat, sub) => {
    const q = new URLSearchParams();
    if (plusActive) q.set("plus", "1");
    if (cat) q.set("category", cat);
    if (sub) q.set("sub", sub);
    const str = q.toString();
    return str ? `/products?${str}` : "/products";
  };

  const [open, setOpen] = useState(activeCategory || null);

  useEffect(() => {
    if (activeCategory) setOpen(activeCategory);
  }, [activeCategory]);

  return (
    <nav className="cat-sidebar" aria-label="Browse categories">
      <h3>Browse</h3>

      <ul className="cat-tree">
        <li>
          <Link
            to="/products"
            onClick={onNavigate}
            className={`cat-all ${!activeCategory && !plusActive ? "is-active" : ""}`}
          >
            All Products
          </Link>
        </li>
        <li>
          <Link
            to="/products?plus=1"
            onClick={onNavigate}
            className={`cat-all ${plusActive && !activeCategory ? "is-active" : ""}`}
          >
            Plus Size
          </Link>
        </li>

        {CATEGORIES.map((cat) => {
          const isOpen = open === cat.slug;
          return (
            <li key={cat.slug}>
              <div className="cat-row">
                <Link
                  to={href(cat.slug)}
                  onClick={onNavigate}
                  className={activeCategory === cat.slug && !activeSub ? "is-active" : ""}
                >
                  {cat.name}
                </Link>
                <button
                  type="button"
                  className="cat-toggle"
                  aria-expanded={isOpen}
                  aria-label={`${isOpen ? "Collapse" : "Expand"} ${cat.name}`}
                  onClick={() => setOpen(isOpen ? null : cat.slug)}
                >
                  {isOpen ? "−" : "+"}
                </button>
              </div>

              {isOpen && (
                <ul className="sub-list">
                  {cat.subcategories.map((sub) => (
                    <li key={sub}>
                      <Link
                        to={href(cat.slug, sub)}
                        onClick={onNavigate}
                        className={activeCategory === cat.slug && activeSub === sub ? "is-active" : ""}
                      >
                        {sub}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
