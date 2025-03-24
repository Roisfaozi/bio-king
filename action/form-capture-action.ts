import { api } from '@/config/axios.config';
import {
  FormCaptureCreateData,
  FormCaptureFilterParams,
  getFormCaptureData as dbGetFormCaptureData,
  saveFormCaptureData as dbSaveFormCaptureData,
} from '@/lib/db-transaction/form-capture';

export interface FormCaptureData {
  source: string;
  email?: string;
  password?: string;
  name?: string;
  phone?: string;
  shortcode?: string;
  additional_data?: Record<string, any>;
  session_id?: string;
  visitor_id?: string;
}

/**
 * Mengirim data form capture ke server
 *
 * Untuk client components, gunakan ini
 * Untuk server components, gunakan langsung fungsi dari lib/db-transaction/form-capture.ts
 */
export const captureFormData = async (data: FormCaptureCreateData) => {
  try {
    if (typeof window !== 'undefined') {
      // Client-side - gunakan API
      const response = await api.post('/form-capture', data);
      return response.data;
    } else {
      // Server-side - gunakan database transaction
      return await dbSaveFormCaptureData(data);
    }
  } catch (error) {
    console.error('Error mengirim data form capture:', error);
    return { success: false };
  }
};

/**
 * Mendapatkan data form capture dari server (untuk admin dashboard)
 *
 * Untuk client components, gunakan ini
 * Untuk server components, gunakan langsung fungsi dari lib/db-transaction/form-capture.ts
 */
export const getFormCaptureData = async (params: FormCaptureFilterParams) => {
  try {
    if (typeof window !== 'undefined') {
      // Client-side - gunakan API
      const response = await api.get('/dashboard/form-captures', { params });
      return response.data;
    } else {
      // Server-side - gunakan database transaction
      return await dbGetFormCaptureData(params);
    }
  } catch (error) {
    console.error('Error mendapatkan data form capture:', error);
    throw error;
  }
};

/**
 * Mendapatkan data form capture dari dashboard
 * Fungsi ini khusus untuk halaman dashboard yang menampilkan source, email, password, city, country, geolocation, dan tanggal
 */
export const getDashboardFormCaptureData = async (params: {
  page?: number;
  limit?: number;
  source?: string;
  start_date?: string;
  end_date?: string;
  shortcode?: string;
}) => {
  try {
    if (typeof window !== 'undefined') {
      // Client-side - gunakan API
      const response = await api.get('/dashboard/form-captures', { params });
      return response.data;
    } else {
      // Server-side - gunakan database transaction dengan filter lengkap
      return await dbGetFormCaptureData({
        page: params.page,
        limit: params.limit,
        source: params.source,
        start_date: params.start_date,
        end_date: params.end_date,
      });
    }
  } catch (error) {
    console.error('Error mendapatkan data form capture dashboard:', error);
    throw error;
  }
};
