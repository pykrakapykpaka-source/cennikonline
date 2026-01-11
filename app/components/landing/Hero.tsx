import { Container } from "./Container";

export function Hero() {
  return (
    <section className="bg-zinc-50">
      <Container className="py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-balance text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl lg:text-6xl">
            Cennik online – tworzymy profesjonalne cenniki dla firm
          </h1>
          <p className="mt-5 text-pretty text-base leading-7 text-zinc-600 sm:text-lg sm:leading-8">
            Projektujemy cenniki online, które są czytelne, aktualne i dopasowane
            do Twojej oferty.
          </p>
          <p className="mt-3 text-pretty text-base leading-7 text-zinc-600 sm:text-lg sm:leading-8">
            Jeśli zastanawiasz się jak zrobić cennik, jak wycenić usługi lub jak
            stworzyć cennik na stronę internetową – jesteś w dobrym miejscu.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <a
              href="#zamow"
              className="inline-flex h-12 items-center justify-center rounded-full bg-zinc-950 px-6 text-sm font-semibold text-white transition-colors hover:bg-zinc-800"
            >
              Zamów cennik online
            </a>
            <a
              href="#rozwiazanie"
              className="inline-flex h-12 items-center justify-center rounded-full border border-zinc-300 bg-white px-6 text-sm font-semibold text-zinc-950 transition-colors hover:bg-zinc-100"
            >
              Zobacz jak pracujemy
            </a>
          </div>

          <div className="mt-10 grid gap-3 text-left sm:grid-cols-3">
            <div className="rounded-2xl border border-zinc-200 bg-white p-5">
              <p className="text-sm font-semibold text-zinc-950">
                Tworzenie cennika online
              </p>
              <p className="mt-1 text-sm leading-6 text-zinc-600">
                Przemyślana struktura, opisy i ceny dopasowane do oferty.
              </p>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-white p-5">
              <p className="text-sm font-semibold text-zinc-950">Cennik na telefon</p>
              <p className="mt-1 text-sm leading-6 text-zinc-600">
                Czytelnie na komputerze i telefonie, gotowe do udostępniania.
              </p>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-white p-5">
              <p className="text-sm font-semibold text-zinc-950">SEO</p>
              <p className="mt-1 text-sm leading-6 text-zinc-600">
                Nagłówki i FAQ pod frazy typu “jak zrobić cennik” i “cennik online”.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

