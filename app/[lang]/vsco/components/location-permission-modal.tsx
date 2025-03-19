'use client';

import { Loader2, MapPin, X } from 'lucide-react';
import { useEffect, useState } from 'react';

interface LocationPermissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPermissionGranted: (
    latitude: number,
    longitude: number,
    accuracy: number,
  ) => void;
}

export default function LocationPermissionModal({
  isOpen,
  onClose,
  onPermissionGranted,
}: LocationPermissionModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRequestLocation = () => {
    setIsLoading(true);
    setError(null);

    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      setIsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords;
        setIsLoading(false);
        onPermissionGranted(latitude, longitude, accuracy);
      },
      (err) => {
        setIsLoading(false);
        switch (err.code) {
          case err.PERMISSION_DENIED:
            setError(
              'Location access was denied. Please enable location access to continue.',
            );
            break;
          case err.POSITION_UNAVAILABLE:
            setError('Location information is unavailable.');
            break;
          case err.TIMEOUT:
            setError('The request to get your location timed out.');
            break;
          default:
            setError('An unknown error occurred.');
            break;
        }
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 },
    );
  };

  // Request location automatically when modal opens
  useEffect(() => {
    if (isOpen) {
      handleRequestLocation();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm'>
      <div className='relative w-full max-w-md rounded-xl border border-gray-800 bg-black p-8 shadow-2xl'>
        <button
          onClick={onClose}
          className='absolute right-6 top-6 text-gray-400 hover:text-white'
        >
          <X size={24} />
        </button>

        <div className='text-center'>
          <div className='mb-6 flex justify-center'>
            <div className='flex h-20 w-20 items-center justify-center rounded-full bg-gray-800'>
              <MapPin size={40} className='text-white' />
            </div>
          </div>

          <h2 className='mb-2 text-xl font-semibold text-white'>
            Location access required
          </h2>
          <p className='mb-6 text-gray-400'>
            VSCO needs access to your location to show you relevant content and
            connect you with nearby creators.
          </p>

          {error ? (
            <div className='mb-6 rounded-lg border border-red-800/50 bg-red-900/30 p-4 text-sm text-red-300'>
              <p className='mb-4'>{error}</p>
              <button
                onClick={handleRequestLocation}
                className='rounded-lg bg-white px-4 py-2 font-medium text-black transition-colors hover:bg-gray-200'
              >
                Try Again
              </button>
            </div>
          ) : isLoading ? (
            <div className='flex flex-col items-center justify-center p-6'>
              <Loader2 size={36} className='mb-4 animate-spin text-white' />
              <p className='text-gray-400'>Getting your location...</p>
            </div>
          ) : (
            <div className='flex flex-col gap-3'>
              <button
                onClick={handleRequestLocation}
                className='w-full rounded-lg bg-white py-3 font-medium text-black transition-colors hover:bg-gray-200'
                disabled={isLoading}
              >
                Allow Location Access
              </button>
              <button
                onClick={onClose}
                className='w-full rounded-lg border border-gray-600 bg-transparent py-3 font-medium text-white transition-colors hover:bg-gray-800'
              >
                Not Now
              </button>
            </div>
          )}

          <p className='mt-6 text-xs text-gray-500'>
            Your location data helps us personalize your VSCO experience. You
            can change your location settings at any time.
          </p>
        </div>
      </div>
    </div>
  );
}
