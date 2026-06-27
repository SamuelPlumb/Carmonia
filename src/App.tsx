import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { ValueProps } from "./components/ValueProps";
import { Features } from "./components/Features";
import { HowItWorks } from "./components/HowItWorks";
import { Comparison } from "./components/Comparison";
import { Pricing } from "./components/Pricing";
import { FAQ } from "./components/FAQ";
import { CTA } from "./components/CTA";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <TooltipProvider delayDuration={150}>
      <div className="flex flex-col min-h-dvh w-full overflow-x-hidden antialiased bg-background text-muted-foreground">
        <Navbar />
        <main className="flex flex-col flex-1">
          <div className="pt-40 pb-16 bg-background flex flex-col gap-16 relative overflow-hidden">
            <Hero />
            <ValueProps />
          </div>
          <Features />
          <HowItWorks />
          <Comparison />
          <Pricing />
          <FAQ />
          <CTA />
        </main>
        <Footer />
      </div>
    </TooltipProvider>
  );
}
