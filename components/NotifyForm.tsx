"use client";

import { useState } from "react";
import { site, whatsappLink } from "@/lib/site";
import { Icon } from "@/components/icons";

/**
 * Form leggero "Avvisami quando aprono le date" per l'empty state di categoria.
 * Raccoglie nome, telefono ed email e apre WhatsApp con il messaggio precompilato.
 */
export function NotifyForm({ categoryName }: { categoryName: string }) {
  const [submitting, setSubmitting] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "");
    const phone = String(data.get("phone") ?? "");
    const email = String(data.get("email") ?? "");

    const lines = [
      `Ciao ${site.shortName}, vorrei essere avvisato/a quando aprite le date di "${categoryName}".`,
      `Nome: ${name}`,
      `Telefono: ${phone}`,
      email && `Email: ${email}`,
    ].filter(Boolean);

    window.open(whatsappLink(lines.join("\n")), "_blank", "noopener,noreferrer");
    setSubmitting(false);
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto mt-6 grid max-w-sm gap-3 text-left">
      <input
        name="name"
        required
        autoComplete="name"
        placeholder="Il tuo nome"
        className={inputCls}
      />
      <input
        name="phone"
        required
        type="tel"
        autoComplete="tel"
        placeholder="Telefono / WhatsApp"
        className={inputCls}
      />
      <input
        name="email"
        required
        type="email"
        autoComplete="email"
        placeholder="Email"
        className={inputCls}
      />
      <button
        type="submit"
        disabled={submitting}
        className="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-base font-semibold text-white shadow-[var(--shadow-soft)] transition-all hover:-translate-y-0.5 hover:brightness-95 disabled:opacity-70"
      >
        <Icon.Whatsapp /> Avvisami
      </button>
      <p className="text-center text-xs text-navy/45">
        Ti scriviamo su WhatsApp appena apriamo le prenotazioni.
      </p>
    </form>
  );
}

const inputCls =
  "w-full rounded-xl border border-navy/12 bg-cream/60 px-4 py-3 text-base text-navy placeholder:text-navy/35 transition-colors focus:border-teal focus:bg-white focus:outline-none";
