import { Container } from "./Container";
import { SectionHeading } from "./SectionHeading";

const bullets = [
  "nie wie jak wycenić usługi",
  "tworzy cennik w Excelu lub Canvie, ale nie jest z niego zadowolonych",
  "nie ma czasu na projektowanie i testowanie cen",
  "boi się, że cennik odstraszy klientów",
];

export function ProblemSection() {
  return (
    <section id="problem" className="bg-white scroll-mt-24">
      <Container className="py-14 sm:py-16 lg:py-20">
        <SectionHeading
          title="Dlaczego stworzenie dobrego cennika to problem dla wielu firm?"
          description="Wielu przedsiębiorców chce mieć cennik online, ale utknęło na etapie wyceny, struktury i decyzji, co oraz jak pokazać klientom."
        />

        <div className="mx-auto mt-10 grid max-w-3xl gap-4">
          <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 sm:p-8">
            <p className="text-sm font-semibold text-zinc-950">
              Najczęstsze problemy:
            </p>
            <ul className="mt-4 space-y-2 text-sm leading-6 text-zinc-700 sm:text-base sm:leading-7">
              {bullets.map((b) => (
                <li key={b} className="flex gap-3">
                  <span className="mt-0.5 text-zinc-950">•</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8">
            <p className="text-sm leading-6 text-zinc-600 sm:text-base sm:leading-7">
              Dlatego gotowe szablony cenników często nie działają – są uniwersalne
              i nie uwzględniają specyfiki branży.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

