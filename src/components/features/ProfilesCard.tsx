import { Car, BadgeCheck, FactCheck } from "../icons";
import { FeatureText } from "./FeatureText";
import { Avatar } from "../Avatar";
import { Card } from "@/components/ui/card";

type Profile = {
  name: string; // car model
  flag: string; // make's country of origin
  source: string; // fuel type
  revenue?: string; // listing price
  time: string; // registration year
  identified?: boolean; // history-checked
};

const PROFILES: Profile[] = [
  { name: "Ford Fiesta", flag: "🇺🇸", source: "Petrol", revenue: "£8,995", time: "2019", identified: true },
  { name: "Volkswagen Golf", flag: "🇩🇪", source: "Diesel", revenue: "£12,450", time: "2020" },
  { name: "BMW 3 Series", flag: "🇩🇪", source: "Hybrid", revenue: "£18,900", time: "2021", identified: true },
  { name: "Audi A3", flag: "🇩🇪", source: "Petrol", revenue: "£14,250", time: "2020" },
  { name: "Nissan Qashqai", flag: "🇯🇵", source: "Petrol", revenue: "£11,750", time: "2019", identified: true },
  { name: "Tesla Model 3", flag: "🇺🇸", source: "Electric", revenue: "£24,500", time: "2022" },
  { name: "Vauxhall Corsa", flag: "🇬🇧", source: "Petrol", revenue: "£7,495", time: "2018", identified: true },
  { name: "Mercedes A-Class", flag: "🇩🇪", source: "Diesel", revenue: "£16,800", time: "2021" },
  { name: "Toyota Yaris", flag: "🇯🇵", source: "Hybrid", revenue: "£10,995", time: "2020", identified: true },
  { name: "Kia Sportage", flag: "🇰🇷", source: "Petrol", revenue: "£13,250", time: "2019" },
];

function Row({ p }: { p: Profile }) {
  return (
    <div className="w-full flex items-center shrink-0 gap-4 overflow-hidden px-8" style={{ height: 44 }}>
      <div className="flex items-center">
        <span className="rounded-full overflow-hidden border border-background">
          <Avatar name={p.name} size={20} />
        </span>
        <span className="-ml-1 text-[13px] leading-none border border-background rounded-full bg-muted">{p.flag}</span>
      </div>
      <div className="flex-1 flex items-center gap-1 overflow-hidden min-w-0">
        <span className="text-sm font-medium truncate text-foreground">{p.name}</span>
        {p.identified && <BadgeCheck className="text-primary shrink-0" />}
      </div>
      <div className="hidden md:flex w-28 items-center">
        <span className="max-w-full text-xs inline-flex h-6 pl-1.5 pr-2.5 gap-1 rounded-md items-center bg-background border border-foreground/10">
          <span className="w-4 h-4 rounded-sm bg-accent flex items-center justify-center text-[9px] font-semibold text-muted-foreground shrink-0">
            {p.source[0]}
          </span>
          <span className="truncate text-foreground">{p.source}</span>
        </span>
      </div>
      <span className="w-16 font-medium shrink-0 text-[13px] text-primary">{p.revenue ?? ""}</span>
      <span className="shrink-0 text-[13px] text-right text-muted-foreground w-10">{p.time}</span>
    </div>
  );
}

export function ProfilesCard() {
  return (
    <Card className="flex flex-col bg-muted rounded-xl min-h-[280px] overflow-hidden border-0 shadow-none gap-0 py-0">
      <FeatureText
        accent="pink"
        icon={<Car width={20} height={20} className="text-primary" />}
        title="Browse and buy any car"
        subtitle="Get approved in principle, then choose a car you love."
        items={[
          { icon: <BadgeCheck width={16} height={16} />, label: "Buy from any reputable dealer" },
          { icon: <FactCheck width={16} height={16} />, label: "Free vehicle and history check" },
          { icon: <Car width={16} height={16} />, label: "Over 100,000 cars in our members area" },
        ]}
      />
      <div className="w-full h-[320px] relative overflow-hidden mask-fade-y">
        <div className="flex flex-col" style={{ animation: "marquee-vertical 26s linear infinite" }}>
          {[...PROFILES, ...PROFILES].map((p, i) => (
            <Row key={`${p.name}-${i}`} p={p} />
          ))}
        </div>
      </div>
    </Card>
  );
}
