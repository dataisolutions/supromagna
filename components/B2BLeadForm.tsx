"use client";

import { useRouter } from "next/navigation";
import { site, whatsappLink } from "@/lib/site";
import { Icon } from "@/components/icons";
import { cn } from "@/components/ui";

const inputCls =
  "w-full rounded-xl border border-navy/12 bg-cream/60 px-4 py-3 text-[15px] text-navy placeholder:text-navy/35 transition-colors focus:border-teal focus:bg-white focus:outline-none";

export function B2BLeadForm({ className }: { className?: string }) {
  const router = useRouter();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const lines = [
      `Ciao ${site.shortName}, scrivo per un'attività aziendale in SUP.`,
      `Azienda: ${data.get("company")}`,
      `Referente: ${data.get("contact")}`,
      `Email: ${data.get("email")}`,
      `Telefono: ${data.get("phone")}`,
      `Partecipanti: ${data.get("people")}`,
      `Periodo: ${data.get("period")}`,
      data.get("notes") && `Note: ${data.get("notes")}`,
    ].filter(Boolean);
    window.open(whatsappLink(lines.join("\n")), "_blank", "noopener,noreferrer");
    router.push("/grazie?event=Attività aziendale in SUP");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "rounded-[var(--radius-card)] bg-white p-6 ring-1 ring-navy/8 shadow-[var(--shadow-soft)]",
        className,
      )}
    >
      <h3 className="font-display text-2xl font-semibold text-navy">Richiedi un preventivo</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-navy/65">
        Raccontaci il tuo gruppo e il periodo: ti rispondiamo su WhatsApp con una proposta su misura.
      </p>

      <div className="mt-5 grid gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <input name="company" required placeholder="Nome azienda" className={inputCls} />
          <input name="contact" required placeholder="Referente" className={inputCls} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <input name="email" type="email" required placeholder="Email" className={inputCls} />
          <input name="phone" type="tel" required placeholder="Telefono" className={inputCls} />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <input name="people" type="number" min={2} placeholder="Numero partecipanti" className={inputCls} />
          <input name="period" placeholder="Periodo desiderato" className={inputCls} />
        </div>
        <textarea name="notes" rows={3} placeholder="Obiettivi, esigenze, idee..." className={cn(inputCls, "resize-none")} />

        <label className="flex items-start gap-2.5 text-sm text-navy/65">
          <input type="checkbox" required className="mt-0.5 h-4 w-4 accent-[var(--color-coral)]" />
          <span>
            Accetto la{" "}
            <a href="/privacy" className="font-medium text-teal underline underline-offset-2">
              privacy policy
            </a>
            .
          </span>
        </label>
      </div>

      <button
        type="submit"
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-4 text-base font-semibold text-white shadow-[var(--shadow-soft)] transition-all hover:-translate-y-0.5 hover:brightness-95"
      >
        <Icon.Whatsapp /> Invia richiesta
      </button>
    </form>
  );
}
