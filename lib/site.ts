/**
 * Configurazione globale del sito Functional SUP Tribe / Sup Romagna.
 *
 * NOTA CONTENUTI DA CONFERMARE COL CLIENTE (vedi cap. 21 del brief):
 * - whatsappNumber: numero WhatsApp ufficiale (placeholder qui sotto).
 * - email: email ufficiale.
 * - founderName: nel brief compare "Lia Venturi"; online "Elia Venturi".
 *   Va confermato prima della pubblicazione su sito, SEO, footer, privacy.
 */

export const site = {
  name: "Functional SUP Tribe",
  shortName: "Sup Romagna",
  domain: "supromagna.com",
  url: "https://supromagna.com",
  tagline: "Vivi la Romagna dal mare.",
  description:
    "Esperienze in SUP sulla Riviera Romagnola: albe in mare, uscite sotto le stelle, yoga e aperitivi galleggianti. Eventi guidati, adatti anche a chi parte da zero.",

  // Da confermare col cliente — placeholder operativi
  whatsappNumber: "393000000000", // ⚠️ placeholder — inserire il numero WhatsApp ufficiale
  email: "ciao@supromagna.com", // ⚠️ confermare email ufficiale
  instagram: "https://instagram.com/functionalsuptribe",
  instagramHandle: "@functionalsuptribe",
  founderName: "Elia Venturi", // confermato dai materiali ufficiali (post "Diventa istruttore con Elia Venturi")
  baseLocation: "Cesenatico, Riviera Romagnola",
  partners: ["Adriatico 62", "Stazione del Mare", "Bagno Kamoke"],
};

/** Costruisce un link WhatsApp wa.me con messaggio precompilato. */
export function whatsappLink(message?: string) {
  const base = `https://wa.me/${site.whatsappNumber}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

/** Navigazione principale (header desktop). */
export const mainNav: { label: string; href: string }[] = [
  { label: "Eventi in SUP", href: "/eventi-sup" },
  { label: "Lezioni", href: "/lezioni-sup" },
  { label: "Per aziende", href: "/per-aziende" },
  { label: "Chi siamo", href: "/chi-siamo" },
  { label: "FAQ", href: "/faq" },
];

/** Bottom navigation mobile — max 4 voci. */
export const bottomNav: { label: string; href: string; icon: string }[] = [
  { label: "Home", href: "/", icon: "home" },
  { label: "Eventi", href: "/eventi-sup", icon: "calendar" },
  { label: "Lezioni", href: "/lezioni-sup", icon: "board" },
  { label: "Info", href: "/contatti", icon: "info" },
];
