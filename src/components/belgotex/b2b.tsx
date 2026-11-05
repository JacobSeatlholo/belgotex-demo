import Link from "next/link";
import {
  Target,
  Mail,
  Phone,
  TrendingUp,
  Users,
  ArrowUpRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Target,
    title: "Outbound to architects & specifiers",
    body: "We don't wait for leads — we generate them. Targeted email + LinkedIn campaigns to the architects, interior designers and quantity surveyors who specify flooring on every commercial project in South Africa.",
  },
  {
    icon: Mail,
    title: "Nurture sequences that convert",
    body: "Sample-request funnels, quote-request automations, abandoned-cart recovery. Every Belgotex website visitor becomes a tracked, nurtured lead — not a bounced statistic.",
  },
  {
    icon: Phone,
    title: "Qualified B2B appointment setting",
    body: "Our Hustle Portal team qualifies every inbound lead, books the demo, hands off a warm opportunity to your sales team. You close. We fill the pipeline.",
  },
  {
    icon: TrendingUp,
    title: "Performance dashboard",
    body: "Real-time view of cost-per-lead, lead-to-quote ratio, quote-to-close. We report on revenue influenced, not vanity metrics. Built for CFOs and CEOs.",
  },
];

const stats = [
  { value: "3.2x", label: "Avg. pipeline lift in 90 days" },
  { value: "47%", label: "Reduction in cost-per-qualified-lead" },
  { value: "120+", label: "B2B leads generated per month" },
  { value: "18 days", label: "Avg. time-to-first-qualified-meeting" },
];

export function B2B() {
  return (
    <section
      id="b2b"
      className="relative py-16 sm:py-24 lg:py-32 bg-primary text-primary-foreground overflow-hidden scroll-mt-20"
    >
      {/* Decorative */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 h-[500px] w-[500px] rounded-full bg-accent/20 blur-3xl translate-x-1/3 -translate-y-1/3"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-accent/10 blur-3xl -translate-x-1/3 translate-y-1/3"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Left: pitch */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-medium text-accent mb-6">
              <Users className="h-3.5 w-3.5" aria-hidden="true" />
              <span>B2B lead generation by Hustle Portal</span>
            </div>

            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-balance">
              A faster site is only half the pitch. The other half is{" "}
              <span className="text-accent italic">pipeline</span>.
            </h2>

            <p className="mt-5 text-lg text-primary-foreground/80 text-pretty">
              Belgotex doesn&apos;t need more traffic. It needs more qualified
              B2B leads — architects specifying carpet tile on a Sandton office
              fit-out, developers sourcing vinyl for a 200-unit residential
              build, contractors pricing rugs for a hotel chain.
            </p>

            <p className="mt-4 text-base text-primary-foreground/70">
              Hustle Portal runs the full B2B demand-generation engine:
              outbound, inbound, nurture, qualification, appointment-setting.
              Belgotex closes. We obsess over the funnel.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Button
                asChild
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90 group"
              >
                <a
                  href="https://www.hustleportal.online/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit Hustle Portal
                  <ArrowUpRight
                    className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              >
                <Link href="#contact">Book a strategy call</Link>
              </Button>
            </div>

            {/* Stats */}
            <dl className="mt-10 grid grid-cols-2 gap-4 sm:gap-6">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-lg border border-primary-foreground/15 bg-primary-foreground/5 p-4"
                >
                  <dt className="text-xs sm:text-sm text-primary-foreground/70">
                    {s.label}
                  </dt>
                  <dd className="mt-1 font-display text-2xl sm:text-3xl font-semibold text-accent">
                    {s.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Right: services */}
          <div className="lg:col-span-7">
            <ul className="grid sm:grid-cols-2 gap-4 sm:gap-5 list-none p-0">
              {services.map((s) => (
                <li
                  key={s.title}
                  className="rounded-xl border border-primary-foreground/15 bg-primary-foreground/5 p-5 sm:p-6 hover:bg-primary-foreground/10 transition-colors"
                >
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent/20 text-accent mb-3">
                    <s.icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-primary-foreground">
                    {s.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-primary-foreground/75">
                    {s.body}
                  </p>
                </li>
              ))}
            </ul>

            <div className="mt-6 rounded-xl border border-accent/30 bg-accent/5 p-5 sm:p-6">
              <p className="text-sm text-primary-foreground/85">
                <span className="font-semibold text-accent">
                  Built for Belgotex.
                </span>{" "}
                We start with a 30-day diagnostic: who&apos;s visiting
                belgotex.co.za, where they drop off, which B2B accounts are
                in-market right now. Then we ship.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
