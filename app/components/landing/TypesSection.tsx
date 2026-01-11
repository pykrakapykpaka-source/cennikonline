import { Container } from "./Container";

type TypeCard = {
  title: string;
  description: string;
};

const types: TypeCard[] = [
  {
    title: "Cennik usług",
    description:
      "Idealny dla firm usługowych, freelancerów i specjalistów. Pomagamy uporządkować ofertę, nazwać usługi i ustalić ceny w logiczny sposób.",
  },
  {
    title: "Cennik na stronę internetową",
    description:
      "Cennik dopasowany do Twojej strony WWW – technicznie i wizualnie. Możliwość integracji z formularzem kontaktowym lub rezerwacją.",
  },
  {
    title: "Cennik firmowy",
    description:
      "Profesjonalny cennik dla małych i średnich firm – do użytku online i jako PDF.",
  },
  {
    title: "Cennik online z podziałem na pakiety",
    description:
      "Dobry wybór, jeśli oferujesz kilka wariantów usług lub abonamentów.",
  },
];

export function TypesSection() {
  return (
    <section id="typy" className="bg-zinc-50 scroll-mt-24">
      <Container className="py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
            Jakie cenniki online tworzymy?
          </h2>
          <p className="mt-4 text-pretty text-base leading-7 text-zinc-600 sm:text-lg sm:leading-8">
            Poniżej znajdziesz najczęstsze typy cenników online — ta sekcja łapie
            dużo wartościowych fraz long tail.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {types.map((t) => (
            <div
              key={t.title}
              className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8"
            >
              <h3 className="text-lg font-semibold leading-7 text-zinc-950">
                {t.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-zinc-600 sm:text-base sm:leading-7">
                {t.description}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

