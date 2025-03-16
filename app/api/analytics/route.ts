import { authOptions } from '@/lib/auth';
import { bypassRLS } from '@/lib/db';
import { logError } from '@/lib/helper';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const id = session.user.id;
    const dbBypass = bypassRLS();

    // Ambil parameter dari query string
    const searchParams = request.nextUrl.searchParams;
    const timeRange = searchParams.get('timeRange') || '30'; // Default 30 hari
    const groupBy = searchParams.get('groupBy') || 'daily'; // Default daily

    // Tentukan rentang waktu berdasarkan parameter timeRange
    const endDate = new Date();
    const startDate = new Date();

    switch (timeRange) {
      case '7':
        startDate.setDate(endDate.getDate() - 7);
        break;
      case '30':
        startDate.setDate(endDate.getDate() - 30);
        break;
      case '60':
        startDate.setDate(endDate.getDate() - 60);
        break;
      case '90':
        startDate.setDate(endDate.getDate() - 90);
        break;
      case 'year':
        startDate.setFullYear(endDate.getFullYear() - 1);
        break;
      default:
        startDate.setDate(endDate.getDate() - 30); // Default 30 hari
    }

    // Konversi ke timestamp untuk query
    const startTimestamp = BigInt(startDate.getTime());
    const endTimestamp = BigInt(endDate.getTime());

    // Hitung total shortlinks dan bio pages
    const shortlinksCount = await dbBypass.links.count({
      where: {
        user_id: id,
      },
    });

    const bioPagesCount = await dbBypass.bioPages.count({
      where: {
        user_id: id,
      },
    });

    // Hitung total klik
    const shortlinkClicks = await dbBypass.clicks.count({
      where: {
        links: {
          user_id: id,
        },
        link_id: {
          not: null,
        },
      },
    });

    const bioPageClicks = await dbBypass.clicks.count({
      where: {
        bioPages: {
          user_id: id,
        },
        bio_page_id: {
          not: null,
        },
      },
    });

    const totalClicks = shortlinkClicks + bioPageClicks;

    // Hitung aktivitas terbaru (7 hari terakhir)
    const recentDate = new Date();
    recentDate.setDate(recentDate.getDate() - 7);
    const recentTimestamp = BigInt(recentDate.getTime());

    const recentShortlinks = await dbBypass.links.count({
      where: {
        user_id: id,
        created_at: {
          gte: recentTimestamp,
        },
      },
    });

    const recentBioPages = await dbBypass.bioPages.count({
      where: {
        user_id: id,
        created_at: {
          gte: recentTimestamp,
        },
      },
    });

    const recentClicks = await dbBypass.clicks.count({
      where: {
        OR: [
          {
            links: {
              user_id: id,
            },
            link_id: {
              not: null,
            },
          },
          {
            bioPages: {
              user_id: id,
            },
            bio_page_id: {
              not: null,
            },
          },
        ],
        created_at: {
          gte: recentTimestamp,
        },
      },
    });

    // Dapatkan top 5 shortlinks berdasarkan klik
    const topShortlinks = await dbBypass.links.findMany({
      where: {
        user_id: id,
      },
      select: {
        id: true,
        short_code: true,
        title: true,
        original_url: true,
        _count: {
          select: {
            clicks: true,
          },
        },
      },
      orderBy: {
        clicks: {
          _count: 'desc',
        },
      },
      take: 5,
    });

    // Dapatkan top 5 bio pages berdasarkan klik
    const topBioPages = await dbBypass.bioPages.findMany({
      where: {
        user_id: id,
      },
      select: {
        id: true,
        username: true,
        title: true,
        _count: {
          select: {
            clicks: true,
          },
        },
      },
      orderBy: {
        clicks: {
          _count: 'desc',
        },
      },
      take: 5,
    });

    // Dapatkan data klik untuk rentang waktu yang ditentukan
    const clicksData = await dbBypass.clicks.findMany({
      where: {
        OR: [
          {
            links: {
              user_id: id,
            },
            link_id: {
              not: null,
            },
          },
          {
            bioPages: {
              user_id: id,
            },
            bio_page_id: {
              not: null,
            },
          },
        ],
        created_at: {
          gte: startTimestamp,
          lte: endTimestamp,
        },
      },
      select: {
        created_at: true,
        link_id: true,
        bio_page_id: true,
      },
    });

    // Dapatkan data shortlinks dan bio pages yang dibuat dalam rentang waktu
    const linksInTimeRange = await dbBypass.links.findMany({
      where: {
        user_id: id,
        created_at: {
          gte: startTimestamp,
          lte: endTimestamp,
        },
      },
      select: {
        created_at: true,
      },
    });

    const bioPagesInTimeRange = await dbBypass.bioPages.findMany({
      where: {
        user_id: id,
        created_at: {
          gte: startTimestamp,
          lte: endTimestamp,
        },
      },
      select: {
        created_at: true,
      },
    });

    // Fungsi untuk mendapatkan tanggal dalam format yang sesuai berdasarkan groupBy
    const getFormattedDate = (timestamp: bigint, groupingType: string) => {
      const date = new Date(Number(timestamp));

      if (groupingType === 'monthly') {
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      } else if (groupingType === 'weekly') {
        // Mendapatkan tanggal awal minggu (Minggu)
        const firstDayOfWeek = new Date(date);
        const day = date.getDay();
        firstDayOfWeek.setDate(date.getDate() - day);
        return `${firstDayOfWeek.getFullYear()}-${String(firstDayOfWeek.getMonth() + 1).padStart(2, '0')}-${String(firstDayOfWeek.getDate()).padStart(2, '0')}`;
      } else {
        // Daily (default)
        return date.toISOString().split('T')[0];
      }
    };

    // Fungsi untuk membuat array tanggal berdasarkan rentang waktu dan pengelompokan
    const generateDateArray = (
      start: Date,
      end: Date,
      groupingType: string,
    ) => {
      const dates = [];
      const current = new Date(start);

      while (current <= end) {
        dates.push({
          date: getFormattedDate(BigInt(current.getTime()), groupingType),
          shortlinkClicks: 0,
          bioPageClicks: 0,
          totalClicks: 0,
        });

        if (groupingType === 'monthly') {
          current.setMonth(current.getMonth() + 1);
        } else if (groupingType === 'weekly') {
          current.setDate(current.getDate() + 7);
        } else {
          current.setDate(current.getDate() + 1);
        }
      }

      return dates;
    };

    // Buat array tanggal untuk data klik
    const clicksDateArray = generateDateArray(startDate, endDate, groupBy);

    // Kelompokkan data klik berdasarkan tanggal dan jenis
    clicksData.forEach(
      (click: {
        created_at: bigint | null;
        link_id: string | null;
        bio_page_id: string | null;
      }) => {
        const formattedDate = getFormattedDate(
          click.created_at || BigInt(0),
          groupBy,
        );
        const dayData = clicksDateArray.find(
          (day) => day.date === formattedDate,
        );

        if (dayData) {
          if (click.link_id) {
            dayData.shortlinkClicks += 1;
          } else if (click.bio_page_id) {
            dayData.bioPageClicks += 1;
          }
          dayData.totalClicks += 1;
        }
      },
    );

    // Buat array tanggal untuk data item yang dibuat
    const createdItemsArray = generateDateArray(
      startDate,
      endDate,
      groupBy,
    ).map((item) => ({
      date: item.date,
      shortlinks: 0,
      bioPages: 0,
      total: 0,
    }));

    // Kelompokkan item yang dibuat berdasarkan tanggal
    linksInTimeRange.forEach((link: { created_at: bigint | null }) => {
      const formattedDate = getFormattedDate(
        link.created_at || BigInt(0),
        groupBy,
      );
      const dayData = createdItemsArray.find(
        (day) => day.date === formattedDate,
      );

      if (dayData) {
        dayData.shortlinks += 1;
        dayData.total += 1;
      }
    });

    bioPagesInTimeRange.forEach((page: { created_at: bigint | null }) => {
      const formattedDate = getFormattedDate(
        page.created_at || BigInt(0),
        groupBy,
      );
      const dayData = createdItemsArray.find(
        (day) => day.date === formattedDate,
      );

      if (dayData) {
        dayData.bioPages += 1;
        dayData.total += 1;
      }
    });

    // Get visitor details (browsers, devices, countries)
    const visitorDetails = await dbBypass.clicks.groupBy({
      by: ['browser'],
      where: {
        OR: [
          {
            links: {
              user_id: id,
            },
            link_id: {
              not: null,
            },
          },
          {
            bioPages: {
              user_id: id,
            },
            bio_page_id: {
              not: null,
            },
          },
        ],
        created_at: {
          gte: startTimestamp,
          lte: endTimestamp,
        },
      },
      _count: {
        browser: true,
      },
      orderBy: {
        _count: {
          browser: 'desc',
        },
      },
      take: 5,
    });

    const deviceDetails = await dbBypass.clicks.groupBy({
      by: ['device'],
      where: {
        OR: [
          {
            links: {
              user_id: id,
            },
            link_id: {
              not: null,
            },
          },
          {
            bioPages: {
              user_id: id,
            },
            bio_page_id: {
              not: null,
            },
          },
        ],
        created_at: {
          gte: startTimestamp,
          lte: endTimestamp,
        },
      },
      _count: {
        device: true,
      },
      orderBy: {
        _count: {
          device: 'desc',
        },
      },
      take: 5,
    });

    const osDetails = await dbBypass.clicks.groupBy({
      by: ['os'],
      where: {
        OR: [
          {
            links: {
              user_id: id,
            },
            link_id: {
              not: null,
            },
          },
          {
            bioPages: {
              user_id: id,
            },
            bio_page_id: {
              not: null,
            },
          },
        ],
        created_at: {
          gte: startTimestamp,
          lte: endTimestamp,
        },
      },
      _count: {
        os: true,
      },
      orderBy: {
        _count: {
          os: 'desc',
        },
      },
      take: 5,
    });

    // Get country data for map
    const countryData = await dbBypass.clicks.groupBy({
      by: ['country'],
      where: {
        OR: [
          {
            links: {
              user_id: id,
            },
            link_id: {
              not: null,
            },
          },
          {
            bioPages: {
              user_id: id,
            },
            bio_page_id: {
              not: null,
            },
          },
        ],
        country: {
          not: null,
        },
        created_at: {
          gte: startTimestamp,
          lte: endTimestamp,
        },
      },
      _count: {
        country: true,
      },
      orderBy: {
        _count: {
          country: 'desc',
        },
      },
    });

    // Get recent visitors
    const recentVisitors = await dbBypass.clicks.findMany({
      where: {
        OR: [
          {
            links: {
              user_id: id,
            },
            link_id: {
              not: null,
            },
          },
          {
            bioPages: {
              user_id: id,
            },
            bio_page_id: {
              not: null,
            },
          },
        ],
        created_at: {
          gte: startTimestamp,
          lte: endTimestamp,
        },
      },
      select: {
        id: true,
        ip: true,
        country: true,
        city: true,
        browser: true,
        os: true,
        device: true,
        created_at: true,
        links: {
          select: {
            short_code: true,
            title: true,
          },
        },
        bioPages: {
          select: {
            username: true,
            title: true,
          },
        },
      },
      orderBy: {
        created_at: 'desc',
      },
      take: 20,
    });

    return NextResponse.json(
      {
        status: 'success',
        data: {
          counts: {
            shortlinks: shortlinksCount,
            bioPages: bioPagesCount,
            totalClicks: totalClicks,
            shortlinkClicks: shortlinkClicks,
            bioPageClicks: bioPageClicks,
          },
          recent: {
            shortlinks: recentShortlinks,
            bioPages: recentBioPages,
            clicks: recentClicks,
          },
          top: {
            shortlinks: topShortlinks,
            bioPages: topBioPages,
          },
          charts: {
            clicks: clicksDateArray,
            created: createdItemsArray,
          },
          visitors: {
            browsers: visitorDetails,
            devices: deviceDetails,
            os: osDetails,
            countries: countryData,
            recent: recentVisitors,
          },
          timeRange,
          groupBy,
        },
      },
      { status: 200 },
    );
  } catch (error) {
    logError('Error fetching analytics:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 },
    );
  }
}
