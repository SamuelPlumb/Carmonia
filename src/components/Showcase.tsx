import type { CSSProperties, ComponentType, SVGProps } from "react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  Percent,
  CheckCircle,
  Car,
  Quote,
  Key,
  Badge,
  Signature,
  BmwBadge,
  AudiBadge,
} from "./icons";

/* Hero scene: the hand + phone (756×1024, optically centred, top layer) ringed by
   notification cards laid out as staggered, alternating rows — five rows,
   each pairing a left + right card across a variable gap, with cards alternating
   foreground (opacity 1) / background (opacity 0.2) for depth. No rotation, no
   scroll parallax; the load cascade still plays. */

type CSSVars = CSSProperties & Record<`--${string}`, string | number>;
type IconType = ComponentType<SVGProps<SVGSVGElement>>;

type Card = { Icon: IconType; tint: string; title: string; desc: string };
type Slot = { card: Card; o: number };
type Row = { w: number; l: Slot; r?: Slot; lx?: number; rx?: number };  // lx/rx: nudge the left/right card inward (px)

// Every icon is tinted with the brand primary — the design system is a single
// blue accent over neutrals (no green/amber tokens), so the cards stay on-system
// and let opacity/depth (not colour) carry the visual hierarchy.
const PRIMARY = "var(--primary)";

// Variable row widths create the staggered scatter; opacity (o) follows an
// alternating 0.2/1 rhythm so foreground cards pop and the rest recede.
const ROWS: Row[] = [
  {
    w: 1140,
    rx: 60,  // tuck this right card in so its icon sits behind the phone
    lx: 130,  // tuck this left card in so its icon sits behind the phone
    l: { card: { Icon: BmwBadge, tint: PRIMARY, title: "You've paid off your car 🎉 ", desc: "The BMW 330d is all yours" }, o: 0.2 },
    r: { card: { Icon: Car, tint: PRIMARY, title: "You're pre-approved 🚗", desc: "Up to £15,000 towards your next car" }, o: 1 },
  },
  {
    w: 1180,
    lx: 80,
    rx: 30,  // tuck this right card in so its icon sits behind the phone
    l: { card: { Icon: Percent, tint: PRIMARY, title: "Rate held for 14 days 🔒", desc: "9.9% APR locked while you decide" }, o: 1 },
    r: { card: { Icon: Quote, tint: PRIMARY, title: "Your finance offers are in 💷", desc: "3 lenders matched, from 9.9% APR" }, o: 0.2 },
  },
  {
    w: 1280,
    lx: 110,
    l: { card: { Icon: Badge, tint: PRIMARY, title: "We need two documents 📄", desc: "Photo ID and proof of address to continue" }, o: 0.2 },
    r: { card: { Icon: Key, tint: PRIMARY, title: "Finance complete 🥳", desc: "Paid to the dealer — you're ready to drive away" }, o: 1 },
  },
  {
    w: 1240,
    lx: 40,
    l: { card: { Icon: CheckCircle, tint: PRIMARY, title: "Documents verified 👍", desc: "ID and address confirmed — onto approval" }, o: 1 },
    r: { card: { Icon: AudiBadge, tint: PRIMARY, title: "Your Audi A4 finance is approved 🎉", desc: "£14,200 over 48 months" }, o: 0.2 },
  },
  {
    w: 1320,
    lx: 130,
    l: { card: { Icon: Signature, tint: PRIMARY, title: "Your agreement's ready to sign ✍️", desc: "£312/mo at 9.9% APR" }, o: 1 },
    r: { card: { Icon: CheckCircle, tint: PRIMARY, title: "Repayment received ✅", desc: "£312 received, next due 1 Aug" }, o: 1 },
  },
];

function NotifCard({
  card,
  opacity,
  active,
  shift = 0,
  delay,
}: {
  card: Card;
  opacity: number;
  active: boolean;
  shift?: number;
  delay: number;
}) {
  const { Icon, tint, title, desc } = card;
  // Once the phone scrolls into focus, swap tiers: faded cards come forward,
  // the previously-active cards recede. Crossfade via the opacity transition.
  const op = active ? (opacity > 0.5 ? 0.2 : 1) : opacity;
  return (
    <div
      className="shrink-0"
      style={{
        opacity: op,
        transform: shift ? `translateX(calc(${shift}px * var(--hero-spread, 1)))` : undefined,
        transition: "opacity 0.7s ease",
      }}
    >
      <div className="note-card appear" style={{ "--appear-delay": `${delay}ms` } as CSSVars}>
        <Icon width={40} height={40} style={{ color: tint }} />
        <div className="min-w-0">
          <p className="note-title">{title}</p>
          <p className="note-desc">{desc}</p>
        </div>
      </div>
    </div>
  );
}

// As the hero nears the end of its scroll, dissolve the whole notification
// layer. p = how far the scene has scrolled up as a fraction of its own height;
// notifications hold through most of the scroll, then fade across this window.
const FADE_START = 0.6;  // p at which the cards begin to fade
const FADE_END = 0.9;    // p by which they're fully gone (≈ full hero scroll)

// The scene responds to viewport HEIGHT, not just width, via one
// --hero-scale factor: the phone shrinks, and the notification ring contracts
// toward the centre. The cards keep their natural size — only the spread (row
// widths + inward nudges) tightens, so they slide closer together rather than
// scaling. Tuned so a ~850px-tall viewport puts the phone near 452×616; tall
// monitors cap at the full 722×984.
const PHONE_MAX_H = 984;    // px — full height (scale 1) at/above the cap
const PHONE_MIN_H = 540;    // px — floor on very short viewports
const HEIGHT_RATIO = 0.72;  // phone height as a fraction of viewport height

// How hard the card spread follows the phone's shrink. 1 = cards converge as
// fast as the phone scales down (too aggressive); 0.4 = the inward movement is
// damped to ~40% of that, so they drift together gently as the phone shrinks.
const SPREAD_DAMP = 0.4;

// A small constant widening added to every row so the cards sit a touch further
// out at all sizes (each card moves out by half this), keeping their icons/text
// from tucking too far behind the phone. Applied before --hero-spread so it
// scales along with everything else.
const SPREAD_PAD = 64; // px added to each row's width

export function Showcase() {
  const sceneRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [fade, setFade] = useState(1);

  // Size the scene from viewport height: write --hero-scale on the scene so both
  // the phone (.phone-img) and the notification ring read the same factor. Layout
  // effect + initial run so the size is correct on first paint (no flash).
  useLayoutEffect(() => {
    const el = sceneRef.current;
    if (!el) return;
    const apply = () => {
      const h = Math.min(PHONE_MAX_H, Math.max(PHONE_MIN_H, window.innerHeight * HEIGHT_RATIO));
      const scale = h / PHONE_MAX_H;
      el.style.setProperty("--hero-scale", String(scale));
      // Damped factor for the card spread so they converge far more gently than
      // the phone scales (see SPREAD_DAMP).
      el.style.setProperty("--hero-spread", String(1 - (1 - scale) * SPREAD_DAMP));
    };
    apply();
    window.addEventListener("resize", apply);
    return () => window.removeEventListener("resize", apply);
  }, []);

  // Flip the card tiers once the phone has scrolled up into focus (reversible),
  // and fade the cards out entirely as we approach full hero scroll.
  useEffect(() => {
    const el = sceneRef.current;
    if (!el) return;
    let ticking = false;
    const update = () => {
      ticking = false;
      const rect = el.getBoundingClientRect();
      setActive(rect.top <= window.innerHeight * 0.4);
      // -rect.top is px scrolled past the scene's top; over its own height.
      const p = rect.height ? -rect.top / rect.height : 0;
      const f = 1 - (p - FADE_START) / (FADE_END - FADE_START);
      setFade(Math.min(1, Math.max(0, f)));
    };
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative w-full">
      <div ref={sceneRef} className="relative mx-auto max-w-6xl px-5">
        {/* Notification cards, staggered rows behind the phone (desktop only).
            The whole layer fades out as the hero nears full scroll (see fade). */}
        <div
          className="hidden lg:flex absolute left-1/2 -translate-x-1/2 top-[9%] z-[1] flex-col items-center gap-5"
          style={{ opacity: fade }}
        >
          {ROWS.map((row, ri) => (
            <div
              key={ri}
              className="flex justify-between items-start"
              // Only the spread scales (damped --hero-spread); the cards
              // (shrink-0) keep their size, so a tighter row just slides them
              // toward centre. SPREAD_PAD nudges both cards a touch further out.
              style={{ width: `calc((${row.w}px + ${SPREAD_PAD}px) * var(--hero-spread, 1))` }}
            >
              <NotifCard card={row.l.card} opacity={row.l.o} active={active} shift={row.lx} delay={440 + ri * 2 * 55} />
              {row.r && <NotifCard card={row.r.card} opacity={row.r.o} active={active} shift={row.rx != null ? -row.rx : undefined} delay={440 + (ri * 2 + 1) * 55} />}
            </div>
          ))}
        </div>

        {/* Hand + phone (756×1024), device optically centred, on top of the cards. */}
        <img
          src="/images/hero-phone-cutout.png"
          alt="Carmonia app on iPhone"
          width={930}
          height={1260}
          className="phone-img appear-phone relative z-10 block mx-auto max-w-none"
          style={{ "--appear-delay": "320ms" } as CSSVars}
        />
      </div>
    </section>
  );
}
