import Footer from '@/app/[lang]/vsco/components/footer';
import Navbar from '@/app/[lang]/vsco/components/navbar';
import type { Metadata } from 'next';
import React from 'react';
import './styles.css';

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
    <div className='min-h-screen w-full flex-col text-white'>
      <Navbar />

      <div className='flex w-full flex-grow items-start justify-start pt-0 md:w-screen md:items-center md:justify-center'>
        {children}
      </div>

      <Footer />
    </div>
  );
}
