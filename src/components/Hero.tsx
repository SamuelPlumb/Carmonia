import type { CSSProperties } from "react";
import { Button } from "./Button";
import { ChevronRight, Star } from "./icons";

// Lets the load cascade set `--appear-delay` inline without a type cast war.
type CSSVars = CSSProperties & Record<`--${string}`, string | number>;
const delay = (ms: number): CSSVars => ({ "--appear-delay": `${ms}ms` });

export function Hero() {
  return (
    <div className="w-full max-w-3xl mx-auto px-5 flex flex-col justify-center items-center text-center gap-6">
      <a
        href="#"
        className="appear inline-flex items-center gap-2 pl-1.5 pr-2.5 py-1.5 rounded-lg bg-primary/10 text-sm font-medium text-primary hover:bg-primary/15 transition-colors"
        style={delay(0)}
      >
        <span className="px-1.5 h-5 flex items-center gap-0.5 justify-center rounded-md bg-linear-to-r from-primary to-primary text-xs font-medium">
          <Star width={12} height={12} className="text-white" />
          <span className="text-white">4.9</span>
        </span>
        <span
          className="relative inline-block"
          style={{
            WebkitMaskImage: "linear-gradient(90deg, black 40%, rgba(0,0,0,0.35) 50%, black 60%)",
            maskImage: "linear-gradient(90deg, black 40%, rgba(0,0,0,0.35) 50%, black 60%)",
            WebkitMaskSize: "200% 100%",
            maskSize: "200% 100%",
            animation: "badge-shimmer 3.5s linear infinite",
          }}
        >
          Rated Excellent on Trustpilot
        </span>
        <ChevronRight width={16} height={16} className="-ml-1" />
      </a>

      <h1 className="appear text-6xl text-foreground font-bold text-balance max-w-md" style={delay(60)}>
        Car finance that gets you moving
      </h1>
      <p className="appear w-full max-w-md font-medium text-lg/6 text-muted-foreground" style={delay(140)}>
        Get a decision in minutes with no impact on your credit score, then drive away in a car you love.
      </p>

      <div className="appear flex flex-col md:flex-row items-center gap-4" style={delay(220)}>
        <Button className="w-[320px] md:w-auto">Get my quote</Button>
      </div>

      <p className="appear max-w-md text-xs text-muted-foreground" style={delay(300)}>
        Carmonia is a credit broker, not a lender. Our rep rates start from 8.9%, representative APR 18.1%.
      </p>
    </div>
  );
}
