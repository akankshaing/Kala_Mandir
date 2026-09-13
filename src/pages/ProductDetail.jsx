import React, { useMemo, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useProducts } from "../context/ProductContext.jsx";
import { getSimilarProducts } from "../data/products.js";
import { useCart } from "../context/CartContext.jsx";
import { useWishlist } from "../context/WishlistContext.jsx";
import { useColors } from "../context/ColorContext.jsx";
import { useReviews } from "../context/ReviewContext.jsx";
import { formatINR, getMockReviews, formatDate } from "../utils/format.js";
import ProductCard from "../components/ProductCard.jsx";
import StarRating from "../components/StarRating.jsx";
import "./ProductDetail.css";

const colorVariantImages = (product, color) =>
  product.images.map((_, i) => `https://picsum.photos/seed/${product.id}-${color}-${i}/800/1000`);

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products } = useProducts();
  const product = products.find((p) => p.id === id);

  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { getHex } = useColors();
  const { addReview, getReviews } = useReviews();

  const [activeImage, setActiveImage] = useState(0);
  const [size, setSize] = useState(() => (product && product.sizes.length === 1 ? product.sizes[0] : null));
  const [color, setColor] = useState(null);
  const [qty, setQty] = useState(1);
  const [notice, setNotice] = useState("");
  const [reviewForm, setReviewForm] = useState({ name: "", rating: 5, body: "", image: null });
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const similar = useMemo(() => (product ? getSimilarProducts(product, 4) : []), [product]);
  const mockReviews = useMemo(
    () => (product ? getMockReviews(product.id, product.rating, product.reviewCount) : []),
    [product]
  );
  const userReviews = product ? getReviews(product.id) : [];
  const allReviews = [...userReviews, ...mockReviews];

  if (!product) {
    return (
      <div className="container" style={{ padding: "80px 24px", textAlign: "center" }}>
        <h2>Product not found</h2>
        <p>This item may have been removed from the catalogue.</p>
        <Link className="btn" to="/products">Browse products</Link>
      </div>
    );
  }

  const displayImages =
    color && product.colorImages && product.colorImages[color]?.length
      ? product.colorImages[color]
      : color
      ? colorVariantImages(product, color)
      : product.images;
  const isFreeSize = product.sizes.length === 1;

  const requireOptions = () => {
    if (!isFreeSize && !size) { setNotice("Please select a size."); return false; }
    if (!color) { setNotice("Please select a colour."); return false; }
    return true;
  };

  const handleAddToCart = () => {
    if (!requireOptions()) return;
    addToCart(product, { size: size || product.sizes[0], color, qty });
    setNotice("Added to cart.");
  };

  const handleBuyNow = () => {
    if (!requireOptions()) return;
    addToCart(product, { size: size || product.sizes[0], color, qty });
    navigate("/cart");
  };

  const selectColor = (c) => { setColor(c); setActiveImage(0); };

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setReviewForm((f) => ({ ...f, image: reader.result }));
    reader.readAsDataURL(file);
  };

  const submitReview = (e) => {
    e.preventDefault();
    if (!reviewForm.name.trim() || !reviewForm.body.trim()) return;
    addReview(product.id, reviewForm);
    setReviewForm({ name: "", rating: 5, body: "", image: null });
    setReviewSubmitted(true);
  };

  return (
    <div className="container product-detail">
      <nav className="crumb" aria-label="Breadcrumb">
        <Link to="/">Home</Link> / <Link to={`/products?category=${product.category}`}>{product.categoryName}</Link> / <span>{product.name}</span>
      </nav>

      <div className="pd-grid">
        <div className="pd-gallery">
          <div className="pd-thumbs">
            {displayImages.map((img, i) => (
              <button
                key={img}
                className={`pd-thumb ${i === activeImage ? "is-active" : ""}`}
                onClick={() => setActiveImage(i)}
                aria-label={`Show image ${i + 1}`}
              >
                <img src={img} alt="" />
              </button>
            ))}
          </div>
          <div className="pd-main-image">
            <img src={displayImages[activeImage]} alt={product.name} />
          </div>
        </div>

        <div className="pd-info">
          <p className="eyebrow">{product.categoryName} · {product.subcategory}</p>
          <h1>{product.name}</h1>
          <div className="pd-rating">
            <StarRating value={product.rating} />
            <span>{product.rating} ({product.reviewCount + userReviews.length} reviews)</span>
          </div>

          <div className="pd-price">
            <span className="price-now">{formatINR(product.price)}</span>
            {product.discountPct > 0 && (
              <>
                <span className="price-mrp">{formatINR(product.mrp)}</span>
                <span className="price-off">{product.discountPct}% off</span>
              </>
            )}
          </div>
          <p className="pd-tax-note">Inclusive of all taxes. Delivery charges shown at checkout.</p>

          {isFreeSize ? (
            <div className="pd-option-group">
              <h4>Size</h4>
              <span className="chip is-active free-size-chip">Free Size</span>
            </div>
          ) : (
            <div className="pd-option-group">
              <h4>Size</h4>
              <div className="chip-row">
                {product.sizes.map((s) => (
                  <button key={s} className={`chip ${size === s ? "is-active" : ""}`} onClick={() => setSize(s)}>{s}</button>
                ))}
              </div>
            </div>
          )}

          <div className="pd-option-group">
            <h4>Colour{color ? <span className="pd-color-selected"> — {color}</span> : null}</h4>
            <div className="chip-row">
              {product.colors.map((c) => (
                <button key={c} className={`chip chip-swatch ${color === c ? "is-active" : ""}`} onClick={() => selectColor(c)}>
                  <span className="swatch-dot" style={{ background: getHex(c) }} />
                  {c}
                </button>
              ))}
            </div>
            <p className="pd-color-hint">Selecting a colour updates the photos to that variant.</p>
          </div>

          <div className="pd-option-group">
            <h4>Quantity</h4>
            <div className="qty-control">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">–</button>
              <span>{qty}</span>
              <button onClick={() => setQty((q) => Math.min(product.stock, q + 1))} aria-label="Increase quantity">+</button>
            </div>
          </div>

          {notice && <p className="pd-notice" role="status">{notice}</p>}

          <div className="pd-actions">
            <button className="btn btn-block" onClick={handleAddToCart}>Add to cart</button>
            <button className="btn-outline btn btn-block" onClick={handleBuyNow}>Buy now</button>
            <button
              className={`btn-ghost btn btn-block wish-btn ${isWishlisted(product.id) ? "is-active" : ""}`}
              onClick={() => toggleWishlist(product.id)}
            >
              {isWishlisted(product.id) ? "Saved to wishlist" : "Add to wishlist"}
            </button>
          </div>

          <div className="pd-description">
            <h4>Description</h4>
            <p>{product.description}</p>
            <ul>
              <li><strong>Fabric:</strong> {product.fabric}</li>
              <li><strong>Country of origin:</strong> {product.countryOfOrigin}</li>
              <li><strong>Care:</strong> {product.careInstructions}</li>
              <li><strong>SKU:</strong> {product.id}</li>
            </ul>
          </div>

          <details className="pd-policy">
            <summary>Delivery, returns and exchange</summary>
            <p>
              Standard delivery in 4–7 business days. Free above ₹1,499, otherwise ₹79.
              Eligible for return or exchange within 7 days of delivery if unused, unwashed
              and with original tags — see our <Link to="/return-refund-policy">Return &amp; Refund Policy</Link>.
            </p>
          </details>
        </div>
      </div>

      {similar.length > 0 && (
        <section className="pd-similar">
          <h2>You may also like</h2>
          <div className="product-grid">
            {similar.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}

      <section className="pd-reviews">
        <h2>Customer reviews</h2>
        <div className="pd-reviews-summary">
          <span className="pd-reviews-score">{product.rating}</span>
          <div>
            <StarRating value={product.rating} size={16} />
            <p>{product.reviewCount + userReviews.length} verified ratings</p>
          </div>
        </div>

        <details className="pd-write-review">
          <summary>Write a review</summary>
          {reviewSubmitted ? (
            <p className="pd-review-thanks">Thanks — your review has been posted below.</p>
          ) : (
            <form className="review-form" onSubmit={submitReview}>
              <div className="review-form-row">
                <input
                  placeholder="Your name"
                  value={reviewForm.name}
                  onChange={(e) => setReviewForm((f) => ({ ...f, name: e.target.value }))}
                  required
                />
                <select
                  value={reviewForm.rating}
                  onChange={(e) => setReviewForm((f) => ({ ...f, rating: Number(e.target.value) }))}
                  aria-label="Rating"
                >
                  {[5, 4, 3, 2, 1].map((n) => <option key={n} value={n}>{n} star{n > 1 ? "s" : ""}</option>)}
                </select>
              </div>
              <textarea
                placeholder="How did it fit, feel and look?"
                rows={3}
                value={reviewForm.body}
                onChange={(e) => setReviewForm((f) => ({ ...f, body: e.target.value }))}
                required
              />
              <div className="review-form-photo">
                <label className="btn-ghost btn review-photo-btn">
                  {reviewForm.image ? "Change photo" : "Add a photo"}
                  <input type="file" accept="image/*" onChange={handlePhotoChange} hidden />
                </label>
                {reviewForm.image && <img src={reviewForm.image} alt="Review upload preview" className="review-photo-preview" />}
              </div>
              <button className="btn" type="submit">Post review</button>
            </form>
          )}
        </details>

        <div className="pd-reviews-list">
          {allReviews.map((r) => (
            <div className="review-card" key={r.id}>
              <div className="review-head">
                <strong>{r.name}</strong>
                <StarRating value={r.rating} size={12} />
              </div>
              <p>{r.body}</p>
              {r.image && <img src={r.image} alt="Customer upload" className="review-card-photo" />}
              <span className="review-date">{formatDate(r.date)}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
