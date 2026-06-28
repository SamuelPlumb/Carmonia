import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo, ChevronDown, Car, CreditScore, Calculator, Search, IconBox } from "./icons";
import { Button } from "./Button";

type Feature = {
  label: string;
  desc: string;
  href: string;
  Icon: typeof Car;
};

const FEATURES: Feature[] = [
  { label: "Car finance", desc: "HP and PCP from a panel of lenders", href: "#features", Icon: Car },
  { label: "Bad credit", desc: "Finance options for every credit profile", href: "#features", Icon: CreditScore },
  { label: "Calculator", desc: "Estimate your monthly payments", href: "#features", Icon: Calculator },
  { label: "Browse cars", desc: "Find a car to suit your budget", href: "#features", Icon: Search },
];

const LINKS = [
  { label: "Calculator", href: "#pricing" },
  { label: "Guides", href: "#" },
  { label: "Reviews", href: "#" },
];

function FeatureGrid({ onNavigate }: { onNavigate: () => void }) {
  return (
    <div className="grid grid-cols-2 gap-2 p-2">
      {FEATURES.map((f) => (
        <a
          key={f.label}
          href={f.href}
          onClick={onNavigate}
          className="flex flex-col items-center text-center gap-1.5 p-5 rounded-xl bg-background shadow-sm transition-colors hover:bg-muted"
        >
          <IconBox className="mb-3">
            <f.Icon width={20} height={20} className="text-primary" />
          </IconBox>
          <span className="text-foreground font-medium leading-none">{f.label}</span>
          <span className="text-muted-foreground text-sm leading-tight">{f.desc}</span>
        </a>
      ))}
    </div>
  );
}

export function Navbar() {
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile — pill expands into a full menu panel */}
      <header className="fixed top-4 left-4 right-4 z-[99] md:hidden bg-foreground backdrop-blur-lg rounded-2xl shadow-xs overflow-hidden">
        <div className="flex items-center justify-between h-13 pl-4 pr-3.25">
          <a href="#" aria-label="Carmonia home">
            <Logo className="shrink-0 text-background" />
          </a>
          <div className="flex items-center gap-4">
            <a href="#" className="text-sm font-medium text-background/60 hover:text-background transition-colors">
              Sign in
            </a>
            <Button size="sm">Get my quote</Button>
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              className="flex items-center justify-center h-8 w-8 -mr-1 text-background/60 hover:text-background transition-colors outline-none"
            >
              {mobileOpen ? <X className="size-[18px]" /> : <Menu className="size-[18px]" />}
            </button>
          </div>
        </div>

        <div
          className="grid transition-all duration-300 ease-out"
          style={{ gridTemplateRows: mobileOpen ? "1fr" : "0fr", opacity: mobileOpen ? 1 : 0 }}
        >
          <div className="overflow-hidden">
            <span className="block px-4 pt-1 pb-1.5 text-sm font-medium text-background/40">Features</span>
            <FeatureGrid onNavigate={() => setMobileOpen(false)} />
            <nav className="flex flex-col px-3 pb-1 mt-1">
              {LINKS.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-1 py-3 text-sm font-medium text-background/70 hover:text-background border-t border-background/10 transition-colors"
                >
                  {l.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Desktop — nav pill that expands into a Features mega-menu on hover */}
      <header
        onMouseLeave={() => setFeaturesOpen(false)}
        className="fixed top-8 left-1/2 -translate-x-1/2 z-[99] w-auto min-w-[560px] bg-foreground backdrop-blur-lg rounded-2xl shadow-xs hidden md:block overflow-hidden"
      >
        <div className="flex items-center gap-2 h-13 pl-4 pr-3.25 whitespace-nowrap">
          <a href="#" aria-label="Carmonia home">
            <Logo className="shrink-0 text-background" />
          </a>
          <nav className="flex items-center text-sm">
            <button
              type="button"
              onMouseEnter={() => setFeaturesOpen(true)}
              onClick={() => setFeaturesOpen((v) => !v)}
              aria-expanded={featuresOpen}
              className="group flex items-center gap-0.5 px-2 py-1 text-sm font-medium transition-colors text-background/60 hover:text-background outline-none"
            >
              Features
              <ChevronDown className={`transition-transform duration-200 ${featuresOpen ? "rotate-180" : ""}`} />
            </button>
            {LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onMouseEnter={() => setFeaturesOpen(false)}
                className="px-2 py-1 text-sm font-medium transition-colors text-background/60 hover:text-background"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2 ml-auto">
            <a
              href="#"
              onMouseEnter={() => setFeaturesOpen(false)}
              className="text-sm font-medium transition-colors px-2 text-background/60 hover:text-background"
            >
              Sign in
            </a>
            <Button size="sm">Get my quote</Button>
          </div>
        </div>

        <div
          className="grid transition-all duration-300 ease-out"
          style={{ gridTemplateRows: featuresOpen ? "1fr" : "0fr", opacity: featuresOpen ? 1 : 0 }}
        >
          <div className="overflow-hidden">
            <FeatureGrid onNavigate={() => setFeaturesOpen(false)} />
          </div>
        </div>
      </header>
    </>
  );
}
