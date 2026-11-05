import Link from "next/link";
import { ArrowRight, Play, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section
      id="top"
      className="relative pt-28 sm:pt-32 lg:pt-40 pb-16 sm:pb-20 lg:pb-28 overflow-hidden bg-grain"
    >
      {/* Decorative gradient — no images, instant render */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-br from-background via-background to-secondary/60"
      />
      <div
        aria-hidden="true"
        className="absolute top-1/2 right-0 -z-10 h-[600px] w-[600px] -translate-y-1/2 translate-x-1/3 rounded-full bg-accent/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 -z-10 h-[400px] w-[400px] translate-x-[-30%] translate-y-[30%] rounded-full bg-primary/5 blur-3xl"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Copy */}
          <div className="lg:col-span-7 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/5 px-3 py-1 text-xs font-medium text-accent mb-6">
              <TrendingUp className="h-3.5 w-3.5" aria-hidden="true" />
              <span>1000x faster, modern, accessible demo</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-7xl font-semibold tracking-tight text-primary text-balance leading-[1.05]">
              South Africa&apos;s flooring,{" "}
              <span className="text-accent italic">reimagined</span> for the
              modern web.
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-muted-foreground text-pretty max-w-2xl mx-auto lg:mx-0">
              Belgotex crafts premium carpets, vinyl, rugs, carpet tiles and
              artificial grass. This demo shows what a sub-second, fully
              accessible, conversion-focused Belgotex could feel like — built
              by{" "}
              <a
                href="https://www.hustleportal.online/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent underline underline-offset-4 hover:text-accent/80 font-medium"
              >
                Hustle Portal
              </a>
              .
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <Button
                asChild
                size="lg"
                className="bg-accent text-accent-foreground hover:bg-accent/90 group"
              >
                <Link href="#products">
                  Explore the range
                  <ArrowRight
                    className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary/20 text-primary hover:bg-secondary"
              >
                <Link href="#audit">
                  <Play className="mr-2 h-4 w-4" aria-hidden="true" />
                  See the audit
                </Link>
              </Button>
            </div>

            {/* Trust strip */}
            <dl className="mt-12 grid grid-cols-3 gap-4 sm:gap-8 max-w-xl mx-auto lg:mx-0">
              <div>
                <dt className="text-xs sm:text-sm text-muted-foreground">
                  LCP target
                </dt>
                <dd className="font-display text-2xl sm:text-3xl font-semibold text-primary">
                  &lt; 1s
                </dd>
              </div>
              <div>
                <dt className="text-xs sm:text-sm text-muted-foreground">
                  Lighthouse
                </dt>
                <dd className="font-display text-2xl sm:text-3xl font-semibold text-primary">
                  100
                </dd>
              </div>
              <div>
                <dt className="text-xs sm:text-sm text-muted-foreground">
                  WCAG
                </dt>
                <dd className="font-display text-2xl sm:text-3xl font-semibold text-primary">
                  AA+
                </dd>
              </div>
            </dl>
          </div>

          {/* Visual */}
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] sm:aspect-square w-full max-w-md mx-auto">
              {/* Layered CSS-only "carpet texture" composition */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/20 via-secondary to-primary/15 shadow-2xl shadow-primary/10" />
              <div className="absolute inset-2 rounded-xl border-2 border-dashed border-accent/30" />
              <div className="absolute inset-6 rounded-lg bg-background/70 backdrop-blur-sm flex items-center justify-center p-6">
                <div className="text-center">
                  <p className="font-display text-6xl sm:text-7xl font-semibold text-accent">
                    1000
                  </p>
                  <p className="font-display text-2xl sm:text-3xl text-primary -mt-1">
                    times faster
                  </p>
                  <p className="mt-3 text-xs sm:text-sm text-muted-foreground max-w-[200px] mx-auto">
                    Sub-second LCP. Zero render-blocking. Perfect a11y scores.
                  </p>
                </div>
              </div>
              {/* Floating chips */}
              <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 rounded-full bg-primary text-primary-foreground px-3 py-1.5 text-xs font-medium shadow-lg">
                Next.js 16
              </div>
              <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 rounded-full bg-accent text-accent-foreground px-3 py-1.5 text-xs font-medium shadow-lg">
                Vercel-ready
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
