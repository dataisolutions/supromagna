import { NextResponse, type NextRequest } from "next/server";
import { eventsByCategory } from "@/lib/events";

// Valutata a ogni richiesta: la "prossima alba" dipende dalla data odierna.
export const dynamic = "force-dynamic";

/**
 * /prossima-alba → redirect alla prossima Alba in SUP in programma (per data),
 * preservando eventuali parametri UTM. Se non ci sono albe future, manda alla
 * pagina categoria Alba.
 */
export function GET(request: NextRequest) {
  const next = eventsByCategory("alba-in-sup")[0];
  const target = next ? `/eventi/${next.slug}` : "/eventi-sup/alba-in-sup";

  const url = new URL(target, request.url);
  url.search = request.nextUrl.search; // mantiene UTM e altri query param
  return NextResponse.redirect(url, 307);
}
