# Functional SUP Tribe — Sup Romagna

Sito mobile-first per eventi, esperienze e lezioni in SUP sulla Riviera Romagnola
(**supromagna.com**). MVP esperienziale: scopri il prossimo evento, leggi i dettagli
pratici e richiedi info/prenotazione su WhatsApp.

Costruito con **Next.js 16** (App Router), **React 19**, **TypeScript** e **Tailwind CSS v4**.

## Design

- Palette "alba sul mare" del brief (coral, peach, warm yellow, sand, sea teal, deep navy, cream).
- Display **Fraunces** (serif caldo/editoriale) + UI **Plus Jakarta Sans**.
- Elemento signature: il gradiente dell'alba sull'orizzonte, usato nell'hero e come
  placeholder immagini generati in SVG (`components/SceneImage.tsx`), così non ci sono
  link a foto rotti finché il cliente non fornisce gli scatti reali.

## Struttura

```
app/
  page.tsx                    Home (8 sezioni)
  eventi-sup/                 Listing eventi + filtri a chip
  eventi-sup/[category]/      Pagine categoria (Alba, AstroSUP, Yoga, AperiSUP, Speciali)
  eventi/[slug]/              Scheda evento singola (con JSON-LD Event, form, sticky CTA)
  lezioni-sup/                Pagina lezioni
  per-aziende/                Pagina B2B + form preventivo
  chi-siamo/  faq/  contatti/ Pagine di supporto
  grazie/                     Thank you page post-richiesta
  privacy/                    Bozza privacy (da completare col cliente)
  sitemap.ts  robots.ts  manifest.ts
components/                   Header, BottomNav, Footer, card, form, FAQ, SceneImage, icone
lib/
  events.ts                  Modello dati eventi + contenuti seed
  site.ts                    Config sito (WhatsApp, email, nav)
```

## Sviluppo

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build di produzione
npm run start    # serve la build
npm run lint
```

## ⚠️ Contenuti da confermare col cliente

Centralizzati in `lib/site.ts` (cap. 21 del brief):

- **Numero WhatsApp** ufficiale (ora placeholder `393000000000`).
- **Email** ufficiale.
- **Nome referente**: nel brief "Lia Venturi", online "Elia Venturi" — da confermare.
- **Foto/video reali**, prezzi definitivi, partner/stabilimenti, testo privacy e liberatoria.

I prezzi, gli orari e gli eventi 2026 in `lib/events.ts` sono realistici ma di esempio.

## Flusso prenotazione

I form raccolgono i dati e aprono WhatsApp con messaggio precompilato (Opzione A del brief),
poi instradano alla thank you page `/grazie` (Opzione B). Nessun pagamento online nell'MVP.
