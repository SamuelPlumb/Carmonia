import { Button } from "./Button";

export function CTA() {
  return (
    <section className="py-16">
      <div className="w-full max-w-3xl mx-auto px-5 flex flex-col items-center text-center gap-5">
        <h2 className="text-4xl text-center text-foreground leading-11 text-balance max-w-md">
          Find your next car today
        </h2>
        <p className="w-full max-w-md font-medium text-lg/6 text-muted-foreground">
          Get a quote in minutes with no impact on your credit score and see what you could borrow.
        </p>
        <div className="flex flex-col md:flex-row items-center gap-4 mt-1">
          <Button className="w-[288px] md:w-auto">Get my quote</Button>
        </div>
      </div>
    </section>
  );
}
