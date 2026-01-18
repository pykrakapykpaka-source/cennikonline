"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Stat = {
  label: string;
  value: string | number | null | undefined;
};

export default function HackerLoading({
  active,
  error,
  title = "ADMIN",
  subtitle,
  stats = [],
  minDurationMs = 5000,
  variant = "banner",
}: {
  active: boolean;
  error?: string | null;
  title?: string;
  subtitle?: string;
  stats?: Stat[];
  minDurationMs?: number;
  variant?: "banner" | "card";
}) {
  const shouldBeVisible = active || !!error;
  const [visible, setVisible] = useState<boolean>(shouldBeVisible);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    if (shouldBeVisible) {
      setVisible(true);
      if (startRef.current === null) startRef.current = Date.now();
      return;
    }

    if (!visible) return;
    const start = startRef.current ?? Date.now();
    const elapsed = Date.now() - start;
    const remaining = Math.max(0, minDurationMs - elapsed);
    const t = window.setTimeout(() => {
      setVisible(false);
      startRef.current = null;
    }, remaining);
    return () => window.clearTimeout(t);
  }, [minDurationMs, shouldBeVisible, visible]);

  const lines = useMemo(() => {
    const safeStats = stats
      .filter((s) => s?.label)
      .slice(0, 8)
      .map((s) => ({
        label: s.label,
        value:
          s.value === null || typeof s.value === "undefined" ? "…" : String(s.value),
      }));

    const statLines = safeStats.map(
      (s) => `> ${s.label.padEnd(18, " ")} ${s.value}`
    );

    return [
      `$ whoami`,
      `root`,
      `$ ssh -i ~/.ssh/id_rsa admin@hexon-db`,
      `> establishing encrypted tunnel…`,
      `> decrypting collections…`,
      ...statLines,
      `> syncing dashboard widgets…`,
      error ? `! error: ${error}` : `> ok`,
    ];
  }, [error, stats]);

  const [shownLines, setShownLines] = useState(0);
  useEffect(() => {
    if (!visible) return;
    setShownLines(0);
    const interval = window.setInterval(() => {
      setShownLines((n) => Math.min(lines.length, n + 1));
    }, 140);
    return () => window.clearInterval(interval);
  }, [lines.length, visible]);

  if (!visible) return null;

  const shell = (
    <div className="font-mono text-[13px] leading-5">
      <div className="flex items-center justify-between gap-4">
        <div className="text-green-300 font-semibold tracking-wide">{title}</div>
        {subtitle && <div className="text-green-200/70 text-xs">{subtitle}</div>}
      </div>
      <div className="mt-2 whitespace-pre-wrap text-green-200">
        {lines.slice(0, shownLines).join("\n")}
        <span className="inline-block w-[10px] animate-pulse align-baseline">
          {" "}
          █
        </span>
      </div>
    </div>
  );

  if (variant === "card") {
    return (
      <div className="rounded-xl bg-black border border-green-500/20 p-4 text-green-100">
        {shell}
      </div>
    );
  }

  return (
    <div className="lg:col-span-2 mb-4 rounded bg-black border border-green-500/20 px-4 py-3 text-green-100">
      {shell}
    </div>
  );
}


