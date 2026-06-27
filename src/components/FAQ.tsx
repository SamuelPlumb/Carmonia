import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

const ITEMS = [
  {
    q: "How does car finance work?",
    a: "Car finance lets you spread the cost of a car, plus interest, into fixed monthly payments over an agreed term. You apply, get a decision, choose your car and pay it off month by month rather than in one lump sum.",
  },
  {
    q: "Will applying affect my credit score?",
    a: "No. Getting a quote uses a soft search, which won't affect your credit score or be visible to other lenders. A full credit check only happens later, with your permission, if you decide to go ahead.",
  },
  {
    q: "Can I get car finance with bad credit?",
    a: "Often, yes. We work with lenders who consider applications from people with bad credit, CCJs or past defaults. Your circumstances and affordability matter as much as your score.",
  },
  {
    q: "What's the difference between HP and PCP?",
    a: "With Hire Purchase (HP) you pay off the full value of the car and own it outright at the end. With Personal Contract Purchase (PCP) you pay off the depreciation for lower monthly payments, then choose to hand the car back or pay a final balloon payment to own it.",
  },
  {
    q: "Do you charge any fees?",
    a: "No. Our service is free to you. We're paid a commission by the lender if you take out finance, which doesn't affect the amount you pay.",
  },
  {
    q: "How quickly can I get a decision?",
    a: "Usually within minutes of completing your online application. Once you've chosen your car, the remaining checks and paperwork are typically completed within a day or two.",
  },
  {
    q: "Can I buy a car from any dealer?",
    a: "Yes. Once you're approved in principle you can choose a car from any reputable dealer, or browse cars to suit your budget in our members area. We'll run a free vehicle and history check on any car you like.",
  },
  {
    q: "Do I need a deposit?",
    a: "Not always. Many of our lenders offer no-deposit options, and you can use a part exchange as your deposit. A deposit can lower your monthly payments, but it isn't always required.",
  },
  {
    q: "Can I settle my finance early?",
    a: "Yes. You can usually settle your agreement early and may reduce the total interest you pay. Your lender will provide a settlement figure on request.",
  },
];

export function FAQ() {
  return (
    <section className="py-16 flex flex-col gap-10 items-center">
      <div className="w-full max-w-3xl mx-auto px-5 flex flex-col items-center text-center gap-4">
        <h2 className="text-4xl leading-11 text-foreground text-balance max-w-md">Frequently asked questions</h2>
        <p className="w-full max-w-md font-medium text-lg/6 text-muted-foreground">
          Quick answers to common questions about car finance, eligibility, credit scores and how we work.
        </p>
      </div>

      <Accordion type="single" collapsible defaultValue="item-0" className="w-full max-w-2xl mx-auto px-5">
        {ITEMS.map((item, i) => (
          <AccordionItem key={item.q} value={`item-${i}`} className="border-border">
            <AccordionTrigger className="py-5 text-base text-foreground hover:no-underline">{item.q}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground text-base max-w-xl pb-5">{item.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
