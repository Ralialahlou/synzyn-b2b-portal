# Content Editing Guide

All user-facing text is stored in `src/content/*.json`. You never need to touch React component files to change copy.

---

## Site-wide settings → `src/content/site.json`

### Change contact details
```json
"contact": {
  "email": "commercial@synzyn.ma",   ← change email here
  "phone": "+212 522 100 200",        ← change phone here
  "whatsapp": "+212 661 100 200",
  "hours": "Lundi – Vendredi · 9h00 – 18h00"
}
```

### Change bank account (RIB / IBAN)
```json
"banking": {
  "accountHolder": "KAK SYNERGY SA",
  "bank": "Attijariwafa Bank",
  "rib": "007 780 0002347891004532 14",   ← RIB shown in checkout
  "iban": "MA64 007 7800 0023478 9100 4532",
  "swift": "BCMAMAMC",
  "paymentEmail": "commercial@synzyn.ma"
}
```

### Change B2B rules
```json
"b2b": {
  "minOrderValue": 20000,       ← minimum order in MAD HT
  "deliveryDaysMin": 5,         ← delivery range
  "deliveryDaysMax": 7,
  "vatRate": 0.20               ← VAT rate (0.20 = 20%)
}
```

---

## Header navigation → `src/content/navigation.json`

### Change the top announcement bar
```json
"topBar": "BIENVENUE À NOS CLIENTS B2B — LIVRAISON 5-7 JOURS OUVRÉS"
```

### Add or remove nav links
```json
"mainNav": [
  { "label": "CATALOGUE", "href": "/catalogue" },
  { "label": "FORMATION", "href": "/training" },
  { "label": "FAQ",        "href": "/faq" },
  { "label": "NOUS CONTACTER", "href": "/contact" }
]
```

---

## Home page → `src/content/home.json`

- `hero.guest.*` — text shown to non-logged-in visitors
- `hero.loggedIn.*` — text shown after login
- `features[]` — the 4 feature strip cards below the hero
- `categories.items[]` — category cards (update `count` when adding products)
- `b2bCta.*` — the "Become a B2B client" dark CTA section
- `brandStory.*` — brand story section at the bottom

---

## FAQ → `src/content/faq.json`

Add a new question to an existing category:
```json
{
  "category": "Commandes & Livraison",
  "questions": [
    {
      "q": "Your new question?",
      "a": "Your answer here."
    }
  ]
}
```

Add a new category by adding a new object to the `categories` array.

---

## Training videos → `src/content/training.json`

Add a video:
```json
{
  "id": "v007",
  "title": "Titre de la formation",
  "category": "Skincare",
  "duration": "25 min",
  "thumbnailColor": "#D9A9B1",
  "level": "Débutant",
  "description": "Description courte.",
  "restricted": false   ← true = logged-in B2B clients only
}
```

---

## Contact page → `src/content/contact.json`

### Update sales rep details
```json
"reps": [
  {
    "name": "Sofia Alaoui",
    "role": "Commercial Manager",
    "zone": "Casablanca — Rabat",
    "email": "s.alaoui@synzyn.ma",
    "phone": "+212 522 100 200",
    "whatsapp": "+212 661 100 200"
  }
]
```

---

## Product catalog → `src/data/products.ts`

Each product is a TypeScript object. Key fields to change:
```ts
{
  id: 'p001',               // unique ID — used in URLs and cart
  name: 'Hydra Boost Serum',
  category: 'skincare',    // skincare | makeup | body-care | hair-care | sun-care | kids
  subCategory: 'Serum',
  description: '...',
  benefits: ['...', '...'],
  activeIngredients: [{ name: '...', concentration: '2%', benefit: '...' }],
  imageColor: '#D9A9B1',   // color used until real image is added
  imageUrl: '',            // set to '/images/products/p001-name.png' when image is ready
  inStock: true,
  isBestSeller: true,      // shows "Meilleures ventes" badge
  isNew: false,            // shows "Nouveau" badge
  isPro: false,            // shows "PRO" badge
}
```

---

## Client contracts & pricing → `src/data/clients.ts`

To update a client's price for a product:
```ts
contractProducts: [
  {
    productId: 'p001',
    price: {
      unit: 85,       // price per unit in MAD HT
      box: 480,       // price per box (boxUnits units)
      carton: 900,    // price per carton (cartonUnits units)
      boxUnits: 6,    // units per box
      cartonUnits: 12 // units per carton
    },
    moq: 6,           // minimum order quantity
    moqUnit: 'unit',  // unit | box | carton
    deliveryLeadTime: '5-7 business days',
    documents: []
  }
]
```

Payment terms (controls checkout behaviour):
```ts
paymentTerms: {
  allowedMethods: ['bank-transfer', 'card'],
  paymentDays: 60,      // omit for immediate payment
  creditLimit: 200000,  // omit if no credit limit
  minOrderValue: 20000
}
```
