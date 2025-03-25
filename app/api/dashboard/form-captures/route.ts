import { getFormCaptureData } from '@/lib/db-transaction/form-capture';
import { bypassRLS } from '@/lib/db';
import { getAuthSession } from '@/lib/auth';
import { isAdmin, serializeBigInt } from '@/lib/utils';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    // Pastikan user sudah terautentikasi
    const session = await getAuthSession();

    if (!session?.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Dapatkan ID user yang sedang login
    const userId = session.user.id;
    const isUserAdmin = isAdmin(session);

    // Ambil parameter dari query
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '10');
    const source = url.searchParams.get('source') || undefined;
    const startDate = url.searchParams.get('start_date') || undefined;
    const endDate = url.searchParams.get('end_date') || undefined;
    const shortcode = url.searchParams.get('shortcode') || undefined;

    // Gunakan bypass RLS untuk mengakses data
    const noRLS = await bypassRLS();

    if (isUserAdmin) {
      // Admin dapat melihat semua data
      const result = await getFormCaptureData({
        page,
        limit,
        source,
        start_date: startDate,
        end_date: endDate,
      });

      // Jika berhasil, kirim data
      if (result.success) {
        return NextResponse.json({
          status: 'success',
          data: serializeBigInt(result.data),
          meta: serializeBigInt(result.meta),
          filters: {
            shortcode,
            source,
            isAdmin: true,
          },
        });
      }
    } else {
      // 1. Dapatkan semua shortcodes milik user yang sedang login
      const userLinks = await noRLS.links.findMany({
        where: {
          user_id: userId,
        },
        select: {
          short_code: true,
        },
      });

      const userShortcodes = userLinks.map(
        (link: { short_code: string }) => link.short_code,
      );

      // Jika user tidak memiliki shortlinks, return empty array
      if (userShortcodes.length === 0) {
        return NextResponse.json(
          {
            status: 'success',
            data: [],
            meta: serializeBigInt({
              total: 0,
              page,
              limit,
              totalPages: 0,
            }),
            filters: {
              shortcode,
              source,
              isAdmin: false,
            },
          },
          { status: 200 },
        );
      }

      // Gunakan fungsi db transaction dengan optimasi untuk shortcodes milik user
      const result = await getFormCaptureData({
        page,
        limit,
        source,
        start_date: startDate,
        end_date: endDate,
        shortcodes: userShortcodes,
      });

      // Jika berhasil, kirim data
      if (result.success) {
        return NextResponse.json({
          status: 'success',
          data: serializeBigInt(result.data),
          meta: serializeBigInt(result.meta),
          filters: {
            shortcode,
            source,
            isAdmin: false,
          },
        });
      }
    }

    // Jika ada error, kirim response error
    return NextResponse.json(
      {
        status: 'error',
        message: 'Failed to fetch form captures',
      },
      { status: 500 },
    );
  } catch (error) {
    console.error('Error fetching form captures:', error);
    return NextResponse.json(
      {
        status: 'error',
        message: 'Internal server error',
      },
      { status: 500 },
    );
  }
}
