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
  | "astro-sup"
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
    slug: "astro-sup",
    name: "AstroSUP / Notturni",
    short: "Pagaia sotto le stelle, con il mare nero e il cielo aperto sopra di te.",
    tagline: "Il mare di notte è un altro mare.",
    intro:
      "Quando cala il buio l'Adriatico diventa silenzioso e profondo. Usciamo con luci e guida, alziamo lo sguardo e ci godiamo il cielo lontano dalle luci della costa. Notti di stelle cadenti comprese.",
    emoji: "✨",
    filterLabel: "Notturni",
    photo: "/media/alba-6.jpg",
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
  { q: "A che ora devo arrivare?", a: "Trovi l'orario di ritrovo nella scheda qui sopra. Arriva 10 minuti prima: partiamo puntuali per non perdere l'alba." },
  { q: "Dove ci troviamo esattamente?", a: "Il punto di ritrovo è indicato con link a Google Maps nella scheda evento. Ti mandiamo anche la posizione esatta su WhatsApp il giorno prima." },
  { q: "Posso partecipare se non ho mai fatto SUP?", a: "Sì. Prima di entrare in acqua facciamo un briefing e gli istruttori ti seguono per tutta l'uscita. La maggior parte dei partecipanti è alla prima volta." },
  { q: "Devo saper nuotare?", a: "Sì, è importante saper nuotare e sentirsi a proprio agio in mare. Indossi sempre una cintura di galleggiamento." },
  { q: "La tavola è inclusa?", a: "Sì, tavola e pagaia sono incluse. Se hai la tua tavola puoi portarla: scegli l'opzione \"tavola propria\"." },
  { q: "La colazione è inclusa?", a: "Dipende dall'evento: trovi lo stato (inclusa / opzionale / non inclusa) nella scheda qui sopra." },
  { q: "Posso venire con bambini?", a: "Sì, su tavola con un adulto e su valutazione dell'età. Scrivici su WhatsApp e troviamo la soluzione giusta." },
  { q: "Cosa succede se piove o il mare è mosso?", a: "Se le condizioni non sono sicure rimandiamo o annulliamo e ti avvisiamo su WhatsApp. La tua prenotazione resta valida per la nuova data." },
  { q: "Come funziona la prenotazione?", a: "Lasci i tuoi dati nel form, ti scriviamo su WhatsApp con tutte le info e confermiamo insieme il posto. Nessun pagamento online richiesto per l'MVP." },
];

export const events: SupEvent[] = [
  {
    title: "Alba in SUP — 21 Giugno",
    slug: "alba-in-sup-21-giugno-2026",
    category: "alba-in-sup",
    status: "Posti limitati",
    featured: true,
    date: "2026-06-21",
    dateLabel: "Domenica 21 giugno 2026",
    meetingTime: "04:30",
    startTime: "05:00",
    sunriseTime: "05:34",
    endTime: "06:30",
    locationName: "Adriatico 62",
    locationAddress: "Cesenatico (FC)",
    googleMapsUrl: "https://maps.google.com/?q=Cesenatico",
    photo: "/media/alba-1.jpg",
    descriptionShort:
      "La prima alba dell'estate, dall'acqua. Briefing, uscita guidata e il sole che sale dal mare mentre il resto della Riviera dorme.",
    experienceStory:
      "Arrivi in spiaggia quando è ancora buio e l'aria sa di sale. Prepariamo le tavole insieme, ti spieghiamo le basi e usciamo in mare col gruppo. Poi il cielo si accende: prima rosa, poi arancio, poi oro. Quando il sole rompe l'orizzonte ti godi l'alba direttamente dall'acqua — in silenzio, con la musica bassa e gli istruttori a un metro da te. È il modo più bello che conosciamo per iniziare una giornata.",
    difficulty: "Adatto anche ai principianti",
    duration: "2/3 ore",
    beginnerFriendly: true,
    swimmingRequired: true,
    instructors: "2 istruttori in acqua per tutta l'uscita",
    included: [
      "Istruttori e guida in mare",
      "Tavola SUP (se richiesta)",
      "Pagaia",
      "Cintura di galleggiamento",
      "Briefing iniziale",
      "Foto dell'alba dal gruppo",
    ],
    breakfastStatus: "opzionale",
    breakfastDescription:
      "Dopo l'uscita puoi fermarti per la colazione all'Adriatico 62: cornetto, caffè e spremuta. Da aggiungere in fase di prenotazione (a partire da 6€).",
    tableOptions: [
      { name: "Tavola singola", forWho: "Per chi vuole la propria tavola e un po' di autonomia.", price: "35€" },
      { name: "Tavola doppia", forWho: "Per coppie o per chi preferisce condividere l'esperienza.", price: "60€ in due" },
      { name: "Tavola propria", forWho: "Hai già la tua tavola? Partecipi alla tariffa ridotta.", price: "25€" },
    ],
    whatToBring: [
      "Costume già indossato",
      "Telo mare e un cambio asciutto",
      "Ciabatte",
      "Acqua",
      "Una felpa leggera per il primo mattino",
      "Custodia impermeabile per il telefono (se vuoi le foto)",
    ],
    priceFrom: "25€",
    capacityNote: "Massimo 12 partecipanti per garantire la guida a tutti.",
    timeline: [
      { time: "04:30", label: "Ritrovo in spiaggia" },
      { time: "04:40", label: "Briefing e preparazione tavole" },
      { time: "05:00", label: "Uscita in mare" },
      { time: "05:34", label: "Alba dal mare" },
      { time: "06:15", label: "Rientro verso riva" },
      { time: "06:30", label: "Colazione e saluti" },
    ],
    faq: ALBA_FAQ,
    weatherPolicy: STD_WEATHER,
    seoTitle: "Alba in SUP — 21 Giugno a Cesenatico",
    seoDescription:
      "Partecipa all'Alba in SUP a Cesenatico: uscita guidata in mare, briefing iniziale, tavola disponibile e info pratiche per prenotare su WhatsApp.",
  },
  {
    title: "Alba in SUP — 19 Luglio",
    slug: "alba-in-sup-19-luglio-2026",
    category: "alba-in-sup",
    status: "In programma",
    date: "2026-07-19",
    dateLabel: "Domenica 19 luglio 2026",
    meetingTime: "04:50",
    startTime: "05:15",
    sunriseTime: "05:48",
    endTime: "06:45",
    locationName: "Bagno Adriatico",
    locationAddress: "Cesenatico (FC)",
    googleMapsUrl: "https://maps.google.com/?q=Cesenatico",
    photo: "/media/alba-5.jpg",
    descriptionShort:
      "L'alba di metà estate, con il mare caldo e la luce lunga. Stessa magia, acqua ancora più dolce.",
    experienceStory:
      "A luglio l'Adriatico è tiepido e l'alba arriva con calma. Usciamo col gruppo, troviamo il nostro punto e aspettiamo il sole insieme. È l'uscita perfetta se vuoi provare l'alba in SUP con il mare nella sua versione più gentile dell'anno.",
    difficulty: "Adatto anche ai principianti",
    duration: "2 ore",
    beginnerFriendly: true,
    swimmingRequired: true,
    instructors: "2 istruttori in acqua",
    included: [
      "Istruttori e guida in mare",
      "Tavola SUP (se richiesta)",
      "Pagaia",
      "Cintura di galleggiamento",
      "Briefing iniziale",
    ],
    breakfastStatus: "opzionale",
    breakfastDescription: "Colazione al bagno disponibile su richiesta dopo l'uscita.",
    tableOptions: [
      { name: "Tavola singola", forWho: "La scelta più comune per chi vuole autonomia.", price: "35€" },
      { name: "Tavola doppia", forWho: "Per condividere la tavola in due.", price: "60€ in due" },
      { name: "Tavola propria", forWho: "Porti la tua, paghi meno.", price: "25€" },
    ],
    whatToBring: [
      "Costume già indossato",
      "Telo e cambio asciutto",
      "Ciabatte",
      "Acqua",
      "Custodia impermeabile per il telefono",
    ],
    priceFrom: "25€",
    capacityNote: "Massimo 12 partecipanti.",
    timeline: [
      { time: "04:50", label: "Ritrovo in spiaggia" },
      { time: "05:00", label: "Briefing e preparazione" },
      { time: "05:15", label: "Uscita in mare" },
      { time: "05:48", label: "Alba dal mare" },
      { time: "06:30", label: "Rientro" },
      { time: "06:45", label: "Saluti (colazione opzionale)" },
    ],
    faq: ALBA_FAQ,
    weatherPolicy: STD_WEATHER,
    seoTitle: "Alba in SUP — 19 Luglio a Cesenatico",
    seoDescription:
      "Alba in SUP a Cesenatico il 19 luglio 2026: uscita guidata all'alba, tavola inclusa su richiesta, adatta ai principianti. Prenota su WhatsApp.",
  },
  {
    title: "AstroSUP — Notte di San Lorenzo",
    slug: "astro-sup-san-lorenzo-2026",
    category: "astro-sup",
    status: "Posti limitati",
    featured: false,
    date: "2026-08-10",
    dateLabel: "Lunedì 10 agosto 2026",
    meetingTime: "21:00",
    startTime: "21:30",
    endTime: "23:30",
    locationName: "Spiaggia di Ponente",
    locationAddress: "Cesenatico (FC)",
    googleMapsUrl: "https://maps.google.com/?q=Cesenatico+Ponente",
    photo: "/media/alba-6.jpg",
    descriptionShort:
      "Pagaia sotto le stelle cadenti nella notte più magica dell'estate. Tavole con luce, mare nero, cielo aperto.",
    experienceStory:
      "La notte di San Lorenzo usciamo quando il sole è già sceso. Le tavole hanno luci soffuse, il mare è uno specchio scuro e sopra di te si apre il cielo. Ci fermiamo al largo, spegniamo tutto per qualche minuto e aspettiamo le stelle cadenti, sdraiati sulla tavola. Un'esperienza che non somiglia a nient'altro.",
    difficulty: "Adatto anche ai principianti, mare calmo",
    duration: "2 ore",
    beginnerFriendly: true,
    swimmingRequired: true,
    instructors: "2 istruttori con luci di segnalazione",
    included: [
      "Istruttori e guida notturna",
      "Tavola SUP con luce (se richiesta)",
      "Pagaia",
      "Cintura di galleggiamento",
      "Briefing sicurezza notturna",
    ],
    breakfastStatus: "non inclusa",
    tableOptions: [
      { name: "Tavola singola", forWho: "Per vivere la notte in autonomia.", price: "40€" },
      { name: "Tavola doppia", forWho: "Più rassicurante al buio, perfetta in coppia.", price: "70€ in due" },
      { name: "Tavola propria", forWho: "Porti la tua tavola (ti diamo noi la luce).", price: "30€" },
    ],
    whatToBring: [
      "Costume già indossato",
      "Telo e cambio asciutto",
      "Una felpa: di notte rinfresca",
      "Ciabatte",
      "Acqua",
    ],
    priceFrom: "30€",
    capacityNote: "Posti molto limitati: è l'evento più richiesto dell'estate.",
    timeline: [
      { time: "21:00", label: "Ritrovo in spiaggia" },
      { time: "21:15", label: "Briefing sicurezza notturna" },
      { time: "21:30", label: "Uscita in mare" },
      { time: "22:15", label: "Sosta sotto le stelle" },
      { time: "23:15", label: "Rientro" },
      { time: "23:30", label: "Saluti" },
    ],
    faq: ALBA_FAQ,
    weatherPolicy: STD_WEATHER,
    seoTitle: "AstroSUP Notte di San Lorenzo a Cesenatico",
    seoDescription:
      "SUP notturno nella notte di San Lorenzo a Cesenatico: tavole con luce, uscita guidata e stelle cadenti dal mare. Posti limitati, prenota su WhatsApp.",
  },
  {
    title: "Yoga in SUP all'alba",
    slug: "yoga-in-sup-alba-5-luglio-2026",
    category: "yoga-sup",
    status: "In programma",
    date: "2026-07-05",
    dateLabel: "Domenica 5 luglio 2026",
    meetingTime: "06:00",
    startTime: "06:20",
    endTime: "07:45",
    locationName: "Bagno Milano",
    locationAddress: "Rimini (RN)",
    googleMapsUrl: "https://maps.google.com/?q=Rimini+spiaggia",
    photo: "/media/alba-3.jpg",
    descriptionShort:
      "Pratica yoga dolce sulla tavola, cullata dal mare calmo del mattino. Respiro, equilibrio e un sorriso quando cadi.",
    experienceStory:
      "Al mattino presto il mare è uno specchio. Stendiamo le tavole come tappetini galleggianti e iniziamo una pratica lenta: saluti al sole veri, davanti al sole vero. Niente performance, niente fretta — solo il respiro, l'acqua sotto di te e ogni tanto una risata quando l'equilibrio scherza. Istruttrice di yoga certificata e istruttori SUP in acqua.",
    difficulty: "Tutti i livelli, anche prima volta",
    duration: "1.5 ore",
    beginnerFriendly: true,
    swimmingRequired: true,
    instructors: "Istruttrice yoga certificata + istruttore SUP",
    included: [
      "Istruttrice yoga e guida SUP",
      "Tavola SUP da yoga",
      "Pagaia",
      "Cintura di galleggiamento",
      "Sessione di rilassamento finale",
    ],
    breakfastStatus: "opzionale",
    breakfastDescription: "Tisana e frutta a fine sessione, su richiesta.",
    tableOptions: [
      { name: "Tavola singola", forWho: "Una tavola tutta per te per la pratica.", price: "35€" },
      { name: "Tavola propria", forWho: "Hai una tavola da yoga? Porta la tua.", price: "28€" },
    ],
    whatToBring: [
      "Costume già indossato",
      "Abbigliamento comodo per la pratica",
      "Telo mare",
      "Acqua",
      "Voglia di rallentare",
    ],
    priceFrom: "28€",
    capacityNote: "Massimo 10 tavole per mantenere la calma del gruppo.",
    timeline: [
      { time: "06:00", label: "Ritrovo e benvenuto" },
      { time: "06:15", label: "Riscaldamento a riva" },
      { time: "06:20", label: "In acqua: pratica yoga" },
      { time: "07:20", label: "Rilassamento finale" },
      { time: "07:45", label: "Rientro e tisana" },
    ],
    faq: ALBA_FAQ,
    weatherPolicy: STD_WEATHER,
    seoTitle: "Yoga in SUP all'alba a Rimini",
    seoDescription:
      "Yoga in SUP all'alba a Rimini: pratica dolce sulla tavola, mare calmo, istruttrice certificata. Adatta a tutti i livelli. Prenota su WhatsApp.",
  },
  {
    title: "AperiSUP al tramonto",
    slug: "aperisup-tramonto-12-luglio-2026",
    category: "aperisup",
    status: "In programma",
    date: "2026-07-12",
    dateLabel: "Domenica 12 luglio 2026",
    meetingTime: "18:30",
    startTime: "19:00",
    endTime: "21:00",
    locationName: "Bagno Tiki",
    locationAddress: "Milano Marittima (RA)",
    googleMapsUrl: "https://maps.google.com/?q=Milano+Marittima",
    photo: "/media/alba-7.jpg",
    descriptionShort:
      "Si pagaia verso il tramonto, ci si ferma e si brinda sull'acqua. L'uscita più social dell'estate.",
    experienceStory:
      "Il tardo pomeriggio è il momento più morbido della giornata. Usciamo col gruppo quando il sole inizia a scendere, raggiungiamo un punto tranquillo e tiriamo fuori il brindisi. Si chiacchiera, si ride, si scattano foto col cielo che diventa arancione. Poi rientriamo con calma, mentre la spiaggia si accende. Perfetto per gruppi di amici e per chi vuole provare il SUP senza sforzare.",
    difficulty: "Adatto a tutti, mare calmo",
    duration: "2 ore",
    beginnerFriendly: true,
    swimmingRequired: true,
    instructors: "2 istruttori in acqua",
    included: [
      "Istruttori e guida in mare",
      "Tavola SUP (se richiesta)",
      "Pagaia",
      "Cintura di galleggiamento",
      "Aperitivo sull'acqua (analcolico incluso)",
    ],
    breakfastStatus: "non inclusa",
    tableOptions: [
      { name: "Tavola singola", forWho: "Per chi vuole pagaiare in autonomia.", price: "38€" },
      { name: "Tavola doppia", forWho: "Per coppie e per chi vuole brindare in due.", price: "65€ in due" },
      { name: "Tavola propria", forWho: "Hai la tua tavola? Tariffa ridotta.", price: "28€" },
    ],
    whatToBring: [
      "Costume già indossato",
      "Telo e cambio",
      "Occhiali da sole",
      "Buonumore",
    ],
    priceFrom: "28€",
    capacityNote: "Gruppi fino a 14 persone. Ottimo per compleanni e addii al celibato/nubilato.",
    timeline: [
      { time: "18:30", label: "Ritrovo in spiaggia" },
      { time: "18:45", label: "Briefing e tavole" },
      { time: "19:00", label: "Uscita verso il tramonto" },
      { time: "19:45", label: "Sosta e brindisi" },
      { time: "20:40", label: "Rientro" },
      { time: "21:00", label: "Saluti" },
    ],
    faq: ALBA_FAQ,
    weatherPolicy: STD_WEATHER,
    seoTitle: "AperiSUP al tramonto a Milano Marittima",
    seoDescription:
      "AperiSUP al tramonto a Milano Marittima: uscita in SUP, brindisi sull'acqua e gruppo. Adatto a tutti, ideale per gruppi di amici. Prenota su WhatsApp.",
  },
  {
    title: "Luna Piena in SUP — Evento speciale",
    slug: "luna-piena-in-sup-29-agosto-2026",
    category: "eventi-speciali",
    status: "In arrivo",
    date: "2026-08-29",
    dateLabel: "Sabato 29 agosto 2026",
    meetingTime: "20:30",
    startTime: "21:00",
    endTime: "23:00",
    locationName: "Spiaggia di Levante",
    locationAddress: "Cesenatico (FC)",
    googleMapsUrl: "https://maps.google.com/?q=Cesenatico+Levante",
    photo: "/media/alba-2.jpg",
    descriptionShort:
      "Un'unica data per pagaiare sotto la luna piena di fine estate, con la sua scia d'argento sull'acqua.",
    experienceStory:
      "La luna piena disegna una strada d'argento sul mare e noi la seguiamo con le tavole. È un evento che facciamo una volta a stagione, quando la luna è perfetta e il mare promette calma. Musica bassa, gruppo piccolo, atmosfera che ricorderai a lungo. Chiudiamo l'estate come merita.",
    difficulty: "Adatto anche ai principianti, mare calmo",
    duration: "2 ore",
    beginnerFriendly: true,
    swimmingRequired: true,
    instructors: "2 istruttori con luci",
    included: [
      "Istruttori e guida notturna",
      "Tavola SUP con luce (se richiesta)",
      "Pagaia",
      "Cintura di galleggiamento",
      "Briefing sicurezza notturna",
    ],
    breakfastStatus: "non inclusa",
    tableOptions: [
      { name: "Tavola singola", forWho: "Per vivere la luna in autonomia.", price: "42€" },
      { name: "Tavola doppia", forWho: "Romantica, in coppia sotto la luna.", price: "75€ in due" },
    ],
    whatToBring: [
      "Costume già indossato",
      "Felpa per la sera",
      "Telo e cambio",
      "Ciabatte",
    ],
    priceFrom: "42€",
    capacityNote: "Data unica, gruppo ristretto: di solito sold out con largo anticipo.",
    timeline: [
      { time: "20:30", label: "Ritrovo in spiaggia" },
      { time: "20:45", label: "Briefing sicurezza" },
      { time: "21:00", label: "Uscita sotto la luna" },
      { time: "21:45", label: "Sosta sulla scia d'argento" },
      { time: "22:45", label: "Rientro" },
      { time: "23:00", label: "Saluti finali" },
    ],
    faq: ALBA_FAQ,
    weatherPolicy: STD_WEATHER,
    seoTitle: "Luna Piena in SUP a Cesenatico — Evento speciale",
    seoDescription:
      "Evento speciale: SUP sotto la luna piena a Cesenatico il 29 agosto 2026. Data unica, gruppo ristretto, tavole con luce. Prenota in anticipo su WhatsApp.",
  },
];

/* ---------- Helper di accesso ---------- */

export function eventBySlug(slug: string): SupEvent | undefined {
  return events.find((e) => e.slug === slug);
}

export function eventsByCategory(slug: CategorySlug): SupEvent[] {
  return events.filter((e) => e.category === slug);
}

const ACTIVE_STATUSES: EventStatus[] = ["In programma", "Posti limitati", "In arrivo"];

/** Eventi attivi ordinati per data crescente. */
export function upcomingEvents(): SupEvent[] {
  return [...events]
    .filter((e) => ACTIVE_STATUSES.includes(e.status))
    .sort((a, b) => a.date.localeCompare(b.date));
}

/** Evento in evidenza per la home: il featured, altrimenti il primo in calendario. */
export function featuredEvent(): SupEvent {
  return events.find((e) => e.featured) ?? upcomingEvents()[0] ?? events[0];
}

export function statusTone(status: EventStatus): "live" | "warn" | "muted" {
  if (status === "Posti limitati" || status === "Sold out") return "warn";
  if (status === "Passato" || status === "Rimandato") return "muted";
  return "live";
}
