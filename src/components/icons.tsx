import { useState } from "react";
import type { CSSProperties, ReactNode, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

/** The white rounded chip that sits behind feature icons. Shared so every surface uses the same size/shadow. */
export function IconBox({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`w-10 h-9 shrink-0 rounded-lg bg-white flex items-center justify-center shadow-[0px_1px_3px_rgba(0,0,0,0.12),0px_0px_0px_1px_rgba(0,0,0,0.08)] ${className}`}
    >
      {children}
    </span>
  );
}

/** The Carmonia mark — a ring with a notched inner counter. Bespoke brand asset, not a stock icon. */
export function Logo(props: IconProps) {
  return (
    <svg height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M16 3C27 3 31 10 31 16C31 22 27 29 16 29C5 29 1 22 1 16C1 10 5 3 16 3ZM15 9C11.134 9 8 12.134 8 16C8 19.866 11.134 23 15 23H17C20.866 23 24 19.866 24 16C24 12.134 20.866 9 17 9H15Z"
        fill="currentColor"
      />
    </svg>
  );
}

/**
 * Render a Material Symbols (Outlined) glyph as the project's single icon
 * primitive. Every icon on the site is delivered this way so they all share one
 * weight: the thin `FILL 0, wght 300, GRAD 0, opsz 24` set in `.material-symbols-outlined`
 * (index.css). The webfont and its glyph subset are loaded in index.html.
 *
 * Call sites keep the previous API unchanged: `width`/`height` (px) set the
 * rendered size (mapped onto the glyph's `font-size`), and `className`/`style`
 * colour it via `currentColor`. The svg-only props (`viewBox`, `color`) are
 * accepted but dropped — they don't apply to a glyph.
 */
function symbol(name: string, defaultSize: number) {
  return function MaterialSymbol({ width, height, viewBox: _viewBox, color: _color, className = "", style }: IconProps) {
    const size = (width ?? height ?? defaultSize) as number | string;
    const css: CSSProperties = { fontSize: size, ...(style ?? {}) };
    return (
      <span aria-hidden="true" className={`material-symbols-outlined ${className}`} style={css}>
        {name}
      </span>
    );
  };
}

export const ChevronRight = symbol("chevron_right", 16);
export const ChevronLeft = symbol("chevron_left", 16);
export const ChevronDown = symbol("expand_more", 14);
export const Speedometer = symbol("speed", 20);
export const Clock = symbol("schedule", 20);
export const Heart = symbol("favorite", 20);
export const DollarCircle = symbol("monetization_on", 20);
export const Globe = symbol("public", 20);
export const Smiley = symbol("mood", 16);
export const ArrowRight = symbol("arrow_forward", 16);
export const Sparkle = symbol("auto_awesome", 16);
export const Burst = symbol("flare", 16);
export const Chart = symbol("bar_chart", 16);
export const CheckCircle = symbol("check_circle", 20);
export const MinusCircle = symbol("remove_circle", 20);
export const CrossCircle = symbol("cancel", 20);
export const BadgeCheck = symbol("verified", 16);
export const Shield = symbol("shield", 72);
export const CheckSmall = symbol("check", 16);

/* ---- car-finance icon set ---- */
export const Car = symbol("directions_car", 20);
export const CreditScore = symbol("credit_score", 20);
export const Calculator = symbol("calculate", 20);
export const Handshake = symbol("handshake", 20);
export const Percent = symbol("percent", 16);
export const Search = symbol("search", 20);
export const Swap = symbol("swap_horiz", 20);
export const Refresh = symbol("autorenew", 20);
export const Groups = symbol("groups", 16);
export const Savings = symbol("savings", 20);
export const Tag = symbol("local_offer", 16);
export const FactCheck = symbol("fact_check", 16);
export const Star = symbol("star", 16);
export const Quote = symbol("request_quote", 20);
export const Key = symbol("key", 20);
export const Badge = symbol("badge", 20);
export const TaskCheck = symbol("task_alt", 20);
export const Signature = symbol("draw", 20);
export const Storefront = symbol("storefront", 28);
export const Bank = symbol("account_balance", 28);
export const Direct = symbol("call_made", 28);
export const Support = symbol("support_agent", 16);

/* ---- vehicle marque badges ----
   Official brand marks (public/images) for notifications that name a specific
   make, rendered as <img> so the BMW gradients and the Audi ring aspect ratio
   stay intact. Both fit the same 40px icon slot — the wide Audi lockup is
   letterboxed within the box by the SVG's own preserveAspectRatio. The tint
   passed by call sites doesn't apply to these. */
export function BmwBadge({ width, height }: IconProps) {
  const size = (width ?? height ?? 40) as number;
  return <img src="/images/bmw.svg" alt="BMW" width={size} height={size} style={{ flex: "0 0 auto", display: "block" }} />;
}

export function AudiBadge({ width, height }: IconProps) {
  const size = (width ?? height ?? 40) as number;
  return <img src="/images/audi.svg" alt="Audi" width={size} height={size} style={{ flex: "0 0 auto", display: "block" }} />;
}

/* A transparent slot for a vehicle marque logo mark, keyed by make. The make,
   lowercased and hyphenated, is the asset name — drop `public/images/<make>.png`
   (e.g. ford.png, land-rover.png, mercedes-benz.png) and it appears here
   automatically. Tries .png first then falls back to .svg, so the existing
   bmw.svg / audi.svg keep working alongside uploaded PNGs; if neither exists the
   slot stays empty. No plate/background/outline — the bare logo mark, contained
   so it shows in full. */
const BRAND_EXTS = ["png", "svg"];
export function BrandLogo({ make, className = "" }: { make: string; className?: string }) {
  const slug = make
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
  const [ext, setExt] = useState(0);
  return (
    <span className={`shrink-0 w-7 h-7 flex items-center justify-center ${className}`}>
      {ext < BRAND_EXTS.length && (
        <img
          key={BRAND_EXTS[ext]}
          src={`/images/${slug}.${BRAND_EXTS[ext]}`}
          alt={slug}
          className="w-full h-full object-contain"
          onError={() => setExt((n) => n + 1)}
        />
      )}
    </span>
  );
}
