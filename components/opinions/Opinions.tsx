import { FaStar } from "react-icons/fa";

const opinions = [
  {
    name: "Wiesława Sokólska",
    opinion:
      "W końcu mamy czytelny cennik na stronie. Klienci przestali dopytywać o podstawowe ceny, a zapytań jest zauważalnie więcej. Polecam za kontakt i tempo realizacji.",
    rating: "5",
  },
  {
    name: "Andrzej Karkowski",
    opinion:
      "Dostaliśmy gotowy cennik usług + podpowiedzi jak poukładać pakiety. Fajnie napisane i dobrze wygląda na telefonie. Klienci szybciej podejmują decyzję.",
    rating: "5",
  },
  {
    name: "Ricks V.",
    opinion:
      "Prosto, konkretnie i bez chaosu. Cennik jest czytelny, a opisy usług odpowiadają na większość pytań jeszcze przed kontaktem. Mega oszczędność czasu.",
    rating: "5",
  },
  {
    name: "Alan Project",
    opinion:
      "Zamówienie poszło sprawnie, a cennik jest gotowy pod SEO. Widać, że ktoś myśli o sprzedaży, nie tylko o „ładnym PDF-ie”.",
    rating: "5",
  },
  {
    name: "Cezary Kas",
    opinion:
      "Bardzo dobry kontakt, szybkie poprawki i konkretne sugestie co dopisać w warunkach. Cennik wygląda profesjonalnie i buduje zaufanie.",
    rating: "5",
  },
  {
    name: "Michał Broniewski",
    opinion:
      "Wreszcie mamy uporządkowaną ofertę. Cennik jest przejrzysty i łatwo go później aktualizować. Polecam.",
    rating: "5",
  },
  {
    name: "Hubert Ozimkiewicz",
    opinion:
      "Cennik online zrobił robotę — mniej rozmów „o cenę”, więcej rozmów „o termin”.",
    rating: "5",
  },
  {
    name: "Jarosław Lipkowski",
    opinion: "Super. Profesjonalna i miła obsługa.",
    rating: "5",
  },
];

export default function Opinions() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 font-gotham">
      {opinions.map((opinion, index) => (
        <div
          data-aos="fade-up"
          data-aos-duration="300"
          className={`flex flex-col justify-center border-t border-green-500 p-6 relative aos-init`}
          key={index}
        >
          
          <span className="font-bold text-2xl">{opinion.name}</span>
          <p className="mt-4 text-base font-light">{opinion.opinion}</p>
          <div className="flex flex-row items-center text-yellow-400 mt-2">
            <FaStar className="h-4 w-4" />
            <FaStar className="h-4 w-4" />
            <FaStar className="h-4 w-4" />
            <FaStar className="h-4 w-4" />
            <FaStar className="h-4 w-4" />
          </div>
        </div>
      ))}
    </div>
  );
}
