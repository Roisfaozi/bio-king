import { trackPageView } from '@/lib/tracking';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tinder - Dating App | Bio King',
  description:
    'Discover Tinder-like experience with Bio King. Connect with people near you, build meaningful relationships, and enhance your online presence.',
  openGraph: {
    title: 'Tinder - Dating App | Bio King',
    description:
      'Discover Tinder-like experience with Bio King. Connect with people near you, build meaningful relationships, and enhance your online presence.',
    type: 'website',
    images: ['/images/tinder-preview.jpg'],
  },
};

export default async function TinderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Server-side tracking untuk SEO
  await trackPageView({
    pageType: 'tinder',
  });

  return <>{children}</>;
}
