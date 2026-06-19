import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Section, Container, Button } from "@/components/ui";
import { FAQAccordion } from "@/components/FAQAccordion";
import { Icon } from "@/components/icons";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "FAQ — domande frequenti sugli eventi in SUP",
  description:
    "Tutte le risposte sugli eventi in SUP in Romagna: esperienza richiesta, sicurezza, cosa portare, prenotazione, meteo e colazione.",
  alternates: { canonical: "/faq" },
};

const groups = [
  {
    title: "Prima di partecipare",
    items: [
      { q: "Serve esperienza?", a: "No. La maggior parte di chi viene è alla prima volta. Facciamo un briefing prima di entrare in acqua e gli istruttori ti seguono per tutta l'uscita." },
      { q: "Devo saper nuotare?", a: "Sì, è importante saper nuotare e sentirsi a proprio agio in mare. Indossi sempre una cintura di galleggiamento." },
      { q: "Da che età si può partecipare?", a: "In generale dai 12 anni, e i più piccoli possono salire in tavola con un adulto. Scrivici l'età e troviamo la soluzione giusta." },
      { q: "Posso venire da solo?", a: "Assolutamente sì. Molti vengono da soli: il bello è proprio conoscere persone nuove durante l'uscita." },
    ],
  },
  {
    title: "Attrezzatura e cosa portare",
    items: [
      { q: "Cosa devo portare?", a: "Costume già indosso, telo, un cambio asciutto, ciabatte e acqua. Una felpa leggera per le uscite all'alba o serali. Tavola e pagaia le mettiamo noi." },
      { q: "La tavola è inclusa?", a: "Sì, tavola, pagaia e cintura di galleggiamento sono incluse. Se hai la tua tavola puoi portarla con la tariffa ridotta." },
      { q: "Posso portare il telefono per le foto?", a: "Sì, ti consigliamo una custodia impermeabile. In molti eventi scattiamo anche noi foto da condividere col gruppo." },
    ],
  },
  {
    title: "Prenotazione, meteo e sicurezza",
    items: [
      { q: "Come funziona la prenotazione?", a: "Lasci i tuoi dati nel modulo dell'evento, ti scriviamo su WhatsApp con tutte le info e confermiamo insieme il posto. Per l'MVP non è richiesto alcun pagamento online." },
      { q: "Cosa succede se il mare è mosso o piove?", a: "Se le condizioni non sono sicure rimandiamo o annulliamo l'uscita e ti avvisiamo su WhatsApp con il massimo anticipo. La tua richiesta resta valida per la nuova data." },
      { q: "I posti sono limitati?", a: "Sì, lavoriamo con gruppi piccoli per garantire guida e sicurezza a tutti. Alcuni eventi vanno sold out in fretta: meglio prenotare presto." },
      { q: "Le foto e i video degli eventi vengono pubblicati?", a: "Durante gli eventi pubblici possiamo scattare foto e video per la community. Se preferisci non comparire, basta dircelo prima dell'uscita." },
    ],
  },
];

export default function FaqPage() {
  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Le risposte a tutte le tue domande"
        subtitle="Tutto quello che ti serve sapere prima di salire in tavola. Se manca qualcosa, ci trovi su WhatsApp."
        variant="alba"
        seed={5}
        photo="/media/alba-5.jpg"
      />
      <Section>
        <Container className="max-w-3xl">
          {groups.map((g) => (
            <div key={g.title} className="mb-10 last:mb-0">
              <h2 className="mb-4 font-display text-2xl font-semibold text-navy">{g.title}</h2>
              <FAQAccordion items={g.items} defaultOpen={-1} />
            </div>
          ))}

          <div className="mt-4 rounded-[var(--radius-card)] sky-gradient-soft p-8 text-center text-white">
            <h2 className="font-display text-2xl font-semibold drop-shadow-sm">Hai un'altra domanda?</h2>
            <p className="mx-auto mt-2 max-w-md text-white/90">
              Scrivici su WhatsApp: rispondiamo a tutto, senza impegno.
            </p>
            <Button
              href={whatsappLink(`Ciao ${site.shortName}, ho una domanda sugli eventi in SUP.`)}
              external
              variant="whatsapp"
              size="lg"
              className="mt-5"
            >
              <Icon.Whatsapp /> Scrivici su WhatsApp
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
