import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function Story() {
  return (
    <section
      id="story"
      className="py-16 sm:py-24 lg:py-28 bg-[#ece8e5] scroll-mt-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-md">
            <Image
              src="/belgotex/home-story.webp"
              alt="The Belgotex story, over 40 years of flooring craft in South Africa"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div>
            <p className="text-sm font-semibold text-[#009347] uppercase tracking-[0.2em]">
              Our Story
            </p>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#212529] text-balance">
              Flooring plays a powerful role in how spaces feel, function and
              inspire
            </h2>
            <div className="mt-5 space-y-4 text-base sm:text-lg text-[#63666a] leading-relaxed">
              <p>
                At Belgotex, we believe flooring plays a powerful role in how
                spaces feel, function and inspire.
              </p>
              <p>
                For over 40 years, we have been crafting flooring solutions that
                bring together thoughtful design, technical performance and a
                deep respect for people and the planet.
              </p>
            </div>

            <dl className="mt-8 grid grid-cols-3 gap-4 sm:gap-6">
              <div className="border-l-2 border-[#009347] pl-4">
                <dt className="text-xs sm:text-sm text-[#63666a]">Years of craft</dt>
                <dd className="mt-1 text-2xl sm:text-3xl font-semibold text-[#212529]">
                  40+
                </dd>
              </div>
              <div className="border-l-2 border-[#009347] pl-4">
                <dt className="text-xs sm:text-sm text-[#63666a]">Arabica colours</dt>
                <dd className="mt-1 text-2xl sm:text-3xl font-semibold text-[#212529]">
                  9
                </dd>
              </div>
              <div className="border-l-2 border-[#009347] pl-4">
                <dt className="text-xs sm:text-sm text-[#63666a]">Sylvan colours</dt>
                <dd className="mt-1 text-2xl sm:text-3xl font-semibold text-[#212529]">
                  8
                </dd>
              </div>
            </dl>

            <Link
              href="#contact"
              className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-[#009347] hover:gap-2.5 transition-all"
            >
              Read about Our Story
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
