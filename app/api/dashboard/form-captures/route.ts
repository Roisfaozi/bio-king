import { getAuthSession } from '@/lib/auth';
import { bypassRLS } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    // Pastikan user sudah terautentikasi
    const session = await getAuthSession();

    if (!session?.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Dapatkan ID user
    const id = session.user.id;

    // Gunakan bypass RLS untuk mengakses data form captures
    // Ini karena form captures belum tentu terhubung ke user yang membuat link
    const noRLS = await bypassRLS();

    // Ambil semua form captures, diurutkan berdasarkan waktu pembuatan terbaru
    const formCaptures = await noRLS.formCapture.findMany({
      orderBy: {
        created_at: 'desc',
      },
      // Batasi jumlah data yang diambil
      take: 100,
    });

    return NextResponse.json(
      {
        status: 'success',
        data: formCaptures,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error fetching form captures:', error);

    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 },
    );
  }
}
