import Link from "next/link";
import { site, mainNav, whatsappLink } from "@/lib/site";
import { categories } from "@/lib/events";
import { Logo } from "@/components/Logo";
import { Icon } from "@/components/icons";

export function Footer() {
  return (
    <footer className="mt-8 bg-navy text-white/80">
      <div className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
          <div>
            <Logo light />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/65">
              {site.tagline} Esperienze, albe e lezioni in SUP sulla Riviera Romagnola — anche se
              parti da zero.
            </p>
            <a
              href={whatsappLink(`Ciao ${site.shortName}, vorrei qualche informazione sui prossimi eventi in SUP.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white"
            >
              <Icon.Whatsapp className="h-4 w-4" /> Scrivici su WhatsApp
            </a>
          </div>

          <nav aria-label="Eventi">
            <p className="eyebrow text-sun">Eventi</p>
            <ul className="mt-4 space-y-2.5">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/eventi-sup/${c.slug}`}
                    className="text-sm text-white/70 transition-colors hover:text-sun"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Sito">
            <p className="eyebrow text-sun">Esplora</p>
            <ul className="mt-4 space-y-2.5">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/70 transition-colors hover:text-sun"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/contatti" className="text-sm text-white/70 transition-colors hover:text-sun">
                  Contatti
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <p className="eyebrow text-sun">Resta in contatto</p>
            <ul className="mt-4 space-y-3 text-sm text-white/70">
              <li className="flex items-center gap-2">
                <Icon.Pin className="h-4 w-4 text-coral" /> {site.baseLocation}
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="flex items-center gap-2 hover:text-sun">
                  <Icon.Mail className="h-4 w-4 text-coral" /> {site.email}
                </a>
              </li>
              <li>
                <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-sun">
                  <Icon.Camera className="h-4 w-4 text-coral" /> {site.instagramHandle}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name} — {site.shortName}. Tutti i diritti riservati.
          </p>
          <p className="flex flex-wrap gap-x-4 gap-y-1">
            <Link href="/privacy" className="hover:text-sun">Privacy</Link>
            <Link href="/faq" className="hover:text-sun">FAQ</Link>
            <span>P.IVA da inserire</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
