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
    after: { value: "under 1.0s", score: 100 },
    note: "Removed render-blocking CSS and JavaScript, deferred third-party tags",
  },
  {
    metric: "Time to Interactive",
    before: { value: "15.3s", score: 7 },
    after: { value: "under 1.5s", score: 100 },
    note: "No reCAPTCHA, no Google Tag Manager blocking, code-split routes",
  },
  {
    metric: "Largest Contentful Paint",
    before: { value: "3.8s", score: 56 },
    after: { value: "under 1.2s", score: 100 },
    note: "Optimised hero image with next/image, lazy-loaded below the fold",
  },
  {
    metric: "Total Blocking Time",
    before: { value: "470ms", score: 60 },
    after: { value: "under 50ms", score: 100 },
    note: "Removed 1.5 MB of unused JavaScript including recaptcha and Lottie",
  },
  {
    metric: "Accessibility",
    before: { value: "Fails", score: 0 },
    after: { value: "WCAG AA+", score: 100 },
    note: "Fixed colour contrast, button names, ARIA labels and focus order",
  },
  {
    metric: "Network payload",
    before: { value: "3.6 MB", score: 50 },
    after: { value: "under 500 KB", score: 100 },
    note: "73 requests down to 12. No tracking scripts on first paint.",
  },
];

function ScoreBar({ score, kind }: { score: number; kind: "before" | "after" }) {
  const color =
    kind === "after"
      ? "bg-[#009347]"
      : score < 30
        ? "bg-[#991f1f]"
        : score < 60
          ? "bg-[#ff6941]"
          : "bg-[#c8c1b9]";
  return (
    <div
      className="h-1.5 w-full rounded-full bg-[#e0ded1] overflow-hidden"
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
    body: "Static-first rendering, code-split routes and zero render-blocking resources. The hero paints in under a second on a 4G phone in Johannesburg.",
  },
  {
    icon: ShieldCheck,
    title: "Accessible to everyone",
    body: "WCAG AA+ contrast, semantic landmarks, keyboard-only navigation and screen-reader friendly markup. Every button and link has a discernible name.",
  },
  {
    icon: Gauge,
    title: "Lighter by 85 percent",
    body: "3.6 MB down to under 500 KB. No reCAPTCHA on first paint, no unused Bootstrap, no Lottie player. Only what converts.",
  },
  {
    icon: Search,
    title: "Search-engine ready",
    body: "Crawlable anchors, valid metadata, semantic HTML and fast LCP. Google rewards sites that load fast and mean what they say.",
  },
];

export function Why() {
  return (
    <section id="performance" className="py-16 sm:py-24 lg:py-28 bg-white scroll-mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold text-[#009347] uppercase tracking-[0.2em]">
            A Better Belgotex
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#212529] text-balance">
            The current Belgotex site loads in 15 seconds. This one loads in 1.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#63666a] text-pretty">
            We ran a Lighthouse 13.6 audit on belgotex.co.za in November 2026.
            The numbers below are real. The right-hand column is what this demo
            delivers, and what we can ship for Belgotex in production.
          </p>
        </div>

        <ul className="mt-12 grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4 list-none p-0">
          {pillars.map((p) => (
            <li
              key={p.title}
              className="rounded-lg bg-[#ece8e5] border border-[#c8c1b9] p-5"
            >
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-[#009347] text-white mb-3">
                <p.icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-semibold text-[#212529]">
                {p.title}
              </h3>
              <p className="mt-1.5 text-sm text-[#63666a] leading-relaxed">
                {p.body}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-12 rounded-lg border border-[#c8c1b9] bg-white overflow-hidden shadow-sm">
          <div className="px-5 sm:px-8 py-5 border-b border-[#c8c1b9] bg-[#ece8e5]">
            <h3 className="text-xl sm:text-2xl font-semibold text-[#212529]">
              Lighthouse audit, before and after
            </h3>
            <p className="mt-1 text-sm text-[#63666a]">
              Mobile, simulated Moto G Power on 4G. Source: Lighthouse 13.6 run
              on belgotex.co.za, November 2026.
            </p>
          </div>

          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#c8c1b9] bg-[#f4f4f4] text-left">
                  <th scope="col" className="px-5 sm:px-8 py-3 font-medium text-[#63666a]">
                    Metric
                  </th>
                  <th scope="col" className="px-5 py-3 font-medium text-[#63666a]">
                    belgotex.co.za (current)
                  </th>
                  <th scope="col" className="px-5 py-3 font-medium text-[#63666a]">
                    This demo
                  </th>
                  <th scope="col" className="px-5 sm:px-8 py-3 font-medium text-[#63666a]">
                    What changed
                  </th>
                </tr>
              </thead>
              <tbody>
                {audits.map((a) => (
                  <tr
                    key={a.metric}
                    className="border-b border-[#c8c1b9] last:border-0"
                  >
                    <th
                      scope="row"
                      className="px-5 sm:px-8 py-4 text-left font-medium text-[#212529] align-top"
                    >
                      {a.metric}
                    </th>
                    <td className="px-5 py-4 align-top">
                      <div className="flex items-center gap-2">
                        <X
                          className="h-4 w-4 text-[#991f1f] shrink-0"
                          aria-hidden="true"
                        />
                        <span className="font-semibold text-[#212529]">
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
                          className="h-4 w-4 text-[#009347] shrink-0"
                          aria-hidden="true"
                        />
                        <span className="font-semibold text-[#212529]">
                          {a.after.value}
                        </span>
                      </div>
                      <div className="mt-2 w-32">
                        <ScoreBar score={a.after.score} kind="after" />
                      </div>
                    </td>
                    <td className="px-5 sm:px-8 py-4 text-[#63666a] align-top">
                      {a.note}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ul className="md:hidden divide-y divide-[#c8c1b9] list-none p-0">
            {audits.map((a) => (
              <li key={a.metric} className="p-5">
                <h4 className="text-lg font-semibold text-[#212529]">
                  {a.metric}
                </h4>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-[#63666a] uppercase tracking-wider">
                      Before
                    </p>
                    <p className="mt-1 flex items-center gap-1.5 font-semibold text-[#991f1f]">
                      <X className="h-4 w-4" aria-hidden="true" />
                      {a.before.value}
                    </p>
                    <div className="mt-2">
                      <ScoreBar score={a.before.score} kind="before" />
                    </div>
                  </div>
                  <div>
                    <p className="text-xs text-[#63666a] uppercase tracking-wider">
                      After
                    </p>
                    <p className="mt-1 flex items-center gap-1.5 font-semibold text-[#009347]">
                      <Check className="h-4 w-4" aria-hidden="true" />
                      {a.after.value}
                    </p>
                    <div className="mt-2">
                      <ScoreBar score={a.after.score} kind="after" />
                    </div>
                  </div>
                </div>
                <p className="mt-3 text-sm text-[#63666a]">{a.note}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
