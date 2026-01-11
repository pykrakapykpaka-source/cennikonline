import { Container } from "./Container";

const stats = [
  { label: "Lorem ipsum", value: "24h" },
  { label: "Dolor sit", value: "99%" },
  { label: "Amet consectetur", value: "120+" },
  { label: "Adipiscing", value: "4.9/5" },
];

export function SocialProof() {
  return (
    <section className="bg-zinc-50">
      <Container className="py-12 sm:py-14">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold text-zinc-950">
                Social proof (placeholder)
              </p>
              <p className="mt-2 text-sm leading-6 text-zinc-600">
                Tu w przyszłości: liczby, logotypy klientów albo krótkie “dlaczego
                nam zaufali”.
              </p>
            </div>
            <a
              href="#zamow"
              className="inline-flex h-10 items-center justify-center rounded-full bg-zinc-950 px-4 text-sm font-semibold text-white transition-colors hover:bg-zinc-800"
            >
              Umów kontakt
            </a>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-zinc-200 bg-zinc-50 p-5"
              >
                <p className="text-2xl font-semibold tracking-tight text-zinc-950">
                  {s.value}
                </p>
                <p className="mt-1 text-sm text-zinc-600">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

