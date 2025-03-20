'use client';

import Header from '@/components/landing-page/header';
import {
  CTAWithBackgroundSection,
  FooterSection,
} from '@/components/landing-page/sections';
import { ReactNode } from 'react';

type SharedLayoutProps = {
  children: ReactNode;
  decorativeElements?: ReactNode;
  backgroundElements?: ReactNode;
  className?: string;
  includeCTA?: boolean;
};

export default function SharedLayout({
  children,
  decorativeElements,
  backgroundElements,
  className = 'flex min-h-screen flex-col bg-gradient-to-b from-background to-background/60',
  includeCTA = true,
}: SharedLayoutProps) {
  return (
    <div className={`relative ${className}`}>
      {decorativeElements}
      <Header />
      <main className='flex-1'>{children}</main>
      {backgroundElements}
      {includeCTA && <CTAWithBackgroundSection />}

      <FooterSection />
    </div>
  );
}
