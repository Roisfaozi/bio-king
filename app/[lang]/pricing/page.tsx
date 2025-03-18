'use client';

import {
  ComparisonTableSection,
  CTASection,
  FAQSection,
  Footer,
  GuaranteeSection,
  Header,
  PriceHeroSection,
  PricingPlansSection,
  TestimonialsSection,
} from './components';

export default function PricingPage() {
  return (
    <div className='flex min-h-screen flex-col bg-gradient-to-b from-background to-background/60'>
      <Header />
      <main className='flex-1'>
        <PriceHeroSection />
        <PricingPlansSection />
        <ComparisonTableSection />
        <TestimonialsSection />
        <FAQSection />
        <GuaranteeSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
