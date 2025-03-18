import PricingClientPart from '@/app/[lang]/pricing/pricing-client';
import { trackPageView } from '@/lib/tracking';
import { Metadata } from 'next';
import SharedLayout from '../shared-layout';
import {
  ComparisonTableSection,
  FAQSection,
  GuaranteeSection,
  PriceHeroSection,
  PricingPlansSection,
  TestimonialsSection,
} from './components';

export const metadata: Metadata = {
  title: 'Pricing - Bio King',
  description:
    'Choose the perfect pricing plan for your needs. From free to enterprise, Bio King has flexible options for individuals and businesses.',
  openGraph: {
    title: 'Pricing - Bio King',
    description:
      'Choose the perfect pricing plan for your needs. From free to enterprise, Bio King has flexible options for individuals and businesses.',
    type: 'website',
  },
};

export default async function PricingPage() {
  // Server-side tracking untuk SEO
  await trackPageView({
    pageType: 'pricing',
  });

  return (
    <SharedLayout>
      {/* Client component untuk interaktivitas */}
      <PricingClientPart />

      <PriceHeroSection />
      <PricingPlansSection />
      <ComparisonTableSection />
      <TestimonialsSection />
      <FAQSection />
      <GuaranteeSection />
    </SharedLayout>
  );
}
