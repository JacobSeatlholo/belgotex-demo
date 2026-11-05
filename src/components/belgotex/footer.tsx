import Link from "next/link";
import { Linkedin, Facebook, Instagram, MapPin, Phone, Mail } from "lucide-react";

const columns = [
  {
    title: "Products",
    links: [
      { label: "Carpets", href: "#products" },
      { label: "Vinyl", href: "#products" },
      { label: "Carpet Tile", href: "#products" },
      { label: "Rugs", href: "#products" },
      { label: "Artificial Grass", href: "#products" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Belgotex", href: "#why" },
      { label: "Sustainability", href: "#why" },
      { label: "Careers", href: "#contact" },
      { label: "Trade Partners", href: "#contact" },
      { label: "Press", href: "#contact" },
    ],
  },
  {
    title: "Demo Pitch",
    links: [
      { label: "Lighthouse audit", href: "#audit" },
      { label: "B2B lead gen", href: "#b2b" },
      { label: "Hustle Portal", href: "https://www.hustleportal.online/" },
      { label: "Request a quote", href: "#contact" },
      { label: "Strategy call", href: "#contact" },
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
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link
              href="#top"
              className="flex items-center gap-2 font-display text-2xl font-semibold"
              aria-label="Belgotex — back to top"
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-accent text-accent-foreground text-base font-bold">
                B
              </span>
              <span>Belgotex</span>
            </Link>
            <p className="mt-4 text-sm text-primary-foreground/70 max-w-sm">
              South Africa&apos;s leading carpet and artificial grass
              manufacturer. This is a demo, built by Hustle Portal, showing what
              a 1000x faster Belgotex could feel like.
            </p>

            <ul className="mt-6 space-y-2 text-sm list-none p-0">
              <li className="flex items-start gap-2.5">
                <MapPin
                  className="h-4 w-4 mt-0.5 text-accent shrink-0"
                  aria-hidden="true"
                />
                <span className="text-primary-foreground/80">
                  Pietermaritzburg, KwaZulu-Natal, South Africa
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone
                  className="h-4 w-4 mt-0.5 text-accent shrink-0"
                  aria-hidden="true"
                />
                <a
                  href="tel:+27333461000"
                  className="text-primary-foreground/80 hover:text-accent transition-colors"
                >
                  +27 33 346 1000
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail
                  className="h-4 w-4 mt-0.5 text-accent shrink-0"
                  aria-hidden="true"
                />
                <a
                  href="mailto:hello@belgotex-demo.vercel.app"
                  className="text-primary-foreground/80 hover:text-accent transition-colors"
                >
                  hello@belgotex-demo.vercel.app
                </a>
              </li>
            </ul>
          </div>

          {/* Link columns */}
          <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {columns.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-4">
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
                            className="text-sm text-primary-foreground/75 hover:text-accent transition-colors"
                          >
                            {link.label}
                          </a>
                        ) : (
                          <Link
                            href={link.href}
                            className="text-sm text-primary-foreground/75 hover:text-accent transition-colors"
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

          {/* Socials */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-4">
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
                    className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-primary-foreground/20 text-primary-foreground/80 hover:bg-accent hover:text-accent-foreground hover:border-accent transition-colors"
                  >
                    <s.icon className="h-4 w-4" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-primary-foreground/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="text-xs text-primary-foreground/60">
            © {new Date().getFullYear()} Belgotex demo. Built by{" "}
            <a
              href="https://www.hustleportal.online/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:underline underline-offset-2"
            >
              Hustle Portal
            </a>
            . Not affiliated with Belgotex Floorcoverings (Pty) Ltd — pitch use
            only.
          </p>
          <ul className="flex gap-4 text-xs text-primary-foreground/60 list-none p-0">
            <li>
              <Link
                href="#"
                className="hover:text-accent transition-colors"
              >
                Terms
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="hover:text-accent transition-colors"
              >
                Privacy (POPIA)
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
