import { bypassRLS } from '@/lib/db';
import { getCurrentEpoch } from '@/lib/utils';

export interface GeolocationCreateData {
  latitude: number;
  longitude: number;
  accuracy: number;
  session_id?: string;
  visitor_id?: string;
  consent_given?: boolean;
}

export interface GeolocationFilterParams {
  page?: number;
  limit?: number;
  start_date?: string | number;
  end_date?: string | number;
  session_id?: string;
}

/**
 * Menyimpan data geolokasi ke database
 */
export async function saveGeolocationData(data: GeolocationCreateData) {
  try {
    const noRLS = await bypassRLS();

    // Cari atau buat session_id jika tidak ada
    let sessionId = data.session_id;

    if (!sessionId && data.visitor_id) {
      // Jika tidak ada session_id tapi ada visitor_id, cek apakah ada session untuk visitor ini
      const existingSession = await noRLS.visitorSessions.findFirst({
        where: {
          visitor_id: data.visitor_id,
          ended_at: null,
        },
        orderBy: {
          created_at: 'desc',
        },
      });

      if (existingSession) {
        sessionId = existingSession.id;
      } else {
        // Buat session baru jika tidak ada
        const newSession = await noRLS.visitorSessions.create({
          data: {
            visitor_id: data.visitor_id,
            started_at: getCurrentEpoch(),
            created_at: getCurrentEpoch(),
          },
        });
        sessionId = newSession.id;
      }
    }

    // Simpan data geolokasi ke database
    const result = await noRLS.geolocationData.create({
      data: {
        latitude: data.latitude,
        longitude: data.longitude,
        accuracy: data.accuracy,
        session_id: sessionId,
        consent_given: data.consent_given || false,
        created_at: getCurrentEpoch(),
      },
    });

    return { success: true, data: result };
  } catch (error) {
    console.error('Error saving geolocation data:', error);
    return { success: false, error };
  }
}

/**
 * Mendapatkan data geolokasi dari database
 */
export async function getGeolocationData(params: GeolocationFilterParams = {}) {
  try {
    const noRLS = await bypassRLS();

    const page = params.page || 1;
    const limit = params.limit || 10;
    const offset = (page - 1) * limit;

    // Buat kondisi where berdasarkan parameter
    const whereCondition: any = {};

    if (params.session_id) {
      whereCondition.session_id = params.session_id;
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

    // Ambil data geolokasi
    const geoData = await noRLS.geolocationData.findMany({
      where: whereCondition,
      include: {
        visitor_sessions: {
          select: {
            visitor_id: true,
            fingerprint: true,
            is_returning: true,
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
      skip: offset,
      take: limit,
    });

    // Hitung total
    const totalCount = await noRLS.geolocationData.count({
      where: whereCondition,
    });

    return {
      success: true,
      data: geoData,
      meta: {
        total: totalCount,
        page,
        limit,
        totalPages: Math.ceil(totalCount / limit),
      },
    };
  } catch (error) {
    console.error('Error fetching geolocation data:', error);
    return { success: false, error };
  }
}
