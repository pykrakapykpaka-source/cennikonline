import { Container } from "./Container";
import { SectionHeading } from "./SectionHeading";

const features = [
  {
    title: "Lorem ipsum dolor sit amet",
    desc: "Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
  {
    title: "Ut enim ad minim veniam",
    desc: "Quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    title: "Duis aute irure dolor",
    desc: "In reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  },
  {
    title: "Excepteur sint occaecat",
    desc: "Cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  {
    title: "Sed ut perspiciatis",
    desc: "Unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
  },
  {
    title: "Nemo enim ipsam",
    desc: "Voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni.",
  },
];

export function FeatureGrid() {
  return (
    <section className="bg-white">
      <Container className="py-14 sm:py-18 lg:py-20">
        <SectionHeading
          eyebrow="Korzyści"
          title="Lorem ipsum — sekcja na opis przewag"
          description="To jest placeholder. Docelowo wpiszemy konkretne korzyści: szybkość, czytelność, SEO, łatwe udostępnianie."
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 sm:p-7"
            >
              <p className="text-base font-semibold leading-7 text-zinc-950">
                {f.title}
              </p>
              <p className="mt-2 text-sm leading-6 text-zinc-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

