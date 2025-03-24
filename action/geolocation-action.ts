import { api } from '@/config/axios.config';
import {
  GeolocationCreateData,
  GeolocationFilterParams,
  getGeolocationData as dbGetGeolocationData,
  saveGeolocationData as dbSaveGeolocationData,
} from '@/lib/db-transaction/geolocation';

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
