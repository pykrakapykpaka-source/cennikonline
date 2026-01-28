"use client";
import { pushLead } from "@/common/firebase";
import React, { useMemo, useState } from "react";
import { FaArrowRight, FaCheckCircle } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { setModalVisible } from "@/common/redux/slices/actionSlice";
import Success from "../Success";

type Option = { label: string; value: string };
type QuestionKey =
  | "intention"
  | "industry"
  | "servicesCount"
  | "pricingModel"
  | "outputFormat"
  | "contentStatus"
  | "deadline"
  | "budget";

type FormData = {
  // core (for admin + segmentation)
  leadType: "cenniki";
  intention?: string;
  industry?: string;
  servicesCount?: string;
  pricingModel?: string;
  outputFormat?: string;
  contentStatus?: string;
  deadline?: string;
  budget?: string;

  // contact
  name: string;
  phone: string;
  region: string;
};

const QUESTIONS: Array<{
  key: QuestionKey;
  title: string;
  helper?: string;
  options: Option[];
}> = [
  {
    key: "intention",
    title: "Co chcesz zrobić?",
    options: [
      { label: "Zamówić cennik online", value: "Zamówienie cennika online" },
      { label: "Aktualizować cennik", value: "Aktualizacja cennika" },
      { label: "Strona WWW z cennikiem", value: "Strona z cennikiem" },
      { label: "Konsultacja / pomoc w wycenie", value: "Konsultacja" },
    ],
  },
  {
    key: "industry",
    title: "Jaka branża?",
    options: [
      { label: "Beauty / kosmetyka", value: "Beauty" },
      { label: "Budowlanka / remonty", value: "Budowlanka" },
      { label: "Motoryzacja", value: "Motoryzacja" },
      { label: "Edukacja / kursy", value: "Edukacja" },
      { label: "IT / usługi cyfrowe", value: "IT" },
      { label: "Inna", value: "Inna" },
    ],
  },
  {
    key: "servicesCount",
    title: "Ile usług/pozycji ma mieć cennik?",
    options: [
      { label: "1–10", value: "1-10" },
      { label: "11–30", value: "11-30" },
      { label: "31–60", value: "31-60" },
      { label: "60+", value: "60+" },
    ],
  },
  {
    key: "pricingModel",
    title: "Jak wyceniasz usługi?",
    options: [
      { label: "Stałe ceny", value: "Stałe ceny" },
      { label: "Ceny „od …”", value: "Ceny od" },
      { label: "Pakiety", value: "Pakiety" },
      { label: "Nie wiem / różnie", value: "Nie wiem / różnie" },
    ],
  },
  {
    key: "outputFormat",
    title: "W jakiej formie ma być cennik?",
    options: [
      { label: "Na stronie (HTML)", value: "HTML" },
      { label: "PDF", value: "PDF" },
      { label: "HTML + PDF", value: "HTML + PDF" },
      { label: "Nie wiem", value: "Nie wiem" },
    ],
  },
  {
    key: "contentStatus",
    title: "Czy masz już opisy usług i ceny?",
    options: [
      { label: "Tak, gotowe", value: "Gotowe" },
      { label: "Częściowo", value: "Częściowo" },
      { label: "Nie, potrzebuję pomocy", value: "Potrzebuję pomocy" },
    ],
  },
  {
    key: "deadline",
    title: "Kiedy chcesz mieć gotowy cennik?",
    options: [
      { label: "48h", value: "48h" },
      { label: "Do tygodnia", value: "Do tygodnia" },
      { label: "Do 2 tygodni", value: "Do 2 tygodni" },
      { label: "Bez pośpiechu", value: "Bez pośpiechu" },
    ],
  },
  {
    key: "budget",
    title: "Jaki budżet planujesz?",
    options: [
      { label: "do 500 zł", value: "do 500 zł" },
      { label: "500–1000 zł", value: "500–1000 zł" },
      { label: "1000–2000 zł", value: "1000–2000 zł" },
      { label: "2000+ zł", value: "2000+ zł" },
    ],
  },
];

export default function ClientFormLogic({
  searchParams,
  questionsPaddingX,
}: {
  searchParams: any;
  questionsPaddingX?: string;
}) {
  const dispatch = useDispatch();
  const [isSent, setIsSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [step, setStep] = useState(0);

  const [formData, setFormData] = useState<FormData>({
    leadType: "cenniki",
    name: "",
    phone: "",
    region: "",
  });

  const isQuestionsDone = step >= QUESTIONS.length;

  const visibleQuestions = useMemo(() => {
    return QUESTIONS.slice(0, Math.min(step + 1, QUESTIONS.length));
  }, [step]);

  function setAnswer(key: QuestionKey, value: string) {
    setFormData((prev) => ({ ...prev, [key]: value }));
    setStep((prev) => Math.min(prev + 1, QUESTIONS.length));
  }

  function goBack() {
    // If on contact screen, go back to last question
    if (isQuestionsDone) {
      setStep(QUESTIONS.length - 1);
      return;
    }
    setStep((prev) => Math.max(prev - 1, 0));
  }

  const handleSubmit = async () => {
    if (isSent || isSubmitting) return;

    if (!formData.name || !formData.phone || !formData.region) {
      setSubmitError("Uzupełnij dane kontaktowe.");
      return;
    }
    setSubmitError(null);
    setIsSubmitting(true);

    try {
      const payload: any = { ...formData, id: uuidv4() };
      if (searchParams === "gad") {
        payload.owner = "nikos";
      }
      await pushLead(payload);
      setIsSent(true);
      setTimeout(() => {
        dispatch(setModalVisible(""));
      }, 5000);
    } catch (e) {
      setSubmitError("Nie udało się wysłać formularza. Spróbuj ponownie.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {isSent && <Success />}

      <div className="flex flex-col relative">
        {/* Questions */}
        <div className={`z-0 relative ${questionsPaddingX ?? ""}`}>
          {visibleQuestions.map((q, idx) => {
            const answered = Boolean((formData as any)[q.key]);
            const isCurrent = idx === Math.min(step, QUESTIONS.length - 1);
            return (
              <div
                key={q.key}
                className="flex flex-col justify-center border-t border-green-500 py-6 relative"
              >
                <div className="flex items-center gap-2">
                  {answered && (
                    <span
                      className="text-2xl text-green-500 leading-none flex items-center"
                      aria-hidden="true"
                    >
                      <FaCheckCircle />
                    </span>
                  )}
                  <span className="font-bold text-lg">
                    Pytanie {idx + 1}/{QUESTIONS.length}
                  </span>
                </div>
                <label className="font-light mt-3">{q.title}</label>
                {q.helper && (
                  <div className="text-sm text-zinc-600 mt-1">{q.helper}</div>
                )}

                {/* Options only for current question, to avoid re-answering earlier ones */}
                {isCurrent && !isQuestionsDone && (
                  <div className="-ml-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {q.options.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => setAnswer(q.key, opt.value)}
                        className={`${
                          (formData as any)[q.key] === opt.value
                            ? "border-black"
                            : "border-green-500"
                        } border-dashed border-2 mt-2 ml-2 p-2 py-0 font-light text-base bg-green-500 hover:bg-green-400 text-white`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}

                {answered && (
                  <div className="mt-2 text-sm text-white/80">
                    Wybrano:{" "}
                    <span className="font-bold">{(formData as any)[q.key]}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact + submit */}
        {isQuestionsDone && (
          <div
            style={{ boxShadow: "0px 0px 3px black" }}
            className="rounded-xl mx-6 my-6 p-6 bg-white text-zinc-900 flex flex-col"
          >
            <div className="text-zinc-800 font-bold text-xl">
              Dane kontaktowe
            </div>
            {isSent && (
              <div className="text-green-500 animate-pulse mt-3">
                Dziękujemy za wysłanie zapytania!
              </div>
            )}
            {!isSent && submitError && (
              <div className="text-red-600 mt-3 font-light">{submitError}</div>
            )}
            {isSubmitting && (
              <div className="text-zinc-600 mt-3 font-light">
                Wysyłanie formularza...
              </div>
            )}
            <div className="flex items-center flex-wrap -ml-4">
              <div className="mt-4 ml-4">
                <h2 className="sm:text-xl">Imię:</h2>
                <input
                  autoComplete="name"
                  style={{ boxShadow: "0px 0px 3px black" }}
                  className="mt-3 w-full lg:w-auto p-2 placeholder:font-light focus:outline-2 focus:outline-green-500"
                  type="text"
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  value={formData.name}
                  placeholder="Wpisz imię"
                />
              </div>
              <div className="mt-4 ml-4">
                <h2 className="sm:text-xl">Numer telefonu:</h2>
                <input
                  autoComplete="tel"
                  style={{ boxShadow: "0px 0px 3px black" }}
                  className="mt-3 w-full lg:w-auto p-2 placeholder:font-light focus:outline-2 focus:outline-green-500"
                  type="text"
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, phone: e.target.value }))
                  }
                  value={formData.phone}
                  placeholder="Wpisz numer"
                />
              </div>
              <div className="mt-4 ml-4">
                <h2 className="sm:text-xl">Województwo:</h2>
                <select
                  style={{ boxShadow: "0px 0px 3px black" }}
                  className="mt-3 w-full lg:w-auto p-2 placeholder:font-light focus:outline-2 focus:outline-green-500"
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, region: e.target.value }))
                  }
                  value={formData.region}
                >
                  <option value="">Wybierz województwo</option>
                  <option value="dolnośląskie">dolnośląskie</option>
                  <option value="kujawsko-pomorskie">kujawsko-pomorskie</option>
                  <option value="lubelskie">lubelskie</option>
                  <option value="lubuskie">lubuskie</option>
                  <option value="łódzkie">łódzkie</option>
                  <option value="małopolskie">małopolskie</option>
                  <option value="mazowieckie">mazowieckie</option>
                  <option value="opolskie">opolskie</option>
                  <option value="podkarpackie">podkarpackie</option>
                  <option value="podlaskie">podlaskie</option>
                  <option value="pomorskie">pomorskie</option>
                  <option value="śląskie">śląskie</option>
                  <option value="świętokrzyskie">świętokrzyskie</option>
                  <option value="warmińsko-mazurskie">
                    warmińsko-mazurskie
                  </option>
                  <option value="wielkopolskie">wielkopolskie</option>
                  <option value="zachodniopomorskie">
                    zachodnio-pomorskie
                  </option>
                </select>
              </div>
            </div>

            <div className="flex flex-col-reverse lg:flex-row items-center w-full mt-4">
              <button onClick={goBack} className="font-light mt-2 lg:mr-4">
                Powrót
              </button>
              <button
                disabled={isSent || isSubmitting}
                onClick={handleSubmit}
                className="disabled:cursor-not-allowed disabled:opacity-70 flex flex-row items-center justify-center py-3 px-5 w-full text-base lg:w-max bg-gradient-to-br from-[#C5FF17] to-[#33E5CF] hover:scale-105 duration-200 ease-in-out text-zinc-800 rounded-lg cursor-pointer font-bold mt-2"
              >
                {isSubmitting ? "Wysyłanie..." : "Wyślij zapytanie"}
                <FaArrowRight className="ml-2" />
              </button>
            </div>
          </div>
        )}

        {/* Back button for questions */}
        {!isQuestionsDone && step > 0 && (
          <div className={`${questionsPaddingX ?? "px-6"} pb-6`}>
            <button onClick={goBack} className="font-light text-white/80">
              Powrót
            </button>
          </div>
        )}
      </div>
    </div>
  );
}





