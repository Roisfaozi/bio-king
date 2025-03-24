import { bypassRLS } from '@/lib/db';
import { getGeo } from '@/lib/geo-api';
import { getCurrentEpoch, isValidUrl, parseUserAgent } from '@/lib/utils';

export interface TrackingData {
  pageType: 'page' | 'feature' | 'pricing' | 'tinder' | 'vsco' | 'bio' | 'link';
  pageId?: string;
  username?: string;
  shortCode?: string;
  ip?: string;
  referer?: string;
  userAgent?: string;
  pathname?: string;
}

/**
 * Melakukan tracking pageview ke database
 */
export async function trackPageView(
  data: TrackingData,
  headers?: {
    ip?: string;
    userAgent?: string;
    referer?: string;
    language?: string;
    pathname?: string;
  },
) {
  try {
    const noRLS = await bypassRLS();

    // Ambil informasi dari headers atau data
    const userAgent = headers?.userAgent || data.userAgent || '';
    const referer = headers?.referer || data.referer || '';
    const ip = headers?.ip || data.ip || '';
    const language = headers?.language || '';
    const pathname = headers?.pathname || data.pathname || '';

    // Parse data geolokasi
    const geoData = await getGeo(ip);

    // Parse user agent
    const { browser, os, device } = parseUserAgent(userAgent);
    const currentEpoch = getCurrentEpoch();

    // Get UTM parameters
    const refererUrl = referer || '';
    let searchParams = new URLSearchParams();

    if (isValidUrl(refererUrl)) {
      const url = new URL(refererUrl);
      searchParams = new URLSearchParams(url.search);
    }

    // Buat data umum untuk tracking
    const commonData = {
      ip,
      referer,
      browser,
      os,
      device,
      user_agent: userAgent,
      city: geoData?.city || null,
      country: geoData?.country || null,
      language: language ? language.split(',')[0] : null,
      utm_source: searchParams.get('utm_source'),
      utm_medium: searchParams.get('utm_medium'),
      utm_campaign: searchParams.get('utm_campaign'),
      created_at: currentEpoch,
      platform: data.pageType,
    };

    // Track berdasarkan jenis halaman
    switch (data.pageType) {
      case 'bio':
        if (data.username) {
          const bioPage = await noRLS.bioPages.findFirst({
            where: {
              username: data.username,
              visibility: 'public',
              archived_at: null,
            },
            select: { id: true },
          });

          if (bioPage) {
            // Periksa jika klik sudah ada untuk pengguna ini
            const existingClick = await noRLS.clicks.findFirst({
              where: {
                bio_page_id: bioPage.id,
                ip,
                user_agent: userAgent,
                created_at: { gt: getCurrentEpoch() - 24 * 60 * 60 },
              },
              select: { id: true },
            });

            await noRLS.clicks.create({
              data: {
                ...commonData,
                bio_page_id: bioPage.id,
                is_unique: !existingClick,
                source_type: 'bio_page',
              },
            });
          }
        }
        break;

      case 'link':
        if (data.shortCode) {
          const link = await noRLS.links.findUnique({
            where: { short_code: data.shortCode },
            select: { id: true },
          });

          if (link) {
            const existingClick = await noRLS.clicks.findFirst({
              where: {
                link_id: link.id,
                ip,
                user_agent: userAgent,
                created_at: { gt: getCurrentEpoch() - 24 * 60 * 60 },
              },
              select: { id: true },
            });

            await noRLS.clicks.create({
              data: {
                ...commonData,
                link_id: link.id,
                is_unique: !existingClick,
                source_type: 'shortlink',
              },
            });
          }
        }
        break;

      case 'tinder':
        // Tracking untuk halaman Tinder tanpa data geolokasi
        await noRLS.clicks.create({
          data: {
            ...commonData,
            platform: 'tinder',
            screen_size: data.pageId,
            is_unique: true,
            source_type: 'tinder_page',
          },
        });
        break;

      // Tracking untuk halaman lainnya (page, feature, pricing)
      default:
        // Gunakan tabel clicks yang sudah ada dengan platform sebagai indikator jenis halaman
        await noRLS.clicks.create({
          data: {
            ...commonData,
            platform: data.pageType,
            screen_size: data.pageId,
            referer: `${referer || ''}${pathname ? ` (${pathname})` : ''}`,
            is_unique: true,
            source_type: `${data.pageType}_page`,
          },
        });
        break;
    }

    return { success: true };
  } catch (error) {
    console.error('Error tracking page view:', error);
    return { success: false, error };
  }
}
