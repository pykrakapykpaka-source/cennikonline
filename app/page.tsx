import Image from "next/image";
import HeroClient from "@/components/hero/HeroClient";
import Header from "@/components/header";
import Cta from "@/components/cta/Cta";
import ScrollTo from "@/components/ScrollTo";
import Opinions from "@/components/opinions/Opinions";
import CountToTheNumberAnimated from "@/components/counter/CountToTheNumberAnimated";
import Link from "next/link";
import Map from "@/components/Map";
import ClientFormWrapper from "@/components/cta/ClientFormWrapper";
import Faq from "@/components/faq";
import { DEFAULT_FAQS } from "@/components/faq/faqs";

type BenefitPillProps = {
  label: string;
  size?: "default" | "compact";
};

function BenefitPill({ label, size = "default" }: BenefitPillProps) {
  return (
    <li className="group rounded-xl bg-gradient-to-r from-white/20 via-white/10 to-white/20 p-px">
      <div
        className={`flex items-center justify-center lg:justify-start gap-2 rounded-[11px] bg-black/20 backdrop-blur border border-white/10 transition-all duration-200 group-hover:bg-white/10 group-hover:border-white/20 ${
          size === "compact" ? "px-2 py-1.5" : "px-3 py-2.5"
        }`}
      >
        <span
          aria-hidden="true"
          className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#52eba7]/15 text-[#52eba7] ring-1 ring-[#52eba7]/30"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className={size === "compact" ? "h-3 w-3" : "h-3.5 w-3.5"}
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </span>
        <span className="font-medium tracking-tight text-white/90">
          {label}
        </span>
      </div>
    </li>
  );
}
export default async function Page({
  searchParams,
}: {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const sp = searchParams ? await searchParams : undefined;
  const ref = sp?.ref;
  return (
    <>
      <ClientFormWrapper searchParams={ref} />
      <div className="font-sans w-full h-full bg-black/90 text-slate-100">
        <Header  />
        <div className="z-[1500] absolute w-[130px] sm:w-[300px] h-[50px] left-0 top-6 xl:top-12 overflow-hidden rounded-r-xl">
          <div className="w-full flex items-start relative">
            <div className="w-max absolute left-0 top-0">
              <div
                aria-label="CennikOnline"
                className="h-[50px] flex items-center move-from-right-to-left whitespace-nowrap font-bold text-lg sm:text-xl tracking-wide px-6 bg-black/60 backdrop-blur border border-white/10 rounded-xl"
              >
                <span className="bg-gradient-to-r from-[#C5FF17] to-[#33E5CF] bg-clip-text text-transparent">
                  CennikOnline
                </span>
                <span className="mx-3 text-white/50">•</span>
                <span className="text-white/80">Cennik online, który sprzedaje</span>
                <span className="mx-3 text-white/50">•</span>
                <span className="text-white/80">Więcej zapytań od klientów</span>
                <span className="mx-3 text-white/50">•</span>
                <div className="flex flex-row items-center bg-gradient-to-r from-[#C5FF17] to-[#33E5CF] bg-clip-text text-transparent">
                <Image
                    src="/moneta.png"
                    width={100}
                    height={100}
                    alt="cennik online dla firm strona internetowa cennikonline.pl"
                    className="w-6 h-6 rounded-full"
                  />
                  CennikOnline
                </div>
                <span className="mx-3 text-white/50">•</span>
                <span className="text-white/80">Cennik online, który sprzedaje</span>
                <span className="mx-3 text-white/50">•</span>
                <span className="text-white/80">Więcej zapytań od klientów</span>
              </div>
            </div>
          </div>
        </div>
        <div className="fixed h-screen w-full left-0 top-0">
          <HeroClient />
        </div>
        <div className="px-3 sm:px-6 justify-evenly min-h-screen lg:mt-0 w-full mx-0 sm:mx-auto flex flex-col relative lg:py-0 overflow-x-hidden">
          <div className="mt-24 mx-auto grid grid-cols-1 lg:grid-cols-2 h-max">
            <div className="rounded-2xl mt-2 z-50 bg-black/60 backdrop-blur border border-white/10 p-6 lg:p-12 flex flex-col justify-center h-full my-auto animate-fade-up-soft">
              <div className="mx-auto lg:mx-0 text-center lg:text-left">
                <div className="flex flex-row items-center text-4xl font-extrabold tracking-tight">
                  <Image
                    src="/moneta.png"
                    width={100}
                    height={100}
                    alt="cennik online dla firm strona internetowa cennikonline.pl"
                    className="w-16 h-16 rounded-full"
                  />
                  <span className="block bg-gradient-to-r from-[#C5FF17] to-[#33E5CF] bg-clip-text text-transparent">
                    CennikOnline
                  </span>
                </div>
                <p className="mt-2 text-sm sm:text-base text-white/70">
                  Cennik online, który zamienia odwiedziny w zapytania.
                </p>
              </div>

              <p className="font-light mt-6 text-base lg:text-lg xl:text-xl text-gray-50 text-center lg:text-left z-30 w-full flex justify-center">
                <span className="text-white drop-shadow-md shadow-black italic sm:max-w-[30rem] lg:max-w-[50rem] max-w-[40rem]">
                  Projekt, treści i wdrożenie w jednym — Ty zatwierdzasz, my dowozimy.
                </span>
              </p>

              <ul className="mt-6 flex flex-row flex-wrap items-center justify-center lg:justify-start gap-1.5 sm:gap-3 text-xs sm:text-sm text-white/80 list-none p-0 m-0">
                <BenefitPill size="compact" label="Zrozumiała oferta" />
                <BenefitPill size="compact" label="Mobile + SEO" />
                <BenefitPill size="compact" label="Łatwa aktualizacja" />
              </ul>

              <div className="flex flex-row z-30 w-full justify-center lg:justify-start items-center lg:items-start sm:w-max mt-6 mx-auto lg:mx-0 gap-3">
                <Cta styleType="white" label="Zamów cennik" />
                <ScrollTo />
              </div>

              <p className="mt-3 text-sm text-white/75 text-center lg:text-left">
                Wolisz zamówienie krok po kroku?{" "}
                <Link
                  href="/zamow-cennik-online-dla-firm"
                  className="font-semibold text-white underline decoration-white/40 underline-offset-4 hover:decoration-white/80"
                >
                  Przejdź do zamówienia cennika online
                </Link>
                .
              </p>
            </div>
            <div className="flex items-center justify-center flex-col w-full lg:pl-12 my-6 lg:mt-0">
              
              <h2 className="text-2xl xl:text-3xl text-white font-sans italic text-center">
                <span className="flex flex-col items-center justify-center gap-2">
                  <Image
                    src="/logo.gif"
                    width={100}
                    height={100}
                    alt="cennik online dla firm strona internetowa cennikonline.pl"
                    className="w-48 h-48 rounded-full animate-move-from-right-to-left"
                  />
                  <span className="font-bold bg-gradient-to-r from-[#B4FC2D] to-[#3EE7C0] bg-clip-text text-transparent">
                   Nawet do 398% wzrostu sprzedaży
                  </span>{" "}
                  z cennikiem online!
                </span>
              </h2>
            </div>
          </div>
        </div>

        <main className="font-sans overflow-visible relative items-center min-h-screen grid grid-cols-1 z-30">
          <section className={`w-full h-max z-50`}>
            <div
              id="about"
              className="pb-24 md:pb-12 mx-auto text-xl sm:text-2xl lg:text-3xl flex flex-col bg-black/60 backdrop-blur-sm border border-white/10 p-12 relative text-slate-100 drop-shadow-md shadow-black"
            >
              <div>
                <div className="group">
                  <div className="mt-6 lg:mt-2">
                    <div className="flex flex-row items-center text-3xl sm:text-4xl lg:text-3xl font-extrabold tracking-tight">
                      <Image
                        src="/moneta.png"
                        width={100}
                        height={100}
                        alt="cennik online dla firm strona internetowa cennikonline.pl"
                        className="w-10 h-10 rounded-full"
                      />
                      <span className="bg-gradient-to-r from-[#C5FF17] to-[#33E5CF] bg-clip-text text-transparent">
                        CennikOnline
                      </span>
                    </div>
                  </div>
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold mt-12">
                  Kim jesteśmy?
                </h2>
                <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                  <div>
                    <p className="text-base sm:text-lg font-light max-w-[48rem] mt-2 text-justify lg:text-left text-slate-100/90 leading-relaxed">
                      Tworzymy <strong>cenniki online dla firm</strong> — proste,
                      czytelne i spójne z Twoją marką. Skupiamy się na jakości
                      treści, przejrzystej strukturze i tym, żeby klient szybko
                      zrozumiał ofertę bez domysłów.
                    </p>

                    <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-5">
                      <div className="text-sm text-white/70 font-medium">Jak pracujemy</div>
                      <ul className="mt-3 space-y-2 text-sm text-white/80 font-light">
                        <li className="flex items-start gap-3">
                          <span className="mt-2 bg-[#52eba7] h-2 w-2 rounded-full shrink-0" />
                          <span>
                            Zbieramy informacje o usługach i sposobie sprzedaży
                            (krótki wywiad / formularz).
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="mt-2 bg-[#52eba7] h-2 w-2 rounded-full shrink-0" />
                          <span>
                            Układamy ofertę w logiczne sekcje i opisujemy je językiem
                            klienta.
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="mt-2 bg-[#52eba7] h-2 w-2 rounded-full shrink-0" />
                          <span>
                            Dostajesz projekt do akceptacji — wprowadzamy poprawki,
                            dopiero potem publikacja.
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div className="mt-5 flex flex-wrap items-center gap-3 text-sm">
                      <span className="text-white/70">Standard:</span>
                      <div className="inline-flex items-center gap-2 rounded-full bg-black/30 border border-white/10 px-3 py-1.5">
                        <span className="bg-[#52eba7] h-2 w-2 rounded-full" />
                        <span className="font-semibold text-white/90">czytelny układ</span>
                      </div>
                      <div className="inline-flex items-center gap-2 rounded-full bg-black/30 border border-white/10 px-3 py-1.5">
                        <span className="bg-[#52eba7] h-2 w-2 rounded-full" />
                        <span className="font-semibold text-white/90">dopasowane treści</span>
                      </div>
                      <div className="inline-flex items-center gap-2 rounded-full bg-black/30 border border-white/10 px-3 py-1.5">
                        <span className="bg-[#52eba7] h-2 w-2 rounded-full" />
                        <span className="font-semibold text-white/90">mobile + SEO</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                      <h3 className="text-xl font-bold">Dlaczego można nam zaufać?</h3>
                      <ul className="mt-4 space-y-3 text-sm text-white/85">
                        <li className="flex items-start gap-3">
                          <span className="mt-2 bg-[#52eba7] h-2 w-2 rounded-full shrink-0" />
                          <span>
                            Pracujemy na konkretach: zakres, warianty, doprecyzowania —
                            bez lania wody i bez „magii marketingu”.
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="mt-2 bg-[#52eba7] h-2 w-2 rounded-full shrink-0" />
                          <span>
                            Jasny proces: projekt → Twoja akceptacja → publikacja →
                            możliwość aktualizacji później.
                          </span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="mt-2 bg-[#52eba7] h-2 w-2 rounded-full shrink-0" />
                          <span>
                            Spójny wygląd i porządek w ofercie, który buduje profesjonalne
                            pierwsze wrażenie.
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div className="rounded-2xl border border-white/10 bg-black/30 p-6">
                      <CountToTheNumberAnimated
                        textBeforeNumber="Zrealizowaliśmy już"
                        textAfterNumber="cenników"
                        numberToAnimateTo={79}
                        textColor="white"
                        animationSpeed={55}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <h2 className="text-3xl lg:text-4xl font-bold">
                   Co oferujemy?
                </h2>
                <ul className="mt-6 space-y-3 flex flex-col text-sm">
                  <li className="flex flex-row items-center">
                    <div className="bg-[#52eba7] h-2 w-2 rounded-full mr-2"></div>
                    Cennik online
                  </li> 
                  <li className="flex flex-row items-center">
                    <div className="bg-[#52eba7] h-2 w-2 rounded-full mr-2"></div>
                    Strona internetowa z cennikiem
                  </li>
                  <li className="flex flex-row items-center">
                    <div className="bg-[#52eba7] h-2 w-2 rounded-full mr-2"></div>
                    Pomoc w tworzeniu treści
                  </li>
                  <li className="flex flex-row items-center">
                    <div className="bg-[#52eba7] h-2 w-2 rounded-full mr-2"></div>
                    Aktualizacja cennika
                  </li>
                  <li className="flex flex-row items-center">
                    <div className="bg-[#52eba7] h-2 w-2 rounded-full mr-2"></div>
                    Obsługa klienta
                  </li>
                  <li className="flex flex-row items-center">
                    <div className="bg-[#52eba7] h-2 w-2 rounded-full mr-2"></div>
                    Hosting i domena
                  </li>
                  <li className="flex flex-row items-center">
                    <div className="bg-[#52eba7] h-2 w-2 rounded-full mr-2"></div>
                    Obsługa techniczna
                  </li>
                </ul>
              </div>
              <div className="mt-6">
                <div className="flex flex-col">
                  <div>
                    <h2 className="text-3xl lg:text-4xl font-bold">
                      Po co mi cennik online?
                    </h2>
                    <ul className="mt-6 space-y-3 flex flex-col text-sm">
                      <li className="flex flex-row items-center font-bold">
                        <div className="bg-[#52eba7] h-2 w-2 rounded-full mr-2"></div>
                        Więcej zapytań
                      </li>
                      <li className="flex flex-row items-center font-bold">
                        <div className="bg-[#52eba7] h-2 w-2 rounded-full mr-2"></div>
                        Większe zyski
                      </li>
                    </ul>
                    <p className="mt-4 text-sm text-white/75 font-light max-w-[52rem]">
                      Cennik online odpowiada na podstawowe pytania klienta i
                      skraca drogę do decyzji. Gdy oferta jest jasna, a warianty i
                      doprecyzowania są na miejscu — łatwiej sprzedajesz drożej i
                      spokojniej.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex flex-col items-center lg:items-start">
                <Cta styleType="colored" label="Zamów cennik online" />
                <Link
                  href="/zamow-cennik-online-dla-firm"
                  className="mt-3 inline-flex items-center justify-center rounded-lg border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white/90 hover:bg-white/10 hover:border-white/25"
                >
                  Zamów cennik online (formularz)
                </Link>
              </div>
              <div className="mt-12">
                <Opinions />
              </div>
              <div className="mt-12 text-center flex items-center justify-center">
                  <Image
                    src="/google.webp"
                    width={100}
                    height={100}
                    alt="cennik online dla firm strona internetowa cennikonline.pl"
                    className="h-auto w-[100px] mx-auto"
                  />
              </div>
              <h2 className="text-center text-3xl lg:text-4xl font-light font-gotham mt-24 italic">
                Realizacje cenników online dla firm w całej Polsce.
              </h2>
              <div className="relative w-[100%] lg:max-w-[40rem] mt-3 mx-auto p-3 overflow-visible">
                <Map />
              </div>
            <div id="faq" className="mx-auto w-full mt-12 sm:mt-16">
              <Faq faqs={DEFAULT_FAQS} />
            </div>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
