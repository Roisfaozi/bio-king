import { api } from '@/config/axios.config';
import {
  GeolocationCreateData,
  GeolocationFilterParams,
  getGeolocationData as dbGetGeolocationData,
  saveGeolocationData as dbSaveGeolocationData,
} from '@/lib/db-transaction/geolocation';
import prisma from '@/lib/prisma';
import { GeolocationResponse } from '@/types/geolocation';

export interface GeolocationData {
  latitude: number;
  longitude: number;
  accuracy: number;
  session_id?: string;
  visitor_id?: string;
  consent_given?: boolean;
}

/**
 * Mengirim data geolokasi ke server
 *
 * Untuk client components, gunakan ini
 * Untuk server components, gunakan langsung fungsi dari lib/db-transaction/geolocation.ts
 */
export const sendGeolocationData = async (data: GeolocationCreateData) => {
  try {
    if (typeof window !== 'undefined') {
      // Client-side - gunakan API
      const response = await api.post('/geolocation', data);
      return response.data;
    } else {
      // Server-side - gunakan database transaction
      return await dbSaveGeolocationData(data);
    }
  } catch (error) {
    console.error('Error mengirim data geolokasi:', error);
    return { success: false };
  }
};

/**
 * Mendapatkan data geolokasi dari server
 *
 * Untuk client components, gunakan ini
 * Untuk server components, gunakan langsung fungsi dari lib/db-transaction/geolocation.ts
 */
export const getGeolocationData = async (params: GeolocationFilterParams) => {
  try {
    if (typeof window !== 'undefined') {
      // Client-side - gunakan API
      const response = await api.get('/dashboard/geolocation', { params });
      return response.data;
    } else {
      // Server-side - gunakan database transaction
      return await dbGetGeolocationData(params);
    }
  } catch (error) {
    console.error('Error mendapatkan data geolokasi:', error);
    throw error;
  }
};

/**
 * Server action untuk mengambil data geolokasi
 */
export async function getGeolocationData(): Promise<GeolocationResponse> {
  try {
    const [countries, cities, recent, total] = await Promise.all([
      // Get top countries
      prisma.geolocation.groupBy({
        by: ['country'],
        _count: {
          country: true,
        },
        orderBy: {
          _count: {
            country: 'desc',
          },
        },
        take: 10,
      }),

      // Get top cities
      prisma.geolocation.groupBy({
        by: ['city'],
        _count: {
          city: true,
        },
        orderBy: {
          _count: {
            city: 'desc',
          },
        },
        take: 10,
      }),

      // Get recent entries
      prisma.geolocation.findMany({
        orderBy: {
          createdAt: 'desc',
        },
        take: 10,
      }),

      // Get total count
      prisma.geolocation.count(),
    ]);

    return {
      status: 'success',
      data: {
        total,
        countries,
        cities,
        recent,
      },
    };
  } catch (error) {
    console.error('Error fetching geolocation data:', error);
    return {
      status: 'error',
      data: {
        total: 0,
        countries: [],
        cities: [],
        recent: [],
      },
    };
  }
}
