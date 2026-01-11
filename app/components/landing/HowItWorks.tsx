import { Container } from "./Container";
import { SectionHeading } from "./SectionHeading";

const steps = [
  {
    title: "Krótka rozmowa i analiza oferty",
    desc: "Zbieramy kontekst i cele: co sprzedajesz, komu, i jakie pytania ma klient.",
  },
  {
    title: "Propozycja struktury cennika",
    desc: "Porządkujemy usługi, nazwy i pakiety tak, by klient szybko zrozumiał różnice.",
  },
  {
    title: "Opracowanie treści i cen",
    desc: "Dbamy o jasny zakres usług oraz logiczny układ cen (bez chaosu w pozycjach).",
  },
  {
    title: "Publikacja cennika online",
    desc: "Dostarczamy gotowy link. Cennik działa na telefonie i komputerze.",
  },
];

export function HowItWorks() {
  return (
    <section id="proces" className="bg-zinc-50 scroll-mt-24">
      <Container className="py-14 sm:py-16 lg:py-20">
        <SectionHeading
          eyebrow="Proces"
          title="Jak wygląda tworzenie cennika online?"
          description="Od rozmowy po publikację — prosto, bez zbędnych etapów."
        />

        <ol className="mt-12 grid gap-4 sm:grid-cols-2">
          {steps.map((s, idx) => (
            <li
              key={s.title}
              className="rounded-2xl border border-zinc-200 bg-white p-6"
            >
              <p className="text-xs font-semibold tracking-wide text-zinc-600">
                Krok {idx + 1}
              </p>
              <p className="mt-2 text-base font-semibold text-zinc-950">
                {s.title}
              </p>
              <p className="mt-2 text-sm leading-6 text-zinc-600">{s.desc}</p>
            </li>
          ))}
        </ol>

        <p className="mx-auto mt-8 max-w-2xl text-center text-sm leading-6 text-zinc-600 sm:text-base sm:leading-7">
          Cały proces trwa zazwyczaj 2–3 dni robocze.
        </p>

        <div className="mt-12 text-center">
          <a
            href="#zamow"
            className="inline-flex h-12 items-center justify-center rounded-full bg-zinc-950 px-6 text-sm font-semibold text-white transition-colors hover:bg-zinc-800"
          >
            Poproś o wycenę
          </a>
        </div>
      </Container>
    </section>
  );
}

