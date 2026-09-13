import React from "react";
import { Link } from "react-router-dom";
import { CATEGORIES } from "../data/categories.js";
import { useProducts } from "../context/ProductContext.jsx";
import ProductCard from "../components/ProductCard.jsx";
import "./Home.css";

const CATEGORY_IMAGES = {
  kurtis: "/categories/kurtis.png",
  "unstitched-fabric": "/categories/unstitched-fabric.png",
  "indo-western": "/categories/indo-western.png",
  sarees: "/categories/sarees.png",
  "co-ord-set": "/categories/co-ord-set.jpg",
  bottoms: "/categories/bottoms.png",
  "festive-specials": "/categories/festive-specials.png",
};

export default function Home() {
  const { products } = useProducts();
  const bestSellers = products.filter((p) => p.bestSeller).slice(0, 8);

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-media">
          <img className="hero-media-desktop" src="/hero.png" alt="" />
          <img className="hero-media-mobile" src="/hero-mobile.png" alt="" />
        </div>
        <div className="hero-copy">
          <p className="eyebrow"></p>
          <h1>Timeless style,<br />thoughtfully chosen.</h1>
          <p>
            Discover kurtis, sarees and co-ord sets that bring together the beauty of Indian craftsmanship and the ease of everyday dressing. Pieces made to feel special, whether it’s a regular day or a celebration..
          </p>
          <Link to="/products" className="btn">Shop the collection</Link>
        </div>
      </section>

      <section className="shop-by-category">
        <div className="container">
          <h2>Shop by category</h2>
          <div className="category-grid">
            {CATEGORIES.map((cat, i) => (
              <Link key={cat.slug} to={`/products?category=${cat.slug}`} className="category-tile">
                <img src={CATEGORY_IMAGES[cat.slug]} alt={cat.name} />
                <span>{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="best-seller-video">
        <div className="container video-grid">
          <div className="video-copy">
            <p className="eyebrow">Best sellers, in motion</p>
            <h2>What everyone's rebuying</h2>
            <p>
              A quick look at how our best-selling silhouettes actually move and
              drape, styled the way our customers wear them.
            </p>
            <Link to="/products?sort=best-selling" className="btn-outline btn">Shop best sellers</Link>
          </div>
          <video
            className="video-frame"
            src="/vdo.mp4"
            poster="https://picsum.photos/seed/kalamandir-video/900/1100"
            autoPlay muted loop playsInline
            aria-label="A short video of best-selling Kalamandir Shivam pieces"
          />
        </div>
      </section>

      <section className="best-sellers">
        <div className="container">
          <div className="section-head">
            <h2>Best sellers</h2>
            <Link to="/products?sort=best-selling">View all →</Link>
          </div>
          <div className="product-grid">
            {bestSellers.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      <section className="our-store">
        <div className="container store-grid">
          <img src="https://picsum.photos/seed/kalamandir-store/900/650" alt="Kalamandir Shivam flagship store interior" />
          <div className="store-copy">
            <p className="eyebrow">Visit us</p>
            <h2>Our store</h2>
            <p>
              Step into the flagship on Bapu Bazar Road for the full fabric library,
              in-store tailoring and styling help — most of what's online started here.
            </p>
            <address>
              14 Bapu Bazar Road, Johari Bazaar<br />
              Jaipur, Rajasthan 302003<br />
              Open daily, 10:30am – 8:30pm
            </address>
            <Link to="/contact-us" className="btn-ghost btn">Get directions</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
