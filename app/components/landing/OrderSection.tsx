import { Container } from "./Container";
import { OrderForm } from "./OrderForm";

export function OrderSection() {
  return (
    <section id="zamow" className="bg-white scroll-mt-24">
      <Container className="py-14 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
            Zamów cennik online / poproś o wycenę
          </h2>
          <p className="mt-4 text-pretty text-base leading-7 text-zinc-600 sm:text-lg sm:leading-8">
            Napisz kilka zdań o ofercie. Jeśli nie wiesz jak wycenić usługi —
            pomożemy uporządkować cennik usług, pakiety i zakres.
          </p>

          <div className="mt-8 rounded-2xl border border-zinc-200 bg-zinc-50 p-6 sm:p-8">
            <OrderForm />
            <p className="mt-4 text-xs leading-5 text-zinc-500">
              MVP: formularz wysyła zgłoszenie do endpointu i zwraca potwierdzenie.
              Integrację z CRM / e‑mailem dodamy w kolejnym kroku.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

