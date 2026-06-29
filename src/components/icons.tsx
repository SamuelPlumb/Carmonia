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

/** The full "Carmonia" wordmark. Sized by height (default 32) with width scaling
 * from the viewBox aspect ratio; `currentColor` so it inherits the nav text colour. */
export function Wordmark(props: IconProps) {
  return (
    <svg height="32" viewBox="0 0 514 93" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M41.1328 92.6953C32.6953 92.6953 25.3906 90.957 19.2188 87.4805C13.0859 84.0039 8.33984 79.0039 4.98047 72.4805C1.66016 65.918 0 58.0469 0 48.8672V48.8086C0 39.6289 1.67969 31.7773 5.03906 25.2539C8.39844 18.7305 13.1445 13.75 19.2773 10.3125C25.4492 6.83594 32.7344 5.09766 41.1328 5.09766C48.5156 5.09766 55.0195 6.54297 60.6445 9.43359C66.3086 12.3242 70.7617 16.2695 74.0039 21.2695C77.2852 26.2695 79.043 31.9336 79.2773 38.2617L79.3359 38.7891H58.5938L58.4766 37.9688C58.0078 35 57.0312 32.4023 55.5469 30.1758C54.1016 27.9102 52.168 26.1328 49.7461 24.8438C47.3242 23.5547 44.4531 22.9102 41.1328 22.9102C37.2266 22.9102 33.8281 23.9453 30.9375 26.0156C28.0859 28.0859 25.8789 31.0547 24.3164 34.9219C22.7539 38.75 21.9727 43.3594 21.9727 48.75V48.8086C21.9727 54.2383 22.7539 58.9062 24.3164 62.8125C25.8789 66.7188 28.1055 69.707 30.9961 71.7773C33.8867 73.8477 37.2852 74.8828 41.1914 74.8828C44.3164 74.8828 47.0898 74.2773 49.5117 73.0664C51.9336 71.8164 53.9258 70.0586 55.4883 67.793C57.0508 65.4883 58.0859 62.7539 58.5938 59.5898L58.7109 59.0039H79.3945V59.6484C79.1211 65.9375 77.3242 71.582 74.0039 76.582C70.7227 81.543 66.25 85.4688 60.5859 88.3594C54.9609 91.25 48.4766 92.6953 41.1328 92.6953Z" fill="currentColor"/>
      <path d="M102.016 92.0508C97.7586 92.0508 94.0086 91.2305 90.7664 89.5898C87.5242 87.9102 84.9852 85.625 83.1492 82.7344C81.3523 79.8047 80.4539 76.4844 80.4539 72.7734V72.7148C80.4539 68.6914 81.45 65.2734 83.4422 62.4609C85.4734 59.6484 88.4031 57.4414 92.2312 55.8398C96.0594 54.1992 100.708 53.2031 106.177 52.8516L131.723 51.2109V63.2812L109.516 64.8047C106.626 64.9609 104.458 65.625 103.012 66.7969C101.567 67.9297 100.845 69.4531 100.845 71.3672V71.4258C100.845 73.418 101.606 74.9609 103.13 76.0547C104.692 77.1094 106.743 77.6367 109.282 77.6367C111.509 77.6367 113.462 77.2461 115.141 76.4648C116.86 75.6445 118.208 74.5312 119.184 73.125C120.2 71.6797 120.708 70.0781 120.708 68.3203V48.75C120.708 46.4453 119.966 44.6289 118.481 43.3008C116.997 41.9336 114.829 41.25 111.977 41.25C109.165 41.25 106.958 41.8164 105.356 42.9492C103.755 44.082 102.778 45.4688 102.427 47.1094L102.309 47.6953H83.5594L83.618 46.9336C83.9695 42.7539 85.3367 39.1016 87.7195 35.9766C90.1023 32.8516 93.4227 30.4102 97.6805 28.6523C101.977 26.8945 107.095 26.0156 113.032 26.0156C118.735 26.0156 123.716 26.9141 127.973 28.7109C132.27 30.5078 135.591 33.0273 137.934 36.2695C140.317 39.5117 141.509 43.2812 141.509 47.5781V91.1719H120.708V82.1484H120.298C119.087 84.2188 117.583 85.9961 115.786 87.4805C113.989 88.9648 111.938 90.0977 109.634 90.8789C107.329 91.6602 104.79 92.0508 102.016 92.0508Z" fill="currentColor"/>
      <path d="M146.611 91.1719V27.3633H167.412V38.6719H167.822C168.72 34.6094 170.38 31.4844 172.802 29.2969C175.263 27.1094 178.388 26.0156 182.177 26.0156C183.154 26.0156 184.091 26.0938 184.99 26.25C185.927 26.3672 186.787 26.5625 187.568 26.8359V44.6484C186.709 44.2578 185.693 43.9648 184.521 43.7695C183.388 43.5742 182.197 43.4766 180.947 43.4766C178.017 43.4766 175.537 44.0039 173.505 45.0586C171.513 46.1133 169.99 47.6758 168.935 49.7461C167.92 51.7773 167.412 54.2969 167.412 57.3047V91.1719H146.611Z" fill="currentColor"/>
      <path d="M192.038 91.1719V27.3633H212.838V38.8477H213.248C214.498 34.9414 216.725 31.8359 219.928 29.5312C223.131 27.1875 226.92 26.0156 231.295 26.0156C234.342 26.0156 237.057 26.5625 239.44 27.6562C241.823 28.7109 243.815 30.2539 245.416 32.2852C247.018 34.2773 248.112 36.7383 248.698 39.668H249.108C249.928 36.8945 251.276 34.4922 253.151 32.4609C255.065 30.4297 257.35 28.8477 260.006 27.7148C262.702 26.582 265.631 26.0156 268.795 26.0156C272.975 26.0156 276.627 26.9336 279.752 28.7695C282.877 30.5664 285.319 33.1055 287.077 36.3867C288.834 39.6289 289.713 43.418 289.713 47.7539V91.1719H268.913V53.0859C268.913 50.8594 268.58 49.0039 267.916 47.5195C267.252 45.9961 266.256 44.8633 264.928 44.1211C263.6 43.3398 261.94 42.9492 259.948 42.9492C258.112 42.9492 256.491 43.3789 255.084 44.2383C253.717 45.0977 252.663 46.2891 251.92 47.8125C251.178 49.3359 250.807 51.1719 250.807 53.3203V91.1719H230.944V52.9102C230.944 50.7227 230.592 48.9062 229.889 47.4609C229.225 45.9766 228.229 44.8633 226.901 44.1211C225.612 43.3398 224.01 42.9492 222.096 42.9492C220.221 42.9492 218.58 43.3984 217.174 44.2969C215.807 45.1562 214.733 46.3672 213.952 47.9297C213.209 49.4922 212.838 51.3281 212.838 53.4375V91.1719H192.038Z" fill="currentColor"/>
      <path d="M325.402 92.5195C318.683 92.5195 312.882 91.2109 307.999 88.5938C303.116 85.9766 299.347 82.1875 296.691 77.2266C294.073 72.2656 292.765 66.2891 292.765 59.2969V59.1797C292.765 52.3047 294.112 46.3867 296.808 41.4258C299.503 36.4258 303.292 32.6172 308.175 30C313.058 27.3438 318.8 26.0156 325.402 26.0156C332.042 26.0156 337.804 27.3438 342.687 30C347.57 32.6172 351.359 36.4062 354.054 41.3672C356.749 46.2891 358.097 52.2266 358.097 59.1797V59.2969C358.097 66.3281 356.769 72.3242 354.112 77.2852C351.456 82.2461 347.687 86.0352 342.804 88.6523C337.96 91.2305 332.159 92.5195 325.402 92.5195ZM325.46 76.7578C327.843 76.7578 329.894 76.0938 331.612 74.7656C333.331 73.3984 334.64 71.4062 335.538 68.7891C336.476 66.1719 336.945 63.0078 336.945 59.2969V59.1797C336.945 55.5078 336.456 52.3828 335.48 49.8047C334.542 47.1875 333.214 45.1953 331.495 43.8281C329.777 42.4609 327.745 41.7773 325.402 41.7773C323.097 41.7773 321.066 42.4609 319.308 43.8281C317.589 45.1953 316.241 47.1875 315.265 49.8047C314.327 52.3828 313.859 55.5078 313.859 59.1797V59.2969C313.859 63.0078 314.327 66.1719 315.265 68.7891C316.202 71.4062 317.53 73.3984 319.249 74.7656C321.007 76.0938 323.077 76.7578 325.46 76.7578Z" fill="currentColor"/>
      <path d="M361.383 91.1719V27.3633H382.184V38.6133H382.594C384.234 34.5898 386.676 31.4844 389.918 29.2969C393.16 27.1094 397.184 26.0156 401.988 26.0156C409.02 26.0156 414.43 28.1445 418.219 32.4023C422.047 36.6211 423.961 42.5195 423.961 50.0977V91.1719H403.16V54.5508C403.16 50.918 402.301 48.0859 400.582 46.0547C398.863 43.9844 396.305 42.9492 392.906 42.9492C390.719 42.9492 388.824 43.457 387.223 44.4727C385.621 45.4883 384.371 46.8945 383.473 48.6914C382.613 50.4883 382.184 52.5781 382.184 54.9609V91.1719H361.383Z" fill="currentColor"/>
      <path d="M429.063 91.1719V27.3633H449.864V91.1719H429.063ZM439.434 20.5078C436.466 20.5078 433.946 19.4922 431.876 17.4609C429.845 15.4297 428.829 13.0273 428.829 10.2539C428.829 7.44141 429.845 5.03906 431.876 3.04688C433.946 1.01562 436.466 0 439.434 0C442.442 0 444.962 1.01562 446.993 3.04688C449.024 5.03906 450.04 7.44141 450.04 10.2539C450.04 13.0273 449.024 15.4297 446.993 17.4609C444.962 19.4922 442.442 20.5078 439.434 20.5078Z" fill="currentColor"/>
      <path d="M474.42 92.0508C470.162 92.0508 466.412 91.2305 463.17 89.5898C459.927 87.9102 457.388 85.625 455.552 82.7344C453.755 79.8047 452.857 76.4844 452.857 72.7734V72.7148C452.857 68.6914 453.853 65.2734 455.845 62.4609C457.877 59.6484 460.806 57.4414 464.634 55.8398C468.462 54.1992 473.111 53.2031 478.58 52.8516L504.127 51.2109V63.2812L481.92 64.8047C479.029 64.9609 476.861 65.625 475.416 66.7969C473.97 67.9297 473.248 69.4531 473.248 71.3672V71.4258C473.248 73.418 474.009 74.9609 475.533 76.0547C477.095 77.1094 479.146 77.6367 481.685 77.6367C483.912 77.6367 485.865 77.2461 487.545 76.4648C489.263 75.6445 490.611 74.5312 491.587 73.125C492.603 71.6797 493.111 70.0781 493.111 68.3203V48.75C493.111 46.4453 492.369 44.6289 490.884 43.3008C489.4 41.9336 487.232 41.25 484.38 41.25C481.568 41.25 479.361 41.8164 477.759 42.9492C476.158 44.082 475.181 45.4688 474.83 47.1094L474.712 47.6953H455.962L456.021 46.9336C456.373 42.7539 457.74 39.1016 460.123 35.9766C462.505 32.8516 465.826 30.4102 470.084 28.6523C474.38 26.8945 479.498 26.0156 485.435 26.0156C491.138 26.0156 496.119 26.9141 500.377 28.7109C504.673 30.5078 507.994 33.0273 510.337 36.2695C512.72 39.5117 513.912 43.2812 513.912 47.5781V91.1719H493.111V82.1484H492.701C491.49 84.2188 489.986 85.9961 488.189 87.4805C486.392 88.9648 484.341 90.0977 482.037 90.8789C479.732 91.6602 477.193 92.0508 474.42 92.0508Z" fill="currentColor"/>
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
    // Render the glyph as a centred flex box with line-height 1 so its box is
    // exactly `size` tall (no font ascent/descent slack) and the icon sits on
    // its own centre. This stops Material Symbols baseline-aligning and riding
    // high next to text — every `items-center` row then balances icon and label.
    const css: CSSProperties = {
      fontSize: size,
      lineHeight: 1,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      ...(style ?? {}),
    };
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
export const Smiley = symbol("mood", 16);
export const ArrowRight = symbol("arrow_forward", 16);
export const Sparkle = symbol("auto_awesome", 16);
export const Burst = symbol("flare", 16);
export const Chart = symbol("bar_chart", 16);
export const CheckCircle = symbol("check_circle", 20);
export const MinusCircle = symbol("remove_circle", 20);
export const CrossCircle = symbol("cancel", 20);
export const PlusCircle = symbol("add_circle", 20);
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
