import { trackPageView as dbTrackPageView } from '@/lib/db-transaction/tracking';
import { headers } from 'next/headers';

interface GeoData {
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: number;
}

interface TrackingInfo {
  pageType: 'page' | 'feature' | 'pricing' | 'tinder' | 'vsco' | 'bio' | 'link';
  pageId?: string;
  username?: string;
  shortCode?: string;
  geoData?: GeoData;
}

/**
 * Melakukan stealth tracking untuk berbagai jenis halaman
 * Tidak menampilkan pesan apapun ke pengguna dan berjalan di background
 *
 * DEPRECATED: Gunakan fungsi di db-transaction/tracking.ts
 * File ini dipertahankan untuk kompatibilitas dengan kode lama
 */
export async function trackPageView(info: TrackingInfo) {
  try {
    const headersList = headers();

    // Ambil informasi dari request headers
    const headerData = {
      ip: headersList.get('x-forwarded-for') || '',
      userAgent: headersList.get('user-agent') || '',
      referer: headersList.get('referer') || '',
      language: headersList.get('accept-language') || '',
      pathname: headersList.get('x-next-pathname') || '',
    };

    // Panggil fungsi baru di db-transaction
    const result = await dbTrackPageView(
      {
        pageType: info.pageType,
        pageId: info.pageId,
        username: info.username,
        shortCode: info.shortCode,
      },
      headerData,
    );

    return result.success;
  } catch (error) {
    console.error('Error tracking page view:', error);
    return false;
  }
}
