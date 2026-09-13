import React from "react";
import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext.jsx";
import { useProducts } from "../context/ProductContext.jsx";
import ProductCard from "../components/ProductCard.jsx";

export default function Wishlist() {
  const { ids } = useWishlist();
  const { products } = useProducts();
  const items = products.filter((p) => ids.includes(p.id));

  return (
    <div className="container listing-page">
      <h1 style={{ fontSize: 32, marginBottom: 24 }}>Your wishlist</h1>
      {items.length === 0 ? (
        <div className="empty-state">
          <p>Save pieces you love here while you browse.</p>
          <Link className="btn" to="/products">Browse products</Link>
        </div>
      ) : (
        <div className="product-grid" style={{ gridTemplateColumns: "repeat(4, 1fr)" }}>
          {items.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}
