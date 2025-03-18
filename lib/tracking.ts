import { headers } from 'next/headers';
import { bypassRLS } from './db';
import { getGeo } from './geo-api';
import { getCurrentEpoch, isValidUrl, parseUserAgent } from './utils';

interface TrackingInfo {
  pageType: 'page' | 'feature' | 'pricing' | 'tinder' | 'bio' | 'link';
  pageId?: string;
  username?: string;
  shortCode?: string;
}

/**
 * Melakukan stealth tracking untuk berbagai jenis halaman
 * Tidak menampilkan pesan apapun ke pengguna dan berjalan di background
 */
export async function trackPageView(info: TrackingInfo) {
  try {
    const noRLS = await bypassRLS();
    const headersList = headers();

    // Ambil informasi dari request headers
    const userAgent = headersList.get('user-agent') || '';
    const referer = headersList.get('referer') || '';
    const ip = headersList.get('x-forwarded-for') || '';
    const language = headersList.get('accept-language') || '';
    const pathname = headersList.get('x-next-pathname') || '';

    // Parse data geolokasi
    const geoData = await getGeo(ip);

    // Parse user agent
    const { browser, os, device } = parseUserAgent(userAgent);
    const currentEpoch = getCurrentEpoch();

    // Get UTM parameters
    const refererUrl = headersList.get('referer') || '';
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
      language: language.split(',')[0],
      utm_source: searchParams.get('utm_source'),
      utm_medium: searchParams.get('utm_medium'),
      utm_campaign: searchParams.get('utm_campaign'),
      created_at: currentEpoch,
    };

    // Track berdasarkan jenis halaman
    switch (info.pageType) {
      case 'bio':
        if (info.username) {
          const bioPage = await noRLS.bioPages.findFirst({
            where: {
              username: info.username,
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
              },
            });
          }
        }
        break;

      case 'link':
        if (info.shortCode) {
          const link = await noRLS.links.findUnique({
            where: { short_code: info.shortCode },
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
              },
            });
          }
        }
        break;

      // Tracking untuk halaman lainnya (page, feature, pricing, tinder)
      default:
        // Gunakan tabel clicks yang sudah ada dengan platform sebagai indikator jenis halaman
        await noRLS.clicks.create({
          data: {
            ...commonData,
            platform: info.pageType, // Gunakan platform field untuk menyimpan jenis halaman
            screen_size: info.pageId, // Gunakan screen_size untuk menyimpan page ID jika ada
            referer: `${referer || ''}${pathname ? ` (${pathname})` : ''}`,
            is_unique: true, // Anggap semua view halaman default unik
          },
        });
        break;
    }

    return true;
  } catch (error) {
    console.error('Error tracking page view:', error);
    return false;
  }
}
