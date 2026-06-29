import { SectionHeader } from "./SectionHeader";
import { QuoteCard } from "./features/QuoteCard";
import { LendersCard } from "./features/LendersCard";
import { BadCreditCard } from "./features/BadCreditCard";
import { CarsCard } from "./features/CarsCard";

export function Features() {
  return (
    <section id="features" className="w-full max-w-5xl px-5 mx-auto py-16 flex flex-col gap-12 scroll-mt-28">
      <SectionHeader
        badge="Features"
        title="Everything you need to finance your next car"
        subtitle="From a soft-search quote to choosing your car, we make every step of getting car finance straightforward."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <QuoteCard />
        <LendersCard />
        <BadCreditCard />
        <CarsCard />
      </div>
    </section>
  );
}
