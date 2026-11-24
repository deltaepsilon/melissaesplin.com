"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/#services", label: "Services" },
  { href: "/portfolio/", label: "Portfolio" },
  { href: "/#about", label: "About" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
      <nav className="container mx-auto px-4 py-5" aria-label="Primary">
        <div className="flex items-center justify-between gap-6">
          <Link
            href="/"
            className="heading text-2xl font-semibold tracking-tight text-foreground transition-opacity hover:opacity-80"
          >
            Melissa Esplin
          </Link>

          <div className="hidden items-center gap-10 md:flex">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-[0.72rem] font-semibold uppercase tracking-[0.28em] transition-colors ${
                    active ? "text-foreground" : "text-foreground/75 hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href="/inquire/"
              className="rounded-md bg-primary px-5 py-2.5 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Book an Event
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="border border-border/60 px-3 py-2 text-foreground md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {open ? (
          <div className="mt-4 flex flex-col gap-4 border-t border-border/60 pt-4 md:hidden">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-xs font-semibold uppercase tracking-[0.28em] text-foreground/80 hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/inquire/"
              onClick={() => setOpen(false)}
              className="inline-flex w-fit rounded-md bg-primary px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.24em] text-primary-foreground"
            >
              Book an Event
            </Link>
          </div>
        ) : null}
      </nav>
    </header>
  );
}
