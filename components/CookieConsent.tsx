"use client";

import { useEffect, useState } from "react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: Record<string, unknown>[];
  }
}

const STORAGE_KEY = "cookie_consent";

/**
 * Banner cookie + Google Consent Mode v2. Il consenso parte "denied" (impostato
 * in <head> prima di GTM); qui l'utente sceglie e aggiorniamo lo stato.
 */
export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      // storage non disponibile: per sicurezza non mostriamo (resta tutto denied).
    }
  }, []);

  function decide(granted: boolean) {
    try {
      localStorage.setItem(STORAGE_KEY, granted ? "granted" : "denied");
    } catch {
      /* ignora */
    }
    if (granted && typeof window.gtag === "function") {
      window.gtag("consent", "update", {
        ad_storage: "granted",
        analytics_storage: "granted",
        ad_user_data: "granted",
        ad_personalization: "granted",
      });
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-[100] p-3 sm:p-4">
      <div className="mx-auto flex max-w-3xl flex-col gap-3 rounded-2xl bg-white p-4 shadow-[var(--shadow-lift)] ring-1 ring-navy/10 sm:flex-row sm:items-center sm:gap-4">
        <p className="text-sm leading-relaxed text-navy/75">
          Usiamo cookie per analisi e per migliorare il sito. Puoi accettarli tutti o tenere solo quelli
          necessari.{" "}
          <a href="/privacy" className="font-medium text-teal underline underline-offset-2">
            Informativa privacy
          </a>
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => decide(false)}
            className="rounded-full px-4 py-2.5 text-sm font-semibold text-navy/70 ring-1 ring-navy/15 transition-colors hover:bg-cream"
          >
            Solo necessari
          </button>
          <button
            type="button"
            onClick={() => decide(true)}
            className="rounded-full bg-coral px-5 py-2.5 text-sm font-semibold text-white shadow-[var(--shadow-soft)] transition-all hover:-translate-y-0.5 hover:brightness-95"
          >
            Accetta
          </button>
        </div>
      </div>
    </div>
  );
}
