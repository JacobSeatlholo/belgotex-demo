const items = [
  "Architects specifying Belgotex carpet tile",
  "Hotel groups sourcing vinyl",
  "Residential developers fitting broadloom",
  "Schools installing artificial grass",
  "Retail chains rolling out carpet tile",
  "Interior designers ordering rugs",
  "Quantity surveyors pricing flooring",
  "Contractors fitting vinyl tile",
];

export function Marquee() {
  return (
    <section
      aria-label="Who we serve"
      className="border-y border-border/60 bg-background py-4 overflow-hidden"
    >
      <div className="relative">
        {/* Fade edges */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background to-transparent z-10"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-background to-transparent z-10"
        />
        <ul className="marquee-track flex gap-8 sm:gap-12 whitespace-nowrap list-none p-0">
          {/* Duplicate for seamless loop */}
          {[...items, ...items].map((item, i) => (
            <li
              key={i}
              className="inline-flex items-center gap-3 text-sm sm:text-base text-muted-foreground"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
