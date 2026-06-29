import { Handshake, BadgeCheck, Tag, Groups } from "../icons";
import { FeatureText } from "./FeatureText";
import { UkMap } from "../UkMap";
import { Card } from "@/components/ui/card";

export function LendersCard() {
  return (
    <Card className="bg-muted rounded-xl min-h-[280px] overflow-hidden flex flex-col border-0 shadow-none gap-0 py-0">
      <FeatureText
        accent="sky"
        icon={<Handshake className="text-primary" />}
        title="Panel of lenders"
        subtitle="One application puts you in front of our whole panel of UK lenders."
        items={[
          { icon: <BadgeCheck width={20} height={20} />, label: "Over 15 trusted lenders" },
          { icon: <Tag width={20} height={20} />, label: "One form, multiple offers" },
          { icon: <Groups width={20} height={20} />, label: "Deals for all credit profiles" },
        ]}
      />
      <div className="w-full h-[320px] shrink-0 relative overflow-hidden">
        <UkMap />
      </div>
    </Card>
  );
}
