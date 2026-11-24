import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-[var(--background-dark)] text-[var(--text-light)]">
      <div className="container mx-auto px-4 py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(3,minmax(0,1fr))]">
          <div className="space-y-5">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-white/60">
              Melissa Esplin Studio
            </p>
            <h2 className="text-3xl font-semibold tracking-tight text-white">
              Live Engraving &amp; Modern Calligraphy
            </h2>
            <p className="max-w-sm text-sm leading-relaxed text-white/70">
              Onsite luxury brand activations, fragrance and glass engraving, wedding
              calligraphy, and bespoke commissions from Draper, Utah &amp; nationwide.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.28em] text-white/60">
              Services
            </h3>
            <ul className="space-y-2.5 text-sm text-white/80">
              <li>
                <Link href="/#engraving" className="transition-colors hover:text-white">
                  Onsite Engraving
                </Link>
              </li>
              <li>
                <Link href="/#calligraphy" className="transition-colors hover:text-white">
                  Calligraphy &amp; Commissions
                </Link>
              </li>
              <li>
                <Link href="/portfolio/" className="transition-colors hover:text-white">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/inquire/" className="transition-colors hover:text-white">
                  Book an Event
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.28em] text-white/60">
              Learn &amp; Archive
            </h3>
            <ul className="space-y-2.5 text-sm text-white/80">
              <li>
                <a
                  href="https://www.calligraphy.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-white"
                >
                  Calligraphy.org Classes
                </a>
              </li>
              <li>
                <a
                  href="https://www.calligraphy.org/directory/melissa-esplin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-white"
                >
                  Calligraphy.org Profile
                </a>
              </li>
              <li>
                <Link href="/blog/" className="transition-colors hover:text-white">
                  Blog Archive (2007–2021)
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-[0.28em] text-white/60">
              Connect
            </h3>
            <ul className="space-y-2.5 text-sm text-white/80">
              <li>
                <a
                  href="https://www.instagram.com/melissapher/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-white"
                >
                  Instagram (@melissapher)
                </a>
              </li>
              <li>
                <Link href="/inquire/" className="transition-colors hover:text-white">
                  Inquire for Availability
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/50 sm:flex-row sm:items-center">
          <p>&copy; {year} Melissa Esplin. All rights reserved.</p>
          <p>Draper, Utah &middot; Available for travel nationwide</p>
        </div>
      </div>
    </footer>
  );
}
