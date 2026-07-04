import { NextResponse, type NextRequest } from "next/server";
import { upcomingEvents } from "@/lib/events";

// Valutata a ogni richiesta: la "prossima alba" dipende dalla data odierna.
export const dynamic = "force-dynamic";

/**
 * /prossima-alba → redirect alla prossima Alba in SUP attiva (per data),
 * preservando eventuali parametri UTM. Esclude gli eventi non prenotabili
 * (Sold out, rimandati). Se non ci sono albe future, manda alla categoria Alba.
 */
export function GET(request: NextRequest) {
  const next = upcomingEvents().find((e) => e.category === "alba-in-sup");
  const target = next ? `/eventi/${next.slug}` : "/eventi-sup/alba-in-sup";

  const url = new URL(target, request.url);
  url.search = request.nextUrl.search; // mantiene UTM e altri query param
  return NextResponse.redirect(url, 307);
}
