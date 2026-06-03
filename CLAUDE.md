# SYN+ZYN B2B Portal — Claude Code Context

## What this project is
A B2B e-commerce portal for SYN+ZYN beauty brand. React 18 + TypeScript + Vite + Tailwind CSS 3. No backend — all data is mock data. Demo login: code `DEMO-2024-003` / password `demo123`.

## Dev server
```bash
export PATH="$HOME/.nvm/versions/node/v24.15.0/bin:$PATH"
npm run dev -- --host
```
Runs on http://localhost:5173 (or 5174 if port taken).

## Key architecture decisions
- **Auth**: Context-only, no real auth. `AuthContext` holds logged-in client. `getClientByCode()` in `src/data/clients.ts` validates credentials.
- **B2B visibility**: Guest sees catalog without prices. Logged-in + in-contract = full B2B. Logged-in + not in contract = "request quote" flow.
- **Cart min**: 20 000 MAD HT enforced in `CartDrawer` and `Checkout`.
- **Payment types**: Clients with `paymentTerms.paymentDays` = deferred (30/60/90 days). Without = immediate (must send proof before order processed).
- **Bon de commande**: Shared component at `src/components/ui/BonDeCommande.tsx`. Uses `window.print()` with `@media print` CSS to hide everything except the document.

## Where text content lives
ALL user-facing text is documented in `src/content/*.json`. Components still have some inline text that hasn't been migrated — check the JSON files first, then the component if not found there.

## Where to add a new product
Edit `src/data/products.ts` — add a `Product` object. To make it visible to a client, also add a `ContractProduct` entry in `src/data/clients.ts` under the relevant client's `contractProducts` array.

## SEO
`useSEO` hook at `src/hooks/useSEO.ts`. Call it at the top of every public page component. Dashboard pages should have `noindex: true`.

## Tailwind
Custom brand colors in `tailwind.config.js`. Use `bg-brand-dark`, `text-brand-taupe`, etc. Never use raw hex in Tailwind classes — always use the token.

## Do NOT
- Commit `.env` files or API keys
- Use `text-[Xpx]` sizes — use `text-xs`, `text-sm`, `text-base` etc.
- Call hooks after conditional returns (Rules of Hooks)
