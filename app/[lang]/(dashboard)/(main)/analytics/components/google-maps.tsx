'use client';

import { Card, CardContent } from '@/components/ui/card';
import {
  GoogleMap,
  InfoWindow,
  Marker,
  useJsApiLoader,
} from '@react-google-maps/api';
import { Loader2 } from 'lucide-react';
import { useCallback, useEffect, useMemo, useState } from 'react';

interface GeolocationData {
  id: string;
  latitude: number | null;
  longitude: number | null;
  city: string | null;
  region: string | null;
  country: string | null;
  created_at: bigint | null;
}

interface MarkerInfo extends GeolocationData {
  formattedAddress?: string;
  googleCity?: string | undefined;
  googleCountry?: string | undefined;
}

interface GoogleMapsProps {
  geolocationData: GeolocationData[];
}

const containerStyle = {
  width: '100%',
  height: '400px',
  borderRadius: '0.375rem',
};

const defaultCenter = {
  lat: -6.2088, // Koordinat default (Jakarta)
  lng: 106.8456,
};

const GoogleMaps = ({ geolocationData }: GoogleMapsProps) => {
  // Filter data yang memiliki koordinat valid
  const validLocations = useMemo(
    () =>
      geolocationData.filter(
        (data) => data.latitude !== null && data.longitude !== null,
      ),
    [geolocationData],
  );

  // Setup untuk Google Maps API
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries: ['places'],
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [selectedMarker, setSelectedMarker] = useState<MarkerInfo | null>(null);
  const [enhancedLocations, setEnhancedLocations] = useState<MarkerInfo[]>([]);
  const [geocoder, setGeocoder] = useState<google.maps.Geocoder | null>(null);

  // Inisialisasi geocoder saat map dimuat
  useEffect(() => {
    if (isLoaded && !geocoder) {
      setGeocoder(new google.maps.Geocoder());
    }
  }, [isLoaded, geocoder]);

  // Fungsi untuk mendapatkan informasi lokasi dari koordinat
  const getLocationInfo = useCallback(
    async (location: GeolocationData): Promise<MarkerInfo> => {
      if (!geocoder || !location.latitude || !location.longitude) {
        return location as MarkerInfo;
      }

      try {
        const response = await geocoder.geocode({
          location: { lat: location.latitude, lng: location.longitude },
        });
        console.log('enhancedLocations', response);

        if (response.results && response.results.length > 0) {
          const result = response.results[0];
          let city = '';
          let country = '';

          // Ekstrak informasi dari hasil geocoding
          for (const component of result.address_components) {
            if (component.types.includes('locality')) {
              city = component.long_name;
            } else if (
              component.types.includes('administrative_area_level_1')
            ) {
              // Jika kota tidak ditemukan, gunakan area administratif level 1
              if (!city) city = component.long_name;
            } else if (component.types.includes('country')) {
              country = component.long_name;
            }
          }

          return {
            ...location,
            formattedAddress: result.formatted_address,
            googleCity: city || undefined,
            googleCountry: country || undefined,
          };
        }
      } catch (error) {
        console.error('Geocoding error:', error);
      }

      return location as MarkerInfo;
    },
    [geocoder],
  );

  // Dapatkan informasi lokasi untuk semua marker saat geocoder tersedia
  useEffect(() => {
    if (geocoder && validLocations.length > 0) {
      const fetchLocationInfo = async () => {
        const enhancedData = await Promise.all(
          validLocations.map((location) => getLocationInfo(location)),
        );
        setEnhancedLocations(enhancedData);
      };

      fetchLocationInfo();
    } else {
      setEnhancedLocations(validLocations as MarkerInfo[]);
    }
  }, [geocoder, validLocations, getLocationInfo]);

  const onLoad = (map: google.maps.Map) => {
    setMap(map);

    // Jika ada lokasi yang valid, sesuaikan peta untuk menampilkan semua marker
    if (validLocations.length > 0) {
      const bounds = new google.maps.LatLngBounds();

      validLocations.forEach((location) => {
        if (location.latitude && location.longitude) {
          bounds.extend(
            new google.maps.LatLng(location.latitude, location.longitude),
          );
        }
      });

      map.fitBounds(bounds);
    }
  };

  const onUnmount = () => {
    setMap(null);
  };

  return (
    <Card className='w-full'>
      <CardContent>
        {!isLoaded ? (
          <div className='flex h-[400px] items-center justify-center'>
            <Loader2 className='h-8 w-8 animate-spin text-primary' />
            <span className='ml-2'>Loading map...</span>
          </div>
        ) : validLocations.length === 0 ? (
          <div className='flex h-[400px] items-center justify-center'>
            <p className='text-muted-foreground'>
              No geolocation data available
            </p>
          </div>
        ) : (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={
              validLocations.length > 0 &&
              validLocations[0].latitude &&
              validLocations[0].longitude
                ? {
                    lat: validLocations[0].latitude,
                    lng: validLocations[0].longitude,
                  }
                : defaultCenter
            }
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={{
              mapTypeControl: true,
              streetViewControl: true,
              fullscreenControl: true,
            }}
          >
            {enhancedLocations.map(
              (location) =>
                location.latitude &&
                location.longitude && (
                  <Marker
                    key={location.id}
                    position={{
                      lat: location.latitude,
                      lng: location.longitude,
                    }}
                    onClick={() => {
                      setSelectedMarker(location);
                      console.log(location);
                    }}
                    title={
                      location.googleCity ||
                      location.city ||
                      location.country ||
                      'Unknown Location'
                    }
                  />
                ),
            )}

            {selectedMarker &&
              selectedMarker.latitude &&
              selectedMarker.longitude && (
                <InfoWindow
                  position={{
                    lat: selectedMarker.latitude,
                    lng: selectedMarker.longitude,
                  }}
                  onCloseClick={() => setSelectedMarker(null)}
                >
                  <div className='min-w-[200px] p-3'>
                    <h3 className='mb-1 text-base font-bold'>
                      {selectedMarker.googleCity ||
                        selectedMarker.city ||
                        'Unknown City'}
                      ,{' '}
                      {selectedMarker.googleCountry ||
                        selectedMarker.country ||
                        'Unknown Country'}
                    </h3>

                    {selectedMarker.formattedAddress && (
                      <p className='mb-1 text-sm'>
                        {selectedMarker.formattedAddress}
                      </p>
                    )}

                    {selectedMarker.region && (
                      <p className='mb-1 text-sm'>
                        Region: {selectedMarker.region}
                      </p>
                    )}

                    <p className='mt-2 text-sm text-gray-500'>
                      Recorded:{' '}
                      {selectedMarker.created_at
                        ? new Date(
                            Number(selectedMarker.created_at),
                          ).toLocaleString()
                        : 'Unknown date'}
                    </p>

                    <div className='mt-2 border-t border-gray-200 pt-2 text-xs'>
                      <p>Lat: {selectedMarker.latitude.toFixed(6)}</p>
                      <p>Lng: {selectedMarker.longitude.toFixed(6)}</p>
                    </div>
                  </div>
                </InfoWindow>
              )}
          </GoogleMap>
        )}
      </CardContent>
    </Card>
  );
};

export default GoogleMaps;
