import { Footer } from "./components/landing/Footer";
import { FAQSection, faqJsonLd } from "./components/landing/FAQSection";
import { Header } from "./components/landing/Header";
import { Hero } from "./components/landing/Hero";
import { HowItWorks } from "./components/landing/HowItWorks";
import { HowToMakeSection } from "./components/landing/HowToMakeSection";
import { CtaSection } from "./components/landing/CtaSection";
import { OrderSection } from "./components/landing/OrderSection";
import { Offer } from "./components/landing/Offer";
import { ProblemSection } from "./components/landing/ProblemSection";
import { TemplateVsSection } from "./components/landing/TemplateVsSection";
import { TypesSection } from "./components/landing/TypesSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Header />
      <main>
        <Hero />
        <ProblemSection />
        <Offer />
        <TypesSection />
        <HowToMakeSection />
        <TemplateVsSection />
        <HowItWorks />
        <CtaSection />
        <OrderSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}
