import { Container } from "./Container";

export const faqItems = [
  {
    question: "W jakim programie zrobić cennik?",
    answer:
      "Można użyć Excela, Canvy lub edytora online, ale profesjonalny cennik online daje większą elastyczność i lepsze efekty sprzedażowe.",
  },
  {
    question: "Czy cennik online jest lepszy niż PDF?",
    answer:
      "Tak – łatwiej go aktualizować i jest lepiej widoczny w Google.",
  },
  {
    question: "Ile kosztuje stworzenie cennika?",
    answer:
      "Cena zależy od zakresu i rodzaju cennika – prosty cennik usług to niższy koszt niż rozbudowany cennik firmowy.",
  },
] as const;

export const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
} as const;

export function FAQSection() {
  return (
    <section id="faq" className="bg-zinc-50 scroll-mt-24">
      <Container className="py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
            Najczęstsze pytania o cenniki online
          </h2>
        </div>

        <div className="mx-auto mt-10 max-w-3xl space-y-3">
          {faqItems.map((item) => (
            <details
              key={item.question}
              className="group rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8"
            >
              <summary className="cursor-pointer list-none">
                <h3 className="text-base font-semibold leading-7 text-zinc-950 sm:text-lg">
                  {item.question}
                </h3>
              </summary>
              <div className="mt-3 text-sm leading-6 text-zinc-600 sm:text-base sm:leading-7">
                {item.answer}
              </div>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}

