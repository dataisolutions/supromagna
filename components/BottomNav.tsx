"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { bottomNav } from "@/lib/site";
import { Icon } from "@/components/icons";
import { cn } from "@/components/ui";

const iconMap = {
  home: Icon.Home,
  calendar: Icon.Calendar,
  board: Icon.Board,
  info: Icon.Info,
} as const;

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Navigazione principale"
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-navy/8 bg-cream/90 backdrop-blur-md md:hidden"
    >
      <ul className="mx-auto flex max-w-md items-stretch justify-around px-2 pb-[env(safe-area-inset-bottom)]">
        {bottomNav.map((item) => {
          const I = iconMap[item.icon as keyof typeof iconMap];
          const active =
            item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
          return (
            <li key={item.href} className="flex-1">
              <Link
                href={item.href}
                className={cn(
                  "flex flex-col items-center gap-0.5 py-2.5 text-[11px] font-medium transition-colors",
                  active ? "text-coral" : "text-navy/55",
                )}
              >
                <I className={cn("h-6 w-6", active && "stroke-[1.9]")} />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
