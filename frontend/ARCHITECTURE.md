# Architecture

This document explains how the 101 Bistro frontend is organised and how to wire
it to the backend when it's ready. The guiding principle: **components never
talk to data sources directly — they go through types, hooks, and one service
layer.** Swapping mock data for a real API touches a single folder.

## Folder structure

```
src/
├── app/                      # App Router routes
│   ├── layout.tsx            # fonts, providers, header/footer, metadata
│   ├── page.tsx              # home page (server component)
│   ├── loading.tsx           # root loading skeleton
│   ├── error.tsx             # global error boundary
│   ├── not-found.tsx         # 404
│   └── menu/
│       ├── page.tsx          # menu browsing (reads ?q= & ?category=)
│       ├── loading.tsx       # menu skeleton
│       └── error.tsx         # menu error boundary
│
├── components/
│   ├── ui/                   # shadcn-style primitives (Button, Badge, Modal,
│   │                         #   Sheet, Input, Switch, Tooltip, Skeleton…)
│   ├── brand/                # Logo (CSS-mask, theme-aware), social glyphs
│   ├── common/               # Container, SectionHeading, Reveal, Icon registry
│   ├── layout/               # SiteHeader, SiteFooter, MobileNav
│   ├── menu/                 # all menu/product components (cards, grid,
│   │                         #   filters, search, detail modal, empty state…)
│   ├── sections/             # home page sections
│   └── theme/                # ThemeProvider + ThemeToggle
│
├── hooks/                    # useMenuFilters, useDebouncedValue,
│                             #   useMediaQuery, useScrollSpy, useLockBodyScroll
├── providers/                # AppProviders, ProductModalProvider
├── services/                 # ← THE BACKEND BOUNDARY (menu-service, api-client)
├── data/
│   ├── menu-utils.ts         # pure filter/sort/search/tree selectors
│   └── mock/                 # placeholder categories + product generator
├── types/                    # domain model (Product, Category, filters…)
├── constants/                # site config, badge/sort/filter metadata
├── config/                   # typed env access
└── lib/                      # cn(), price/number formatting
```

## Data flow

```
Server Component (page)
        │  await
        ▼
  services/menu-service.ts ──(env.useMockData?)──┐
        │                                         │
        │ mock branch                  api branch │
        ▼                                         ▼
  data/mock + data/menu-utils            services/api-client (fetch)
        │                                         │
        └──────────────► domain types ◄───────────┘
                              │
                              ▼
                  Client components (props)
                              │
                   hooks/useMenuFilters (client filtering today)
```

Every service function is **async** and returns **domain types**, so the
mock→API switch is invisible to everything upstream.

## The domain model (`src/types/menu.ts`)

Designed up-front for everything the brief asked for:

- **400+ items** — flat `Product[]`, category-scoped queries.
- **Categories & nesting** — `Category.parentId`; tree built in `menu-utils`.
- **Variations & options** — `ProductVariation[]`, `ProductOptionGroup[]`
  (single/multiple, min/max, price deltas) — already wired into the detail modal.
- **Images** — `ProductImage` with `blurDataURL`; graceful gradient placeholder
  until real photography exists.
- **Availability / badges / featured** — first-class fields.
- **Search & filtering** — `MenuFilterState` + `SortKey`.
- **Multilingual (future)** — `LocalizedText` alias + `Locale`. Today it's
  `string`; widen it to `Partial<Record<Locale, string>>` and add a `t()`
  resolver — no component changes.

## Connecting the backend

1. Set `NEXT_PUBLIC_API_BASE_URL` in `.env.local`. `env.useMockData` flips off
   automatically (`src/config/env.ts`).
2. In `src/services/menu-service.ts`, replace each `// TODO(api)` branch with an
   `apiClient<T>(...)` call and map the response into the domain types.
3. Add your CDN host to `images.remotePatterns` in `next.config.ts`.
4. Delete `src/data/mock/` once the API is authoritative.

`src/services/api-client.ts` is the single fetch chokepoint — add auth headers,
retries, and error normalisation there.

## Future integrations (architecture is ready, not implemented)

- **Auth / admin / inventory** — wrap protected calls in `api-client`; gate UI
  with a provider alongside `AppProviders`.
- **Search/Filter API** — `useMenuFilters` filters client-side today; point its
  `results` memo at `getProducts(filters)` to delegate to the server. The
  `MenuFilterState` shape is already the query contract.
- **Ordering** — the detail modal computes line-item totals (variation +
  options × qty). Wire "Add" to a cart store/provider when ordering ships.
- **QR menu** — deep links already work (`/menu?category=slug`, `/menu?q=…`).

## Design system

Tokens live in `src/app/globals.css` as CSS variables mapped into Tailwind via
`@theme`. Light/dark are driven by a `.dark` class (`next-themes`). Key
utilities: `.glass`, `.shadow-soft/-float/-pop`, `.text-gradient-brand`,
`.shimmer`, `.mask-fade-x`. Radii are large; motion respects
`prefers-reduced-motion`.
