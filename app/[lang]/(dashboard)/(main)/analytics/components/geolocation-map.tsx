'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import GoogleMaps from './google-maps';

interface GeolocationData {
  id: string;
  latitude: number | null;
  longitude: number | null;
  city: string | null;
  region: string | null;
  country: string | null;
  created_at: bigint | null;
}

const GeolocationMap = () => {
  const [geolocationData, setGeolocationData] = useState<GeolocationData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGeolocationData = async () => {
      try {
        const response = await fetch('/api/geolocation');
        const result = await response.json();

        if (result.status === 'success') {
          setGeolocationData(result.data);
        } else {
          setError(result.message || 'Failed to fetch geolocation data');
        }
      } catch (err) {
        setError('An error occurred while fetching geolocation data');
        console.error('Error fetching geolocation data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGeolocationData();
  }, []);

  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle>Geolocation Data</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className='flex h-[400px] items-center justify-center'>
            <Loader2 className='h-8 w-8 animate-spin text-primary' />
            <span className='ml-2'>Loading geolocation data...</span>
          </div>
        ) : error ? (
          <div className='flex h-[400px] items-center justify-center'>
            <p className='text-destructive'>{error}</p>
          </div>
        ) : geolocationData.length === 0 ? (
          <div className='flex h-[400px] items-center justify-center'>
            <p className='text-muted-foreground'>
              No geolocation data available
            </p>
          </div>
        ) : (
          <GoogleMaps geolocationData={geolocationData} />
        )}
      </CardContent>
    </Card>
  );
};

export default GeolocationMap;
