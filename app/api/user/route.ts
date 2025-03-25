import { getAuthSession } from '@/lib/auth';
import { bypassRLS } from '@/lib/db';
import { isAdmin, serializeBigInt } from '@/lib/utils';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// GET: Mengambil semua user (hanya admin)
export async function GET(req: NextRequest) {
  try {
    // Pastikan user sudah terautentikasi
    const session = await getAuthSession();

    if (!session?.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Cek apakah user adalah admin
    const userIsAdmin = isAdmin(session);
    if (!userIsAdmin) {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    // Gunakan bypass RLS untuk mengakses data
    const noRLS = await bypassRLS();

    // Ambil semua user
    const users = await noRLS.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        created_at: true,
        image: true,
      },
      orderBy: {
        created_at: 'desc',
      },
    });

    return NextResponse.json(
      {
        status: 'success',
        data: serializeBigInt(users),
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 },
    );
  }
}
