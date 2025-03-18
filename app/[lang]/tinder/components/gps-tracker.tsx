'use client';

import { Button } from '@/components/ui/button';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertCircle, Loader2, MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Location {
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: number;
}

export default function GPSTracker() {
  const [location, setLocation] = useState<Location | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [permissionStatus, setPermissionStatus] =
    useState<PermissionState | null>(null);
  const [isTracking, setIsTracking] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  // Check if geolocation is available
  const isGeolocationAvailable =
    typeof navigator !== 'undefined' && 'geolocation' in navigator;

  // Function to get current location
  const getCurrentLocation = () => {
    if (!isGeolocationAvailable) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: position.timestamp,
        });
        setLoading(false);
        setIsTracking(true);
      },
      (error) => {
        setLoading(false);
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setError('You denied the request for geolocation');
            break;
          case error.POSITION_UNAVAILABLE:
            setError('Location information is unavailable');
            break;
          case error.TIMEOUT:
            setError('The request to get your location timed out');
            break;
          default:
            setError('An unknown error occurred');
            break;
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    );
  };

  // Check permission status
  useEffect(() => {
    if (navigator.permissions && navigator.permissions.query) {
      navigator.permissions
        .query({ name: 'geolocation' as PermissionName })
        .then((result) => {
          setPermissionStatus(result.state);
          result.onchange = () => {
            setPermissionStatus(result.state);
          };
        })
        .catch(() => {
          // Fallback if permissions API is not supported
          setPermissionStatus(null);
        });
    }
  }, []);

  // Start tracking when component mounts if permission is already granted
  useEffect(() => {
    if (permissionStatus === 'granted') {
      getCurrentLocation();
    }
  }, [permissionStatus]);

  // Format coordinates to be more readable
  const formatCoordinate = (coord: number) => {
    return coord.toFixed(6);
  };

  // Format timestamp to readable date
  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  return (
    <div className='rounded-lg bg-gray-800 p-4 shadow-lg'>
      <div className='mb-4 flex items-center justify-between'>
        <div className='flex items-center'>
          <MapPin className='mr-2 text-pink-500' size={20} />
          <h3 className='font-semibold text-white'>Location Services</h3>
        </div>
        <Button
          variant='outline'
          size='sm'
          className='border-gray-600 text-xs text-gray-300 hover:bg-gray-700'
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? 'Hide Details' : 'Show Details'}
        </Button>
      </div>

      {!isGeolocationAvailable && (
        <div className='mb-3 flex items-start rounded-md bg-red-900/50 p-3'>
          <AlertCircle
            className='mr-2 mt-0.5 flex-shrink-0 text-red-400'
            size={16}
          />
          <p className='text-sm text-red-200'>
            Geolocation is not supported by your browser. Please try using a
            different browser.
          </p>
        </div>
      )}

      {error && (
        <div className='mb-3 flex items-start rounded-md bg-red-900/50 p-3'>
          <AlertCircle
            className='mr-2 mt-0.5 flex-shrink-0 text-red-400'
            size={16}
          />
          <p className='text-sm text-red-200'>{error}</p>
        </div>
      )}

      <AnimatePresence>
        {showDetails && location && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className='overflow-hidden'
          >
            <div className='mb-3 rounded-md bg-gray-700/50 p-3'>
              <div className='grid grid-cols-2 gap-2 text-sm'>
                <div className='text-gray-400'>Latitude:</div>
                <div className='font-mono text-white'>
                  {formatCoordinate(location.latitude)}
                </div>
                <div className='text-gray-400'>Longitude:</div>
                <div className='font-mono text-white'>
                  {formatCoordinate(location.longitude)}
                </div>
                <div className='text-gray-400'>Accuracy:</div>
                <div className='font-mono text-white'>
                  {Math.round(location.accuracy)} meters
                </div>
                <div className='text-gray-400'>Last Updated:</div>
                <div className='font-mono text-white'>
                  {formatTimestamp(location.timestamp)}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className='flex items-center justify-between'>
        <div className='flex-1'>
          {isTracking && location ? (
            <div className='flex items-center'>
              <div className='relative mr-2'>
                <div className='h-3 w-3 rounded-full bg-green-500'></div>
                <div className='absolute inset-0 h-3 w-3 animate-ping rounded-full bg-green-500 opacity-75'></div>
              </div>
              <p className='text-sm text-green-400'>
                Location active{' '}
                <span className='text-gray-400'>
                  ({formatCoordinate(location.latitude)},{' '}
                  {formatCoordinate(location.longitude)})
                </span>
              </p>
            </div>
          ) : (
            <p className='text-sm text-gray-400'>
              {permissionStatus === 'denied'
                ? 'Location access denied'
                : 'Enable location to see nearby matches'}
            </p>
          )}
        </div>

        <Button
          size='sm'
          color={isTracking ? 'destructive' : 'default'}
          className={
            isTracking
              ? 'bg-red-600 hover:bg-red-700'
              : 'bg-pink-600 hover:bg-pink-700'
          }
          onClick={() => {
            if (isTracking) {
              setIsTracking(false);
              setLocation(null);
            } else {
              getCurrentLocation();
            }
          }}
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              Locating...
            </>
          ) : isTracking ? (
            'Stop Tracking'
          ) : (
            'Enable Location'
          )}
        </Button>
      </div>

      <div className='mt-3 text-xs text-gray-500'>
        <p>
          Your location is only shared while you're actively using the app. We
          use your location to show you potential matches nearby.
        </p>
      </div>
    </div>
  );
}
