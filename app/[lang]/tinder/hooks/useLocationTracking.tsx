import { useEffect, useState } from 'react';

interface UseLocationTrackingOptions {
  onSuccess?: (position: GeolocationPosition) => void;
  onError?: (error: GeolocationPositionError) => void;
  onPermissionDenied?: () => void;
}

function useLocationTracking({
  onSuccess,
  onError,
  onPermissionDenied,
}: UseLocationTrackingOptions = {}) {
  const [location, setLocation] = useState<GeolocationCoordinates | null>(null);
  const [error, setError] = useState<GeolocationPositionError | null>(null);
  const [permissionStatus, setPermissionStatus] = useState<
    'granted' | 'denied' | 'prompt' | 'unknown'
  >('unknown');

  const saveLocationData = async (position: GeolocationPosition) => {
    console.log('Attempting to save location data...');
    try {
      const response = await fetch('/api/geolocation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          consent_given: true,
        }),
      });

      console.log('Location data saved successfully');
      return response.json();
    } catch (error) {
      console.error('Error saving location data:', error);
    }
  };

  const requestLocation = () => {
    console.log('Requesting location access...');
    if (!navigator.geolocation) {
      console.error('Geolocation is not supported');
      setError({
        code: 2,
        message: 'Geolocation is not supported by this browser.',
        PERMISSION_DENIED: 1,
        POSITION_UNAVAILABLE: 2,
        TIMEOUT: 3,
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        console.log('Location access granted:', position.coords);
        setLocation(position.coords);
        setPermissionStatus('granted');

        console.log('Saving location data...');
        await saveLocationData(position);

        if (onSuccess) {
          console.log('Executing onSuccess callback');
          onSuccess(position);
        }
      },
      (err) => {
        console.error('Location access error:', err);
        setError(err);
        if (err.code === 1) {
          console.log('Location permission denied');
          setPermissionStatus('denied');
          if (onPermissionDenied) {
            onPermissionDenied();
          }
        } else {
          if (onError) {
            onError(err);
          }
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      },
    );
  };

  const checkPermission = async () => {
    console.log('Checking geolocation permission...');
    if (navigator.permissions) {
      try {
        const permission = await navigator.permissions.query({
          name: 'geolocation' as PermissionName,
        });
        console.log('Permission status:', permission.state);
        setPermissionStatus(permission.state as any);
      } catch (error) {
        console.error('Error checking permission:', error);
      }
    }
  };

  useEffect(() => {
    checkPermission();
  }, []);

  return {
    location,
    error,
    permissionStatus,
    requestLocation,
    checkPermission,
  };
}

export default useLocationTracking;
