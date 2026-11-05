import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

type Arrival = {
  name: string;
  category: string;
  description: string;
  image: string;
  alt: string;
  accent: string;
  bg: string;
};

const arrivals: Arrival[] = [
  {
    name: "Arabica",
    category: "Broadloom + Rug",
    description:
      "A plush, high-performance cut-pile carpet made with Stainproof Miracle Fibre, available in nine modern colours for stylish living.",
    image: "/belgotex/arabica.webp",
    alt: "Arabica carpet by Belgotex, plush cut-pile in warm neutral tones",
    accent: "text-[#4c688a]",
    bg: "bg-[#4c688a]",
  },
  {
    name: "Sylvan",
    category: "Luxury Vinyl Tile",
    description:
      "A collection of vinyl tiles that brilliantly mimic the intricate characteristics of wood, without burdening the environment or your finances. Available in eight captivating colours.",
    image: "/belgotex/sylvan.webp",
    alt: "Sylvan luxury vinyl tile by Belgotex, wood-look planks in forest tones",
    accent: "text-[#398f8c]",
    bg: "bg-[#398f8c]",
  },
  {
    name: "Accelerate",
    category: "Carpet Tile",
    description:
      "A state-of-the-art flooring solution designed for heavy commercial use in line with EN 1307 standards. Features a tufted multi-scroll loop pile construction that combines durability with aesthetic appeal.",
    image: "/belgotex/accelerate.webp",
    alt: "Accelerate carpet tile by Belgotex, modular commercial flooring",
    accent: "text-[#9f333c]",
    bg: "bg-[#9f333c]",
  },
];

export function NewArrivals() {
  return (
    <section
      id="new-arrivals"
      className="py-16 sm:py-24 lg:py-28 bg-white scroll-mt-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold text-[#009347] uppercase tracking-[0.2em]">
            Just Landed
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#212529] text-balance">
            Explore our newest arrivals
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#63666a] text-pretty">
            Three new collections, each engineered for a different way of
            living. From a stainproof family carpet to a heavy-commercial
            modular tile, every Belgotex product is designed and made in South
            Africa.
          </p>
        </div>

        <ul className="mt-12 grid gap-6 lg:gap-8 list-none p-0">
          {arrivals.map((a, i) => (
            <li key={a.name}>
              <article
                className={`grid md:grid-cols-2 gap-0 rounded-lg overflow-hidden shadow-sm border border-[#c8c1b9] ${
                  i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[420px] bg-[#f4f4f4]">
                  <Image
                    src={a.image}
                    alt={a.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div className={`${a.bg} text-white p-8 sm:p-10 lg:p-12 flex flex-col justify-center`}>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
                    {a.category}
                  </p>
                  <h3 className="mt-2 text-3xl sm:text-4xl font-semibold">
                    {a.name}
                  </h3>
                  <p className="mt-4 text-base text-white/90 leading-relaxed">
                    {a.description}
                  </p>
                  <Link
                    href="#contact"
                    className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-white border-b border-white/40 pb-1 hover:gap-2.5 transition-all w-fit"
                  >
                    Explore More
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
