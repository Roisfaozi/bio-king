import { NextRequest, NextResponse } from 'next/server';
import { getAuthSession } from '@/lib/auth';
import { bypassRLS, withRLS } from '@/lib/db';
import { z } from 'zod';
import { logError } from '@/lib/helper';
import { createShortlinkSchema } from '@/validation/link';

export async function GET(
  req: NextRequest,
  { params }: { params: { short: string } },
) {
  try {
    const session = await getAuthSession();
    const id = session?.user?.id;

    if (!session?.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const dbRls = bypassRLS();

    const shortCode = params.short;

    const shortlink = await dbRls.links.findUnique({
      where: {
        short_code: shortCode,
      },
      select: {
        id: true,
        short_code: true,
        original_url: true,
        title: true,
        is_active: true,
        expires_at: true,
        created_at: true,
        updated_at: true,
      },
    });
    console.log('ini short from action', shortlink);

    if (!shortlink) {
      logError('Shortlink not found');
      return NextResponse.json(
        { status: 'fail', message: 'Shortlink not found' },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        status: 'success',
        data: shortlink,
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
    logError('Error fetching shortlink:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 },
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { short: string } },
) {
  try {
    const session = await getAuthSession();
    const id = session?.user?.id;

    if (!session?.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const dbRls = withRLS(id);

    const shortCode = params.short;

    const shortlink = await dbRls.links.findUnique({
      where: {
        short_code: shortCode,
      },
      select: {
        id: true,
        user_id: true,
        title: true,
        original_url: true,
      },
    });

    if (!shortlink || shortlink.user_id !== id) {
      logError('Shortlink not found');
      return NextResponse.json(
        { message: 'Shortlink not found' },
        { status: 404 },
      );
    }

    const data = await req.json();
    const validatedData = createShortlinkSchema.parse(data);

    await dbRls.links.update({
      where: {
        short_code: shortCode,
      },
      data: {
        title: validatedData.title || shortlink.title,
        original_url: validatedData.original_url || shortlink.original_url,
      },
    });

    return NextResponse.json(
      {
        status: 'success',
        message: 'Shortlink updated successfully',
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
    logError('Error updating shortlink:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { short: string } },
) {
  try {
    const session = await getAuthSession();
    const id = session?.user?.id;

    if (!session?.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    const dbRls = withRLS(id);

    const shortCode = params.short;

    const shortlink = await dbRls.links.findUnique({
      where: {
        short_code: shortCode,
      },
      select: {
        id: true,
        user_id: true,
      },
    });

    if (!shortlink || shortlink.user_id !== id) {
      logError('Shortlink not found');
      return NextResponse.json(
        { message: 'Shortlink not found' },
        { status: 404 },
      );
    }

    await dbRls.links.delete({
      where: {
        short_code: shortCode,
      },
    });

    return NextResponse.json(
      {
        status: 'success',
        message: 'Shortlink deleted successfully',
      },
      { status: 200 },
    );
  } catch (error) {
    logError('Error deleting shortlink:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 },
    );
  }
}
