/** Set di icone lineari custom (stroke coerente, 1.6px). */
import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function Base({ children, ...props }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      width={20}
      height={20}
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export const Icon = {
  Sunrise: (p: IconProps) => (
    <Base {...p}>
      <path d="M3 18h18M12 3v5M5.6 9.6 4 8M18.4 9.6 20 8M7 18a5 5 0 0 1 10 0" />
    </Base>
  ),
  Moon: (p: IconProps) => (
    <Base {...p}>
      <path d="M20 13.5A8 8 0 1 1 10.5 4a6.5 6.5 0 0 0 9.5 9.5Z" />
    </Base>
  ),
  Stars: (p: IconProps) => (
    <Base {...p}>
      <path d="M12 3l1.4 3.6L17 8l-3.6 1.4L12 13l-1.4-3.6L7 8l3.6-1.4z" />
      <path d="M18 14l.7 1.8L20.5 16l-1.8.7L18 18l-.7-1.3L15.5 16l1.8-.2z" />
    </Base>
  ),
  Yoga: (p: IconProps) => (
    <Base {...p}>
      <circle cx="12" cy="5" r="2" />
      <path d="M12 8v4M5 12h14M12 12l-4 7M12 12l4 7" />
    </Base>
  ),
  Drink: (p: IconProps) => (
    <Base {...p}>
      <path d="M5 4h14l-7 8zM12 12v6M8 21h8" />
    </Base>
  ),
  Sparkle: (p: IconProps) => (
    <Base {...p}>
      <path d="M12 3v18M3 12h18M6 6l12 12M18 6 6 18" />
    </Base>
  ),
  Pin: (p: IconProps) => (
    <Base {...p}>
      <path d="M12 21s-6-5.2-6-10a6 6 0 0 1 12 0c0 4.8-6 10-6 10Z" />
      <circle cx="12" cy="11" r="2.2" />
    </Base>
  ),
  Clock: (p: IconProps) => (
    <Base {...p}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </Base>
  ),
  Timer: (p: IconProps) => (
    <Base {...p}>
      <circle cx="12" cy="13" r="7.5" />
      <path d="M12 9v4l2.5 1.5M9.5 3h5" />
    </Base>
  ),
  Board: (p: IconProps) => (
    <Base {...p}>
      <path d="M12 2c4 3 4 17 0 20-4-3-4-17 0-20Z" />
      <path d="M12 5v14" />
    </Base>
  ),
  Coffee: (p: IconProps) => (
    <Base {...p}>
      <path d="M4 8h13v4a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5zM17 9h2a2 2 0 0 1 0 4h-2M5 3v1.5M9 3v1.5M13 3v1.5" />
    </Base>
  ),
  Wave: (p: IconProps) => (
    <Base {...p}>
      <path d="M2 9c2 0 2 2 4 2s2-2 4-2 2 2 4 2 2-2 4-2 2 2 4 2M2 15c2 0 2 2 4 2s2-2 4-2 2 2 4 2 2-2 4-2 2 2 4 2" />
    </Base>
  ),
  Shield: (p: IconProps) => (
    <Base {...p}>
      <path d="M12 3 5 6v5c0 4.5 3 7.7 7 9 4-1.3 7-4.5 7-9V6z" />
      <path d="m9.5 12 1.8 1.8 3.2-3.6" />
    </Base>
  ),
  Users: (p: IconProps) => (
    <Base {...p}>
      <circle cx="9" cy="8" r="3" />
      <path d="M3 19a6 6 0 0 1 12 0M16 6a3 3 0 0 1 0 6M21 19a6 6 0 0 0-4-5.6" />
    </Base>
  ),
  Camera: (p: IconProps) => (
    <Base {...p}>
      <path d="M3 8.5A2 2 0 0 1 5 6.5h2l1.2-1.6h7.6L17 6.5h2a2 2 0 0 1 2 2V18a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <circle cx="12" cy="12.5" r="3" />
    </Base>
  ),
  Check: (p: IconProps) => (
    <Base {...p}>
      <path d="m5 12.5 4.2 4.2L19 7" />
    </Base>
  ),
  Heart: (p: IconProps) => (
    <Base {...p}>
      <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z" />
    </Base>
  ),
  Whatsapp: (p: IconProps) => (
    <svg viewBox="0 0 24 24" width={20} height={20} fill="currentColor" aria-hidden="true" {...p}>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.9c0 1.75.46 3.45 1.32 4.95L2 22l5.3-1.39a9.9 9.9 0 0 0 4.73 1.2h.01c5.46 0 9.9-4.45 9.9-9.9C21.95 6.45 17.5 2 12.04 2Zm0 18.02h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.14.82.84-3.06-.2-.31a8.18 8.18 0 0 1-1.26-4.36c0-4.53 3.69-8.21 8.23-8.21 2.2 0 4.26.86 5.82 2.41a8.16 8.16 0 0 1 2.41 5.82c0 4.54-3.69 8.22-8.23 8.22Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.78.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.51.11-.11.25-.29.37-.43.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.24 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28Z" />
    </svg>
  ),
  Home: (p: IconProps) => (
    <Base {...p}>
      <path d="M4 11 12 4l8 7M6 10v9h12v-9" />
    </Base>
  ),
  Calendar: (p: IconProps) => (
    <Base {...p}>
      <rect x="4" y="5" width="16" height="16" rx="2.5" />
      <path d="M4 9.5h16M8 3v3M16 3v3" />
    </Base>
  ),
  Info: (p: IconProps) => (
    <Base {...p}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 11v5M12 8h.01" />
    </Base>
  ),
  Menu: (p: IconProps) => (
    <Base {...p}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </Base>
  ),
  Close: (p: IconProps) => (
    <Base {...p}>
      <path d="M6 6l12 12M18 6 6 18" />
    </Base>
  ),
  ArrowRight: (p: IconProps) => (
    <Base {...p}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </Base>
  ),
  ChevronDown: (p: IconProps) => (
    <Base {...p}>
      <path d="m6 9 6 6 6-6" />
    </Base>
  ),
  Mail: (p: IconProps) => (
    <Base {...p}>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m4 7 8 6 8-6" />
    </Base>
  ),
  Instagram: (p: IconProps) => (
    <svg viewBox="0 0 24 24" width={20} height={20} fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  ),
};

export type IconName = keyof typeof Icon;
