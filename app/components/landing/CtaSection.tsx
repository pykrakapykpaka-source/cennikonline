import { Container } from "./Container";

const bullets = [
  "nie wiesz, jak wycenić swoje usługi",
  "potrzebujesz cennika na stronę internetową",
  "chcesz mieć profesjonalny, aktualny cennik online",
];

export function CtaSection() {
  return (
    <section className="bg-white">
      <Container className="py-14 sm:py-16 lg:py-20">
        <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-6 sm:p-10">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-balance text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
              Chcesz stworzyć cennik online dla swojej firmy?
            </h2>
            <p className="mt-4 text-pretty text-base leading-7 text-zinc-600 sm:text-lg sm:leading-8">
              Skontaktuj się z nami, jeśli:
            </p>
          </div>

          <ul className="mx-auto mt-8 max-w-2xl space-y-2 text-sm leading-6 text-zinc-700 sm:text-base sm:leading-7">
            {bullets.map((b) => (
              <li key={b} className="flex gap-3">
                <span className="mt-0.5 text-zinc-950">•</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <a
              href="#zamow"
              className="inline-flex h-12 items-center justify-center rounded-full bg-zinc-950 px-6 text-sm font-semibold text-white transition-colors hover:bg-zinc-800"
            >
              Zamów cennik online
            </a>
            <a
              href="#zamow"
              className="inline-flex h-12 items-center justify-center rounded-full border border-zinc-300 bg-white px-6 text-sm font-semibold text-zinc-950 transition-colors hover:bg-zinc-100"
            >
              Poproś o wycenę
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}

