import { Container } from "./Container";
import { SectionHeading } from "./SectionHeading";

const plans = [
  {
    name: "Starter",
    price: "Lorem",
    desc: "Ipsum dolor sit amet — podstawowy wariant MVP.",
    bullets: ["Lorem ipsum", "Dolor sit", "Amet consectetur", "Adipiscing elit"],
    cta: "Wybierz Starter",
  },
  {
    name: "Standard",
    price: "Lorem",
    desc: "Sed do eiusmod tempor — najbardziej popularny wariant.",
    bullets: [
      "Lorem ipsum",
      "Dolor sit",
      "Amet consectetur",
      "Adipiscing elit",
      "Ut enim ad minim",
    ],
    cta: "Wybierz Standard",
    featured: true,
  },
  {
    name: "Pro",
    price: "Lorem",
    desc: "Ut labore et dolore — dla większych cenników i rozszerzeń.",
    bullets: [
      "Lorem ipsum",
      "Dolor sit",
      "Amet consectetur",
      "Adipiscing elit",
      "Duis aute irure",
    ],
    cta: "Wybierz Pro",
  },
];

export function Pricing() {
  return (
    <section id="cennik" className="bg-white scroll-mt-24">
      <Container className="py-14 sm:py-18 lg:py-20">
        <SectionHeading
          eyebrow="Cennik"
          title="Pakiety (placeholder)"
          description="Na MVP zostawiamy proste pakiety. Później łatwo podmienimy na realne ceny i zakres."
        />

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {plans.map((p) => (
            <div
              key={p.name}
              className={[
                "rounded-2xl border p-6 sm:p-8",
                p.featured
                  ? "border-zinc-950 bg-zinc-950 text-white"
                  : "border-zinc-200 bg-zinc-50 text-zinc-950",
              ].join(" ")}
            >
              <div className="flex items-baseline justify-between gap-4">
                <p className="text-base font-semibold">{p.name}</p>
                {p.featured ? (
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">
                    Najczęściej wybierany
                  </span>
                ) : null}
              </div>

              <p className="mt-4 text-3xl font-semibold tracking-tight">
                {p.price}
              </p>
              <p className={["mt-2 text-sm leading-6", p.featured ? "text-white/80" : "text-zinc-600"].join(" ")}>
                {p.desc}
              </p>

              <ul className="mt-6 space-y-2 text-sm leading-6">
                {p.bullets.map((b) => (
                  <li key={b} className={p.featured ? "text-white/90" : "text-zinc-700"}>
                    <span className={p.featured ? "text-white" : "text-zinc-950"}>•</span>{" "}
                    {b}
                  </li>
                ))}
              </ul>

              <a
                href="#zamow"
                className={[
                  "mt-8 inline-flex h-11 w-full items-center justify-center rounded-full px-4 text-sm font-semibold transition-colors",
                  p.featured
                    ? "bg-white text-zinc-950 hover:bg-zinc-100"
                    : "bg-zinc-950 text-white hover:bg-zinc-800",
                ].join(" ")}
              >
                {p.cta}
              </a>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

