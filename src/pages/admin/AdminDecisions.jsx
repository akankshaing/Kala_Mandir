import React from "react";

const DONE = [
  "Set up Vite + React + React Router (HashRouter, so routing works on any static host with zero server config).",
  "Built category/subcategory nav strictly from the client's Google Form data (7 categories, all subcategories).",
  "Built a deterministic mock catalogue (~59 products) covering every subcategory, with multi-image galleries.",
  "Header: logo, search, mega-menu nav, wishlist/account/cart icons with live counts, mobile menu.",
  "Footer: legal name, address, grievance officer contact, policy links — per the Consumer Protection (E-Commerce) Rules, 2020.",
  "Home page: hero, shop-by-category grid, best-seller video section, best sellers grid, our store section.",
  "All-products / category listing: sidebar filters (availability, price, size, colour) + full 9-option sort dropdown.",
  "Product page: scrollable image gallery + thumbnails, size/colour/qty selection, add to cart, buy now, wishlist, description, similar products, reviews.",
  "Cart: per-line select/deselect, select-all/deselect-all, quantity edit, remove, price breakup with GST and delivery shown separately.",
  "Checkout: full address form, Card/UPI/Netbanking/COD payment tabs, consent checkbox that is never pre-ticked (Rule 4(9)).",
  "Order confirmation page with order ID and a complaint tracking (ticket) number.",
  "Customer account: mock sign-in, saved addresses, order history with a 5-stage delivery tracker.",
  "Legal pages: Terms & Conditions, Privacy Policy, Shipping Policy, Return & Refund Policy, Contact & Grievance (with 48-hour/1-month SLA), About Us.",
  "Admin panel: passcode-gated login, dashboard, product CRUD (incl. stock + warehouse location), order list with delivery-status updates.",
  "Persistence via localStorage/sessionStorage for products, cart, wishlist, account and orders (this is a front-end-only build, no backend).",
  "Added the client-provided Kalamandir Shivam logo artwork to the header, footer, favicon and admin login screen.",
  "Fixed a layout bug where pages combining the shared .container class with a narrower page class (sign-in, account, order-success) lost their width constraint and stretched full-bleed.",
  "Cropped the logo down to just its circular emblem (no wordmark) so it renders as a clean circle everywhere instead of a squashed square.",
  "Re-aligned the footer so the brand row sits level with the Shop/Help/Reach us column headings.",
  "Removed the maroon announcement band from the header per client feedback.",
  "Added an explicit Home link to the category nav, and fixed category names so clicking them navigates to that category instead of only toggling the dropdown.",
  "Widened spacing in the header icon row and reordered it to Wishlist, Cart, Account.",
  "Replaced the free-text colour field with a shared, admin-managed colour palette: sellers pick from swatches or add a new name/hex colour, and it appears immediately in the product form and the customer-facing filter.",
  "Removed all code comments from the project per client request.",
  "Rebuilt mobile navigation as a proper half-screen slide-in drawer with tap-to-expand accordions, replacing the old full-screen hover-based menu.",
  "Disabled the mobile browser's default tap-highlight so links no longer flash a stray colour block on touch.",
  "Rebalanced footer spacing: more bottom padding before the divider, a visually separated copyright bar, and a trust line so the brand column isn't as short as the link columns.",
  "Fixed cramped spacing on the mobile cart line items.",
  "Replaced the always-open mobile filter sidebar with a Filters button that opens a bottom-sheet drawer.",
  "Fixed the mobile product gallery: main image on top with thumbnails as a horizontal scroll strip, instead of a cramped vertical rail.",
  "Free Size products now skip the size-selection step entirely — Add to cart works right away.",
  "Selecting a colour swatch now swaps the product photos to that colour variant, instead of just toggling a selection state.",
  "Added a Write a Review form with an optional photo upload, so customer-submitted reviews (with images) now appear alongside the existing ones.",
  "Regenerated the favicon with a transparent circular mask so the browser tab shows a clean circle instead of a square beige tile.",
  "Replaced the admin 'Image URL' text field with real file uploads (PNG/JPG/WebP): a default product gallery plus a dedicated upload per colour, so selecting a colour on the storefront shows the actual photo an admin uploaded for it, not a placeholder."
];

const NEXT = [
  "Wire the admin panel and checkout to a real backend + database before accepting real orders or payments.",
  "Replace the demo admin passcode with real authenticated, role-based admin accounts.",
  "Integrate an actual PCI-DSS compliant payment gateway (Razorpay/Stripe/etc.) instead of the current mock payment form.",
  "Replace placeholder Picsum imagery and the sample video with real product photography and a real best-sellers video.",
  "Have counsel review the Terms, Privacy, Shipping and Return policy copy before going live.",
  "Add server-side order emails/SMS, since this build only shows a confirmation on-screen."
];

export default function AdminDecisions() {
  return (
    <div className="admin-page">
      <h1>Build log</h1>
      <p className="admin-note">
        A running note of what's been built and what's intentionally left for a real
        backend integration, kept here so nothing gets lost between sessions.
      </p>

      <h3 className="log-heading">Done</h3>
      <ul className="log-list">
        {DONE.map((item) => <li key={item}>{item}</li>)}
      </ul>

      <h3 className="log-heading">Next</h3>
      <ul className="log-list log-list-next">
        {NEXT.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </div>
  );
}
