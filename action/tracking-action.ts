import { api } from '@/config/axios.config';
import {
  TrackingData as DbTrackingData,
  trackPageView as dbTrackPageView,
} from '@/lib/db-transaction/tracking';

export interface TrackingData {
  pageType: 'page' | 'feature' | 'pricing' | 'tinder' | 'vsco' | 'bio' | 'link';
  pageId?: string;
  username?: string;
  shortCode?: string;
}

/**
 * Mengirim data tracking ke server
 *
 * Untuk client components, gunakan ini
 * Untuk server components, gunakan langsung fungsi dari lib/db-transaction/tracking.ts
 */
export const trackPageView = async (data: TrackingData) => {
  try {
    if (typeof window !== 'undefined') {
      // Client-side - gunakan API
      const response = await api.post('/track', data);
      return response.data;
    } else {
      // Server-side - gunakan database transaction
      return await dbTrackPageView(data as DbTrackingData);
    }
  } catch (error) {
    console.error('Error mengirim data tracking:', error);
    return { success: false };
  }
};
