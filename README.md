# Visitors — homepage rebuild

A faithful, from-scratch rebuild of the [visitors.now](https://visitors.now) homepage — a
privacy-friendly analytics landing page — recreated as a clean React component tree.

Built to match the original's stack and design system: **Vite + React + TypeScript + Tailwind CSS v4**,
**shadcn/ui** (Radix UI primitives) for the interactive components, the **OpenRunde** typeface, and
the original's exact colour tokens (near-black `#181925` text, `#918df6` purple accent, and the full
semantic palette).

## shadcn/ui foundation

Every interactive and structural component is built on shadcn/ui primitives in `src/components/ui/`
(installed via `npx shadcn@latest add`, backed by `radix-ui` + `class-variance-authority` + the
`cn` helper in `src/lib/utils.ts`):

| Primitive | Used by |
| --- | --- |
| `Button` | Hero, CTA, Pricing, nav — via a thin `Button` adapter that maps primary/secondary/soft + sm/md |
| `DropdownMenu` | Navbar Features menu + mobile menu |
| `Tabs` | Dashboard preview tab bar |
| `Accordion` | FAQ |
| `Slider` · `ToggleGroup` · `Separator` | Pricing (events slider, monthly/yearly, dividers) |
| `Tooltip` | Comparison table partial/unavailable cells |
| `Badge` | Section eyebrow labels |
| `Card` | Every feature / how-it-works / integration / pricing card |

The shadcn semantic tokens (`--primary`, `--muted`, `--accent`, `--border`, `--ring`, …) are mapped
onto the visitors palette in `src/index.css` via `@theme inline`, so the primitives inherit the
visitors.now look out of the box. The brand/feature SVGs (`icons.tsx`) and the generated marble
`Avatar` remain custom, since they're content rather than UI primitives.

## Run it

```bash
npm install
npm run dev        # dev server (http://localhost:5173)
npm run build      # type-check + production build to dist/
npm run preview    # serve the production build
```

## What's included

Every section of the homepage, rebuilt as its own component:

| Section | Component | Notes |
| --- | --- | --- |
| Floating nav | `Navbar` | Dark "pill" bar, Features dropdown, mobile menu |
| Hero | `Hero` | Animated "We hit $1K MRR" shimmer badge + CTAs |
| Social proof | `LogoCloud` | Customer logos |
| Product shot | `DashboardPreview` | Switchable Dashboard/Profiles/Funnels/Performance/Realtime tabs |
| Value props | `ValueProps` | Lightweight / 5-minute setup / Independent |
| Features | `Features` | Revenue bars, live **visitor globe**, scrolling **profiles**, animated **Experience Score** ring, integrations |
| How it works | `HowItWorks` | Framework-logo marquee, revenue connection, insight bars |
| Comparison | `Comparison` | Full Visitors vs GA / Plausible / Fathom matrix |
| Pricing | `Pricing` | Interactive events slider, monthly/yearly toggle, live "people/min" meter |
| FAQ | `FAQ` | Expandable accordion |
| Closing CTA | `CTA` | |
| Footer | `Footer` | Link columns + rising concentric-ring globe |

Shared pieces live in `src/components/` — `Button`, `SectionHeader`/`Badge`, the `icons` set, and
a deterministic marble `Avatar` generator used by the globe and profile rows.

## Theming

`src/index.css` is a **standard shadcn/ui theme** — the same flat, semantic token set you'd get
from the shadcn CLI or [tweakcn](https://tweakcn.com) (`--background`, `--foreground`, `--primary`,
`--secondary`, `--muted`, `--accent`, `--destructive`, `--border`, `--ring`, `--card`, `--popover`,
`--chart-*`, `--sidebar-*`, fonts, radius, shadow scale), with both `:root` and `.dark`.

Components use **only** those semantic utilities (`bg-background`, `text-foreground`,
`text-muted-foreground`, `bg-muted`, `bg-accent`, `bg-primary`, `text-primary`, `border-border`,
`bg-card`…). The blue accent everywhere is driven by **`--primary`** — even the visitor globe,
marble avatars, and footer rings derive from it via `color-mix`. So:

- **Re-theme the whole site** by editing `--primary` (and the greys) in `src/index.css`, or
- **Paste any tweakcn theme** over the `:root`/`.dark` blocks and it just works.

Custom keyframes (shimmer, marquee, float, ping, accordion) and a couple of utilities
(`mask-fade-*`, `no-scrollbar`) live at the bottom of the file.

## Assets

Customer logos and the dashboard screenshot live in `public/images/`; the OpenRunde
font files in `public/fonts/`. This is a design reference rebuild — all original branding,
copy, and assets belong to Visitors.
