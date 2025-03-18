'use client';

import { Button } from '@/components/ui/button';
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from 'framer-motion';
import {
  Facebook,
  Instagram,
  TwitterIcon as TikTok,
  Twitter,
  Youtube,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import GPSTracker from './components/gps-tracker';
import LoadingScreen from './components/loading-screen';
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

export default function Home() {
  const [showCookieBanner, setShowCookieBanner] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const navbarRef = useRef<HTMLElement>(null);
  const testimonialsRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();

  const titleOpacity = useTransform(scrollY, [0, 200, 400], [1, 0.5, 0]);
  const buttonOpacity = useTransform(scrollY, [0, 300, 500], [1, 0.3, 0]);

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
    }, 2000);

    return () => {
      window.removeEventListener('resize', checkMobile);
      clearTimeout(timer);
    };
  }, []);

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
      <div className='fixed inset-0 z-0'>
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
      <header ref={navbarRef} className='navbar static z-[9999] w-full'>
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
                  className='text-base text-white transition hover:text-white/80'
                >
                  Products
                </Link>
                <Link
                  href='#'
                  className='text-base text-white transition hover:text-white/80'
                >
                  Learn
                </Link>
                <Link
                  href='#'
                  className='text-base text-white transition hover:text-white/80'
                >
                  Safety
                </Link>
                <Link
                  href='#'
                  className='text-base text-white transition hover:text-white/80'
                >
                  Support
                </Link>
                <Link
                  href='#'
                  className='text-base text-white transition hover:text-white/80'
                >
                  Download
                </Link>
                <Link
                  href='#'
                  className='text-base text-white transition hover:text-white/80'
                >
                  Gift Cards
                </Link>
              </nav>
            </div>
            <div className='flex items-center space-x-4'>
              <button className='hidden items-center text-base text-white transition hover:text-white/80 md:flex'>
                <span className='mr-1'>🌐</span>
                Language
              </button>
              <Button
                className='rounded-full bg-white px-6 text-base font-medium text-black hover:bg-white/90'
                onClick={() => setShowLoginModal(true)}
              >
                Log in
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content with scroll animations */}
      <main className='relative z-20 flex min-h-[70vh] flex-col items-center justify-center px-4 text-center'>
        <div className='mx-auto max-w-4xl'>
          <motion.h1
            style={{ opacity: titleOpacity }}
            className='mb-8 text-5xl font-bold text-white md:text-7xl lg:text-8xl'
          >
            Swipe Right<sup className='text-2xl md:text-3xl'>®</sup>
          </motion.h1>
          <motion.div style={{ opacity: buttonOpacity }}>
            <Button className='rounded-full bg-gradient-to-r from-pink-500 to-rose-500 px-8 py-6 text-lg font-semibold text-white hover:from-pink-600 hover:to-rose-600'>
              Create account
            </Button>
          </motion.div>
        </div>
      </main>

      {/* GPS Tracker Section */}
      <section className='relative z-20 px-4 py-16'>
        <div className='mx-auto max-w-3xl'>
          <h2 className='mb-8 text-center text-3xl font-bold text-white'>
            Find Matches Nearby
          </h2>
          <p className='mb-8 text-center text-white/80'>
            Enable location services to discover potential matches in your area.
            Our new GPS tracking feature helps you connect with people nearby.
          </p>
          <GPSTracker />
        </div>
      </section>

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
              <p className='mb-4 text-sm text-gray-700 md:mb-0 md:mr-4'>
                We value your privacy. We and our partners use trackers to
                measure the audience of our website and to provide you with
                offers and improve our own Tinder marketing operations.
                <Link href='#' className='ml-1 font-medium underline'>
                  More info on cookies and providers we use
                </Link>
                . You can withdraw your consent at any time in your settings.
              </p>
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
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </div>
  );
}
