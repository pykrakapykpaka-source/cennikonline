"use client";
import { app, createSession, pushSessionMessage } from "@/common/firebase";
import { collection, getFirestore, onSnapshot } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { FaRobot } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";
async function getAnswer(question: string, sessionId: string) {
  const answer = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/v1/publicAssistant?msg=${question}&sessionId=${sessionId}`,
    { cache: "no-store" }
  );
  return answer;
}

type ChatRole = "user" | "assistant";
type ChatMessage = {
  id?: string;
  role: ChatRole;
  content: string;
};

export default function AssistantAI() {
  const [userQuestion, setUserQuestion] = useState("");
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [isCheckedOut, setIsCheckedOut] = useState(false);
  const endRef = useRef<HTMLDivElement | null>(null);

  const quickQuestions = [
    "Ile kosztuje cennik online i co jest w cenie?",
    "Jakie informacje potrzebujecie, żeby przygotować cennik usług?",
    "W jakim czasie dostanę gotowy cennik i jak wygląda proces?",
    "Czy robicie cenniki dla mojej branży? (np. beauty, medycyna, budowlanka)",
  ];

  useEffect(() => {
    if (!localStorage?.getItem("isCheckedOut")) {
      setIsCheckedOut(false);
    } else {
      setIsCheckedOut(true);
    }
    const id = uuidv4();
    if (!localStorage?.getItem("session")) {
      localStorage?.setItem("session", id);
      createSession({
        id: id,
        messages: [],
      });
    }
  }, []);

  // Auto-open the assistant after a short delay (once per visitor).
  useEffect(() => {
    const alreadyAutoOpened = localStorage?.getItem("assistantAutoOpened");
    if (alreadyAutoOpened === "true") return;

    const t = window.setTimeout(() => {
      localStorage?.setItem("assistantAutoOpened", "true");

      // Match the behavior of clicking the launcher: mark as checked out
      // so the UI stays compact and doesn't show the intro text again.
      localStorage?.setItem("isCheckedOut", "true");
      setIsCheckedOut(true);

      setAssistantOpen(true);
    }, 7000);

    return () => window.clearTimeout(t);
  }, []);

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const sessionId = localStorage?.getItem("session");
    if (!sessionId) return;

    setLoading(true);
    setUserQuestion("");
    try {
      pushSessionMessage(
        {
          content: trimmed,
          role: "user",
          id: uuidv4(),
        },
        sessionId
      );

      await getAnswer(trimmed, sessionId);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!app) return;
    const db = getFirestore(app);
    const ref = collection(db, "publicSessions");
    const unsub = onSnapshot(ref, (querySnapshot: any) => {
      const snapshotData: any[] = [];
      querySnapshot.forEach((doc: any) => {
        snapshotData.push(doc.data());
      });
      const nextMessages =
        snapshotData.filter(
          (session) => session.id === localStorage?.getItem("session")
        )[0]?.messages ?? [];

      setMessages(nextMessages);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (!assistantOpen) return;
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [assistantOpen, messages.length, loading]);

  const headerText = "Asystent Cenników AI";

  return (
    <>
      {/* Launcher */}
      <div className="fixed bottom-4 right-4 lg:bottom-6 lg:right-6 z-[2999]">
        <button
          type="button"
          onClick={() => {
            if (!isCheckedOut) {
              localStorage?.setItem("isCheckedOut", "true");
              setIsCheckedOut(true);
            }
            setAssistantOpen((v) => !v);
          }}
          className="group relative flex items-center gap-3 rounded-full bg-gradient-to-r from-[#C5FF17] to-[#33E5CF] p-[2px] shadow-xl shadow-black/30 transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98]"
          aria-label={assistantOpen ? "Zamknij czat" : "Otwórz czat"}
        >
          <span className="flex items-center gap-3 rounded-full bg-zinc-950 px-3 py-3 lg:px-4">
            <span className="grid place-items-center rounded-full bg-white/10 p-2 ring-1 ring-white/15">
              <FaRobot className="text-2xl lg:text-3xl text-white" />
            </span>
            {!isCheckedOut && (
              <span className="hidden sm:block text-left text-sm leading-tight text-white/90">
                <span className="block font-semibold">Masz pytanie?</span>
                <span className="block text-white/70">
                  Odpowiem w kilka sekund.
                </span>
              </span>
            )}
          </span>
        </button>
      </div>

      {/* Backdrop */}
      {assistantOpen && (
        <div
          className="fixed inset-0 z-[2998] bg-black/40 backdrop-blur-sm"
          onClick={() => setAssistantOpen(false)}
        />
      )}

      {/* Panel */}
      <div
        className={`fixed z-[2999] transition-all duration-200 ${
          assistantOpen ? "opacity-100" : "pointer-events-none opacity-0"
        } bottom-0 right-0 left-0 top-0 sm:bottom-6 sm:right-6 sm:left-auto sm:top-auto`}
        aria-hidden={!assistantOpen}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`h-full w-full bg-white/95 sm:w-[420px] sm:h-[70vh] sm:max-h-[680px] sm:rounded-2xl sm:border sm:border-black/10 sm:shadow-2xl overflow-hidden flex flex-col ${
            assistantOpen ? "translate-y-0" : "translate-y-2"
          } transition-transform duration-200`}
        >
          {/* Header */}
          <div className="flex items-center justify-between gap-3 px-4 py-3 bg-zinc-950 text-white">
            <div className="flex items-center gap-3 min-w-0">
              <div className="grid place-items-center rounded-xl bg-white/10 p-2 ring-1 ring-white/15">
                <FaRobot className="text-xl" />
              </div>
              <div className="min-w-0">
                <div className="font-bold leading-tight truncate">
                  {headerText}
                </div>
                <div className="text-xs text-white/70 leading-tight">
                  Szybkie odpowiedzi • 24/7
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setAssistantOpen(false)}
              className="rounded-lg px-3 py-2 text-sm font-semibold text-white/80 hover:text-white hover:bg-white/10"
            >
              Zamknij
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 bg-gradient-to-b from-white to-zinc-50">
            {/* Greeting */}
            <div className="flex items-start gap-3">
              <div className="mt-0.5 grid place-items-center rounded-full bg-zinc-950 text-white w-10 h-10 shrink-0 shadow-sm">
                <FaRobot className="text-lg" />
              </div>
              <div className="max-w-[85%]">
                <div className="rounded-2xl rounded-tl-md bg-zinc-950 text-white px-4 py-3 shadow-sm">
                  <p className="text-sm leading-relaxed">
                    Cześć! Czy mogę Ci w czymś pomóc? Wybierz szybkie pytanie
                    poniżej albo napisz własne.
                  </p>
                </div>
                {messages.length === 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {quickQuestions.map((q) => (
                      <button
                        key={q}
                        type="button"
                        onClick={() => sendMessage(q)}
                        disabled={loading}
                        className="text-left text-xs sm:text-sm rounded-full border border-black/10 bg-white px-3 py-2 hover:bg-zinc-50 disabled:opacity-50 disabled:cursor-not-allowed text-black"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Conversation */}
            <div className="mt-5 flex flex-col gap-3">
              {messages?.map((m, idx) => {
                const role = m?.role;
                const isUser = role === "user";
                const key = m?.id ?? `${role}-${idx}`;
                return (
                  <div
                    key={key}
                    className={`flex items-end gap-3 ${
                      isUser ? "justify-end" : "justify-start"
                    }`}
                  >
                    {!isUser && (
                      <div className="grid place-items-center rounded-full bg-zinc-950 text-white w-9 h-9 shrink-0">
                        <FaRobot className="text-base" />
                      </div>
                    )}
                    <div className={`max-w-[85%] ${isUser ? "order-1" : ""}`}>
                      <div
                        className={`px-4 py-3 text-sm leading-relaxed shadow-sm ${
                          isUser
                            ? "rounded-2xl rounded-tr-md bg-[#33E5CF]/20 text-zinc-900 border border-black/5"
                            : "rounded-2xl rounded-tl-md bg-white text-zinc-900 border border-black/5"
                        }`}
                      >
                        {m?.content}
                      </div>
                    </div>
                  </div>
                );
              })}

              {loading && (
                <div className="flex items-end gap-3 justify-start">
                  <div className="grid place-items-center rounded-full bg-zinc-950 text-white w-9 h-9 shrink-0">
                    <FaRobot className="text-base" />
                  </div>
                  <div className="max-w-[85%]">
                    <div className="rounded-2xl rounded-tl-md bg-white text-zinc-900 border border-black/5 px-4 py-3 text-sm shadow-sm">
                      Piszę odpowiedź…
                    </div>
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>
          </div>

          {/* Composer */}
          <div className="border-t border-black/10 bg-white px-4 py-3">
            <form
              className="flex items-center gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage(userQuestion);
              }}
            >
              <input
                type="text"
                onChange={(e) => setUserQuestion(e.target.value)}
                value={userQuestion}
                placeholder="Napisz wiadomość…"
                className="w-full rounded-xl border border-black/10 bg-white px-3 py-2 text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#33E5CF]/60 focus:border-transparent"
              />
              <button
                type="submit"
                disabled={loading || !userQuestion.trim()}
                className="shrink-0 rounded-xl bg-zinc-950 text-white px-4 py-2 font-semibold hover:bg-zinc-900 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Wyślij
              </button>
            </form>
            <div className="mt-2 text-[11px] text-zinc-500">
              Tip: kliknij propozycję, żeby wysłać pytanie jednym tapnięciem.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
