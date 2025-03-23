import { getAuthSession } from '@/lib/auth';
import { bypassRLS } from '@/lib/db';
import { isAdmin } from '@/lib/utils';
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

    // Dapatkan query parameters hanya untuk filter source dan shortcode
    const searchParams = req.nextUrl.searchParams;
    const filterSource = searchParams.get('source'); // tinder, vsco
    const filterShortcode = searchParams.get('shortcode');

    // Gunakan bypass RLS untuk mengakses data
    const noRLS = await bypassRLS();

    // Kondisi berbeda untuk admin dan user biasa
    if (isUserAdmin) {
      // Admin dapat melihat semua data
      const whereCondition: any = {};

      // Tambahkan filter spesifik jika disediakan
      if (filterShortcode) {
        whereCondition.shortcode = filterShortcode;
      }

      // Tambahkan filter berdasarkan source jika tersedia
      if (filterSource) {
        whereCondition.source = filterSource;
      }

      // Ambil form captures berdasarkan filter untuk admin
      const formCaptures = await noRLS.formCapture.findMany({
        where: whereCondition,
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
          filters: {
            shortcode: filterShortcode,
            source: filterSource,
            total: formCaptures.length,
            isAdmin: true,
          },
        },
        { status: 200 },
      );
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
            filters: {
              shortcode: filterShortcode,
              source: filterSource,
              total: 0,
              isAdmin: false,
            },
          },
          { status: 200 },
        );
      }

      // 2. Buat kondisi where untuk query form captures
      const whereCondition: any = {
        // Selalu filter berdasarkan shortcodes milik user
        shortcode: {
          in: userShortcodes,
        },
      };

      // Tambahkan filter spesifik jika disediakan
      if (filterShortcode && userShortcodes.includes(filterShortcode)) {
        whereCondition.shortcode = filterShortcode;
      }

      // Tambahkan filter berdasarkan source jika tersedia
      if (filterSource) {
        whereCondition.source = filterSource;
      }

      // Ambil form captures berdasarkan filter
      const formCaptures = await noRLS.formCapture.findMany({
        where: whereCondition,
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
          filters: {
            shortcode: filterShortcode,
            source: filterSource,
            total: formCaptures.length,
            isAdmin: false,
          },
        },
        { status: 200 },
      );
    }
  } catch (error) {
    console.error('Error fetching form captures:', error);

    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 },
    );
  }
}
