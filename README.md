# Carmonia — car finance landing page

The marketing site for **Carmonia**, a UK car finance broker: soft-search quotes with no
impact on your credit score, a panel of UK lenders, bad-credit-friendly deals, and a large
range of cars to choose from.

Stack: **Vite + React + TypeScript + Tailwind CSS v4**, **shadcn/ui** (Radix UI primitives)
for the interactive components, **Mapbox GL** for the UK lender map, and a single-accent
design system (blue `--primary` over neutrals) driven by the tokens in `src/index.css`.

## shadcn/ui foundation

The interactive and structural components are built on shadcn/ui primitives in
`src/components/ui/` (backed by `radix-ui` + `class-variance-authority` + the `cn` helper in
`src/lib/utils.ts`). The ones wired into the page:

| Primitive | Used by |
| --- | --- |
| `Button` | Hero, CTA, Pricing, nav — via a thin `Button` adapter mapping primary/secondary/soft + sm/md |
| `Card` | Every feature / how-it-works / pricing card |
| `Slider` | Pricing (loan amount / term) |
| `Accordion` | FAQ |
| `Tooltip` | Comparison table partial/unavailable cells |
| `Badge` | Section eyebrow labels |

The shadcn semantic tokens (`--primary`, `--muted`, `--accent`, `--border`, `--ring`, …) are
mapped via `@theme inline` in `src/index.css`, so the primitives inherit the Carmonia look out
of the box. The brand/feature SVGs (`icons.tsx`) and the brand logos in `public/images/` are
custom, since they're content rather than UI primitives.

## Run it

```bash
npm install
npm run dev        # dev server (http://localhost:5173)
npm run build      # type-check + production build to dist/
npm run preview    # serve the production build
```

The UK lender map needs a Mapbox token — copy `.env.example` to `.env.local` and set
`VITE_MAPBOX_TOKEN`. Without one, the map area on the "Panel of lenders" card simply isn't
rendered; everything else runs as normal.

## What's included

Every section of the page is its own component, composed in `src/App.tsx`:

| Section | Component | Notes |
| --- | --- | --- |
| Floating nav | `Navbar` | Dark "pill" bar, Features menu, mobile menu, wordmark |
| Hero | `Hero` | Headline + CTAs over the phone scene |
| App scene | `Showcase` | Hand + phone ringed by finance-notification cards (pre-approved, rate locked, signed…) |
| Pricing | `Pricing` | Representative-example calculator with live monthly-payment readout |
| Value props | `ValueProps` | Soft search · panel of lenders · drive away |
| Features | `Features` | The four feature cards (below) |
| How it works | `HowItWorks` | Step-by-step from quote to keys |
| Comparison | `Comparison` | Carmonia vs other finance types (PCP / HP / dealer / bank loan) |
| FAQ | `FAQ` | Expandable accordion |
| Closing CTA | `CTA` | |
| Footer | `Footer` | Link columns + FCA regulatory small print |

### Feature cards (`src/components/features/`)

| Card | Title | Visual |
| --- | --- | --- |
| `QuoteCard` | Soft search quote | Animated eligibility ring that fills to a "Perfect match" with a confetti burst |
| `LendersCard` | Panel of lenders | `UkMap` — a Mapbox UK globe with a live "<name> from <city> · Approved" feed |
| `BadCreditCard` | Bad credit specialists | Looping credit-score dial (the score rolls, the band badge swaps) |
| `CarsCard` | Find your dream car | Insert-at-top feed of approved cars, in lock-step with the credit dial via `featureTick` |

The credit-score dial and the approved-cars feed advance off one shared interval
(`featureTick.ts`) so they always change on the same beat.

## Theming

`src/index.css` is a standard shadcn/ui theme — the flat, semantic token set (`--background`,
`--foreground`, `--primary`, `--secondary`, `--muted`, `--accent`, `--destructive`, `--border`,
`--ring`, `--card`, `--popover`, `--chart-*`, fonts, radius, shadow scale), with both `:root` and
`.dark`. Type is **SF Pro** via the Apple system stack; icons are Google **Material Symbols**
(subset loaded in `index.html`) plus a few inline SVGs.

Components use only the semantic utilities (`bg-background`, `text-foreground`,
`text-muted-foreground`, `bg-muted`, `bg-primary`, `text-primary`, `border-border`, `bg-card`…).
The blue accent everywhere is driven by **`--primary`**, with map pins and badges derived from it
via `color-mix` — so re-theming the whole site is mostly a matter of editing `--primary` and the
greys, or pasting any shadcn-compatible theme over the `:root`/`.dark` blocks.

Custom keyframes (shimmer, marquee, `feed-in`, `uk-pin-*`, accordion) and a couple of utilities
(`mask-fade-*`, `no-scrollbar`) live at the bottom of the file.

## Assets

Brand logos live in `public/images/` (`bmw.svg`, `audi.svg`, `tesla.png`, …) and the hero phone
cutout in `public/images/hero-phone-cutout.png`.
