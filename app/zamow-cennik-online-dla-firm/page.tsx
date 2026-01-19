import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/header";
import HeroClient from "@/components/hero/HeroClient";
import ClientFormLogic from "@/components/cta/ClientFormLogic";
import Faq from "@/components/faq";
import { DEFAULT_FAQS } from "@/components/faq/faqs";
import { getSiteUrl } from "@/lib/siteUrl";

const SLUG = "/zamow-cennik-online-dla-firm";

export const metadata: Metadata = {
  title: "Zamów cennik online dla firmy | Formularz zamówienia",
  description:
    "Zamów cennik online dla swojej firmy: projekt, treści i wdrożenie w jednym. Wypełnij krótki formularz — przygotujemy propozycję dopasowaną do branży i oferty.",
  alternates: {
    canonical: SLUG,
  },
  openGraph: {
    type: "website",
    url: SLUG,
    title: "Zamów cennik online dla firmy | Formularz zamówienia",
    description:
      "Zamów cennik online dla swojej firmy: projekt, treści i wdrożenie w jednym. Wypełnij krótki formularz.",
    images: [
      {
        url: "/cennik.png",
        width: 1200,
        height: 630,
        alt: "Zamów cennik online dla firmy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zamów cennik online dla firmy | Formularz zamówienia",
    description:
      "Zamów cennik online dla swojej firmy: projekt, treści i wdrożenie w jednym.",
    images: ["/cennik.png"],
  },
};

type BenefitPillProps = {
  label: string;
};

function BenefitPill({ label }: BenefitPillProps) {
  return (
    <li className="group rounded-xl bg-gradient-to-r from-white/20 via-white/10 to-white/20 p-px">
      <div className="flex items-center justify-center lg:justify-start gap-2 rounded-[11px] bg-black/20 backdrop-blur px-3 py-2.5 border border-white/10 transition-all duration-200 group-hover:bg-white/10 group-hover:border-white/20">
        <span
          aria-hidden="true"
          className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#52eba7]/15 text-[#52eba7] ring-1 ring-[#52eba7]/30"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-3.5 w-3.5"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </span>
        <span className="font-medium tracking-tight text-white/90">{label}</span>
      </div>
    </li>
  );
}

function getFaqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: DEFAULT_FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

function getServiceJsonLd() {
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Cennik online dla firmy",
    serviceType: "Projekt i wdrożenie cennika online",
    provider: {
      "@type": "Organization",
      name: "CennikOnline",
      url: siteUrl,
    },
    areaServed: "PL",
    offers: {
      "@type": "Offer",
      url: `${siteUrl}${SLUG}`,
      priceCurrency: "PLN",
      availability: "https://schema.org/InStock",
    },
  };
}

export default function Page() {
  return (
    <div className="font-sans w-full h-full bg-black/90 text-slate-100 pb-24">
      <Header view="order" />
      <div className="fixed h-screen w-full left-0 top-0">
        <HeroClient />
      </div>

      <main className="relative z-30 px-4 sm:px-12 lg:px-24 xl:px-48">
        <div className="pt-28 sm:pt-36">
          <Link href="/" className="inline-flex items-center gap-3">
            <Image
              src="/logo.gif"
              width={240}
              height={240}
              alt="CennikOnline"
              className="rounded-lg w-[170px] sm:w-[210px]"
            />
          </Link>
        </div>

        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getServiceJsonLd()) }}
        />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getFaqJsonLd()) }}
        />

        <section className="mt-10 rounded-2xl bg-black/60 backdrop-blur border border-white/10 p-6 lg:p-12">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            Zamów{" "}
            <span className="bg-gradient-to-r from-[#C5FF17] to-[#33E5CF] bg-clip-text text-transparent">
              cennik online dla firmy
            </span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-white/80 max-w-[60rem]">
            Wypełnij krótki formularz — przygotujemy propozycję struktury i treści
            dopasowaną do branży, liczby usług i sposobu sprzedaży. Cennik ma być
            czytelny, mobile-first i gotowy pod SEO.
          </p>

          <ul className="mt-8 grid grid-cols-1 sm:flex sm:flex-row sm:flex-wrap gap-2 sm:gap-3 list-none p-0 m-0">
            <BenefitPill label="Mniej pytań „ile kosztuje?”" />
            <BenefitPill label="Więcej konkretnych zapytań" />
            <BenefitPill label="Czytelna oferta i porządek" />
            <BenefitPill label="Spójny, profesjonalny wygląd" />
          </ul>

          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <a
              href="#zamow"
              className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-br from-[#C5FF17] to-[#33E5CF] px-5 py-3 font-bold text-zinc-900 hover:scale-[1.02] transition-transform"
            >
              Przejdź do formularza
            </a>
            <Link
              href="/#faq"
              className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-black/30 px-5 py-3 font-semibold text-white/85 hover:bg-white/10 hover:text-white transition-colors"
            >
              Zobacz FAQ
            </Link>
          </div>
        </section>

        <section className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-2xl bg-black/60 backdrop-blur border border-white/10 p-6 lg:p-10">
            <h2 className="text-2xl sm:text-3xl font-bold">Co dostajesz?</h2>
            <ul className="mt-4 space-y-2 text-white/80">
              <li>Struktura oferty (sekcje, warianty, widełki cenowe).</li>
              <li>Treści „językiem klienta” + porządek w usługach.</li>
              <li>Wdrożenie mobile-first + podstawy SEO (nagłówki, układ, czytelność).</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-black/60 backdrop-blur border border-white/10 p-6 lg:p-10">
            <h2 className="text-2xl sm:text-3xl font-bold">Jak wygląda realizacja?</h2>
            <ol className="mt-4 space-y-2 text-white/80 list-decimal list-inside">
              <li>Wypełniasz formularz / krótki wywiad o usługach.</li>
              <li>Układamy propozycję cennika i wysyłamy do akceptacji.</li>
              <li>Poprawki → publikacja / wdrożenie.</li>
            </ol>
          </div>
        </section>

        <section
          id="zamow"
          className="mt-10 rounded-2xl bg-black/60 backdrop-blur border border-white/10"
        >
          <div className="p-6 lg:p-12 border-b border-white/10">
            <div className="relative h-max flex flex-row gap-4">
              <Image
                src="/cennik.png"
                width={240}
                height={240}
                alt="Cennik online dla firmy — przykład"
                className="sticky top-6 rounded-lg w-[100px] sm:w-[210px] h-max"
              />
              <div className="flex flex-col gap-4">
                <h2 className="text-2xl sm:text-3xl font-bold">
                  Formularz zamówienia cennika online
                </h2>
                <p className="mt-2 text-white/80 font-light max-w-[60rem]">
                  Odpowiedz na kilka pytań — przygotujemy propozycję cennika
                  dopasowaną do branży, liczby usług i sposobu sprzedaży.
                </p>
                <div className="p-0">
                  <ClientFormLogic searchParams={undefined} />
                </div>
                <p className="text-sm text-white/60">
                  Możesz też wrócić na{" "}
                  <Link
                    href="/#about"
                    className="underline decoration-white/30 underline-offset-4 hover:decoration-white/70"
                  >
                    stronę główną
                  </Link>{" "}
                  i zobaczyć opis oferty.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-12" id="faq">
          <Faq faqs={DEFAULT_FAQS} />
        </section>

        <div className="mt-10 text-center text-sm text-white/50">
          Jeśli trafiłeś tu z linku „/zamow-cennik-online”, ta strona jest nową,
          lepiej opisaną wersją zamówienia.
        </div>
      </main>
    </div>
  );
}


