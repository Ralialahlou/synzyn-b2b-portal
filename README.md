# SYN+ZYN — B2B Portal

Professional B2B e-commerce portal for **SYN+ZYN** beauty brand (Groupe AKSAL / KAK SYNERGY SA).  
Built with **React 18 · TypeScript · Vite · Tailwind CSS 3**.

---

## Quick start

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # Production build → dist/
npm run preview   # Preview production build
```

**Demo login:** Code `DEMO-2024-003` · Password `demo123`

---

## Project structure

```
b2b-portal/
├── public/                        Static assets (served as-is)
│   ├── logo-dark.png              Logo black on white  → login/register pages
│   ├── logo-light.png             Logo white on dark   → header / footer
│   ├── logo-cream.png             Logo brown on cream  → alternative
│   ├── robots.txt                 SEO crawler rules
│   ├── sitemap.xml                SEO sitemap (14 products + all pages)
│   └── images/
│       ├── products/              Drop product images here (p001-*.png …)
│       └── hero/                  Hero / lifestyle photography
│
├── src/
│   ├── content/                   ✏️  EDIT TEXT — all in JSON
│   │   ├── site.json              Brand name, contact, banking (RIB), B2B rules
│   │   ├── navigation.json        Header nav, top bar announcement
│   │   ├── home.json              All home page copy + CTA labels
│   │   ├── faq.json               All FAQ questions & answers
│   │   ├── training.json          Training videos list + webinars
│   │   ├── contact.json           Contact info + sales rep details
│   │   └── images.json            Image paths manifest + replacement guide
│   │
│   ├── data/                      🗄️  Product & client data
│   │   ├── products.ts            Full product catalog (14 products)
│   │   ├── clients.ts             B2B clients, contracts, pricing, MOQ
│   │   └── orders.ts              Order & invoice mock history
│   │
│   ├── components/
│   │   ├── layout/Header.tsx      Sticky nav + search + cart badge
│   │   ├── layout/Footer.tsx      Footer with About column
│   │   └── ui/
│   │       ├── ProductCard.tsx    Card (guest vs B2B view)
│   │       ├── CartDrawer.tsx     Slide-out cart
│   │       ├── BonDeCommande.tsx  Printable purchase order (PDF)
│   │       └── ScrollToTop.tsx    Auto-scroll on route change
│   │
│   ├── context/
│   │   ├── AuthContext.tsx        B2B login state + contract checks
│   │   └── CartContext.tsx        Cart state + totals
│   │
│   ├── hooks/
│   │   └── useSEO.ts              Dynamic title/meta/OG/schema per page
│   │
│   ├── pages/                     One file per route
│   │   ├── Home, About, Search, NotFound
│   │   ├── ProductListing, ProductDetail
│   │   ├── Checkout, Login, Register
│   │   ├── Training, FAQ, Contact
│   │   └── dashboard/             Protected — requires login
│   │       ├── DashboardHome      Stats + recent orders + quick reorder
│   │       ├── Profile            Account info + logo upload + documents
│   │       ├── Contract           Contracted products + payment terms
│   │       ├── Orders             History + BDC download + reorder
│   │       ├── Invoices           Invoices + payment status + due dates
│   │       ├── Favorites, Downloads, Support
│   │
│   ├── types/index.ts             All TypeScript interfaces
│   └── App.tsx                    Router — add new routes here
│
└── docs/
    ├── CONTENT.md                 How to edit text content
    └── IMAGES.md                  How to replace images
```

---

## Editing content

| To change…                  | Edit this file                             |
|-----------------------------|--------------------------------------------|
| Contact email / phone        | `src/content/site.json` → `contact`        |
| Bank account (RIB/IBAN)      | `src/content/site.json` → `banking`        |
| Minimum order value          | `src/content/site.json` → `b2b`            |
| Header nav links             | `src/content/navigation.json`              |
| Top bar announcement         | `src/content/navigation.json` → `topBar`   |
| Home page copy & CTAs        | `src/content/home.json`                    |
| FAQ questions & answers      | `src/content/faq.json`                     |
| Training videos list         | `src/content/training.json`                |
| Sales rep contacts           | `src/content/contact.json` → `reps`        |
| All image paths              | `src/content/images.json`                  |
| Product catalog              | `src/data/products.ts`                     |
| Client contracts & pricing   | `src/data/clients.ts`                      |

See [`docs/CONTENT.md`](docs/CONTENT.md) and [`docs/IMAGES.md`](docs/IMAGES.md) for full guides.

---

## Brand colors

| Token            | Hex       | Usage                          |
|------------------|-----------|--------------------------------|
| `brand-dark`     | `#3F3132` | Primary dark, header, text     |
| `brand-taupe`    | `#A28B83` | Secondary, muted text          |
| `brand-beige`    | `#D0B9AB` | Borders, warm accent           |
| `brand-rose`     | `#C27279` | CTA accent, badges             |
| `brand-pink`     | `#D9A9B1` | Soft accent                    |
| `brand-lavender` | `#B8ABD0` | Soft accent                    |
| `brand-cream`    | `#FAF8F5` | Page background                |

Font: **Courier New** (brand headings) + **Inter** (UI body)

---

## Tech stack

- React 18 + TypeScript · Vite 6 · Tailwind CSS 3 · React Router 6 · Lucide React
- No backend — all data is mock data in `src/data/`
- SEO: `useSEO` hook, Organization/Product/FAQPage/BreadcrumbList JSON-LD schemas
