'use client';
import Header from '@/components/landing-page/header';
import { DecorativeElementsOptimized } from '@/components/landing-page/partials/decorative-elements-optimized';
import { OptimizedBackground } from '@/components/landing-page/partials/optimized-background';
import {
  AnalyticsSection,
  BrandsSection,
  CTAWithBackgroundSection,
  FeaturesSection,
  FooterSection,
  HeroSection,
  ProductShowcaseSection,
  TestimonialsSection,
} from '@/components/landing-page/sections';
import Stats from '@/components/landing-page/stats';
import { useTheme } from 'next-themes';

const HomePage = () => {
  const { theme } = useTheme();

  const stats: any = [
    { label: 'Bio Links Created', value: '7M+', color: 'purple' },
    { label: 'Total Clicks', value: '100M+', color: 'blue' },
    { label: 'Countries Reached', value: '110+', color: 'green' },
    { label: 'Uptime', value: '99.9%', color: 'primary' },
  ];

  return (
    <div className='relative flex min-h-screen flex-col'>
      {/* Decorative Elements */}
      <DecorativeElementsOptimized
        variant='mixed'
        color='rainbow'
        density='low'
      />
      <Header />

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

      <OptimizedBackground
        variant='particles'
        color='purple'
        intensity='light'
        speed='slow'
        className='!w-full'
      />

      {/* Analytics Section */}
      <AnalyticsSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* CTA Section */}
      <CTAWithBackgroundSection />

      {/* Footer */}
      <FooterSection />
    </div>
  );
};

export default HomePage;
