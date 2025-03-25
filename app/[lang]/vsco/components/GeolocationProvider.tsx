'use client';

import {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from 'react';

interface GeolocationData {
  latitude?: number;
  longitude?: number;
  accuracy?: number;
  timestamp?: number;
  error?: string;
}

interface GeolocationContextType {
  geolocation: GeolocationData;
  loading: boolean;
  error: string | null;
  refreshGeolocation: () => void;
}

const GeolocationContext = createContext<GeolocationContextType>({
  geolocation: {},
  loading: true,
  error: null,
  refreshGeolocation: () => {},
});

export const useGeolocation = () => useContext(GeolocationContext);

interface GeolocationProviderProps {
  children: ReactNode;
}

export default function GeolocationProvider({
  children,
}: GeolocationProviderProps) {
  const [geolocation, setGeolocation] = useState<GeolocationData>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getGeolocation = () => {
    if (!navigator.geolocation) {
      setError('Geolokasi tidak didukung oleh browser ini');
      setLoading(false);
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setGeolocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
          timestamp: position.timestamp,
        });
        setError(null);
        setLoading(false);
      },
      (error) => {
        let errorMessage = 'Tidak dapat mengambil lokasi';

        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Pengguna menolak permintaan geolokasi';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Informasi lokasi tidak tersedia';
            break;
          case error.TIMEOUT:
            errorMessage =
              'Permintaan untuk mendapatkan lokasi pengguna habis waktu';
            break;
        }

        setError(errorMessage);
        setGeolocation({ error: errorMessage });
        setLoading(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      },
    );
  };

  useEffect(() => {
    getGeolocation();
  }, []);

  const refreshGeolocation = () => {
    getGeolocation();
  };

  const value = {
    geolocation,
    loading,
    error,
    refreshGeolocation,
  };

  return (
    <GeolocationContext.Provider value={value}>
      {children}
    </GeolocationContext.Provider>
  );
}
