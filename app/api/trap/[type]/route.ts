import { NextRequest, NextResponse } from 'next/server';

// Endpoint untuk menangani redirect trap untuk Tinder dan VSCO
export async function GET(
  request: NextRequest,
  { params }: { params: { type: string } },
) {
  const { type } = params;

  // Ambil base URL dari request
  const baseUrl = new URL(request.url).origin;

  // Validasi tipe trap (hanya izinkan tinder atau vsco)
  if (!['tinder', 'vsco'].includes(type)) {
    return NextResponse.json({ error: 'Invalid trap type' }, { status: 400 });
  }

  // Arahkan ke halaman trap yang sesuai menggunakan URL absolut
  return NextResponse.redirect(new URL(`/${type}`, baseUrl));
}
