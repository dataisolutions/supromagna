import Image from "next/image";
import { cn } from "@/components/ui";

/**
 * Foto reale a riempimento (object-cover) con next/image.
 * Usata per le immagini autentiche delle albe in SUP fornite dal cliente.
 */
export function Photo({
  src,
  alt,
  className,
  priority,
  sizes = "(max-width: 768px) 100vw, 50vw",
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className={cn("object-cover", className)}
    />
  );
}
