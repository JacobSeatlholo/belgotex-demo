import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Product = {
  name: string;
  tagline: string;
  description: string;
  category: string;
  cta: string;
  href: string;
  /** CSS gradient — instant render, zero network cost */
  gradient: string;
  pattern: "lines" | "grid" | "waves" | "dots";
  accent: string;
};

const products: Product[] = [
  {
    name: "Carpet",
    tagline: "Broadloom & Rugs",
    description:
      "Plush, high-performance cut-pile carpets engineered for busy South African homes and high-traffic commercial interiors.",
    category: "Residential + Commercial",
    cta: "Explore carpets",
    href: "#contact",
    gradient: "from-amber-100 via-orange-50 to-rose-100",
    pattern: "lines",
    accent: "text-amber-700",
  },
  {
    name: "Vinyl",
    tagline: "Luxury Vinyl Tile",
    description:
      "Sylvan by Belgotex — vinyl tiles that mirror the warmth of natural timber with the resilience of modern engineering.",
    category: "Waterproof | Wear-resistant",
    cta: "Explore vinyl",
    href: "#contact",
    gradient: "from-emerald-100 via-teal-50 to-cyan-100",
    pattern: "waves",
    accent: "text-emerald-700",
  },
  {
    name: "Carpet Tile",
    tagline: "Modular Flooring",
    description:
      "Accelerate Edit — state-of-the-art modular carpet tiles. Mix, match, replace a single tile. Built for agile commercial spaces.",
    category: "Modular | Replaceable",
    cta: "Explore tiles",
    href: "#contact",
    gradient: "from-rose-100 via-red-50 to-orange-100",
    pattern: "grid",
    accent: "text-rose-700",
  },
  {
    name: "Artificial Grass",
    tagline: "Lawn & Landscape",
    description:
      "Year-round green without the water bill. UV-stabilised, pet-friendly, child-safe artificial grass for homes, schools and pitches.",
    category: "UV-stable | Pet-friendly",
    cta: "Explore grass",
    href: "#contact",
    gradient: "from-lime-100 via-green-50 to-emerald-100",
    pattern: "dots",
    accent: "text-green-700",
  },
];

function Pattern({ kind }: { kind: Product["pattern"] }) {
  const common = "absolute inset-0 opacity-[0.18] mix-blend-multiply";
  if (kind === "lines") {
    return (
      <svg
        aria-hidden="true"
        className={common}
        viewBox="0 0 200 200"
        preserveAspectRatio="none"
      >
        {Array.from({ length: 18 }).map((_, i) => (
          <line
            key={i}
            x1="0"
            y1={i * 12}
            x2="200"
            y2={i * 12 + 6}
            stroke="currentColor"
            strokeWidth="1.2"
          />
        ))}
      </svg>
    );
  }
  if (kind === "grid") {
    return (
      <svg
        aria-hidden="true"
        className={common}
        viewBox="0 0 200 200"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern id="p-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <rect width="40" height="40" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <rect x="20" y="20" width="20" height="20" fill="currentColor" opacity="0.4" />
          </pattern>
        </defs>
        <rect width="200" height="200" fill="url(#p-grid)" />
      </svg>
    );
  }
  if (kind === "waves") {
    return (
      <svg
        aria-hidden="true"
        className={common}
        viewBox="0 0 200 200"
        preserveAspectRatio="none"
      >
        {Array.from({ length: 9 }).map((_, i) => (
          <path
            key={i}
            d={`M0 ${i * 24} Q 50 ${i * 24 - 12}, 100 ${i * 24} T 200 ${i * 24}`}
            stroke="currentColor"
            strokeWidth="1.4"
            fill="none"
          />
        ))}
      </svg>
    );
  }
  return (
    <svg
      aria-hidden="true"
      className={common}
      viewBox="0 0 200 200"
      preserveAspectRatio="none"
    >
      <defs>
        <pattern id="p-dots" width="14" height="14" patternUnits="userSpaceOnUse">
          <circle cx="3" cy="3" r="2" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="200" height="200" fill="url(#p-dots)" />
    </svg>
  );
}

export function Products() {
  return (
    <section
      id="products"
      className="py-16 sm:py-24 lg:py-32 bg-secondary/30 border-y border-border/60"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-medium text-accent uppercase tracking-[0.2em]">
            Solutions for every space
          </p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-primary text-balance">
            From busy homes to high-performing commercial interiors.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground text-pretty">
            Five product families. One standard. Every Belgotex range is
            engineered in South Africa for African conditions — and demoed here
            with imagery that loads in milliseconds, not seconds.
          </p>
        </div>

        <ul className="mt-12 grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4 list-none p-0">
          {products.map((p) => (
            <li key={p.name}>
              <Link
                href={p.href}
                className="group block h-full rounded-xl bg-card border border-border/60 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                {/* Visual */}
                <div
                  className={cn(
                    "relative aspect-[4/3] overflow-hidden bg-gradient-to-br",
                    p.gradient,
                    p.accent,
                  )}
                >
                  <Pattern kind={p.pattern} />
                  <div className="absolute inset-0 flex items-end p-4">
                    <span className="inline-flex items-center gap-1 rounded-full bg-background/80 backdrop-blur-sm px-2.5 py-1 text-[11px] font-medium text-foreground">
                      {p.category}
                    </span>
                  </div>
                </div>
                {/* Body */}
                <div className="p-5">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    {p.tagline}
                  </p>
                  <h3 className="mt-1 font-display text-2xl font-semibold text-primary">
                    {p.name}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground line-clamp-3">
                    {p.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent group-hover:gap-2 transition-all">
                    {p.cta}
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
