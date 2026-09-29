import React from "react";
import { Link } from "react-router-dom";
import { CATEGORIES } from "../data/categories.js";
import "./Footer.css";

/* Simple inline icons. No extra icon library required. */

function ShieldIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="footer-feature-icon"
    >
      <path d="M12 3 5 6v5c0 4.6 2.9 8.4 7 10 4.1-1.6 7-5.4 7-10V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function ExchangeIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="footer-feature-icon"
    >
      <path d="M20 7h-4V3" />
      <path d="M4 17h4v4" />
      <path d="M18.5 7A7 7 0 0 0 6 5.5L4 7" />
      <path d="M5.5 17A7 7 0 0 0 18 18.5l2-1.5" />
    </svg>
  );
}

function TruckIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="footer-feature-icon"
    >
      <path d="M3 6h11v11H3z" />
      <path d="M14 10h4l3 3v4h-7z" />
      <circle cx="7" cy="19" r="2" />
      <circle cx="18" cy="19" r="2" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="footer-contact-icon"
    >
      <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="footer-contact-icon"
    >
      <rect x="3" y="5" width="18" height="14" rx="1" />
      <path d="m4 7 8 6 8-6" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="footer-contact-icon"
    >
      <path d="M6.5 3.5 9 3l2 5-2.5 1.5a15 15 0 0 0 6 6L16 13l5 2 .5 2.5a3 3 0 0 1-3 3C10.5 20.5 3.5 13.5 3.5 5.5a3 3 0 0 1 3-2Z" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="footer-contact-icon"
    >
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c.5-3.5 3-5.5 7-5.5s6.5 2 7 5.5" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3.5" y="3.5" width="17" height="17" rx="4" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M14 21v-8h2.8l.4-3H14V8.1c0-.9.3-1.6 1.7-1.6h1.8V3.8c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3V10H8v3h2.8v8H14Z" />
    </svg>
  );
}

function PinterestIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3a9 9 0 0 0-3.3 17.4c-.1-1.5 0-3.3.4-4.8l1.1-4.6s-.3-.7-.3-1.7c0-1.6.9-2.8 2.1-2.8 1 0 1.5.7 1.5 1.6 0 1-.6 2.4-.9 3.7-.3 1.1.6 2 1.7 2 2.1 0 3.7-2.2 3.7-5.3 0-2.8-2-4.8-5-4.8-3.4 0-5.4 2.6-5.4 5.2 0 1 .4 2.1.9 2.7.1.1.1.2.1.4l-.3 1.1c-.1.4-.4.5-.7.3-1.8-.8-2.9-3.1-2.9-5 0-4.1 3-7.9 8.7-7.9 4.6 0 8.1 3.3 8.1 7.2 0 4.3-2.7 7.8-6.4 7.8-1.2 0-2.3-.6-2.7-1.3l-.7 2.8c-.3 1.1-1 2.5-1.5 3.3A9 9 0 1 0 12 3Z" />
    </svg>
  );
}

function YoutubeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M21 7.2a2.8 2.8 0 0 0-2-2C17.2 4.7 12 4.7 12 4.7s-5.2 0-7 .5a2.8 2.8 0 0 0-2 2A29 29 0 0 0 2.5 12 29 29 0 0 0 3 16.8a2.8 2.8 0 0 0 2 2c1.8.5 7 .5 7 .5s5.2 0 7-.5a2.8 2.8 0 0 0 2-2 29 29 0 0 0 .5-4.8 29 29 0 0 0-.5-4.8Z" />
      <path d="m10 9 5 3-5 3V9Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div className="container footer-grid">
          {/* Brand section */}
          <div className="footer-col footer-brand">
            <div className="footer-brand-head">
              <img
                src="/logo-small.jpeg"
                alt="Kalamandir Shivam logo"
                className="footer-logo"
              />

              <span className="brand-name">Kalamandir Shivam</span>
            </div>

            <div className="footer-tagline">
              ETHNIC WEAR <span>•</span> KURTIS <span>•</span> SAREES{" "}
              <span>•</span> CO-ORDS
            </div>

            <p className="footer-description">
              Ethnic wear made with intent — kurtis, sarees and co-ords rooted
              in Indian craft, cut for how you actually get dressed.
            </p>

            <div className="footer-features">
              <div className="footer-feature">
                <ShieldIcon />
                <span>
                  Secure
                  <br />
                  Checkout
                </span>
              </div>

              <div className="footer-feature-divider"></div>

              <div className="footer-feature">
                <ExchangeIcon />
                <span>
                  7-Day
                  <br />
                  Exchange
                </span>
              </div>

              <div className="footer-feature-divider"></div>

              <div className="footer-feature">
                <TruckIcon />
                <span>
                  Ships
                  <br />
                  Pan-India
                </span>
              </div>
            </div>
          </div>

          {/* Shop */}
          <div className="footer-col footer-shop-col">
            <h4>Shop</h4>
            <div className="footer-heading-line"></div>

            <ul>
              {CATEGORIES.slice(0, 6).map((category) => (
                <li key={category.slug}>
                  <Link to={`/products?category=${category.slug}`}>
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div className="footer-col footer-help-col">
            <h4>Help</h4>
            <div className="footer-heading-line"></div>

            <ul>
              <li>
                <Link to="/contact-us">Contact &amp; Grievance</Link>
              </li>
              <li>
                <Link to="/shipping-policy">Shipping Policy</Link>
              </li>
              <li>
                <Link to="/return-refund-policy">
                  Return &amp; Refund Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-and-conditions">
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/about-us">About Us</Link>
              </li>
            </ul>
          </div>

          {/* Reach us */}
          <div className="footer-col footer-reach-col">
            <h4>Reach us</h4>
            <div className="footer-heading-line"></div>

            <div className="footer-contact-block">
              <div className="footer-contact-row footer-address-row">
                <LocationIcon />

                <address>
                  <strong>Kalamandir Shivam Retail Pvt. Ltd.</strong>
                  <br />
                  14 Bapu Bazar Road, Johari Bazaar,
                  <br />
                  Jaipur, Rajasthan 302003, India
                </address>
              </div>

              <div className="footer-contact-row">
                <MailIcon />
                <a href="mailto:care@kalamandir.example">
                  care@kalamandir.example
                </a>
              </div>

              <div className="footer-contact-row">
                <PhoneIcon />
                <a href="tel:+911414002020">+91 141 400 2020</a>
              </div>
            </div>

            <div className="footer-grievance">
              <div className="footer-contact-row">
                <UserIcon />

                <div>
                  <span className="grievance-label">
                    Grievance Officer: Ms. Aparna Rathi
                  </span>
                  <a href="mailto:grievance@kalamandir.example">
                    grievance@kalamandir.example
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p className="footer-copyright">
            © {new Date().getFullYear()} Kalamandir Shivam Retail Pvt. Ltd. All rights
            reserved.
          </p>

          <div className="footer-bottom-right">
            <nav className="footer-bottom-links" aria-label="Footer legal links">
              <Link to="/privacy-policy">Privacy</Link>
              <span>|</span>
              <Link to="/terms-and-conditions">Terms</Link>
              <span>|</span>
              <Link to="/contact-us">Contact</Link>
            </nav>

            <div className="footer-socials">
              <a href="#" aria-label="Instagram">
                <InstagramIcon />
              </a>

              <a href="#" aria-label="Facebook">
                <FacebookIcon />
              </a>

              <a href="#" aria-label="Pinterest">
                <PinterestIcon />
              </a>

              <a href="#" aria-label="YouTube">
                <YoutubeIcon />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}