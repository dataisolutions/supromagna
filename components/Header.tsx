"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { mainNav } from "@/lib/site";
import { categories } from "@/lib/events";
import { Logo } from "@/components/Logo";
import { Icon } from "@/components/icons";
import { cn } from "@/components/ui";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
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
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-cream/85 backdrop-blur-md shadow-[0_1px_0_rgba(7,59,76,0.06)]"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-5 py-3 sm:px-6">
        <Logo />

        <nav className="hidden items-center gap-1 md:flex">
          <div className="group relative">
            <Link
              href="/eventi-sup"
              className="flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium text-navy/80 transition-colors hover:bg-navy/5 hover:text-navy"
            >
              Eventi in SUP
              <Icon.ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
            </Link>
            <div className="invisible absolute left-0 top-full w-64 pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
              <div className="rounded-2xl border border-navy/8 bg-white p-2 shadow-[var(--shadow-lift)]">
                {categories.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/eventi-sup/${c.slug}`}
                    className="flex items-start gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-cream"
                  >
                    <span className="text-lg leading-none">{c.emoji}</span>
                    <span className="flex flex-col">
                      <span className="text-sm font-semibold text-navy">{c.name}</span>
                      <span className="text-xs text-navy/55 line-clamp-1">{c.filterLabel}</span>
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {mainNav.slice(1).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-full px-3.5 py-2 text-sm font-medium transition-colors hover:bg-navy/5",
                pathname === item.href ? "text-coral" : "text-navy/80 hover:text-navy",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/contatti"
            className="hidden rounded-full bg-coral px-5 py-2.5 text-sm font-semibold text-white shadow-[var(--shadow-coral)] transition-all hover:-translate-y-0.5 hover:bg-coral-deep md:inline-flex"
          >
            Ottieni info
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Chiudi menu" : "Apri menu"}
            aria-expanded={open}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-navy ring-1 ring-navy/10 md:hidden"
          >
            {open ? <Icon.Close /> : <Icon.Menu />}
          </button>
        </div>
      </div>

      {/* Drawer mobile */}
      {open && (
        <div className="fixed inset-0 top-[64px] z-40 md:hidden">
          <div className="h-full overflow-y-auto bg-cream px-5 pb-24 pt-4 animate-[rise_0.3s_ease]">
            <p className="eyebrow text-teal mb-2">Eventi in SUP</p>
            <div className="grid grid-cols-1 gap-2">
              {categories.map((c) => (
                <Link
                  key={c.slug}
                  href={`/eventi-sup/${c.slug}`}
                  className="flex items-center gap-3 rounded-2xl bg-white p-3.5 ring-1 ring-navy/8"
                >
                  <span className="text-xl">{c.emoji}</span>
                  <span className="flex flex-col">
                    <span className="font-semibold text-navy">{c.name}</span>
                    <span className="text-xs text-navy/55">{c.short.split(".")[0]}.</span>
                  </span>
                </Link>
              ))}
            </div>

            <div className="mt-5 grid gap-1">
              {mainNav.slice(1).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center justify-between rounded-xl px-2 py-3 text-lg font-medium text-navy"
                >
                  {item.label}
                  <Icon.ArrowRight className="h-5 w-5 text-navy/30" />
                </Link>
              ))}
            </div>

            <Link
              href="/contatti"
              className="mt-4 flex items-center justify-center gap-2 rounded-full bg-coral px-6 py-4 text-base font-semibold text-white shadow-[var(--shadow-coral)]"
            >
              <Icon.Whatsapp /> Ottieni info su WhatsApp
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
