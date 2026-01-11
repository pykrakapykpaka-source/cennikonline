import { Container } from "./Container";

const cons = [
  "nie uwzględniają Twojej strategii cenowej",
  "wymagają czasu i samodzielnych decyzji",
  "nie są zoptymalizowane pod SEO",
];

export function TemplateVsSection() {
  return (
    <section id="szablon" className="bg-zinc-50 scroll-mt-24">
      <Container className="py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
            Cennik online czy szablon?
          </h2>
          <p className="mt-4 text-pretty text-base leading-7 text-zinc-600 sm:text-lg sm:leading-8">
            Gotowe szablony cenników (np. Canva, darmowe wzory):
          </p>

          <ul className="mt-8 space-y-2 text-sm leading-6 text-zinc-700 sm:text-base sm:leading-7">
            {cons.map((c) => (
              <li key={c} className="flex gap-3">
                <span className="mt-0.5 text-zinc-950">•</span>
                <span>{c}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10 rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8">
            <p className="text-sm leading-6 text-zinc-600 sm:text-base sm:leading-7">
              My tworzymy cenniki dopasowane do Twojego biznesu, a nie uniwersalne
              wzory.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

