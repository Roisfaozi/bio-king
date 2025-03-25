import { authOptions, getAuthSession } from '@/lib/auth';
import { withRLS } from '@/lib/db';
import { updateBioPageWithLinks } from '@/lib/db-transaction/bio';
import { logError } from '@/lib/helper';
import { serializeBigInt } from '@/lib/utils';
import { editBioPageSchema } from '@/validation/bio';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

// GET by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const session = await getAuthSession();

    if (!session?.user) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const db = withRLS(session.user.id);

    const bioPage = await db.bioPages.findUnique({
      where: {
        id: params.id,
      },
      include: {
        bioLinks: true,
        socialLinks: true,
      },
    });

    if (!bioPage) {
      return NextResponse.json(
        { message: 'Bio page not found' },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { status: 'success', data: serializeBigInt(bioPage) },
      { status: 200 },
    );
  } catch (error) {
    logError('Error fetching bio page:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 },
    );
  }
}

// PATCH
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const session = await getAuthSession();
  if (!session?.user?.id) {
    logError('Unauthorized');
    return NextResponse.json(
      { status: 'fail', message: 'Unauthorized' },
      { status: 401 },
    );
  }
  const id = params.id;
  const userId = session?.user?.id;
  try {
    const data = await request.json();

    // Now validate with your schema
    const validatedData = editBioPageSchema.parse(data);
    const res = await updateBioPageWithLinks(userId, id, validatedData);

    return NextResponse.json(
      { status: 'success', data: serializeBigInt(res) },
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

    res = { status: 500, message: 'Internal Server Error', error: error };
    logError('error 500', error);
    return NextResponse.json(res, { status: 500 });
  }
}

// DELETE
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const session = await getAuthSession();

  if (!session?.user?.id) {
    return NextResponse.json(
      { status: 'fail', message: 'Unauthorized' },
      { status: 401 },
    );
  }

  try {
    const id = params.id;
    const db = withRLS(session.user.id);

    const bioPage = await db.bioPages.findUnique({
      where: { id },
    });

    if (!bioPage) {
      return NextResponse.json(
        { status: 'fail', message: 'Bio page not found' },
        { status: 404 },
      );
    }

    await db.bioPages.delete({
      where: { id },
    });

    return NextResponse.json(
      { status: 'success', message: 'Bio page deleted' },
      { status: 200 },
    );
  } catch (error) {
    logError('Error deleting bio page', error);
    return NextResponse.json(
      { status: 'fail', message: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
