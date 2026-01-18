"use client";
// logic for an animation that counts to a number
import { useEffect, useMemo, useRef, useState } from "react";
import { useIsVisible } from "react-is-visible";
export default function CountToTheNumberAnimated({
  textBeforeNumber,
  numberToAnimateTo,
  textAfterNumber,
  textColor,
  animationSpeed,
}: {
  textBeforeNumber: string;
  numberToAnimateTo: number;
  textAfterNumber: string;
  textColor: string;
  animationSpeed: number;
}) {
  const [count, setCount] = useState<number>(0);
  const [hasFinished, setHasFinished] = useState<boolean>(false);
  const ref = useRef<any>();
  const isVisible = useIsVisible(ref);

  const targetText = useMemo(() => {
    const base = numberToAnimateTo.toLocaleString("pl-PL");
    const suffix = numberToAnimateTo === 97 ? "%" : "";
    return `${base}${suffix}`;
  }, [numberToAnimateTo]);

  const currentText = useMemo(() => {
    const base = count.toLocaleString("pl-PL");
    const suffix = numberToAnimateTo === 97 ? "%" : "";
    return `${base}${suffix}`;
  }, [count, numberToAnimateTo]);

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        if (count < numberToAnimateTo - 10) {
          setCount(count + 1);
        } else if (count < numberToAnimateTo - 2) {
          setCount(count + 1);
        } else {
          setCount(numberToAnimateTo);
          setHasFinished(true);
        }
      }, animationSpeed);
      return () => clearInterval(interval);
    }
  }, [count, hasFinished, numberToAnimateTo, isVisible]);
  return (
    <>
      <div
        ref={ref}
        data-aos={textAfterNumber === "Projektów" ? "fade-down" : "fade-up"}
        data-aos-duration="1000"
        className={`${
          textAfterNumber !== "Projektów" ? "lg:items-end" : ""
        } text-2xl flex flex-col items-start w-max aos-init`}
      >
        <div
          className="lg:text-lg font-bold"
          style={{ color: textColor }}
        >
          {textBeforeNumber}
        </div>

        <div className="font-bold text-8xl flex flex-row items-end whitespace-nowrap">
          <div
            className="font-bold bg-gradient-to-r from-[#B4FC2D] to-[#3EE7C0] bg-clip-text text-transparent drop-shadow-xl shadow-zinc-800 tabular-nums text-right shrink-0"
            style={{ width: `${targetText.length}ch`, maxWidth: `${targetText.length}ch` }}
          >
            {currentText}
          </div>
          <div
            className="text-sm italic mb-2 ml-4"
            style={{ color: textColor }}
          >
            {textAfterNumber}
          </div>
        </div>
      </div>
    </>
  );
}
