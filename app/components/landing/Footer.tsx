import { Container } from "./Container";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-zinc-200 bg-white">
      <Container className="py-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-zinc-950">CennikOnline.pl</p>
            <p className="mt-1 text-sm text-zinc-600">
              MVP — zamówienie usługi stworzenia cennika online.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
            <a className="text-zinc-700 hover:text-zinc-950" href="#oferta">
              Oferta
            </a>
            <a className="text-zinc-700 hover:text-zinc-950" href="#faq">
              FAQ
            </a>
            <a className="text-zinc-700 hover:text-zinc-950" href="#zamow">
              Zamów
            </a>
          </div>
        </div>
        <p className="mt-8 text-xs text-zinc-500">© {year} CennikOnline.pl</p>
      </Container>
    </footer>
  );
}

