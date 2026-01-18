"use client";
import React, { useEffect, useMemo, useState } from "react";
import type { FaqItem } from "./types";

function slugifyPl(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replaceAll("ą", "a")
    .replaceAll("ć", "c")
    .replaceAll("ę", "e")
    .replaceAll("ł", "l")
    .replaceAll("ń", "n")
    .replaceAll("ó", "o")
    .replaceAll("ś", "s")
    .replaceAll("ż", "z")
    .replaceAll("ź", "z")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const Faq = ({
  faqs,
}: {
  faqs: FaqItem[];
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqsWithSlug = useMemo(() => {
    return faqs.map((faq) => ({ ...faq, slug: slugifyPl(faq.question) }));
  }, [faqs]);

  const syncFromHash = () => {
    const raw = window.location.hash.replace("#", "");
    if (!raw || raw === "faq") {
      setActiveIndex(null);
      return;
    }
    const idx = faqsWithSlug.findIndex((f) => f.slug === raw);
    if (idx >= 0) setActiveIndex(idx);
  };

  useEffect(() => {
    // Open question if the user landed on a FAQ hash, and keep it in sync
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [faqsWithSlug]);

  const handleItemClick = (index: number) => {
    const isClosing = activeIndex === index;
    setActiveIndex(isClosing ? null : index);
    const hash = isClosing ? "faq" : faqsWithSlug[index]?.slug;
    if (hash) window.location.hash = hash;
  };

  return (
    <div
      className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 duration-500 delay-500 flex flex-col items-start prose max-w-none"
    >
      <h2 className="w-full text-3xl text-left font-bold italic text-white">
        Często zadawane pytania
      </h2>
      <div className="mt-4 w-full space-y-3">
        {faqsWithSlug.map((faq, index) => (
          <div
            key={index}
            id={faq.slug}
            className="scroll-mt-28 w-full"
          >
            <div
              className="bg-zinc-900 text-white prose font-sans p-3 w-full max-w-none"
            >
              <button
                className="text-left w-full break-words"
                onClick={() => handleItemClick(index)}
              >
                {faq.question}
              </button>
              {activeIndex === index && (
                <div>
                  <p className="bg-zinc-800 p-2">
                    <span className="font-bold text-green-500">Odpowiedź</span>:{" "}
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}{" "}
        
      </div>
    </div>
  );
};

export default Faq;
