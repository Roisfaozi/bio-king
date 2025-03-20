import ClientPart from '@/app/[lang]/home-client';
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
import { trackPageView } from '@/lib/tracking';
import { Metadata } from 'next';
import SharedLayout from './shared-layout';

export const metadata: Metadata = {
  title: 'Bio King - Create Your Perfect Bio Links',
  description:
    'Create beautiful bio links, QR codes, and branded short links with Bio King. Track clicks and understand your audience better.',
  openGraph: {
    title: 'Bio King - Create Your Perfect Bio Links',
    description:
      'Create beautiful bio links, QR codes, and branded short links with Bio King. Track clicks and understand your audience better.',
    type: 'website',
  },
};

export default async function HomePage() {
  // Tracking langsung di server component untuk SEO crawling
  await trackPageView({
    pageType: 'page',
  });

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
      {/* Client component bagian yang memerlukan interaktivitas */}
      <ClientPart />

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
}
