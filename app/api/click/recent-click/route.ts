import { NextRequest, NextResponse } from 'next/server';
import { getAuthSession } from '@/lib/auth';
import { withRLS } from '@/lib/db';
import { z } from 'zod';
import { logError } from '@/lib/helper';

export async function GET(req: NextRequest) {
  try {
    const session = await getAuthSession();
    const id = session?.user?.id;

    if (!session?.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const dbRls = withRLS(id);

    const searchParams = req.nextUrl.searchParams;

    const limit = searchParams.get('limit') || 10;
    let filterQuery = {
      select: {
        id: true,
        links: {
          select: {
            short_code: true,
            id: true,
            title: true,
          },
        },
        bioPages: {
          select: {
            username: true,
            id: true,
            title: true,
          },
        },
      },
    };
    const recentClicks = await dbRls.clicks.findMany({
      where: {
        OR: [{ links: { user_id: id } }, { bioPages: { user_id: id } }],
      },
      include: {
        links: {
          select: {
            id: true,
            short_code: true,
            original_url: true,
            user_id: true,
          },
        },
        bioPages: {
          select: {
            id: true,
            username: true,
            title: true,
            user_id: true,
          },
        },
      },
      orderBy: {
        created_at: 'desc', // Urutkan berdasarkan klik terbaru
      },
      take: 10,
    });

    return NextResponse.json(
      {
        status: 'success',
        data: recentClicks,
      },
      { status: 200 },
    );
  } catch (error) {
    let res;
    if (error instanceof z.ZodError) {
      res = {
        status: 'fail validation',
        message: error.issues.map((issue) => issue.message).join(', '),
      };
      logError('error from zod');
      return NextResponse.json(res, { status: 400 });
    }
    logError('Error fetching recent clicks:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 },
    );
  }
}
