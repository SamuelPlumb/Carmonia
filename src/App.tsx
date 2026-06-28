import { useEffect, useRef, useState } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { ValueProps } from "./components/ValueProps";
import { Showcase } from "./components/Showcase";
import { Features } from "./components/Features";
import { HowItWorks } from "./components/HowItWorks";
import { Comparison } from "./components/Comparison";
import { Pricing } from "./components/Pricing";
import { FAQ } from "./components/FAQ";
import { CTA } from "./components/CTA";
import { Footer } from "./components/Footer";

/* White dissolve docked to the bottom of the hero. Rather than sitting at a fixed
   height, it *grows off the hand*: while the bottom of the hand is still below the
   fold the fade is barely there, then as that bottom edge scrolls up into view the
   fade height ramps up — so the hand dissolves further the more you scroll down. */
const FADE_MIN = 48;   // px — barely-there base so the very edge never hard-cuts
const FADE_MAX = 224;  // px — fully grown once you've scrolled past the hand bottom
const FADE_RAMP = 380; // px of scroll over which it grows from MIN → MAX

function HeroFade() {
  const ref = useRef<HTMLDivElement>(null);
  const [h, setH] = useState(FADE_MIN);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let ticking = false;
    const update = () => {
      ticking = false;
      // The fade is anchored to the hero's bottom edge, so its own rect.bottom
      // tracks where that edge sits in the viewport. p=0 while the edge is still
      // at/below the fold; p=1 once it's scrolled FADE_RAMP px up into view.
      const bottom = el.getBoundingClientRect().bottom;
      const p = Math.min(1, Math.max(0, (window.innerHeight - bottom) / FADE_RAMP));
      setH(Math.round(FADE_MIN + (FADE_MAX - FADE_MIN) * p));
    };
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden
      ref={ref}
      className="pointer-events-none absolute inset-x-0 bottom-0 z-20"
      style={{
        height: h,
        background: "linear-gradient(to bottom, rgba(255,255,255,0) 0%, #ffffff 74%)",
      }}
    />
  );
}

export default function App() {
  return (
    <TooltipProvider delayDuration={150}>
      <div className="flex flex-col min-h-dvh w-full overflow-x-hidden antialiased bg-background text-muted-foreground">
        <Navbar />
        <main className="flex flex-col flex-1">
          <div className="pt-40 pb-0 bg-background flex flex-col gap-10 relative overflow-hidden">
            <Hero />
            <Showcase />
            {/* White fade docked to the bottom of the hero; grows as you scroll
                so the hand dissolves further down the page (see HeroFade). */}
            <HeroFade />
          </div>
          <Pricing />
          <section className="py-16 bg-background">
            <ValueProps />
          </section>
          <Features />
          <HowItWorks />
          <Comparison />
          <FAQ />
          <CTA />
        </main>
        <Footer />
      </div>
    </TooltipProvider>
  );
}
