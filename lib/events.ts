/**
 * Modello dati eventi (cap. 16 del brief) + contenuti seed.
 * In Fase 2 questi dati arriveranno da un CMS; per l'MVP vivono qui.
 */

export type EventStatus =
  | "In programma"
  | "Posti limitati"
  | "Sold out"
  | "Rimandato"
  | "Passato"
  | "In arrivo";

export type CategorySlug =
  | "alba-in-sup"
  | "yoga-sup"
  | "aperisup"
  | "eventi-speciali";

export interface Category {
  slug: CategorySlug;
  name: string;
  short: string; // frase breve per le card categoria
  tagline: string; // claim per la pagina categoria
  intro: string; // paragrafo introduttivo pagina categoria
  emoji: string;
  filterLabel: string; // etichetta chip nel listing
  photo: string; // foto reale per la pagina categoria
}

export interface TimelineStep {
  time: string;
  label: string;
}

export interface TableOption {
  name: string;
  forWho: string;
  price?: string;
}

export interface FaqItem {
  q: string;
  a: string;
  link?: { text: string; href: string };
}

export interface SupEvent {
  title: string;
  slug: string;
  category: CategorySlug;
  status: EventStatus;
  featured?: boolean;
  date: string; // ISO YYYY-MM-DD
  dateLabel: string; // es. "Domenica 21 giugno 2026"
  meetingTime: string;
  startTime?: string;
  sunriseTime?: string;
  endTime?: string;
  locationName: string;
  locationAddress: string;
  googleMapsUrl: string;
  photo: string; // foto reale dell'evento
  descriptionShort: string;
  experienceStory: string;
  difficulty: string;
  duration: string;
  beginnerFriendly: boolean;
  swimmingRequired: boolean;
  instructors: string;
  included: string[];
  breakfastStatus: "inclusa" | "opzionale" | "non inclusa";
  breakfastDescription?: string;
  breakfastImage?: string; // foto della colazione (block evento)
  tableOptions: TableOption[];
  whatToBring: string[];
  priceFrom?: string;
  capacityNote: string;
  timeline: TimelineStep[];
  faq: FaqItem[];
  weatherPolicy: string;
  seoTitle: string;
  seoDescription: string;
}

export const categories: Category[] = [
  {
    slug: "alba-in-sup",
    name: "Alba in SUP",
    short: "Parti prima del sole e vivi il mare nel momento più magico della giornata.",
    tagline: "La tua prossima alba inizia in mare.",
    intro:
      "Esci con la tavola quando il cielo è ancora scuro e guardi il sole salire dall'acqua, in silenzio, col gruppo. È l'esperienza che ci ha fatti innamorare del mare di Romagna — e quella da cui partono quasi tutti.",
    emoji: "🌅",
    filterLabel: "Alba",
    photo: "/media/alba-1.jpg",
  },
  {
    slug: "yoga-sup",
    name: "Yoga / Pilates in SUP",
    short: "Movimento lento sull'acqua: equilibrio, respiro e un sorriso quando cadi.",
    tagline: "Il tappetino più bello è galleggiante.",
    intro:
      "Una pratica dolce sulla tavola, cullati dal mare. Niente performance: solo respiro, equilibrio e la libertà di ridere quando perdi la posa. Adatta a tutti i livelli, istruttori certificati al tuo fianco.",
    emoji: "🧘",
    filterLabel: "Yoga / Pilates",
    photo: "/media/alba-3.jpg",
  },
  {
    slug: "aperisup",
    name: "AperiSUP",
    short: "Tramonto, pagaia e un brindisi sull'acqua con il gruppo.",
    tagline: "L'aperitivo, ma sul mare.",
    intro:
      "L'uscita più leggera e social: si pagaia verso il tramonto, ci si ferma e si brinda. Perfetta per gruppi di amici, coppie e per chi vuole provare il SUP senza prendersi troppo sul serio.",
    emoji: "🍹",
    filterLabel: "Aperitivi",
    photo: "/media/alba-7.jpg",
  },
  {
    slug: "eventi-speciali",
    name: "Eventi speciali",
    short: "Date uniche, ospiti e format pensati una volta sola. Posti contati.",
    tagline: "Quando il calendario fa un'eccezione.",
    intro:
      "Lune piene, festival, collaborazioni e ricorrenze: gli eventi speciali nascono per una data sola e di solito vanno sold out in fretta. Tieni d'occhio questa pagina (e Instagram).",
    emoji: "🎉",
    filterLabel: "Speciali",
    photo: "/media/alba-4.jpg",
  },
];

export function categoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

const STD_WEATHER =
  "L'uscita dipende dalle condizioni del mare e dal meteo. Se le condizioni non sono sicure rimandiamo o annulliamo, e ti avvisiamo su WhatsApp con il massimo anticipo possibile. La tua richiesta resta valida per la data alternativa.";

const ALBA_FAQ: FaqItem[] = [
  { q: "A che ora devo arrivare?", a: "Il ritrovo è alle 4.30. Arriva puntuale: partiamo presto per non perdere l'alba (che sorge intorno alle 5.30). Verso le 6.20/6.30 facciamo colazione insieme e l'evento finisce intorno alle 7.00." },
  { q: "Dove ci troviamo esattamente?", a: "Il punto di ritrovo è indicato con link a Google Maps nella scheda evento. Ti mandiamo anche la posizione esatta su WhatsApp il giorno prima." },
  { q: "Non ho mai usato un SUP, posso partecipare?", a: "È caldamente consigliato avere un minimo di dimestichezza con il SUP. Se non hai mai provato puoi prenotare una lezione con noi prima dell'evento. In ogni caso facciamo sempre un briefing prima di entrare in acqua e gli istruttori ti seguono per tutta l'uscita.", link: { text: "Prenota una lezione →", href: "/lezioni" } },
  { q: "Devo saper nuotare?", a: "Sì, è importante saper nuotare e sentirsi a proprio agio in mare. Indossi sempre una cintura di galleggiamento." },
  { q: "Quanto costa e la tavola è inclusa?", a: "Noleggio tavola: 35€ singola (1 persona), 45€ doppia (2 persone). Se hai la tua tavola: 15€ singola, 25€ doppia. La colazione è sempre compresa." },
  { q: "La colazione è inclusa?", a: "Sì, la colazione è compresa: al rientro ci fermiamo insieme con dolci, focacce, frutta fresca, caffè e succhi." },
  { q: "Posso venire con bambini?", a: "Sì, su tavola con un adulto e su valutazione dell'età. Scrivici su WhatsApp e troviamo la soluzione giusta." },
  { q: "Cosa succede se piove o il mare è mosso?", a: "Se le condizioni non sono sicure rimandiamo o annulliamo e ti avvisiamo su WhatsApp. La tua prenotazione resta valida per la nuova data." },
  { q: "Come funziona la prenotazione?", a: "La prenotazione è obbligatoria fino a esaurimento posti. Lasci i tuoi dati nel form e prosegui sulla pagina di pagamento sicura Stripe. Il posto è confermato dopo l'acquisto." },
];

/** FAQ Fantini: colazione non inclusa (menu in loco), prezzi e orari propri. */
const FANTINI_FAQ: FaqItem[] = ALBA_FAQ.map((i) => {
  if (i.q === "A che ora devo arrivare?") {
    return { q: "A che ora devo arrivare?", a: "Il ritrovo è alle 4.30. Arriva puntuale: partiamo presto per non perdere l'alba (che sorge intorno alle 5.30). L'evento finisce verso le 7.00." };
  }
  if (i.q === "Quanto costa e la tavola è inclusa?") {
    return { q: "Quanto costa la tavola?", a: "Noleggio tavola: 30€ singola (1 persona), 40€ doppia (2 persone). Se hai la tua tavola: 10€ singola, 20€ doppia. La colazione non è inclusa ma puoi prenderla in loco." };
  }
  if (i.q === "La colazione è inclusa?") {
    return { q: "La colazione è inclusa?", a: "Al Fantini Club la colazione non è inclusa ma puoi prenderla in loco: Colazione A a 4,50€ (caffè o cappuccino con pasta o fetta di crostata), oppure Colazione B a 8€ (spremuta d'arancia con toast cotto e fontina, oppure pane da toast con crema spalmabile)." };
  }
  return i;
});

/* ---------- Template condiviso per le Albe in SUP ---------- */

const ALBA_TABLE_OPTIONS: TableOption[] = [
  { name: "Tavola singola", forWho: "Noleggio per 1 persona.", price: "35€" },
  { name: "Tavola doppia", forWho: "Noleggio per 2 persone.", price: "45€" },
  { name: "Tavola propria", forWho: "Hai la tua tavola singola? Tariffa ridotta.", price: "15€" },
  { name: "Tavola doppia propria", forWho: "Porti la tua tavola doppia.", price: "25€" },
];

const FANTINI_TABLE_OPTIONS: TableOption[] = [
  { name: "Tavola singola", forWho: "Noleggio per 1 persona.", price: "30€" },
  { name: "Tavola doppia", forWho: "Noleggio per 2 persone.", price: "40€" },
  { name: "Tavola propria", forWho: "Hai la tua tavola singola? Tariffa ridotta.", price: "10€" },
  { name: "Tavola doppia propria", forWho: "Porti la tua tavola doppia.", price: "20€" },
];

const CERVIAMARE_TABLE_OPTIONS: TableOption[] = [
  { name: "Tavola singola", forWho: "Noleggio per 1 persona.", price: "40€" },
  { name: "Tavola doppia", forWho: "Noleggio per 2 persone.", price: "60€" },
  { name: "Tavola propria", forWho: "Hai la tua tavola singola? Tariffa ridotta.", price: "20€" },
  { name: "Tavola doppia propria", forWho: "Porti la tua tavola doppia.", price: "30€" },
];

/** FAQ cerviAmare: colazione inclusa, ma orari propri (ritrovo 4.40, alba 5.44, fine 7.30). */
const CERVIAMARE_FAQ: FaqItem[] = ALBA_FAQ.map((i) => {
  if (i.q === "A che ora devo arrivare?") {
    return { q: "A che ora devo arrivare?", a: "Il ritrovo è alle 4.40. Arriva puntuale: partiamo presto per non perdere l'alba (che sorge alle 5.44). Verso le 6.30 facciamo colazione insieme e l'evento finisce intorno alle 7.30." };
  }
  if (i.q === "Quanto costa e la tavola è inclusa?") {
    return { q: "Quanto costa la tavola?", a: "Noleggio tavola: 40€ singola (1 persona), 60€ doppia (2 persone). Se hai la tua tavola: 20€ singola, 30€ doppia. La colazione è sempre compresa." };
  }
  return i;
});

const ALBA_INCLUDED = [
  "Istruttori e guida in mare",
  "Tavola SUP e pagaia (se a noleggio)",
  "Cintura di galleggiamento",
  "Briefing iniziale (anche per principianti)",
  "Colazione inclusa a fine uscita",
];

const ALBA_WHAT_TO_BRING = [
  "Costume già indossato",
  "Telo mare e un cambio asciutto",
  "Ciabatte",
  "Acqua",
  "Una felpa leggera per il primo mattino",
  "Custodia impermeabile per il telefono (se vuoi le foto)",
];

const ALBA_TIMELINE: TimelineStep[] = [
  { time: "04:30", label: "Ritrovo in spiaggia" },
  { time: "04:40", label: "Briefing e preparazione tavole" },
  { time: "05:30", label: "Alba dal mare" },
  { time: "06:20", label: "Rientro e colazione insieme (inclusa)" },
  { time: "07:00", label: "Fine evento" },
];

const ALBA_BREAKFAST =
  "La colazione è compresa: al rientro ci fermiamo tutti insieme con dolci, focacce dolci e salate, frutta fresca, caffè e succhi. Il modo perfetto per chiudere l'alba.";

/** Crea un'Alba in SUP a partire dai dati specifici, usando il template condiviso. */
function albaEvent(input: {
  title: string;
  slug: string;
  status: EventStatus;
  date: string;
  dateLabel: string;
  locationName: string;
  locationAddress: string;
  googleMapsUrl: string;
  photo: string;
}, overrides: Partial<SupEvent> = {}): SupEvent {
  return {
    title: input.title,
    slug: input.slug,
    category: "alba-in-sup",
    status: input.status,
    date: input.date,
    dateLabel: input.dateLabel,
    meetingTime: "04:30",
    sunriseTime: "05:30",
    endTime: "07:00",
    locationName: input.locationName,
    locationAddress: input.locationAddress,
    googleMapsUrl: input.googleMapsUrl,
    photo: input.photo,
    descriptionShort:
      "Esci all'alba col gruppo e guarda il sole salire dal mare. Adatta anche ai principianti, colazione inclusa al rientro.",
    experienceStory:
      "Arrivi in spiaggia quando è ancora buio e l'aria sa di sale. Prepariamo le tavole insieme, ti spieghiamo le basi e usciamo in mare col gruppo. Poi il cielo si accende: prima rosa, poi arancio, poi oro. Quando il sole rompe l'orizzonte ti godi l'alba direttamente dall'acqua — in silenzio, con gli istruttori a un metro da te. Al rientro la colazione è compresa: dolci, focacce, frutta e caffè tutti insieme. Non hai mai usato un SUP? Nessun problema, te lo insegniamo noi.",
    difficulty: "Adatto anche ai principianti",
    duration: "circa 3 ore",
    beginnerFriendly: true,
    swimmingRequired: true,
    instructors: "Istruttori in acqua per tutta l'uscita",
    included: ALBA_INCLUDED,
    breakfastStatus: "inclusa",
    breakfastDescription: ALBA_BREAKFAST,
    breakfastImage: "/media/colazione.jpg",
    tableOptions: ALBA_TABLE_OPTIONS,
    whatToBring: ALBA_WHAT_TO_BRING,
    priceFrom: "35€",
    capacityNote: "Prenotazione obbligatoria fino a esaurimento posti. Gli orari possono variare in base al numero di partecipanti.",
    timeline: ALBA_TIMELINE,
    faq: ALBA_FAQ,
    weatherPolicy: STD_WEATHER,
    seoTitle: `${input.title} a ${input.locationName}`,
    seoDescription: `Alba in SUP a ${input.locationName} (${input.locationAddress}): uscita guidata all'alba, tavola a noleggio, colazione inclusa. Adatta ai principianti, prenotazione online.`,
    ...overrides,
  };
}

export const events: SupEvent[] = [
  albaEvent({
    title: "Alba in SUP — 5 Luglio",
    slug: "alba-in-sup-5-luglio-2026",
    status: "Sold out",
    date: "2026-07-05",
    dateLabel: "Domenica 5 luglio 2026",
    locationName: "Bagno Adriatico",
    locationAddress: "Cesenatico (FC)",
    googleMapsUrl: "https://maps.google.com/?q=Bagno+Adriatico+Cesenatico",
    photo: "/media/alba-1.jpg",
  }),
  albaEvent({
    title: "Alba in SUP — 11 Luglio",
    slug: "alba-in-sup-11-luglio-2026",
    status: "In programma",
    date: "2026-07-11",
    dateLabel: "Sabato 11 luglio 2026",
    locationName: "Bagno Lavanda",
    locationAddress: "Cesenatico (FC)",
    googleMapsUrl: "https://maps.google.com/?q=Bagno+Lavanda+Cesenatico",
    photo: "/media/alba-5.jpg",
  }),
  albaEvent(
    {
      title: "Alba in SUP — 12 Luglio",
      slug: "alba-in-sup-12-luglio-2026",
      status: "In programma",
      date: "2026-07-12",
      dateLabel: "Domenica 12 luglio 2026",
      locationName: "Fantini Club",
      locationAddress: "Cervia (RA)",
      googleMapsUrl: "https://maps.google.com/?q=Fantini+Club+Cervia",
      photo: "/media/alba-7.jpg",
    },
    {
      tableOptions: FANTINI_TABLE_OPTIONS,
      priceFrom: "30€",
      breakfastStatus: "opzionale",
      breakfastDescription:
        "La colazione non è inclusa ma puoi prenderla in loco al Fantini Club. Due proposte: Colazione A (4,50€) — caffè o cappuccino con una pasta, oppure con una fetta di crostata; Colazione B (8€) — spremuta d'arancia con toast cotto e fontina, oppure con pane da toast e crema spalmabile.",
      breakfastImage: undefined,
      included: [
        "Istruttori e guida in mare",
        "Tavola SUP e pagaia (se a noleggio)",
        "Cintura di galleggiamento",
        "Briefing iniziale (anche per principianti)",
        "Possibilità di colazione in loco (a parte)",
      ],
      timeline: [
        { time: "04:30", label: "Ritrovo in spiaggia" },
        { time: "04:40", label: "Briefing e preparazione tavole" },
        { time: "05:30", label: "Alba dal mare" },
        { time: "06:20", label: "Rientro e colazione in loco (opzionale)" },
        { time: "07:00", label: "Fine evento" },
      ],
      faq: FANTINI_FAQ,
      descriptionShort:
        "Esci all'alba col gruppo e guarda il sole salire dal mare al Fantini Club di Cervia. Adatta anche ai principianti; colazione disponibile in loco.",
      experienceStory:
        "Arrivi in spiaggia quando è ancora buio e l'aria sa di sale. Prepariamo le tavole insieme, ti spieghiamo le basi e usciamo in mare col gruppo. Poi il cielo si accende: prima rosa, poi arancio, poi oro. Quando il sole rompe l'orizzonte ti godi l'alba direttamente dall'acqua — in silenzio, con gli istruttori a un metro da te. Al rientro, se vuoi, puoi fermarti per la colazione al Fantini Club. Non hai mai usato un SUP? Nessun problema, te lo insegniamo noi.",
      seoDescription:
        "Alba in SUP al Fantini Club di Cervia: uscita guidata all'alba, tavola a noleggio, colazione disponibile in loco. Adatta ai principianti, prenotazione online.",
    },
  ),
  albaEvent(
    {
      title: "Alba in SUP — 19 Luglio",
      slug: "alba-in-sup-19-luglio-2026",
      status: "Sold out",
      date: "2026-07-19",
      dateLabel: "Domenica 19 luglio 2026",
      locationName: "cerviAmare",
      locationAddress: "Cervia (RA)",
      googleMapsUrl: "https://maps.google.com/?q=cerviAmare+Lungomare+Gabriele+D%27Annunzio+222%2C+48015+Cervia+RA",
      photo: "/media/alba-6.jpg",
    },
    {
      meetingTime: "04:40",
      sunriseTime: "05:44",
      endTime: "07:30",
      tableOptions: CERVIAMARE_TABLE_OPTIONS,
      priceFrom: "40€",
      timeline: [
        { time: "04:40", label: "Ritrovo in spiaggia" },
        { time: "04:50", label: "Briefing e preparazione tavole" },
        { time: "05:44", label: "Alba dal mare" },
        { time: "06:30", label: "Rientro e colazione insieme (inclusa)" },
        { time: "07:30", label: "Fine evento" },
      ],
      faq: CERVIAMARE_FAQ,
    },
  ),
  albaEvent({
    title: "Alba in SUP — 25 Luglio",
    slug: "alba-in-sup-25-luglio-2026",
    status: "In programma",
    date: "2026-07-25",
    dateLabel: "Sabato 25 luglio 2026",
    locationName: "Bagno Selene",
    locationAddress: "Valverde di Cesenatico (FC)",
    googleMapsUrl: "https://maps.google.com/?q=Bagno+Selene+Valverde+Cesenatico",
    photo: "/media/alba-3.jpg",
  }),
  albaEvent({
    title: "Alba in SUP — 26 Luglio",
    slug: "alba-in-sup-26-luglio-2026",
    status: "In programma",
    date: "2026-07-26",
    dateLabel: "Domenica 26 luglio 2026",
    locationName: "Cala Romeo",
    locationAddress: "Cesenatico (FC)",
    googleMapsUrl: "https://maps.google.com/?q=Cala+Romeo+Cesenatico",
    photo: "/media/alba-4.jpg",
  }),
];

/* ---------- Helper di accesso ---------- */

/** Data odierna in fuso Europe/Rome, formato ISO YYYY-MM-DD. */
export function todayISO(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Rome",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

/** True se l'evento non è ancora passato (data >= oggi). */
export function isUpcoming(e: SupEvent): boolean {
  return e.date >= todayISO();
}

export function eventBySlug(slug: string): SupEvent | undefined {
  return events.find((e) => e.slug === slug);
}

const MONTHS_SHORT = ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"];

/** Data breve "DD Mmm" da una data ISO (YYYY-MM-DD), es. "26 Lug". */
export function shortDate(dateISO: string): string {
  const [, month, day] = dateISO.split("-").map(Number);
  return `${day} ${MONTHS_SHORT[month - 1]}`;
}

/** Etichetta breve evento per UI compatte (form, sticky CTA), es. "Alba 26 Lug". */
export function eventShortLabel(e: SupEvent): string {
  const cat = categoryBySlug(e.category);
  return `${cat?.filterLabel ?? "Evento"} ${shortDate(e.date)}`;
}

/** Eventi di una categoria non ancora passati, ordinati per data crescente. */
export function eventsByCategory(slug: CategorySlug): SupEvent[] {
  return events
    .filter((e) => e.category === slug && isUpcoming(e))
    .sort((a, b) => a.date.localeCompare(b.date));
}

/** Tutti gli eventi non ancora passati, ordinati per data crescente. */
export function visibleEvents(): SupEvent[] {
  return events.filter(isUpcoming).sort((a, b) => a.date.localeCompare(b.date));
}

const ACTIVE_STATUSES: EventStatus[] = ["In programma", "Posti limitati", "In arrivo"];

/** Eventi attivi e non passati, ordinati per data crescente. */
export function upcomingEvents(): SupEvent[] {
  return [...events]
    .filter((e) => ACTIVE_STATUSES.includes(e.status) && isUpcoming(e))
    .sort((a, b) => a.date.localeCompare(b.date));
}

/** I prossimi N eventi attivi dalla data odierna (default 3). */
export function nextEvents(limit = 3): SupEvent[] {
  return upcomingEvents().slice(0, limit);
}

/** Evento in evidenza per la home: il prossimo per data. */
export function featuredEvent(): SupEvent {
  return upcomingEvents()[0] ?? visibleEvents()[0] ?? events[0];
}

export function statusTone(status: EventStatus): "live" | "warn" | "muted" {
  if (status === "Posti limitati" || status === "Sold out") return "warn";
  if (status === "Passato" || status === "Rimandato") return "muted";
  return "live";
}
