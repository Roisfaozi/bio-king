import { getAuthSession } from '@/lib/auth';
import { bypassRLS, withRLS } from '@/lib/db';
import { logError } from '@/lib/helper';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const session = await getAuthSession();
    const id = session?.user?.id;

    if (!session?.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const dbRls = withRLS(id);
    const dbBypass = bypassRLS();

    // Get total shortlinks created by user
    const shortlinksCount = await dbRls.links.count({
      where: {
        user_id: id,
      },
    });

    // Get total bio pages created by user
    const bioPagesCount = await dbRls.bioPages.count({
      where: {
        user_id: id,
      },
    });

    // Get total clicks for shortlinks
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

    // Get total clicks for bio pages
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

    // Get total clicks (both shortlinks and bio pages)
    const totalClicks = shortlinkClicks + bioPageClicks;

    // Get recent activity (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const sevenDaysAgoEpoch = BigInt(sevenDaysAgo.getTime());

    // Recent shortlinks
    const recentShortlinks = await dbRls.links.count({
      where: {
        user_id: id,
        created_at: {
          gte: sevenDaysAgoEpoch,
        },
      },
    });

    // Recent bio pages
    const recentBioPages = await dbRls.bioPages.count({
      where: {
        user_id: id,
        created_at: {
          gte: sevenDaysAgoEpoch,
        },
      },
    });

    // Recent clicks
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
          gte: sevenDaysAgoEpoch,
        },
      },
    });

    // Get top 5 most clicked shortlinks
    const topShortlinks = await dbRls.links.findMany({
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

    // Get top 5 most clicked bio pages
    const topBioPages = await dbRls.bioPages.findMany({
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

    // Get daily clicks for the last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const thirtyDaysAgoEpoch = BigInt(thirtyDaysAgo.getTime());

    // Create an array of the last 30 days
    const last30Days = Array.from({ length: 30 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return {
        date: date.toISOString().split('T')[0],
        shortlinkClicks: 0,
        bioPageClicks: 0,
        totalClicks: 0,
      };
    }).reverse();

    // Get all clicks for the last 30 days
    const clicksLast30Days = await dbBypass.clicks.findMany({
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
          gte: thirtyDaysAgoEpoch,
        },
      },
      select: {
        created_at: true,
        link_id: true,
        bio_page_id: true,
      },
    });

    // Group clicks by date
    clicksLast30Days.forEach((click) => {
      const clickDate = new Date(Number(click.created_at))
        .toISOString()
        .split('T')[0];
      const dayData = last30Days.find((day) => day.date === clickDate);

      if (dayData) {
        if (click.link_id) {
          dayData.shortlinkClicks += 1;
        } else if (click.bio_page_id) {
          dayData.bioPageClicks += 1;
        }
        dayData.totalClicks += 1;
      }
    });

    // Get daily created links and bio pages for the last 30 days
    const linksLast30Days = await dbRls.links.findMany({
      where: {
        user_id: id,
        created_at: {
          gte: thirtyDaysAgoEpoch,
        },
      },
      select: {
        created_at: true,
      },
    });

    const bioPagesLast30Days = await dbRls.bioPages.findMany({
      where: {
        user_id: id,
        created_at: {
          gte: thirtyDaysAgoEpoch,
        },
      },
      select: {
        created_at: true,
      },
    });

    // Create an array for created items
    const createdItems = Array.from({ length: 30 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return {
        date: date.toISOString().split('T')[0],
        shortlinks: 0,
        bioPages: 0,
        total: 0,
      };
    }).reverse();

    // Group created items by date
    linksLast30Days.forEach((link) => {
      const linkDate = new Date(Number(link.created_at))
        .toISOString()
        .split('T')[0];
      const dayData = createdItems.find((day) => day.date === linkDate);

      if (dayData) {
        dayData.shortlinks += 1;
        dayData.total += 1;
      }
    });

    bioPagesLast30Days.forEach((page) => {
      const pageDate = new Date(Number(page.created_at))
        .toISOString()
        .split('T')[0];
      const dayData = createdItems.find((day) => day.date === pageDate);

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
            clicks: last30Days,
            created: createdItems,
          },
          visitors: {
            browsers: visitorDetails,
            devices: deviceDetails,
            os: osDetails,
            countries: countryData,
            recent: recentVisitors,
          },
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
