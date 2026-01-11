import Link from "next/link";
import { Container } from "./Container";

const nav = [
  { href: "#problem", label: "Problem" },
  { href: "#rozwiazanie", label: "Rozwiązanie" },
  { href: "#typy", label: "Typy cenników" },
  { href: "#proces", label: "Proces" },
  { href: "#faq", label: "FAQ" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200/60 bg-white/80 backdrop-blur">
      <Container className="py-4">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-sm font-semibold tracking-tight text-zinc-950">
              CennikOnline.pl
            </span>
            <span className="hidden text-sm text-zinc-500 sm:inline">
              — cenniki online dla firm
            </span>
          </Link>

          <nav className="hidden items-center gap-6 md:flex" aria-label="Nawigacja">
            {nav.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-zinc-700 hover:text-zinc-950"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <a
            href="#zamow"
            className="inline-flex h-10 items-center justify-center rounded-full bg-zinc-950 px-4 text-sm font-semibold text-white transition-colors hover:bg-zinc-800"
          >
            Zamów wycenę
          </a>
        </div>
      </Container>
    </header>
  );
}

