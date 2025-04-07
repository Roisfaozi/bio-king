import { getAuthSession } from '@/lib/auth';
import db from '@/lib/db';
import { saveGeolocationData } from '@/lib/db-transaction/geolocation';
import { trackPageView } from '@/lib/db-transaction/tracking';
import { getCurrentEpoch } from '@/lib/utils';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Schema validasi untuk data geolokasi
const geolocationSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
  accuracy: z.number(),
  consent_given: z.boolean().optional().default(false),
  source_type: z.string().optional(),
  page_type: z.string().optional(),
  page_id: z.string().optional(),
  shortCode: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    // Parse req body
    const body = await req.json();

    // Validasi data
    const validData = geolocationSchema.parse(body);

    // Get session information (optional)
    const session = await getAuthSession();

    // Get headers for additional information
    const headers = {
      ip:
        req.headers.get('x-forwarded-for') ||
        req.headers.get('x-real-ip') ||
        '',
      userAgent: req.headers.get('user-agent') || '',
      referer: req.headers.get('referer') || '',
      language: req.headers.get('accept-language') || '',
    };

    // Simpan data geolokasi
    const result = await saveGeolocationData({
      latitude: validData.latitude,
      longitude: validData.longitude,
      accuracy: validData.accuracy,
      consent_given: validData.consent_given,
      visitor_id: session?.user?.id, // Gunakan ID user jika ada session
      session_id: req.cookies.get('visitor_session_id')?.value, // Gunakan cookie session ID
    });

    // Jika ada source_type, gunakan untuk tracking
    if (validData.page_type) {
      await trackPageView(
        {
          pageType: validData.page_type as any,
          pageId: validData.page_id,
          shortCode: validData.shortCode,
          geolocation: {
            latitude: validData.latitude,
            longitude: validData.longitude,
            accuracy: validData.accuracy,
            consent_given: validData.consent_given,
          },
        },
        headers,
      );
    }

    return NextResponse.json({
      status: 'success',
      data: {
        id: result.data?.id,
        timestamp: getCurrentEpoch(),
      },
    });
  } catch (error) {
    console.error('Error saving geolocation data:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { status: 'error', message: error.errors[0].message },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { status: 'error', message: 'Failed to save geolocation data' },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Ambil data geolocation dari database
    const geolocationData = await db.geolocationData.findMany({
      where: {
        latitude: { not: null },
        longitude: { not: null },
      },
      orderBy: {
        created_at: 'desc',
      },
      take: 100, // Batasi 100 data terbaru
    });

    return NextResponse.json({
      status: 'success',
      data: geolocationData,
    });
  } catch (error) {
    console.error('Error fetching geolocation data:', error);
    return NextResponse.json(
      {
        status: 'error',
        message: 'Failed to fetch geolocation data',
      },
      { status: 500 },
    );
  }
}
