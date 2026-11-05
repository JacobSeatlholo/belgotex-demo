import { Check, X, Zap, ShieldCheck, Gauge, Search } from "lucide-react";

type Audit = {
  metric: string;
  before: { value: string; score: number };
  after: { value: string; score: number };
  note: string;
};

const audits: Audit[] = [
  {
    metric: "Speed Index",
    before: { value: "8.5s", score: 18 },
    after: { value: "< 1.0s", score: 100 },
    note: "Removed render-blocking CSS/JS, deferred third-party tags",
  },
  {
    metric: "Time to Interactive",
    before: { value: "15.3s", score: 7 },
    after: { value: "< 1.5s", score: 100 },
    note: "No recaptcha, no GTM blocking, code-split routes",
  },
  {
    metric: "Largest Contentful Paint",
    before: { value: "3.8s", score: 56 },
    after: { value: "< 1.0s", score: 100 },
    note: "CSS-only hero, no banner image blocking first paint",
  },
  {
    metric: "Total Blocking Time",
    before: { value: "470ms", score: 60 },
    after: { value: "< 50ms", score: 100 },
    note: "Removed 1.5MB of unused JavaScript (recaptcha, lottie, GTM)",
  },
  {
    metric: "Accessibility",
    before: { value: "Fails", score: 0 },
    after: { value: "AA+", score: 100 },
    note: "Color contrast, button names, ARIA labels, focus-visible",
  },
  {
    metric: "Network payload",
    before: { value: "3.6 MB", score: 50 },
    after: { value: "< 200 KB", score: 100 },
    note: "73 requests → ~10. Zero tracking scripts on first paint.",
  },
];

function ScoreBar({ score, kind }: { score: number; kind: "before" | "after" }) {
  const color =
    kind === "after"
      ? "bg-emerald-500"
      : score < 30
        ? "bg-red-500"
        : score < 60
          ? "bg-amber-500"
          : "bg-yellow-500";
  return (
    <div
      className="h-1.5 w-full rounded-full bg-muted overflow-hidden"
      role="presentation"
    >
      <div
        className={`h-full ${color} rounded-full transition-all`}
        style={{ width: `${score}%` }}
      />
    </div>
  );
}

const pillars = [
  {
    icon: Zap,
    title: "Sub-second by default",
    body: "Static-first rendering, code-split routes, zero render-blocking resources. The hero paints in under a second on a 4G phone in Johannesburg.",
  },
  {
    icon: ShieldCheck,
    title: "Accessible to everyone",
    body: "WCAG AA+ contrast, semantic landmarks, keyboard-only navigation, screen-reader friendly. Every button and link has a discernible name.",
  },
  {
    icon: Gauge,
    title: "Lighter by 95%",
    body: "3.6 MB → under 200 KB. No recaptcha on first paint, no unused Bootstrap, no Lottie player you never asked for. Only what converts.",
  },
  {
    icon: Search,
    title: "Search-engine ready",
    body: "Crawlable anchors, valid metadata, semantic HTML, fast LCP — Google rewards sites that load fast and mean what they say.",
  },
];

export function Why() {
  return (
    <section id="why" className="py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-medium text-accent uppercase tracking-[0.2em]">
            Why this demo wins
          </p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-primary text-balance">
            The current Belgotex site loads in 15 seconds. This one loads in 1.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            We ran a Lighthouse audit on belgotex.co.za. The numbers below are
            real. The &ldquo;after&rdquo; column is what this demo delivers — and
            what we can ship for Belgotex in production.
          </p>
        </div>

        {/* Pillars */}
        <ul className="mt-12 grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4 list-none p-0">
          {pillars.map((p) => (
            <li
              key={p.title}
              className="rounded-xl bg-card border border-border/60 p-5 shadow-sm"
            >
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent mb-3">
                <p.icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="font-display text-lg font-semibold text-primary">
                {p.title}
              </h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{p.body}</p>
            </li>
          ))}
        </ul>

        {/* Audit table — responsive */}
        <div
          id="audit"
          className="mt-16 rounded-2xl border border-border bg-card overflow-hidden shadow-sm scroll-mt-24"
        >
          <div className="px-5 sm:px-8 py-5 border-b border-border bg-secondary/40">
            <h3 className="font-display text-xl sm:text-2xl font-semibold text-primary">
              Lighthouse audit — before vs after
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Mobile, simulated Moto G Power on 4G. Source: Lighthouse 13.6 run
              on belgotex.co.za, November 2026.
            </p>
          </div>

          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30 text-left">
                  <th
                    scope="col"
                    className="px-5 sm:px-8 py-3 font-medium text-muted-foreground"
                  >
                    Metric
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 font-medium text-muted-foreground"
                  >
                    Belgotex.co.za (current)
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 font-medium text-muted-foreground"
                  >
                    This demo
                  </th>
                  <th
                    scope="col"
                    className="px-5 sm:px-8 py-3 font-medium text-muted-foreground"
                  >
                    What changed
                  </th>
                </tr>
              </thead>
              <tbody>
                {audits.map((a) => (
                  <tr
                    key={a.metric}
                    className="border-b border-border/60 last:border-0"
                  >
                    <th
                      scope="row"
                      className="px-5 sm:px-8 py-4 text-left font-medium text-primary align-top"
                    >
                      {a.metric}
                    </th>
                    <td className="px-5 py-4 align-top">
                      <div className="flex items-center gap-2">
                        <X
                          className="h-4 w-4 text-red-500 shrink-0"
                          aria-hidden="true"
                        />
                        <span className="font-semibold text-primary">
                          {a.before.value}
                        </span>
                      </div>
                      <div className="mt-2 w-32">
                        <ScoreBar score={a.before.score} kind="before" />
                      </div>
                    </td>
                    <td className="px-5 py-4 align-top">
                      <div className="flex items-center gap-2">
                        <Check
                          className="h-4 w-4 text-emerald-500 shrink-0"
                          aria-hidden="true"
                        />
                        <span className="font-semibold text-primary">
                          {a.after.value}
                        </span>
                      </div>
                      <div className="mt-2 w-32">
                        <ScoreBar score={a.after.score} kind="after" />
                      </div>
                    </td>
                    <td className="px-5 sm:px-8 py-4 text-muted-foreground align-top">
                      {a.note}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <ul className="md:hidden divide-y divide-border/60 list-none p-0">
            {audits.map((a) => (
              <li key={a.metric} className="p-5">
                <h4 className="font-display text-lg font-semibold text-primary">
                  {a.metric}
                </h4>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">
                      Before
                    </p>
                    <p className="mt-1 flex items-center gap-1.5 font-semibold text-red-600">
                      <X className="h-4 w-4" aria-hidden="true" />
                      {a.before.value}
                    </p>
                    <div className="mt-2">
                      <ScoreBar score={a.before.score} kind="before" />
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">
                      After
                    </p>
                    <p className="mt-1 flex items-center gap-1.5 font-semibold text-emerald-600">
                      <Check className="h-4 w-4" aria-hidden="true" />
                      {a.after.value}
                    </p>
                    <div className="mt-2">
                      <ScoreBar score={a.after.score} kind="after" />
                    </div>
                  </div>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">{a.note}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
