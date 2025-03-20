import FeaturesClientPart from '@/app/[lang]/features/features-client';
import { trackPageView } from '@/lib/tracking';
import { Metadata } from 'next';
import SharedLayout from '../shared-layout';
import {
  ComparisonSection,
  FeatureTabsSection,
  HeroSection,
  IntegrationsSection,
  UseCasesSection,
} from './components';

export const metadata: Metadata = {
  title: 'Features - Bio King',
  description:
    'Explore the powerful features of Bio King. Create stunning bio links, track analytics, and boost your online presence.',
  openGraph: {
    title: 'Features - Bio King',
    description:
      'Explore the powerful features of Bio King. Create stunning bio links, track analytics, and boost your online presence.',
    type: 'website',
  },
};

export default async function FeaturesPage() {
  // Server-side tracking untuk SEO
  await trackPageView({
    pageType: 'feature',
  });

  return (
    <SharedLayout>
      {/* Client component untuk interaktivitas */}
      <FeaturesClientPart />

      <HeroSection />
      <FeatureTabsSection />
      <UseCasesSection />
      <IntegrationsSection />
      <ComparisonSection />
    </SharedLayout>
  );
}
