"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export type PurchaseData = {
  transactionId: string;
  value: number;
  currency: string;
  eventTitle?: string;
  eventSlug?: string;
  people?: number;
  source?: string;
};

/**
 * Invia l'evento e-commerce "purchase" al dataLayer di GTM (struttura GA4).
 * Si attiva una sola volta per transazione, anche in caso di refresh della pagina.
 */
export function PurchaseTracking(props: PurchaseData) {
  useEffect(() => {
    const guardKey = `purchase_fired_${props.transactionId}`;
    try {
      if (sessionStorage.getItem(guardKey)) return;
      sessionStorage.setItem(guardKey, "1");
    } catch {
      // sessionStorage non disponibile: ci affidiamo alla dedup di GA4 sul transaction_id.
    }

    window.dataLayer = window.dataLayer || [];
    // Reset dell'oggetto ecommerce per evitare contaminazioni tra eventi.
    window.dataLayer.push({ ecommerce: null });
    window.dataLayer.push({
      event: "purchase",
      lead_source: props.source ?? "diretto",
      ecommerce: {
        transaction_id: props.transactionId,
        value: props.value,
        currency: props.currency,
        items: [
          {
            item_id: props.eventSlug,
            item_name: props.eventTitle,
            quantity: props.people ?? 1,
            price: props.people && props.people > 0 ? props.value / props.people : props.value,
          },
        ],
      },
    });
  }, [props]);

  return null;
}
