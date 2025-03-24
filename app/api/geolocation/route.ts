import { saveGeolocationData } from '@/lib/db-transaction/geolocation';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Schema validasi untuk data geolokasi
const geolocationSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
  accuracy: z.number(),
  session_id: z.string().optional(),
  visitor_id: z.string().optional(),
  consent_given: z.boolean().default(true),
});

export async function POST(req: NextRequest) {
  try {
    // Parse body request
    const body = await req.json();

    // Validasi input dengan zod
    const validatedData = geolocationSchema.parse(body);

    // Ambil informasi dari request headers
    const headersList = headers();
    const ip = headersList.get('x-forwarded-for') || '';

    // Gunakan fungsi db transaction untuk menyimpan data
    const result = await saveGeolocationData({
      latitude: validatedData.latitude,
      longitude: validatedData.longitude,
      accuracy: validatedData.accuracy,
      session_id: validatedData.session_id,
      visitor_id: validatedData.visitor_id,
      consent_given: validatedData.consent_given,
    });

    // Berikan respons sukses tanpa membocorkan informasi sensitif
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error saving geolocation data:', error);

    // Berikan respons yang tidak menunjukkan error sebenarnya ke client
    // Ini penting untuk keamanan agar client tidak tahu jika ada masalah
    return NextResponse.json({ success: true }, { status: 200 });
  }
}
