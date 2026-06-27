import type { SVGProps } from "react";

const COLUMNS = [
  { title: "Finance", links: ["Car finance", "Bad credit car finance", "No deposit car finance", "Refinance"] },
  { title: "Tools", links: ["Calculator", "Eligibility check", "Browse cars", "Guides"] },
  { title: "Compare", links: ["HP vs PCP", "Dealer finance", "Bank loans"] },
  { title: "Company", links: ["About us", "Contact", "Reviews"] },
];

const LEGAL = ["Privacy", "Terms", "Cookies", "Complaints"];

function Column({ title, links }: { title: string; links: string[] }) {
  return (
    <nav className="flex flex-col gap-2.5" aria-label={`${title} navigation`}>
      <h3 className="text-sm font-medium text-foreground">{title}</h3>
      {links.map((l) => (
        <a key={l} href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors w-fit">
          {l}
        </a>
      ))}
    </nav>
  );
}

function LinkedInIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width={17} height={17} fill="currentColor" aria-hidden {...props}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14M7.12 20.45H3.55V9h3.57zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden pt-20 pb-12 bg-background">
      <div className="w-full max-w-5xl mx-auto px-5 relative z-10">
        {/* nav columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {COLUMNS.map((c) => (
            <Column key={c.title} {...c} />
          ))}
        </div>

        {/* regulatory small print */}
        <p className="mt-14 pt-6 border-t border-border text-xs/5 text-muted-foreground">
          Carmonia is a credit broker, not a lender. Carmonia is authorised and regulated by the Financial Conduct Authority,
          Firm Reference Number [FRN]. We work with a panel of lenders and can introduce you to a limited number of finance
          providers; we are not impartial and do not offer independent advice or recommendations. We will receive a commission
          from the lender if you take out finance, which may be a fixed fee or a percentage of the amount you borrow and may
          vary by lender and product. This will not affect the amount you pay, and the amount of any commission will be
          disclosed to you before you sign. Rates from [8.9]% APR. The rate you are offered will depend on your individual
          circumstances. Finance is subject to status and affordability. Applicants must be UK residents aged 18 or over.
          Terms and conditions apply. Written quotations are available on request.
        </p>

        {/* legal + social bar */}
        <div className="mt-8 pt-6 border-t border-border flex flex-col-reverse md:flex-row items-center justify-between gap-5">
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
            <span>© 2026 Carmonia</span>
            {LEGAL.map((l) => (
              <a key={l} href="#" className="hover:text-foreground transition-colors">
                {l}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <a
              href="#"
              aria-label="Carmonia on LinkedIn"
              className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <LinkedInIcon />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
