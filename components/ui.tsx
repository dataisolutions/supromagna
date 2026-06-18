import Link from "next/link";
import type { EventStatus } from "@/lib/events";
import { statusTone } from "@/lib/events";

export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function Container({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("mx-auto w-full max-w-6xl px-5 sm:px-6", className)}>{children}</div>;
}

export function Section({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("py-14 sm:py-20", className)}>
      {children}
    </section>
  );
}

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn("eyebrow text-coral", className)}>{children}</p>;
}

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "whatsapp";
  size?: "md" | "lg";
  className?: string;
  external?: boolean;
};

const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 active:scale-[0.98] focus-visible:outline-none";

const buttonSizes = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

const buttonVariants = {
  primary:
    "bg-coral text-white shadow-[var(--shadow-coral)] hover:bg-coral-deep hover:-translate-y-0.5",
  secondary:
    "bg-white text-navy ring-1 ring-navy/10 shadow-[var(--shadow-soft)] hover:ring-navy/20 hover:-translate-y-0.5",
  ghost: "text-navy/80 hover:text-navy hover:bg-navy/5",
  whatsapp: "bg-[#25D366] text-white shadow-[var(--shadow-soft)] hover:brightness-95 hover:-translate-y-0.5",
};

export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  className,
  external,
}: ButtonProps) {
  const cls = cn(buttonBase, buttonSizes[size], buttonVariants[variant], className);
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

export function StatusBadge({ status, className }: { status: EventStatus; className?: string }) {
  const tone = statusTone(status);
  const styles = {
    live: "bg-teal/10 text-teal-deep ring-teal/20",
    warn: "bg-coral/12 text-coral-deep ring-coral/25",
    muted: "bg-navy/8 text-navy/60 ring-navy/10",
  }[tone];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ring-1",
        styles,
        className,
      )}
    >
      {tone !== "muted" && (
        <span
          className={cn(
            "h-1.5 w-1.5 rounded-full",
            tone === "live" ? "bg-teal" : "bg-coral",
          )}
        />
      )}
      {status}
    </span>
  );
}

export function Pill({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full bg-white/70 px-3 py-1 text-xs font-medium text-navy/75 ring-1 ring-navy/8 backdrop-blur",
        className,
      )}
    >
      {children}
    </span>
  );
}
