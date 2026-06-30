"use client";

import { useEffect } from "react";

/**
 * Attribuzione "first-touch": cattura UTM + referrer al primo atterraggio
 * su una qualsiasi pagina e li conserva, così restano disponibili quando
 * l'utente arriva al form evento (che vive su un'altra URL senza UTM).
 */

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;
const STORAGE_KEY = "supr_attribution";

export type Attribution = Partial<Record<(typeof UTM_KEYS)[number], string>> & {
  referrer?: string;
  landing?: string;
  ts?: string;
};

export function AttributionTracker() {
  useEffect(() => {
    try {
      // Già salvata in un precedente atterraggio: non sovrascrivere (first-touch).
      if (localStorage.getItem(STORAGE_KEY)) return;

      const params = new URLSearchParams(window.location.search);
      const hasUtm = UTM_KEYS.some((k) => params.get(k));
      const ref = document.referrer && !document.referrer.startsWith(window.location.origin)
        ? document.referrer
        : "";

      // Salva solo se c'è qualcosa di utile (UTM o referrer esterno).
      if (!hasUtm && !ref) return;

      const data: Attribution = { landing: window.location.pathname.slice(0, 300), ts: String(Date.now()) };
      for (const k of UTM_KEYS) {
        const v = params.get(k);
        if (v) data[k] = v.slice(0, 150);
      }
      if (ref) data.referrer = ref.slice(0, 300);

      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // localStorage non disponibile (navigazione privata): ignora.
    }
  }, []);

  return null;
}

/** Legge l'attribuzione salvata (vuota se assente o storage non disponibile). */
export function readAttribution(): Attribution {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Attribution) : {};
  } catch {
    return {};
  }
}

/** Provenienza leggibile: utm_source, poi host del referrer, infine "diretto". */
export function provenanceLabel(a: Attribution, currentUtmSource?: string): string {
  const source = currentUtmSource || a.utm_source;
  if (source) return source;
  if (a.referrer) {
    try {
      return new URL(a.referrer).hostname.replace(/^www\./, "");
    } catch {
      /* referrer malformato */
    }
  }
  return "diretto";
}
