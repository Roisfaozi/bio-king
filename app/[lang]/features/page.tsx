'use client';

import SharedLayout from '../shared-layout';
import {
  ComparisonSection,
  FeatureTabsSection,
  HeroSection,
  IntegrationsSection,
  UseCasesSection,
} from './components';

export default function FeaturesPage() {
  return (
    <SharedLayout>
      <HeroSection />
      <FeatureTabsSection />
      <UseCasesSection />
      <IntegrationsSection />
      <ComparisonSection />
    </SharedLayout>
  );
}
