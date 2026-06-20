"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { site, whatsappLink } from "@/lib/site";
import { Icon } from "@/components/icons";
import { cn } from "@/components/ui";

type Variant = "event" | "lezioni" | "contatti";

interface BookingFormProps {
  variant?: Variant;
  eventTitle?: string;
  eventDate?: string;
  eventSlug?: string;
  tableOptions?: { name: string }[];
  className?: string;
}

const labels: Record<Variant, { submit: string; intro: string }> = {
  event: { submit: "Invia e apri WhatsApp", intro: "Lascia i tuoi dati: ti scriviamo su WhatsApp con tutte le info per confermare il posto." },
  lezioni: { submit: "Richiedi la tua lezione", intro: "Raccontaci il tuo livello e quando vorresti: ti rispondiamo su WhatsApp con una proposta." },
  contatti: { submit: "Invia richiesta", intro: "Scrivici cosa ti interessa: ti rispondiamo su WhatsApp il prima possibile." },
};

export function BookingForm({
  variant = "event",
  eventTitle,
  eventDate,
  eventSlug,
  className,
}: BookingFormProps) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [meta, setMeta] = useState({ page: "", utmSource: "", utmCampaign: "" });
  const [numPeople, setNumPeople] = useState(1);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setMeta({
      page: window.location.pathname,
      utmSource: params.get("utm_source") ?? "",
      utmCampaign: params.get("utm_campaign") ?? "",
    });
  }, []);

  const heading = useMemo(() => {
    if (variant === "event") return "Prenota questo evento";
    if (variant === "lezioni") return "Prenota la tua lezione";
    return "Scrivici";
  }, [variant]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const form = e.currentTarget;
    const data = new FormData(form);

    const name = String(data.get("name") ?? "");
    const phone = String(data.get("phone") ?? "");
    const email = String(data.get("email") ?? "");
    const people = String(data.get("people") ?? "1");
    const tables = String(data.get("tables") ?? "");
    const notes = String(data.get("notes") ?? "");

    const lines = [
      eventTitle
        ? `Ciao ${site.shortName}, vorrei informazioni per "${eventTitle}"${eventDate ? ` (${eventDate})` : ""}.`
        : `Ciao ${site.shortName}, vorrei informazioni.`,
      `Nome: ${name}`,
      `Telefono: ${phone}`,
      email && `Email: ${email}`,
      `Partecipanti: ${people}`,
      tables && `Tavole: ${tables}`,
      notes && `Note: ${notes}`,
    ].filter(Boolean);

    const link = whatsappLink(lines.join("\n"));

    // Apri WhatsApp e porta alla thank you page
    window.open(link, "_blank", "noopener,noreferrer");
    const params = new URLSearchParams();
    if (eventTitle) params.set("event", eventTitle);
    router.push(`/grazie?${params.toString()}`);
  }

  const { submit, intro } = labels[variant];

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "rounded-[var(--radius-card)] bg-white p-6 ring-1 ring-navy/8 shadow-[var(--shadow-soft)]",
        className,
      )}
    >
      <h3 className="font-display text-2xl font-semibold text-navy">{heading}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-navy/65">{intro}</p>

      {/* Campi nascosti (cap. 10 brief) */}
      <input type="hidden" name="event_slug" value={eventSlug ?? ""} />
      <input type="hidden" name="event_date" value={eventDate ?? ""} />
      <input type="hidden" name="page" value={meta.page} />
      <input type="hidden" name="utm_source" value={meta.utmSource} />
      <input type="hidden" name="utm_campaign" value={meta.utmCampaign} />

      <div className="mt-5 grid gap-4">
        <Field label={variant === "contatti" ? "Nome e cognome" : "Il tuo nome"} htmlFor="name">
          <input id="name" name="name" required autoComplete="name" placeholder="Es. Giulia Bianchi" className={inputCls} />
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Telefono / WhatsApp" htmlFor="phone">
            <input id="phone" name="phone" required type="tel" autoComplete="tel" placeholder="+39 ..." className={inputCls} />
          </Field>
          <Field label="Email" htmlFor="email" optional>
            <input id="email" name="email" type="email" autoComplete="email" placeholder="tu@email.it" className={inputCls} />
          </Field>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Quanti siete?" htmlFor="people" icon={<Icon.Users className="h-4 w-4 text-coral" />}>
            <input
              id="people"
              name="people"
              type="number"
              min={1}
              max={10}
              value={numPeople}
              onChange={(e) => setNumPeople(Math.min(10, Math.max(1, Number(e.target.value))))}
              className={inputCls}
            />
          </Field>
          <Field label="Quante tavole?" htmlFor="tables" icon={<Icon.Board className="h-4 w-4 text-coral" />}>
            <input id="tables" name="tables" type="number" min={1} max={numPeople} placeholder="Decidiamo insieme" className={inputCls} />
          </Field>
        </div>

        <Field label="Note" htmlFor="notes" optional>
          <textarea
            id="notes"
            name="notes"
            rows={3}
            placeholder={variant === "lezioni" ? "Il tuo livello, quando vorresti, dove..." : "Allergie, domande, esigenze particolari..."}
            className={cn(inputCls, "resize-none")}
          />
        </Field>

        <label className="flex items-start gap-2.5 text-sm text-navy/65">
          <input type="checkbox" required className="mt-0.5 h-4 w-4 accent-[var(--color-coral)]" />
          <span>
            Ho letto e accetto la{" "}
            <a href="/privacy" className="font-medium text-teal underline underline-offset-2">
              privacy policy
            </a>{" "}
            e acconsento a essere ricontattato/a.
          </span>
        </label>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-4 text-base font-semibold text-white shadow-[var(--shadow-soft)] transition-all hover:-translate-y-0.5 hover:brightness-95 disabled:opacity-70"
      >
        <Icon.Whatsapp /> {submit}
      </button>
      <p className="mt-3 text-center text-xs text-navy/45">
        Nessun pagamento ora. Confermiamo tutto insieme su WhatsApp.
      </p>
    </form>
  );
}

const inputCls =
  "w-full rounded-xl border border-navy/12 bg-cream/60 px-4 py-3 text-[15px] text-navy placeholder:text-navy/35 transition-colors focus:border-teal focus:bg-white focus:outline-none";

function Field({
  label,
  htmlFor,
  optional,
  icon,
  children,
}: {
  label: string;
  htmlFor: string;
  optional?: boolean;
  icon?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 flex items-center gap-1.5 text-sm font-medium text-navy">
        {icon}
        {label}
        {optional && <span className="text-xs font-normal text-navy/40">(facoltativo)</span>}
      </label>
      {children}
    </div>
  );
}
