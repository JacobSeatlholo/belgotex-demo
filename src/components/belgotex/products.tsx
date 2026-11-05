import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

type Product = {
  name: string;
  description: string;
  cta: string;
  image: string;
  alt: string;
};

const products: Product[] = [
  {
    name: "Carpets",
    description:
      "Broadloom and modular carpets with custom solutions available to the commercial market. Crafted with Stainproof Miracle Fibre for stylish, hard-wearing living.",
    cta: "View carpet range",
    image: "/belgotex/carpet.webp",
    alt: "Belgotex carpet range, plush cut-pile flooring samples",
  },
  {
    name: "Rugs",
    description:
      "Indoor and outdoor rugs that bring warmth, texture and character to any space. Designed in South Africa for African living.",
    cta: "View rug range",
    image: "/belgotex/rugs.webp",
    alt: "Belgotex rug range, woven floor rugs in natural tones",
  },
  {
    name: "Vinyl",
    description:
      "Luxury and specialist vinyls that brilliantly mimic the intricate characteristics of wood, without burdening the environment or your finances.",
    cta: "View vinyl range",
    image: "/belgotex/vinyl.webp",
    alt: "Belgotex luxury vinyl tile range, wood-look planks",
  },
];

export function Products() {
  return (
    <section
      id="products"
      className="py-16 sm:py-24 lg:py-28 bg-[#ece8e5] scroll-mt-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold text-[#009347] uppercase tracking-[0.2em]">
            Solutions for Every Space
          </p>
          <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#212529] text-balance">
            From busy homes to high performing commercial interiors
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#63666a] text-pretty">
            Our flooring is designed to meet the demands of modern living. We
            create solutions that balance durability, comfort and style,
            performing under pressure while enhancing the look and feel of every
            space, no matter how it is used.
          </p>
        </div>

        <ul className="mt-12 grid gap-6 sm:gap-8 lg:grid-cols-3 list-none p-0">
          {products.map((p) => (
            <li key={p.name}>
              <Link
                href="#contact"
                className="group block h-full bg-white border border-[#c8c1b9] rounded-lg overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#009347]"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[#f4f4f4]">
                  <Image
                    src={p.image}
                    alt={p.alt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-[#212529]">
                    {p.name}
                  </h3>
                  <p className="mt-2 text-sm text-[#63666a] leading-relaxed">
                    {p.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#009347] group-hover:gap-2.5 transition-all">
                    {p.cta}
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
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
