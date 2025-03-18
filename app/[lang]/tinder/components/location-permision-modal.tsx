'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { motion } from 'framer-motion';
import { AlertCircle, Loader2, MapPin } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';

interface LocationPermissionModalProps {
  isOpen: boolean;
  onAllow: () => void;
}

export default function LocationPermissionModal({
  isOpen,
  onAllow,
}: LocationPermissionModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [permissionState, setPermissionState] =
    useState<PermissionState | null>(null);

  // Function to get current position with better error handling
  const handleGetCurrentPosition = useCallback(() => {
    if (!navigator.geolocation) {
      setError(
        "Your browser doesn't support geolocation. Please try using a different browser.",
      );
      return Promise.reject(new Error('Geolocation not supported'));
    }

    setIsLoading(true);
    setError(null);

    return new Promise<GeolocationPosition>((resolve, reject) => {
      try {
        const successCallback = (position: GeolocationPosition) => {
          console.log('Successfully got position:', position);
          setIsLoading(false);
          resolve(position);
        };

        const errorCallback = (error: GeolocationPositionError) => {
          console.error('Geolocation error:', error);
          setIsLoading(false);

          // Set appropriate error message
          let errorMessage = 'Something went wrong with location tracking.';
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage =
                'Location access is required. Please enable location in your browser settings and try again.';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage =
                "We couldn't access your location. Please check your device settings and try again.";
              break;
            case error.TIMEOUT:
              errorMessage =
                'Location request timed out. Please check your connection and try again.';
              break;
          }

          setError(errorMessage);
          setRetryCount((prev) => prev + 1);
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
        setIsLoading(false);
        setError(
          'An unexpected error occurred while trying to get your location.',
        );
        reject(err);
      }
    });
  }, []);

  // Check current permission state when modal opens
  useEffect(() => {
    if (!isOpen) return;

    const checkPermission = async () => {
      try {
        if (navigator.permissions && navigator.permissions.query) {
          const result = await navigator.permissions.query({
            name: 'geolocation' as PermissionName,
          });
          console.log('Permission state:', result.state);
          setPermissionState(result.state);

          // If permission is already granted, try to get location
          if (result.state === 'granted') {
            try {
              await handleGetCurrentPosition();
              onAllow();
            } catch (err) {
              console.error(
                'Error getting position even with permission granted:',
                err,
              );
              // Keep modal open to show error
            }
          }

          // Listen for permission changes
          result.onchange = () => {
            console.log('Permission state changed to:', result.state);
            setPermissionState(result.state);

            if (result.state === 'granted') {
              handleGetCurrentPosition()
                .then(() => {
                  onAllow();
                })
                .catch((err) => {
                  console.error('Error after permission change:', err);
                });
            }
          };
        }
      } catch (err) {
        console.error('Error checking permission:', err);
      }
    };

    checkPermission();
  }, [isOpen, handleGetCurrentPosition, onAllow]);

  const handleAllow = async () => {
    try {
      await handleGetCurrentPosition();
      onAllow();
    } catch (err) {
      console.error('Error in handleAllow:', err);
      // Error is already set by handleGetCurrentPosition
    }
  };

  // Function to open browser settings (only works on some browsers/devices)
  const openLocationSettings = () => {
    if (navigator.permissions && navigator.permissions.query) {
      navigator.permissions
        .query({ name: 'geolocation' as PermissionName })
        .then((result) => {
          if (result.state === 'denied') {
            // Try to direct user to settings if possible
            if ('openSettings' in navigator) {
              // @ts-ignore - This is a non-standard API
              navigator.openSettings && navigator.openSettings();
            } else {
              // Fallback for browsers that don't support openSettings
              setError(
                'Please enable location access in your browser settings manually.',
              );
            }
          }
        })
        .catch((err) => {
          console.error('Error querying permissions:', err);
        });
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        /* Prevent closing */
      }}
    >
      <DialogContent
        className='w-full max-w-[400px] rounded-xl border-none bg-[#1a1a1a] p-6'
        onPointerDownOutside={(e) => e.preventDefault()} // Prevent closing on outside click
        onEscapeKeyDown={(e) => e.preventDefault()} // Prevent closing on Escape key
      >
        <div className='flex flex-col items-center'>
          {/* Location icon with circle */}
          <div className='mb-6 flex h-24 w-24 items-center justify-center rounded-full border border-gray-600'>
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <MapPin className='h-10 w-10 text-gray-400' />
            </motion.div>
          </div>

          {/* Title */}
          <h2 className='mb-2 text-xl font-semibold text-white'>
            So, are you from around here?
          </h2>

          {/* Description */}
          <p className='mb-6 text-center text-sm text-gray-400'>
            Set your location to see who's in your neighborhood or beyond. You
            won't be able to match with people otherwise.
          </p>

          {/* Error message if any */}
          {error && (
            <div className='mb-4 w-full rounded-md bg-red-900/30 p-3'>
              <div className='flex items-start'>
                <AlertCircle
                  className='mr-2 mt-0.5 flex-shrink-0 text-red-400'
                  size={16}
                />
                <p className='text-sm text-red-300'>{error}</p>
              </div>
            </div>
          )}

          {/* Allow button */}
          <Button
            className='w-full rounded-full bg-gradient-to-r from-pink-500 to-rose-500 py-6 text-base font-semibold text-white hover:from-pink-600 hover:to-rose-600'
            onClick={handleAllow}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className='flex items-center'>
                <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                Locating...
              </span>
            ) : retryCount > 0 ? (
              'Try Again'
            ) : (
              'Allow'
            )}
          </Button>

          {/* Additional message for retry */}
          {retryCount > 0 && (
            <div className='mt-4 flex flex-col items-center'>
              <p className='mb-2 text-center text-xs text-red-300'>
                Location access is required to use Tinder. Please enable
                location in your browser settings.
              </p>
              <Button
                variant='outline'
                size='sm'
                className='border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white'
                onClick={openLocationSettings}
              >
                Open Settings
              </Button>
            </div>
          )}

          {/* Learn more link */}
          <button
            className='mt-4 text-sm text-white hover:underline'
            onClick={() =>
              window.open('https://policies.tinder.com/privacy', '_blank')
            }
          >
            Learn more
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
