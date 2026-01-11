"use client";

import { useMemo, useState } from "react";

type FormState = {
  name: string;
  email: string;
  company: string;
  website: string;
  message: string;
};

type SubmitState =
  | { status: "idle" }
  | { status: "submitting" }
  | { status: "success"; requestId: string }
  | { status: "error"; message: string };

const initial: FormState = {
  name: "",
  email: "",
  company: "",
  website: "",
  message: "",
};

export function OrderForm() {
  const [data, setData] = useState<FormState>(initial);
  const [submit, setSubmit] = useState<SubmitState>({ status: "idle" });

  const isDisabled = useMemo(
    () => submit.status === "submitting",
    [submit.status],
  );

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmit({ status: "submitting" });

    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });

      const payload = (await res.json()) as
        | { ok: true; requestId: string }
        | { ok: false; message: string };

      if (!res.ok || !payload.ok) {
        setSubmit({
          status: "error",
          message:
            "message" in payload ? payload.message : "Nie udało się wysłać formularza.",
        });
        return;
      }

      setSubmit({ status: "success", requestId: payload.requestId });
      setData(initial);
    } catch {
      setSubmit({
        status: "error",
        message: "Błąd połączenia. Spróbuj ponownie za chwilę.",
      });
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm">
          <span className="font-medium text-zinc-950">Imię i nazwisko</span>
          <input
            value={data.name}
            onChange={(e) => setData((d) => ({ ...d, name: e.target.value }))}
            disabled={isDisabled}
            placeholder="Jan Kowalski"
            className="h-11 w-full rounded-xl border border-zinc-300 bg-white px-3 text-sm text-zinc-950 outline-none ring-zinc-950/10 placeholder:text-zinc-400 focus:ring-4"
          />
        </label>
        <label className="grid gap-2 text-sm">
          <span className="font-medium text-zinc-950">E-mail *</span>
          <input
            value={data.email}
            onChange={(e) => setData((d) => ({ ...d, email: e.target.value }))}
            disabled={isDisabled}
            required
            type="email"
            placeholder="jan@firma.pl"
            className="h-11 w-full rounded-xl border border-zinc-300 bg-white px-3 text-sm text-zinc-950 outline-none ring-zinc-950/10 placeholder:text-zinc-400 focus:ring-4"
          />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm">
          <span className="font-medium text-zinc-950">Firma / branża</span>
          <input
            value={data.company}
            onChange={(e) => setData((d) => ({ ...d, company: e.target.value }))}
            disabled={isDisabled}
            placeholder="Salon beauty"
            className="h-11 w-full rounded-xl border border-zinc-300 bg-white px-3 text-sm text-zinc-950 outline-none ring-zinc-950/10 placeholder:text-zinc-400 focus:ring-4"
          />
        </label>
        <label className="grid gap-2 text-sm">
          <span className="font-medium text-zinc-950">Strona WWW (jeśli masz)</span>
          <input
            value={data.website}
            onChange={(e) => setData((d) => ({ ...d, website: e.target.value }))}
            disabled={isDisabled}
            placeholder="https://twojafirma.pl"
            className="h-11 w-full rounded-xl border border-zinc-300 bg-white px-3 text-sm text-zinc-950 outline-none ring-zinc-950/10 placeholder:text-zinc-400 focus:ring-4"
          />
        </label>
      </div>

      <label className="grid gap-2 text-sm">
        <span className="font-medium text-zinc-950">
          Wiadomość (np. ile usług, czy pakiety, czy cennik firmowy) *
        </span>
        <textarea
          value={data.message}
          onChange={(e) => setData((d) => ({ ...d, message: e.target.value }))}
          disabled={isDisabled}
          required
          rows={5}
          placeholder="Chcę cennik usług + pakiety, ok. 20 pozycji..."
          className="w-full resize-y rounded-xl border border-zinc-300 bg-white px-3 py-3 text-sm text-zinc-950 outline-none ring-zinc-950/10 placeholder:text-zinc-400 focus:ring-4"
        />
      </label>

      <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          disabled={isDisabled}
          className="inline-flex h-12 items-center justify-center rounded-full bg-zinc-950 px-6 text-sm font-semibold text-white transition-colors hover:bg-zinc-800 disabled:opacity-60"
          type="submit"
        >
          {submit.status === "submitting" ? "Wysyłanie..." : "Wyślij zapytanie"}
        </button>

        {submit.status === "success" ? (
          <p className="text-sm text-zinc-600">
            Dzięki! Odezwiemy się wkrótce. ID:{" "}
            <span className="font-mono text-zinc-950">{submit.requestId}</span>
          </p>
        ) : null}
        {submit.status === "error" ? (
          <p className="text-sm text-red-600">{submit.message}</p>
        ) : null}
      </div>
    </form>
  );
}

