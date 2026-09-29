import React from "react";
import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext.jsx";
import { useProducts } from "../context/ProductContext.jsx";
import ProductCard from "../components/ProductCard.jsx";

export default function Wishlist() {
  const { ids } = useWishlist();
  const { products } = useProducts();
  const safeIds = Array.isArray(ids) ? ids : [];
  const items = (products || []).filter((p) => safeIds.includes(p.id));

  if (items.length === 0) {
    return (
      <div className="container empty-page">
        <h1>Your wishlist is empty</h1>
        <p>Save pieces you love here while you browse.</p>
        <Link className="btn" to="/products">Browse products</Link>
      </div>
    );
  }

  return (
    <div className="container listing-page wishlist-page">
      <h1>Your wishlist</h1>
      <div className="product-grid wishlist-grid">
        {items.map((p) => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
}
