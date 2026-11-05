const items = [
  "Broadloom Carpets",
  "Modular Carpet Tiles",
  "Luxury Vinyl Tile",
  "Indoor and Outdoor Rugs",
  "Artificial Grass",
  "Commercial Solutions",
  "Stainproof Miracle Fibre",
  "EN 1307 Certified",
  "Made in South Africa",
];

export function Marquee() {
  return (
    <section
      aria-label="Belgotex product range"
      className="bg-[#009347] text-white py-3 sm:py-4 overflow-hidden"
    >
      <div className="relative">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#009347] to-transparent z-10"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#009347] to-transparent z-10"
        />
        <ul className="marquee-track flex gap-10 sm:gap-16 whitespace-nowrap list-none p-0">
          {[...items, ...items].map((item, i) => (
            <li
              key={i}
              className="inline-flex items-center gap-3 text-sm sm:text-base font-medium tracking-wide"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
