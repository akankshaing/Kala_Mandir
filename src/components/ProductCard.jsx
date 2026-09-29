import React from "react";
import { Link } from "react-router-dom";
import { formatINR } from "../utils/format.js";
import { useWishlist } from "../context/WishlistContext.jsx";
import StarRating from "./StarRating.jsx";
import "./ProductCard.css";

export default function ProductCard({ product }) {
  const { isWishlisted, toggleWishlist } = useWishlist();
  const wished = isWishlisted(product.id);

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-card-media">
        <img src={product.images[0]} alt={product.name} loading="lazy" />
        <img src={product.images[1] || product.images[0]} alt="" className="hover-media" loading="lazy" />
        {product.discountPct > 0 && <span className="tag-sale">{product.discountPct}% off</span>}
        <button
          className={`wish-toggle ${wished ? "is-active" : ""}`}
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          onClick={(e) => { e.preventDefault(); toggleWishlist(product.id); }}
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill={wished ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8">
            <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
          </svg>
        </button>
        {product.stock <= 5 && <span className="tag-stock">Only {product.stock} left</span>}
      </Link>
      <div className="product-card-body">
        <p className="product-card-cat">{product.categoryName}</p>
        <Link to={`/product/${product.id}`} className="product-card-name">{product.name}</Link>
        <div className="product-card-rating">
          <StarRating value={product.rating} size={12} />
          <span>({product.reviewCount})</span>
        </div>
        <div className="product-card-price">
          <span className="price-now">{formatINR(product.price)}</span>
          {product.discountPct > 0 && <span className="price-mrp">{formatINR(product.mrp)}</span>}
        </div>
      </div>
    </div>
  );
}
