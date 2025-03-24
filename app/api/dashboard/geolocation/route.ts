import { getGeolocationData } from '@/lib/db-transaction/geolocation';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    // Ambil parameter dari query
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '10');
    const startDate = url.searchParams.get('start_date') || undefined;
    const endDate = url.searchParams.get('end_date') || undefined;
    const sessionId = url.searchParams.get('session_id') || undefined;

    // Gunakan fungsi db transaction untuk mendapatkan data
    const result = await getGeolocationData({
      page,
      limit,
      start_date: startDate,
      end_date: endDate,
      session_id: sessionId,
    });

    // Jika berhasil, kirim data
    if (result.success) {
      return NextResponse.json({
        data: result.data,
        meta: result.meta,
      });
    }

    // Jika gagal, kirim pesan error
    return NextResponse.json(
      { message: 'Failed to fetch geolocation data' },
      { status: 500 },
    );
  } catch (error) {
    console.error('Error fetching geolocation data:', error);
    return NextResponse.json(
      { message: 'Failed to fetch geolocation data' },
      { status: 500 },
    );
  }
}
