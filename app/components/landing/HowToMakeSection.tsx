import { Container } from "./Container";

const steps = [
  "Określenie zakresu usług",
  "Ustalenie struktury cen",
  "Zaprojektowanie czytelnego układu",
  "Publikacja cennika online",
];

export function HowToMakeSection() {
  return (
    <section id="jak-zrobic" className="bg-white scroll-mt-24">
      <Container className="py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
            Jak zrobić cennik online?
          </h2>
          <p className="mt-4 text-pretty text-base leading-7 text-zinc-600 sm:text-lg sm:leading-8">
            Jeśli zastanawiasz się jak stworzyć cennik, proces zwykle wygląda tak:
          </p>

          <ol className="mt-8 space-y-3">
            {steps.map((s, i) => (
              <li
                key={s}
                className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 sm:p-5"
              >
                <p className="text-sm font-semibold text-zinc-950">
                  {i + 1}. {s}
                </p>
              </li>
            ))}
          </ol>

          <div className="mt-10 rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8">
            <p className="text-sm leading-6 text-zinc-600 sm:text-base sm:leading-7">
              W praktyce wiele osób kończy na: cenniku w Excelu, przypadkowym
              szablonie cennika albo pliku PDF, który szybko się dezaktualizuje.
            </p>
            <p className="mt-3 text-sm leading-6 text-zinc-600 sm:text-base sm:leading-7">
              Dlatego coraz więcej firm decyduje się na profesjonalny cennik online,
              który można łatwo zmieniać.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

