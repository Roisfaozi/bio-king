'use client';

import {
  ComparisonSection,
  CTASection,
  FeatureTabsSection,
  Footer,
  Header,
  HeroSection,
  IntegrationsSection,
  UseCasesSection,
} from './components';

export default function MarketingPage() {
  return (
    <div className='flex min-h-screen flex-col bg-gradient-to-b from-background to-background/60'>
      <Header />
      <main className='flex-1'>
        <HeroSection />
        <FeatureTabsSection />
        <UseCasesSection />
        <IntegrationsSection />
        <ComparisonSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
