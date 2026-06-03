# Images Guide

All image paths are documented in `src/content/images.json`. This guide explains how to replace each image.

---

## Logos (most important)

Three logo variants are used. Replace the files in `public/`:

| File | Used on | Format |
|---|---|---|
| `public/logo-light.png` | Header (dark background), Footer | White logo — PNG with transparent bg |
| `public/logo-dark.png` | Login page, Register page | Black logo — PNG with transparent bg |
| `public/logo-cream.png` | Available as alternative | Brown logo — PNG |

**Recommended size:** 400×400px minimum (square). The site displays them at `h-12` to `h-20` (48–80px height).

Steps:
1. Export your logo as PNG with transparent background
2. Drop the file into `public/` and name it exactly `logo-light.png` / `logo-dark.png`
3. Rebuild — the logo updates everywhere automatically

---

## Product images

Products currently show **CSS color blocks** as placeholders. To add real photos:

### Step 1 — Prepare your images
- Format: PNG or WebP
- Size: 800×800px, square, white or transparent background
- Naming: `p001-hydra-boost-serum.png`, `p002-radiance-moisturizer.png`, etc.

### Step 2 — Place files
Drop files into: `public/images/products/`

### Step 3 — Update the product data
In `src/data/products.ts`, find the product and set `imageUrl`:
```ts
{
  id: 'p001',
  imageUrl: '/images/products/p001-hydra-boost-serum.png',  // ← add this
  imageColor: '#D9A9B1',  // keep as fallback color
  ...
}
```

### Step 4 — Update ProductCard and ProductDetail
In `src/components/ui/ProductCard.tsx` and `src/pages/ProductDetail.tsx`, the image is currently a CSS block. Replace with:
```tsx
{product.imageUrl ? (
  <img src={product.imageUrl} alt={product.name} className="w-full h-full object-contain" />
) : (
  <div className="w-full h-full" style={{ backgroundColor: product.imageColor }} />
)}
```

---

## Open Graph image (social sharing)

When the site is shared on WhatsApp, LinkedIn, etc., this image appears.

1. Create a 1200×630px image (landscape) with the SYN+ZYN brand
2. Name it `og-image.png`
3. Place it in `public/`

The `<meta property="og:image">` in `index.html` already points to `/og-image.png`.

---

## Hero / lifestyle images

Currently the hero uses CSS-generated product mockups. To replace with real photography:

**Home hero** (`src/pages/Home.tsx`):
1. Place image at `public/images/hero/home-banner.jpg`
2. In the hero section replace the visual with:
```tsx
<img src="/images/hero/home-banner.jpg" alt="SYN+ZYN products" className="w-full h-full object-cover" />
```

**About hero** (`src/pages/About.tsx`):
Same process with `public/images/hero/about-hero.jpg`

---

## Favicon

Replace `public/favicon.svg` with your SVG favicon.

For iOS (Apple touch icon), create a 180×180px PNG and save as `public/apple-touch-icon.png`. The `index.html` already references it.

---

## Summary checklist for a full image refresh

- [ ] `public/logo-light.png` — new logo (white on transparent)
- [ ] `public/logo-dark.png` — new logo (dark on transparent)
- [ ] `public/og-image.png` — 1200×630px social sharing image
- [ ] `public/favicon.svg` — updated favicon
- [ ] `public/apple-touch-icon.png` — 180×180px iOS icon
- [ ] `public/images/products/p001-*.png` through `p014-*.png` — product photos
- [ ] `public/images/hero/home-banner.jpg` — home hero image
