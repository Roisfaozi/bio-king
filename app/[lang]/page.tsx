'use client';
import { DecorativeElementsOptimized } from '@/components/landing-page/partials/decorative-elements-optimized';
import {
  AnalyticsSection,
  BrandsSection,
  FeaturesSection,
  HeroSection,
  ProductShowcaseSection,
  TestimonialsSection,
} from '@/components/landing-page/sections';
import Stats from '@/components/landing-page/stats';
import SharedLayout from './shared-layout';

const HomePage = () => {
  const stats: any = [
    { label: 'Bio Links Created', value: '7M+', color: 'purple' },
    { label: 'Total Clicks', value: '100M+', color: 'blue' },
    { label: 'Countries Reached', value: '110+', color: 'green' },
    { label: 'Uptime', value: '99.9%', color: 'primary' },
  ];

  return (
    <SharedLayout
      decorativeElements={
        <DecorativeElementsOptimized
          variant='mixed'
          color='rainbow'
          density='low'
        />
      }
      className='relative flex min-h-screen flex-col'
    >
      {/* Hero Section */}
      <HeroSection />

      {/* Brands Section */}
      <BrandsSection />

      {/* Stats Section */}
      <Stats stats={stats} />

      {/* Features Section */}
      <FeaturesSection />

      {/* Product Showcase Section */}
      <ProductShowcaseSection />

      {/* Analytics Section */}
      <AnalyticsSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* CTA Section */}
    </SharedLayout>
  );
};

export default HomePage;
