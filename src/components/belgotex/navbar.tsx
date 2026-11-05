"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Products", href: "#products" },
  { label: "New Arrivals", href: "#new-arrivals" },
  { label: "Our Story", href: "#story" },
  { label: "Performance", href: "#performance" },
  { label: "B2B Growth", href: "#b2b" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-[#c8c1b9] shadow-sm"
          : "bg-white/80 backdrop-blur-sm",
      )}
    >
      <nav
        className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        aria-label="Primary"
      >
        <div className="flex h-16 sm:h-20 items-center justify-between">
          <Link
            href="#top"
            className="flex items-center gap-2"
            aria-label="Belgotex, back to top"
          >
            <Image
              src="/belgotex/belgotex-logo.svg"
              alt="Belgotex"
              width={140}
              height={35}
              priority
              className="h-7 sm:h-9 w-auto"
            />
          </Link>

          <ul className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm font-medium text-[#212529] hover:text-[#009347] transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden lg:flex items-center gap-3">
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="text-[#63666a] hover:text-[#009347] hover:bg-[#ece8e5]"
            >
              <Link href="#products">Explore Range</Link>
            </Button>
            <Button
              asChild
              size="sm"
              className="bg-[#009347] text-white hover:bg-[#007a3c]"
            >
              <Link href="#contact">Get a Quote</Link>
            </Button>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-md text-[#212529] hover:bg-[#ece8e5] transition-colors"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div
          id="mobile-menu"
          className="lg:hidden bg-white border-t border-[#c8c1b9]"
        >
          <ul className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-3 py-3 text-base font-medium text-[#212529] hover:bg-[#ece8e5] hover:text-[#009347] transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Button
                asChild
                className="w-full bg-[#009347] text-white hover:bg-[#007a3c]"
              >
                <Link href="#contact" onClick={() => setOpen(false)}>
                  Get a Quote
                </Link>
              </Button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
