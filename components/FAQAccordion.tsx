"use client";

import { useState } from "react";
import type { FaqItem } from "@/lib/events";
import { Icon } from "@/components/icons";
import { cn } from "@/components/ui";

export function FAQAccordion({ items, defaultOpen = 0 }: { items: FaqItem[]; defaultOpen?: number }) {
  const [open, setOpen] = useState<number | null>(defaultOpen);

  return (
    <div className="divide-y divide-navy/8 overflow-hidden rounded-[var(--radius-card)] bg-white ring-1 ring-navy/8">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-cream"
            >
              <span className="font-semibold text-navy">{item.q}</span>
              <Icon.ChevronDown
                className={cn(
                  "h-5 w-5 shrink-0 text-coral transition-transform duration-300",
                  isOpen && "rotate-180",
                )}
              />
            </button>
            <div
              className={cn(
                "grid transition-all duration-300 ease-out",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 text-[15px] leading-relaxed text-navy/70">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
