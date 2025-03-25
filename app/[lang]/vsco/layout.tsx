import Footer from '@/app/[lang]/vsco/components/footer';
import Navbar from '@/app/[lang]/vsco/components/navbar';
import type { Metadata } from 'next';
import React from 'react';
import './styles.css';
import GeolocationProvider from './components/GeolocationProvider';
import ShortcodeProvider from './components/ShortcodeProvider';

export const metadata: Metadata = {
  title: 'VSCO - Photography & Video Editing App',
  description:
    "Join VSCO's creative community to make, edit, and share your images and videos.",
  icons: {
    icon: '/vsco-favicon.ico',
  },
  openGraph: {
    title: 'VSCO: Photo & Video Editor',
    description:
      'Capture, edit, and share photos and videos that express your style',
    type: 'website',
  },
};

export default function VSCOLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GeolocationProvider>
      <ShortcodeProvider>
        <div className={`min-h-screen overflow-x-hidden`}>
          <div className='flex min-h-screen flex-col'>
            {/* Mobile Header - visible on small screens */}
            <Navbar />

            <div className='flex flex-1 flex-col md:flex-row'>
              {/* Sidebar - hidden on mobile, shown on desktop */}

              {/* Main Content */}
              <main className='w-full flex-1 bg-[#111]'>{children}</main>
            </div>

            {/* Footer is included in each page where needed */}
            <Footer />
          </div>
        </div>
      </ShortcodeProvider>
    </GeolocationProvider>
  );
}
