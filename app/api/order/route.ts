import { NextResponse } from "next/server";

type OrderPayload = {
  name?: unknown;
  email?: unknown;
  company?: unknown;
  website?: unknown;
  message?: unknown;
};

function isNonEmptyString(v: unknown): v is string {
  return typeof v === "string" && v.trim().length > 0;
}

function isEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

export async function POST(req: Request) {
  let body: OrderPayload;
  try {
    body = (await req.json()) as OrderPayload;
  } catch {
    return NextResponse.json(
      { ok: false, message: "Nieprawidłowe dane formularza." },
      { status: 400 },
    );
  }

  const email = isNonEmptyString(body.email) ? body.email.trim() : "";
  const message = isNonEmptyString(body.message) ? body.message.trim() : "";

  if (!email || !isEmail(email)) {
    return NextResponse.json(
      { ok: false, message: "Podaj poprawny e-mail." },
      { status: 400 },
    );
  }

  if (!message || message.length < 10) {
    return NextResponse.json(
      { ok: false, message: "Wiadomość jest za krótka (min. 10 znaków)." },
      { status: 400 },
    );
  }

  const requestId = `${Date.now().toString(36)}-${Math.random()
    .toString(36)
    .slice(2, 8)}`;

  // MVP: na razie tylko log. Kolejny krok: wysyłka e-mail / zapis do DB/CRM.
  console.log("[order]", {
    requestId,
    name: isNonEmptyString(body.name) ? body.name.trim() : "",
    email,
    company: isNonEmptyString(body.company) ? body.company.trim() : "",
    website: isNonEmptyString(body.website) ? body.website.trim() : "",
    message,
  });

  return NextResponse.json({ ok: true, requestId });
}

