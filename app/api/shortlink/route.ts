import { getAuthSession } from '@/lib/auth';
import { withRLS } from '@/lib/db';
import { logError } from '@/lib/helper';
import { generateShortCode, getCurrentEpoch } from '@/lib/utils';
import { createShortlinkSchema } from '@/validation/link';
import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    // Get authenticated session
    const session = await getAuthSession();

    if (!session?.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const id = session?.user?.id;
    // Parse request body
    const body = await req.json();

    // Validate the request body
    const validatedData = createShortlinkSchema.parse(body);
    const shortCode = generateShortCode();

    // Get current timestamp
    const now = getCurrentEpoch();

    const dbRls = withRLS(id);

    const isLinkExists = await dbRls.links.findFirst({
      where: { short_code: shortCode, user_id: id },
    });

    if (isLinkExists) {
      return NextResponse.json(
        {
          status: 'fail',
          message: 'shortcode page already exists',
          data: { short_code: shortCode },
        },
        { status: 400 },
      );
    }
    // Insert into database using RLS with Prisma
    const result = await dbRls.links.create({
      data: {
        user_id: id,
        short_code: shortCode,
        original_url: validatedData.original_url,
        title: validatedData.title || null,
        created_at: now,
        updated_at: now,
      },
    });
    revalidatePath('/dashboard');

    return NextResponse.json(
      {
        status: 'success',
        data: result,
      },
      { status: 201 },
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
    logError('Error create shortlinks:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 },
    );
  }
}

// Optional: Implement GET to retrieve user's shortlinks
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

    const shortlinks = await dbRls.links.findMany({
      where: {
        user_id: session.user.id,
      },
      orderBy: {
        created_at: 'desc',
      },
      take: Number(limit),
      include: {
        _count: {
          select: {
            clicks: true,
          },
        },
      },
    });

    return NextResponse.json(
      {
        status: 'success',
        data: shortlinks,
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
    logError('Error fetching shortlinks:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 },
    );
  }
}
