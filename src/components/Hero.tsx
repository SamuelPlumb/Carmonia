import { Button } from "./Button";
import { ChevronRight, Star } from "./icons";

export function Hero() {
  return (
    <div className="w-full max-w-3xl mx-auto px-5 min-h-[90vh] flex flex-col justify-center items-center text-center gap-4">
      <a
        href="#"
        className="inline-flex items-center gap-2 pl-1.5 pr-2.5 py-1.5 rounded-lg bg-primary/10 text-sm font-medium text-primary hover:bg-primary/15 transition-colors"
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

      <h1 className="text-6xl/[1.05] text-foreground font-bold text-balance max-w-md">
        Car finance made simple
      </h1>
      <p className="w-full max-w-md font-medium text-lg/6 text-muted-foreground">
        Get a decision in minutes with no impact on your credit score, then drive away in a car you love.
      </p>

      <div className="flex flex-col md:flex-row items-center gap-4 mt-1">
        <Button className="w-[320px] md:w-auto">Get my quote</Button>
      </div>
    </div>
  );
}
