"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FaDownload,
  FaHome,
  FaPeopleArrows,
  FaRegQuestionCircle,
} from "react-icons/fa";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
};

export type HeaderView = "default" | "order" | "courses";

export type HeaderProps = {
  view?: HeaderView;
};

export default function Header({ view = "default" }: HeaderProps) {
  const pathname = usePathname();
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [hash, setHash] = useState<string>("");

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setSupportsPWA(true);
      setPromptInstall(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  useEffect(() => {
    const readHash = () => setHash(window.location.hash || "");
    readHash();
    window.addEventListener("hashchange", readHash);
    return () => window.removeEventListener("hashchange", readHash);
  }, [pathname]);

  const onInstallClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    if (!promptInstall) return;
    promptInstall.prompt();
  };

  const navItems: Array<{
    href: string;
    label: string;
    icon: React.ReactNode;
    isActive: boolean;
  }> = [
    {
      href: "/#",
      label: "Home",
      icon: <FaHome className="h-5 w-5" />,
      isActive: pathname === "/" && (hash === "" || hash === "#"),
    },
    {
      href: "/#about",
      label: "Oferta",
      icon: <FaPeopleArrows className="h-5 w-5" />,
      isActive: pathname === "/" && hash === "#about",
    },
    {
      href: "/#faq",
      label: "FAQ",
      icon: <FaRegQuestionCircle className="h-5 w-5" />,
      isActive: pathname === "/" && hash === "#faq",
    },
  ];

  return (
    <header className="fixed inset-x-0 top-4 sm:top-6 xl:top-10 w-full z-[500] font-sans">
      <div className="mx-auto flex w-[98vw] items-center justify-end px-3 sm:px-6">
        {/* Desktop / tablet nav */}
        <nav className="hidden md:flex items-center gap-2">
          <div className="flex items-center gap-1 rounded-2xl bg-black/55 backdrop-blur border border-white/10 p-1 shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
                  item.isActive
                    ? "bg-white/15 text-white"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                <span aria-hidden="true">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {supportsPWA && (
            <button
              onClick={onInstallClick}
              className="inline-flex items-center gap-2 rounded-2xl bg-black/55 backdrop-blur border border-white/10 px-4 py-2 text-sm font-medium text-white/85 hover:text-white hover:bg-white/10 transition-colors shadow-[0_8px_30px_rgba(0,0,0,0.35)]"
            >
              <FaDownload className="h-4 w-4" />
              Zainstaluj
            </button>
          )}

          <Link
            href={view === "order" ? "#zamow" : "/zamow-cennik-online"}
            className="group inline-flex items-center gap-2 rounded-2xl bg-gradient-to-br from-[#C5FF17] to-[#33E5CF] px-4 py-2 text-sm font-bold text-zinc-900 shadow-[0_10px_30px_rgba(0,0,0,0.35)] transition-transform hover:scale-[1.03]"
          >
            <FaRegQuestionCircle className="h-4 w-4" />
            {view === "order" ? "Przejdź do formularza" : "Zamów cennik"}
          </Link>
        </nav>
      </div>

      {/* Mobile bottom nav */}
      <div className="md:hidden fixed inset-x-0 bottom-3 z-[500] px-3 pb-[env(safe-area-inset-bottom)]">
        <div className="mx-auto max-w-md rounded-2xl bg-black/65 backdrop-blur border border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.45)] overflow-hidden">
          <div className="grid grid-cols-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center gap-1 py-3 text-xs font-medium transition-colors ${
                  item.isActive
                    ? "bg-white/15 text-white"
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                }`}
              >
                <span aria-hidden="true" className="text-base">
                  {item.icon}
                </span>
                <span className="leading-none">{item.label}</span>
              </Link>
            ))}
          </div>

          
                
            
          
        </div>
      </div>
    </header>
  );
}
