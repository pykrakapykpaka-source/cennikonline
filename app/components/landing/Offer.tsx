import { Container } from "./Container";
import { SectionHeading } from "./SectionHeading";

const items = [
  {
    title: "Jasno komunikuje ceny i zakres usług",
    desc: "Klient od razu rozumie, co obejmuje usługa i ile kosztuje.",
  },
  {
    title: "Pomaga klientom podjąć decyzję",
    desc: "Układ i nazwy usług prowadzą do wyboru właściwej opcji.",
  },
  {
    title: "Jest zoptymalizowany pod SEO",
    desc: "Struktura nagłówków i FAQ wspiera widoczność na frazy long tail.",
  },
  {
    title: "Działa na komputerze i telefonie",
    desc: "Mobile-first, czytelne odstępy i typografia pod szybkie skanowanie.",
  },
  {
    title: "Można łatwo edytować i aktualizować",
    desc: "Bez “PDF-a”, który po tygodniu jest nieaktualny.",
  },
  {
    title: "To nie tylko ładna tabelka",
    desc: "To przemyślany cennik na stronę internetową, dopasowany do branży.",
  },
];

export function Offer() {
  return (
    <section id="rozwiazanie" className="bg-white scroll-mt-24">
      <Container className="py-14 sm:py-16 lg:py-20">
        <SectionHeading
          eyebrow="Rozwiązanie"
          title="Tworzenie cenników online – kompleksowo"
          description="Zajmujemy się tworzeniem cenników online od A do Z. Nie dostajesz tylko ładnej tabelki – dostajesz przemyślany cennik."
        />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it) => (
            <div
              key={it.title}
              className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6"
            >
              <p className="text-base font-semibold text-zinc-950">{it.title}</p>
              <p className="mt-2 text-sm leading-6 text-zinc-600">{it.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8">
          <p className="text-sm font-semibold text-zinc-950">
            Cennik na stronę internetową — bez chaosu
          </p>
          <p className="mt-2 text-sm leading-6 text-zinc-600 sm:text-base sm:leading-7">
            Układ, nazwy usług i hierarchia cen są dopasowane do tego, jak klienci
            podejmują decyzję. W efekcie cennik jest czytelny i “sprzedaje” bez
            nachalności.
          </p>
        </div>
      </Container>
    </section>
  );
}

