import { Container, Button } from "@/components/ui";
import { Icon } from "@/components/icons";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 sky-gradient-soft" aria-hidden="true" />
      <Container className="relative flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
        <p className="font-display text-7xl font-semibold text-white drop-shadow-sm">404</p>
        <h1 className="mt-3 font-display text-3xl font-semibold text-white sm:text-4xl">
          Questa pagina è andata alla deriva
        </h1>
        <p className="mt-3 max-w-md text-white/90">
          Forse l&apos;evento è passato o il link non è più valido. Torniamo a riva e ripartiamo dagli eventi in programma.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Button href="/" variant="secondary" size="lg">Torna alla home</Button>
          <Button href="/eventi-sup" variant="primary" size="lg">
            Vedi gli eventi <Icon.ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </Container>
    </section>
  );
}
