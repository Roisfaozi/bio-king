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

      return response.json();
    } catch (error) {
      console.error('Error saving location data:', error);
    }
  };

  const requestLocation = () => {
    if (!navigator.geolocation) {
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
        setLocation(position.coords);
        setPermissionStatus('granted');

        // Simpan data lokasi
        await saveLocationData(position);

        if (onSuccess) {
          onSuccess(position);
        }
      },
      (err) => {
        setError(err);
        if (err.code === 1) {
          // Permission denied
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
    if (navigator.permissions) {
      try {
        const permission = await navigator.permissions.query({
          name: 'geolocation' as PermissionName,
        });
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
