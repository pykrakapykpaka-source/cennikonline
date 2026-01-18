import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import HeroClient from "@/components/hero/HeroClient";
import Header from "@/components/header";
import ClientFormLogic from "@/components/cta/ClientFormLogic";

export const metadata: Metadata = {
  title: "Zamów cennik online | Dlaczego potrzebujesz cennika?",
  description:
    "Zamów cennik online dla swojej firmy. Wyjaśniamy, dlaczego cennik buduje zaufanie i ułatwia decyzję klienta. Wypełnij krótki formularz — przygotujemy propozycję dopasowaną do branży i oferty.",
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

        <section className="mt-10 rounded-2xl bg-black/60 backdrop-blur border border-white/10 p-6 lg:p-12">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            Dlaczego{" "}
            <span className="bg-gradient-to-r from-[#C5FF17] to-[#33E5CF] bg-clip-text text-transparent">
              potrzebujesz cennika
            </span>
            ?
          </h1>
          <p className="mt-4 text-base sm:text-lg text-white/80 max-w-[60rem]">
            Dobry cennik pomaga klientowi zrozumieć ofertę bez domysłów:{" "}
            <strong>zakres</strong>, <strong>warianty</strong> i{" "}
            <strong>widełki</strong>. To buduje zaufanie i skraca drogę do kontaktu.
          </p>

          <ul className="mt-8 grid grid-cols-1 sm:flex sm:flex-row sm:flex-wrap gap-2 sm:gap-3 list-none p-0 m-0">
            <BenefitPill label="Czytelna oferta i porządek" />
            <BenefitPill label="Mniej pytań „ile kosztuje?”" />
            <BenefitPill label="Więcej konkretnych zapytań" />
            <BenefitPill label="Spójny, profesjonalny wygląd" />
          </ul>

          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <a
              href="#zamow"
              className="inline-flex items-center justify-center rounded-2xl bg-gradient-to-br from-[#C5FF17] to-[#33E5CF] px-5 py-3 font-bold text-zinc-900 hover:scale-[1.02] transition-transform"
            >
              Zamów cennik (formularz)
            </a>
            <Link
              href="/#faq"
              className="inline-flex items-center justify-center rounded-2xl border border-white/15 bg-black/30 px-5 py-3 font-semibold text-white/85 hover:bg-white/10 hover:text-white transition-colors"
            >
              Zobacz FAQ
            </Link>
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
                alt="CennikOnline"
                className="sticky top-6 rounded-lg w-[100px] sm:w-[210px] h-max"
              />
              <div className="flex flex-col gap-4">
                <h2 className="text-2xl sm:text-3xl font-bold">
                  Zamów cennik dla swojej firmy
                </h2>
                <p className="mt-2 text-white/80 font-light max-w-[60rem]">
                  Odpowiedz na kilka pytań — przygotujemy propozycję cennika
                  dopasowaną do branży, liczby usług i sposobu sprzedaży.
                </p>
                <div className="p-0">
                  <ClientFormLogic searchParams={undefined} />
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-10 text-center text-sm text-white/50">
          Jeśli wolisz, możesz też napisać do nas przez stronę główną (sekcja
          „Zamów cennik”).
        </div>
      </main>
    </div>
  );
}


