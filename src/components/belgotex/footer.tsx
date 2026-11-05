import Link from "next/link";
import Image from "next/image";
import { Linkedin, Facebook, Instagram, MapPin, Phone } from "lucide-react";

const columns = [
  {
    title: "Products",
    links: [
      { label: "Carpets", href: "#products" },
      { label: "Carpet Tiles", href: "#new-arrivals" },
      { label: "Vinyl", href: "#products" },
      { label: "Rugs", href: "#products" },
      { label: "Artificial Grass", href: "#products" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Our Story", href: "#story" },
      { label: "Careers", href: "#contact" },
      { label: "Where to Buy", href: "#contact" },
      { label: "Find Installers", href: "#contact" },
      { label: "Support", href: "#contact" },
    ],
  },
  {
    title: "Demo Pitch",
    links: [
      { label: "Performance Audit", href: "#performance" },
      { label: "B2B Lead Generation", href: "#b2b" },
      { label: "Hustle Portal", href: "https://www.hustleportal.online/" },
      { label: "Get a Quote", href: "#contact" },
      { label: "Strategy Call", href: "#contact" },
    ],
  },
];

const socials = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/belgotex/",
    icon: Linkedin,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/belgotex",
    icon: Facebook,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/belgotex",
    icon: Instagram,
  },
];

export function Footer() {
  return (
    <footer className="bg-[#63666a] text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Image
              src="/belgotex/belgotex-logo-white.svg"
              alt="Belgotex"
              width={200}
              height={50}
              className="h-10 w-auto mb-4"
            />
            <p className="text-sm text-white/80 max-w-sm">
              Belgotex is Africa&apos;s leading carpet and artificial grass
              manufacturer. For over 40 years we have crafted flooring
              solutions that bring together thoughtful design, technical
              performance and a deep respect for people and the planet.
            </p>

            <ul className="mt-6 space-y-2 text-sm list-none p-0">
              <li className="flex items-start gap-2.5">
                <MapPin
                  className="h-4 w-4 mt-0.5 text-[#009347] shrink-0"
                  aria-hidden="true"
                />
                <span className="text-white/80">
                  Pietermaritzburg, KwaZulu-Natal, South Africa
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone
                  className="h-4 w-4 mt-0.5 text-[#009347] shrink-0"
                  aria-hidden="true"
                />
                <a
                  href="tel:+27333461000"
                  className="text-white/80 hover:text-[#009347] transition-colors"
                >
                  +27 33 346 1000
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {columns.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#009347] mb-4">
                  {col.title}
                </h3>
                <ul className="space-y-2.5 list-none p-0">
                  {col.links.map((link) => {
                    const isExternal = link.href.startsWith("http");
                    return (
                      <li key={link.label}>
                        {isExternal ? (
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-white/75 hover:text-[#009347] transition-colors"
                          >
                            {link.label}
                          </a>
                        ) : (
                          <Link
                            href={link.href}
                            className="text-sm text-white/75 hover:text-[#009347] transition-colors"
                          >
                            {link.label}
                          </Link>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </nav>
            ))}
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#009347] mb-4">
              Follow
            </h3>
            <ul className="flex lg:flex-col gap-3 list-none p-0">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Belgotex on ${s.label}`}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/20 text-white/80 hover:bg-[#009347] hover:text-white hover:border-[#009347] transition-colors"
                  >
                    <s.icon className="h-4 w-4" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-xs text-white/60">
            &copy; {new Date().getFullYear()} Belgotex. All rights reserved.
            This is a demonstration site built for pitch purposes and is not
            affiliated with Belgotex Floorcoverings (Pty) Ltd.
          </p>
          <ul className="flex gap-4 text-xs text-white/60 list-none p-0">
            <li>
              <Link href="#" className="hover:text-[#009347] transition-colors">
                Terms &amp; Conditions
              </Link>
            </li>
            <li>
              <Link href="#" className="hover:text-[#009347] transition-colors">
                POPIA Notice
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Demo built by Business Hustle credit */}
      <div className="bg-[#212529] border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-center">
            <p className="text-sm text-white/70">
              Demo built by{" "}
              <a
                href="https://www.hustleportal.online/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#009347] hover:text-[#33a96c] transition-colors underline underline-offset-2"
              >
                Business Hustle
              </a>
            </p>
            <span className="hidden sm:inline text-white/30">|</span>
            <p className="text-xs text-white/50">
              A 1000x faster, fully accessible reimagining of belgotex.co.za
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
