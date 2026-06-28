import { SectionHeader } from "./SectionHeader";
import { PerformanceCard } from "./features/PerformanceCard";
import { RealtimeCard } from "./features/RealtimeCard";
import { BadCreditCard } from "./features/BadCreditCard";
import { ProfilesCard } from "./features/ProfilesCard";

export function Features() {
  return (
    <section id="features" className="w-full max-w-5xl px-5 mx-auto py-16 flex flex-col gap-12 scroll-mt-28">
      <SectionHeader
        badge="Features"
        title="Everything you need to finance your next car"
        subtitle="From a soft-search quote to choosing your car, we make every step of getting car finance straightforward."
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <PerformanceCard />
        <RealtimeCard />
        <BadCreditCard />
        <ProfilesCard />
      </div>
    </section>
  );
}
