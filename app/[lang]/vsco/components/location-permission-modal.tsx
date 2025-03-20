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
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-2 backdrop-blur-sm sm:p-4'>
      <div className='relative w-full max-w-md rounded-xl border border-gray-800 bg-black p-4 shadow-2xl sm:p-8'>
        <button
          onClick={onClose}
          className='absolute right-4 top-4 text-gray-400 hover:text-white sm:right-6 sm:top-6'
        >
          <X size={20} className='sm:size-24' />
        </button>

        <div className='text-center'>
          <div className='mb-4 flex justify-center sm:mb-6'>
            <div className='flex h-16 w-16 items-center justify-center rounded-full bg-gray-800 sm:h-20 sm:w-20'>
              <MapPin size={32} className='sm:size-40 text-white' />
            </div>
          </div>

          <h2 className='mb-2 text-lg font-semibold text-white sm:text-xl'>
            Location access required
          </h2>
          <p className='mb-4 text-sm text-gray-400 sm:mb-6 sm:text-base'>
            VSCO needs access to your location to show you relevant content and
            connect you with nearby creators.
          </p>

          {error ? (
            <div className='mb-4 rounded-lg border border-red-800/50 bg-red-900/30 p-3 text-xs text-red-300 sm:mb-6 sm:p-4 sm:text-sm'>
              <p className='mb-3 sm:mb-4'>{error}</p>
              <button
                onClick={handleRequestLocation}
                className='rounded-lg bg-white px-3 py-1.5 text-sm font-medium text-black transition-colors hover:bg-gray-200 sm:px-4 sm:py-2'
              >
                Try Again
              </button>
            </div>
          ) : isLoading ? (
            <div className='flex flex-col items-center justify-center p-4 sm:p-6'>
              <Loader2
                size={30}
                className='sm:size-36 mb-3 animate-spin text-white sm:mb-4'
              />
              <p className='text-sm text-gray-400 sm:text-base'>
                Getting your location...
              </p>
            </div>
          ) : (
            <div className='flex flex-col gap-2 sm:gap-3'>
              <button
                onClick={handleRequestLocation}
                className='w-full rounded-lg bg-white py-2 text-sm font-medium text-black transition-colors hover:bg-gray-200 sm:py-3 sm:text-base'
                disabled={isLoading}
              >
                Allow Location Access
              </button>
              <button
                onClick={onClose}
                className='w-full rounded-lg border border-gray-600 bg-transparent py-2 text-sm font-medium text-white transition-colors hover:bg-gray-800 sm:py-3 sm:text-base'
              >
                Not Now
              </button>
            </div>
          )}

          <p className='mt-4 text-xs text-gray-500 sm:mt-6'>
            Your location data helps us personalize your VSCO experience. You
            can change your location settings at any time.
          </p>
        </div>
      </div>
    </div>
  );
}
