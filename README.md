# Kalamandir — Front-end E-commerce (React)

A front-end-only React storefront for Kalamandir, built with Vite. No backend is
required to run or deploy it — product data, cart, wishlist, account and orders
are all kept in the browser (`localStorage` / `sessionStorage`).

## Run locally

```bash
npm install
npm run dev
```

Open the printed local URL (usually http://localhost:5173).

## Build for production

```bash
npm run build
```

This outputs a static site into `dist/`. `npm run preview` serves that build
locally so you can sanity-check it before deploying.

## Deploying

The app uses `HashRouter` and a relative Vite `base`, specifically so the
build works unmodified on **any** static host — no server rewrite rules are
needed for client-side routing to keep working after a refresh or direct link.

- **Netlify / Vercel / GitHub Pages / any static host**: upload the contents
  of `dist/` (or point the host at this repo with build command
  `npm run build` and publish directory `dist`).
- No environment variables are required.

## Admin panel

Visit `/#/admin/login`. Demo passcode: `kalamandir-admin` (see
`src/context/AdminAuthContext.jsx`). This is a front-end-only demo gate, not
real authentication — replace it before giving anyone else access.

## What's real vs. mocked

- Real: routing, cart/checkout math (subtotal, GST, delivery, savings),
  filtering/sorting, wishlist, admin CRUD, delivery-status tracking.
- Mocked (front-end only, by design): product catalogue, payments (no gateway
  is called), customer login (no password), image assets (Picsum placeholders)
  and the homepage video (a public CC0 sample from MDN).

See in-app **Admin → Build log** (`/#/admin/decisions`) for the full list of
decisions made and what's intentionally left for backend integration.

## Product photo uploads

Admin → Products now accepts real PNG/JPG/WebP file uploads (a default
gallery, plus one gallery per colour). Since there's no backend, uploaded
photos are stored as base64 in the browser's `localStorage`, which has a
practical ceiling around 5–10MB per browser. That's plenty to demo the
feature, but a real deployment needs an image upload endpoint (see
`POST /uploads` in `KALAMANDIR_SPEC.md`) that returns a hosted URL instead.
