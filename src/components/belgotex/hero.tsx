import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section id="top" className="relative pt-16 sm:pt-20 lg:pt-20 overflow-hidden">
      {/* Real Belgotex banner image, optimised by next/image */}
      <div className="relative h-[560px] sm:h-[640px] lg:h-[680px] w-full">
        <Image
          src="/belgotex/home-banner-1.webp"
          alt="Belgotex flooring in a modern interior"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        {/* Gradient overlay for legible text */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-transparent"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"
        />

        <div className="relative h-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center">
          <div className="max-w-2xl text-white">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm px-3 py-1 text-xs font-medium mb-6">
              <Leaf className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Over 40 years of flooring craft</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-semibold tracking-tight text-balance leading-[1.05]">
              Floors That Inspire You
            </h1>

            <p className="mt-5 text-base sm:text-lg lg:text-xl text-white/90 text-pretty max-w-xl">
              Belgotex is Africa&apos;s leading carpet and artificial grass
              manufacturer. As a soft flooring specialist we design, make and
              distribute high-quality broadloom and modular carpets with custom
              solutions available to the commercial market.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button
                asChild
                size="lg"
                className="bg-[#009347] text-white hover:bg-[#007a3c] group"
              >
                <Link href="#products">
                  Explore our products
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
                className="border-white/40 text-white hover:bg-white/10 hover:text-white bg-white/5 backdrop-blur-sm"
              >
                <Link href="#new-arrivals">View new arrivals</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
