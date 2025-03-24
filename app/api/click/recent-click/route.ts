import { getAuthSession } from '@/lib/auth';
import { withRLS } from '@/lib/db';
import { logError } from '@/lib/helper';
import { serializeBigInt } from '@/lib/utils';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

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
    const recentClicks = await dbRls.clicks.findMany({
      where: {
        OR: [{ links: { user_id: id } }, { bioPages: { user_id: id } }],
      },
      select: {
        id: true,
        ip: true,
        city: true,
        country: true,
        os: true,
        device: true,
        browser: true,
        referer: true,
        language: true,
        created_at: true,
        links: {
          select: {
            id: true,
            short_code: true,
            original_url: true,
            user_id: true,
            title: true,
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
      take: Number(limit),
    });

    return NextResponse.json(
      {
        status: 'success',
        data: serializeBigInt(recentClicks),
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
