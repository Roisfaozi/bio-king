'use client';

import SharedLayout from '../shared-layout';
import {
  ComparisonTableSection,
  FAQSection,
  GuaranteeSection,
  PriceHeroSection,
  PricingPlansSection,
  TestimonialsSection,
} from './components';

export default function PricingPage() {
  return (
    <SharedLayout>
      <PriceHeroSection />
      <PricingPlansSection />
      <ComparisonTableSection />
      <TestimonialsSection />
      <FAQSection />
      <GuaranteeSection />
    </SharedLayout>
  );
}
