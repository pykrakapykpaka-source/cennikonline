"use client";
import { useAuthState } from "react-firebase-hooks/auth";
import LoginPage from "./LoginPage";
import Loading from "./loading";
import { app, auth } from "@/common/firebase";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaLightbulb } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setLight } from "@/common/redux/slices/lightSlice";
import { usePathname } from "next/navigation";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import dynamic from "next/dynamic";
import Toast from "@/components/Toast";
const Nav = dynamic(() => import("@/components/Nav"), { ssr: false });
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [messages, setMessages] = useState<any[]>([]);
  useEffect(() => {
    if (!app) return;
    let cancelled = false;
    (async () => {
      try {
        const db = getFirestore(app);
        const ref = collection(db, "messages");
        const snap = await getDocs(ref);
        const snapshotData = snap.docs.map((d) => d.data());
        if (!cancelled) setMessages(snapshotData);
      } catch (e) {
        console.error("Failed to load messages:", e);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);
  const pathname = usePathname();
  const [isNavOpen, setNavOpen] = useState(false);
  const [user, loading] = useAuthState(auth!);
  const dispatch = useDispatch();

  const { light } = useSelector((state: any) => state.light);

  const allowedEmails = (process.env.NEXT_PUBLIC_ADMIN_EMAILS || "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);

  const isAllowed = !!user?.email && allowedEmails.includes(user.email.toLowerCase());

  return (
    <>
      <Toast />
      {!loading && (
        <div className="relative w-full overflow-x-hidden font-coco bg-[#404149] font-sans pb-48">
          <button
            onClick={() => dispatch(setLight(!light))}
            className="absolute right-6 top-6 z-[200]"
            aria-label="Ustawienia: przełącz motyw"
          >
            <FaLightbulb
              className={`text-4xl ${light ? "text-yellow-400" : "text-white"}`}
            />
          </button>
          {user ? (
            <>
              {isAllowed ? (
                <>
                  <Nav
                    isNavOpen={isNavOpen}
                    setNavOpen={setNavOpen}
                    messages={messages}
                  />
                  <div className={` duration-500 w-full pt-24 scrollbar`}>
                    <Link href="/" className="absolute left-20 top-6 z-50">
                      <Image
                        src="/logo.gif"
                        width={200}
                        height={200}
                        alt="cennik online dla firm strona internetowa cennikonline.pl"
                        className="w-[150px]"
                      />
                    </Link>

                    {children}
                  </div>
                </>
              ) : (
                <div className="min-h-screen flex items-center justify-center px-6">
                  <div className="max-w-xl w-full rounded-lg bg-black/30 border border-white/10 p-6 text-white">
                    <div className="text-2xl font-bold mb-2">
                      Brak dostępu do panelu admina
                    </div>
                    <div className="text-white/80">
                      Zalogowano jako: <span className="font-semibold">{user?.email}</span>
                    </div>
                    <div className="text-white/70 mt-3 text-sm">
                      Dostęp mają tylko adresy z{" "}
                      <span className="font-mono">NEXT_PUBLIC_ADMIN_EMAILS</span>
                      {allowedEmails.length > 0 ? (
                        <>
                          : <span className="font-semibold">{allowedEmails.join(", ")}</span>
                        </>
                      ) : (
                        <>
                          . Brak konfiguracji — ustaw{" "}
                          <span className="font-mono">NEXT_PUBLIC_ADMIN_EMAILS</span> w{" "}
                          <span className="font-mono">.env.local</span>.
                        </>
                      )}
                      .
                    </div>
                    <div className="mt-6 flex gap-3">
                      <Link
                        href="/"
                        className="bg-white/10 hover:bg-white/15 border border-white/10 px-4 py-2 rounded"
                      >
                        Strona główna
                      </Link>
                      <Link
                        href="/admin/logout"
                        className="bg-red-500/80 hover:bg-red-500 border border-red-500/40 px-4 py-2 rounded"
                      >
                        Wyloguj
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <LoginPage />
          )}
        </div>
      )}
      {loading && <Loading />}
    </>
  );
}
