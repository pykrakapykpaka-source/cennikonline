import { NextResponse, NextRequest } from "next/server";
import { createChat } from "completions";
import { pushQuestion, pushSessionMessage } from "@/common/firebase";
import { v4 as uuidv4 } from "uuid";

export async function GET(req: NextRequest) {
  const msg = req.nextUrl.searchParams.get("msg");
  const sessionId = req.nextUrl.searchParams.get("sessionId");

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { error: "Missing OPENAI_API_KEY" },
      { status: 500 }
    );
  }

  const chat = createChat({
    apiKey: process.env.OPENAI_API_KEY,
    model: "gpt-3.5-turbo",
  });
  await chat.sendMessage("Ping");
  const response = await chat.sendMessage(
    `Jesteś asystentem sprzedaży firmy, która sprzedaje cenniki online dla firm. Pomagasz w wyborze wariantu cennika, ułożeniu usług, pakietów i opisów oraz w wycenie (orientacyjnie, bez zobowiązań).
Proszę odpowiedzieć na pytanie: (${msg}). Odpowiadasz po polsku. Na końcu zachęć do zamówienia cennika przez formularz na stronie.`,
    {
      expect: {
        // Examples of what the response should look like.
        examples: [],
        // Schema that the response should satisfy.
        schema: {
          additionalProperties: false,
          type: "object",
          properties: {
            response: { type: "string" },
          },
          required: [],
        },
      },
    }
  );
  await pushSessionMessage(
    {
      content: response.content.response,
      role: "assistant",
      id: uuidv4(),
    },
    sessionId
  );

  if (msg && sessionId) {
    await pushQuestion({
      id: uuidv4(),
      question: msg,
      answer: response.content.response,
      sessionId,
      source: "publicAssistant",
    });
  }
  return NextResponse.json({ status: "success" });
}
